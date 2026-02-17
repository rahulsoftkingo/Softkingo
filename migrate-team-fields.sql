-- Migration: Add category and status fields to TeamMember table
-- Run this migration manually to update the database schema

-- Add category field with default value
ALTER TABLE "teammember" 
ADD COLUMN "category" TEXT NOT NULL DEFAULT 'employee';

-- Add status field with default value  
ALTER TABLE "teammember"
ADD COLUMN "status" TEXT NOT NULL DEFAULT 'active';

-- Optional: Update existing records to have appropriate categories based on titles
UPDATE "teammember" 
SET "category" = 'management' 
WHERE (
  LOWER("title") LIKE '%ceo%' OR 
  LOWER("title") LIKE '%cto%' OR 
  LOWER("title") LIKE '%coo%' OR
  LOWER("title") LIKE '%founder%' OR
  LOWER("title") LIKE '%director%' OR
  LOWER("title") LIKE '%head%'
);

UPDATE "teammember"
SET "category" = 'tech-lead'
WHERE (
  LOWER("title") LIKE '%lead%' OR
  LOWER("title") LIKE '%senior%' OR
  LOWER("title") LIKE '%principal%'
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "teammember_category_idx" ON "teammember"("category");
CREATE INDEX IF NOT EXISTS "teammember_status_idx" ON "teammember"("status");
