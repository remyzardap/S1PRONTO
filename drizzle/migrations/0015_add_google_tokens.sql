-- Migration: Add google_tokens table
-- Stores OAuth 2.0 tokens for Google Workspace integration per user

CREATE TABLE IF NOT EXISTS "google_tokens" (
  "id"           INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "userId"       INTEGER NOT NULL UNIQUE,
  "email"        VARCHAR(320),
  "accessToken"  TEXT NOT NULL,
  "refreshToken" TEXT NOT NULL,
  "expiresAt"    TIMESTAMP NOT NULL,
  "scopes"       TEXT,
  "createdAt"    TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt"    TIMESTAMP NOT NULL DEFAULT NOW()
);
