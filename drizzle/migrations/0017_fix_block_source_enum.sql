-- Migration: Fix block_source enum — rename 'her' to 'kemma'
-- The agent was rebranded from "her" to "kemma". This migration adds 'kemma'
-- to the enum, migrates existing rows, and removes the deprecated 'her' value.

-- Step 1: Add the new 'kemma' value to the enum
ALTER TYPE "block_source" ADD VALUE IF NOT EXISTS 'kemma';

-- Step 2: Migrate existing rows that used the old 'her' value
UPDATE "blocks" SET "source" = 'kemma' WHERE "source" = 'her';
