-- PostgreSQL content model reference for the AI/SaaS PSEO platform.
-- This is a SQL reference. Prefer Prisma migrations if using Prisma.

CREATE TABLE tools (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT NOT NULL,
  description TEXT,
  website_url TEXT,
  affiliate_url TEXT,
  logo_url TEXT,
  pricing_model TEXT,
  starting_price NUMERIC,
  currency TEXT DEFAULT 'USD',
  free_plan_available BOOLEAN DEFAULT FALSE,
  trial_available BOOLEAN DEFAULT FALSE,
  best_for TEXT[] DEFAULT '{}',
  not_best_for TEXT[] DEFAULT '{}',
  pros TEXT[] DEFAULT '{}',
  cons TEXT[] DEFAULT '{}',
  rating NUMERIC,
  is_sponsored BOOLEAN DEFAULT FALSE,
  affiliate_available BOOLEAN DEFAULT FALSE,
  last_checked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE tool_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  parent_id TEXT REFERENCES tool_categories(id)
);

CREATE TABLE professions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  aliases TEXT[] DEFAULT '{}',
  country_terminology JSONB,
  pain_points TEXT[] DEFAULT '{}',
  common_tasks TEXT[] DEFAULT '{}',
  recommended_categories TEXT[] DEFAULT '{}',
  monetisation_score INTEGER DEFAULT 3
);

CREATE TABLE countries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  currency TEXT NOT NULL,
  region TEXT,
  terminology_notes TEXT[] DEFAULT '{}',
  privacy_notes TEXT[] DEFAULT '{}',
  priority INTEGER DEFAULT 5
);

CREATE TABLE use_cases (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  intent TEXT,
  funnel_stage TEXT,
  description TEXT
);

CREATE TABLE comparisons (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  tool_a_slug TEXT NOT NULL,
  tool_b_slug TEXT NOT NULL,
  summary_verdict TEXT NOT NULL,
  primary_use_case TEXT,
  winner_by_use_case JSONB,
  feature_rows JSONB,
  pricing_notes TEXT,
  last_checked_at TIMESTAMPTZ
);

CREATE TABLE workflows (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  problem TEXT NOT NULL,
  tools_needed TEXT[] DEFAULT '{}',
  steps JSONB NOT NULL,
  prompts TEXT[] DEFAULT '{}',
  templates TEXT[] DEFAULT '{}',
  related_profession_slug TEXT,
  last_updated_at TIMESTAMPTZ
);

CREATE TABLE prompt_templates (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  profession_slug TEXT,
  task TEXT NOT NULL,
  prompt TEXT NOT NULL,
  refinement_prompt TEXT,
  mistakes_to_avoid TEXT[] DEFAULT '{}',
  last_updated_at TIMESTAMPTZ
);
