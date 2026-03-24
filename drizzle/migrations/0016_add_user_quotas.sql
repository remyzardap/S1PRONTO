-- Migration: Add user_quotas table
-- Tracks per-user usage quotas for the Kemma agent and tiered plans

CREATE TABLE IF NOT EXISTS "user_quotas" (
  "id"                      INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "user_id"                 INTEGER NOT NULL UNIQUE REFERENCES "users"("id"),
  "tier"                    TEXT NOT NULL DEFAULT 'free' CHECK ("tier" IN ('free', 'trial', 'pro', 'max')),
  "messages_today"          INTEGER NOT NULL DEFAULT 0,
  "think_presses_today"     INTEGER NOT NULL DEFAULT 0,
  "tokens_today"            INTEGER NOT NULL DEFAULT 0,
  "daily_reset_at"          TIMESTAMP NOT NULL DEFAULT NOW(),
  "agentic_tasks_this_month" INTEGER NOT NULL DEFAULT 0,
  "voice_minutes_this_month" INTEGER NOT NULL DEFAULT 0,
  "monthly_reset_at"        TIMESTAMP NOT NULL DEFAULT NOW(),
  "trial_started_at"        TIMESTAMP,
  "trial_ends_at"           TIMESTAMP,
  "has_byos"                BOOLEAN NOT NULL DEFAULT FALSE,
  "byos_bonus_tasks"        INTEGER NOT NULL DEFAULT 0,
  "purge_password_hash"     TEXT,
  "created_at"              TIMESTAMP NOT NULL DEFAULT NOW(),
  "updated_at"              TIMESTAMP NOT NULL DEFAULT NOW()
);
