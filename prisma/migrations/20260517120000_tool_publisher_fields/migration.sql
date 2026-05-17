ALTER TABLE "Tool" ADD COLUMN "pricingPageUrl" TEXT;
ALTER TABLE "Tool" ADD COLUMN "sourceUrls" TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "Tool" ADD COLUMN "verificationStatus" TEXT DEFAULT 'starter';
ALTER TABLE "Tool" ADD COLUMN "setupDifficulty" TEXT;
ALTER TABLE "Tool" ADD COLUMN "freePlanReality" TEXT;
ALTER TABLE "Tool" ADD COLUMN "privacyRisk" TEXT;
ALTER TABLE "Tool" ADD COLUMN "bestForTeams" TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "Tool" ADD COLUMN "lastVerifiedAt" TIMESTAMP(3);
