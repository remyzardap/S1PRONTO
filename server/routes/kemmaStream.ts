/**
 * Kemma Agent Streaming Route (SSE)
 * Handles /api/kemma/stream — streams Kemma agentic responses
 */
import type { Request, Response } from 'express';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function kemmaStreamRoute(req: Request, res: Response) {
  const { messages, sessionId, model } = req.body;

  // Set SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');

  try {
    const selectedModel = model || 'claude-sonnet-4-6-20250514';
    
    const stream = anthropic.messages.stream({
      model: selectedModel,
      max_tokens: 4096,
      messages: messages || [{ role: 'user', content: 'Hello' }],
      system: `You are Kemma, a sovereign personal AI agent built into the Sutaeru platform. You are helpful, direct, and capable. You execute tasks, manage files, handle memories, and assist with anything the user needs.`,
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta') {
        const delta = event.delta as any;
        if (delta.text) {
          res.write(`data: ${JSON.stringify({ type: 'text', content: delta.text })}\n\n`);
        }
      }
    }

    const finalMessage = await stream.finalMessage();
    res.write(`data: ${JSON.stringify({ type: 'done', usage: finalMessage.usage })}\n\n`);
    res.end();
  } catch (error: any) {
    console.error('Kemma stream error:', error.message);
    res.write(`data: ${JSON.stringify({ type: 'error', message: error.message })}\n\n`);
    res.end();
  }
}
