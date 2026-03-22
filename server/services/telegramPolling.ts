import { s1Route, buildS1SystemPrompt } from "../routers/s1Router";

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const POLL_INTERVAL = 1000;
let lastUpdateId = 0;
let isPolling = false;

async function sendMessage(chatId: number | string, text: string) {
  try {
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: text.substring(0, 4096),
        parse_mode: "Markdown",
      }),
    });
    if (!res.ok) {
      const fallback = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: text.substring(0, 4096),
        }),
      });
    }
  } catch (err) {
    console.error("[Telegram] Send error:", err);
  }
}

async function sendTyping(chatId: number | string) {
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendChatAction`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, action: "typing" }),
    });
  } catch {}
}

async function handleMessage(message: any) {
  if (!message.text) return;

  const chatId = message.chat.id;
  const text = message.text;
  const username = message.from?.username || `user_${message.from?.id}`;

  console.log(`[Telegram] Message from @${username}: ${text.substring(0, 80)}`);

  await sendTyping(chatId);

  try {
    const { config: agentConfig, info: agentInfo } = s1Route(text, false);
    const systemPrompt = buildS1SystemPrompt({
      agent: "s1",
      label: "S1",
      reason: "telegram",
      emoji: "🧠",
      color: "#E8442A",
    });

    const messages = [
      { role: "system" as const, content: systemPrompt },
      { role: "user" as const, content: text },
    ];

    const llmResponse = await fetch(`${agentConfig.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${agentConfig.apiKey}`,
      },
      body: JSON.stringify({
        model: agentConfig.model,
        messages,
        max_tokens: 1000,
      }),
    });

    if (!llmResponse.ok) {
      const errText = await llmResponse.text();
      console.error(`[Telegram] LLM error: ${llmResponse.status} ${errText}`);
      await sendMessage(chatId, "S1 is having a moment. Try again.");
      return;
    }

    const llmData = await llmResponse.json() as any;
    const response = llmData.choices?.[0]?.message?.content || "No response.";
    console.log(`[Telegram] Routed to ${agentInfo.label} → replying to @${username}`);
    await sendMessage(chatId, response);
  } catch (err) {
    console.error("[Telegram] Error:", err);
    await sendMessage(chatId, "Something went wrong. Try again.");
  }
}

async function pollUpdates() {
  if (!TELEGRAM_TOKEN || !isPolling) return;

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/getUpdates?offset=${lastUpdateId + 1}&timeout=30&allowed_updates=["message"]`,
      { signal: AbortSignal.timeout(35000) }
    );

    if (!res.ok) {
      console.error(`[Telegram] Poll error: ${res.status}`);
      setTimeout(pollUpdates, 5000);
      return;
    }

    const data = await res.json() as any;
    const updates = data.result || [];

    for (const update of updates) {
      lastUpdateId = update.update_id;
      if (update.message) {
        handleMessage(update.message).catch(console.error);
      }
    }
  } catch (err: any) {
    if (err?.name !== "TimeoutError" && err?.name !== "AbortError") {
      console.error("[Telegram] Poll error:", err);
    }
  }

  if (isPolling) {
    setTimeout(pollUpdates, POLL_INTERVAL);
  }
}

export async function startTelegramPolling() {
  if (!TELEGRAM_TOKEN) {
    console.log("[Telegram] No bot token. Polling disabled.");
    return;
  }

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/deleteWebhook`, {
      method: "POST",
    });
    console.log("[Telegram] Webhook removed. Switching to polling mode.");
  } catch {}

  isPolling = true;
  console.log("[Telegram] Polling started. Bot is live!");
  pollUpdates();
}

export function stopTelegramPolling() {
  isPolling = false;
  console.log("[Telegram] Polling stopped.");
}

