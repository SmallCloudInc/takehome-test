-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('USER', 'ADMIN', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "FeedbackType" AS ENUM ('IDEA', 'ISSUE', 'OTHER');

-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('SLACK', 'CHROME', 'INTERCOM', 'API', 'PORTAL', 'ADMIN');

-- CreateEnum
CREATE TYPE "RoadmapStatusTypes" AS ENUM ('Open', 'UnderReview', 'Planned', 'InProgress', 'Complete', 'Closed');

-- CreateEnum
CREATE TYPE "VisibilityType" AS ENUM ('VISIBLE', 'HIDDEN', 'UNLISTED');

-- CreateEnum
CREATE TYPE "IntegrationTypes" AS ENUM ('INTERCOM', 'SLACK');

-- CreateEnum
CREATE TYPE "ChangelogStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'SCHEDULED');

-- CreateEnum
CREATE TYPE "ChangelogType" AS ENUM ('FIX', 'ANNOUCEMENT', 'IMPROVEMENT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sub" TEXT NOT NULL,
    "name" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "RoleType" NOT NULL,
    "contactTeamId" TEXT,
    "adminTeamId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "FeedbackType" NOT NULL,
    "teamId" TEXT,
    "userId" TEXT,
    "contactId" TEXT,
    "roadmapId" TEXT,
    "metadata" JSONB,
    "originalUrl" TEXT,
    "sourceType" "SourceType" NOT NULL DEFAULT E'ADMIN',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoadmapItemCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "roadmapId" TEXT,
    "teamId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoadmapItemVote" (
    "id" TEXT NOT NULL,
    "feedbackUserId" TEXT,
    "comment" TEXT,
    "feedbackId" TEXT,
    "roadmapId" TEXT NOT NULL,
    "voterEmail" TEXT,
    "voterName" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoadmapItemComment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "comment" TEXT,
    "roadmapId" TEXT NOT NULL,
    "roadmapSlug" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parentCommentId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roadmap" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoadmapItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "desc" TEXT,
    "userId" TEXT,
    "status" "RoadmapStatusTypes" NOT NULL DEFAULT E'Open',
    "roadmapId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visibility" "VisibilityType" NOT NULL DEFAULT E'VISIBLE',
    "type" "FeedbackType" NOT NULL DEFAULT E'IDEA',
    "roadmapItemCategoryId" TEXT,
    "changelogEntryId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamIntegration" (
    "id" TEXT NOT NULL,
    "service" "IntegrationTypes" NOT NULL,
    "intercomWorkspaceId" TEXT,
    "slackWorkspaceId" TEXT,
    "data" JSONB,
    "accessToken" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "teamId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamAPIKey" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "teamId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChangelogLabel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "changelogEntryId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChangelogEntry" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "status" "ChangelogStatus" NOT NULL DEFAULT E'DRAFT',
    "types" "ChangelogType"[],
    "teamId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subdomain" TEXT,
    "ownerId" TEXT,
    "imageUrl" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RW_DataMigration" (
    "version" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "finishedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("version")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User.sub_unique" ON "User"("sub");

-- CreateIndex
CREATE UNIQUE INDEX "Roadmap.slug_teamId_unique" ON "Roadmap"("slug", "teamId");

-- CreateIndex
CREATE UNIQUE INDEX "RoadmapItem.slug_teamId_roadmapId_unique" ON "RoadmapItem"("slug", "teamId", "roadmapId");

-- CreateIndex
CREATE UNIQUE INDEX "ChangelogLabel.slug_teamId_unique" ON "ChangelogLabel"("slug", "teamId");

-- CreateIndex
CREATE UNIQUE INDEX "ChangelogEntry.slug_teamId_unique" ON "ChangelogEntry"("slug", "teamId");

-- CreateIndex
CREATE UNIQUE INDEX "Team.subdomain_unique" ON "Team"("subdomain");

-- CreateIndex
CREATE UNIQUE INDEX "Team_ownerId_unique" ON "Team"("ownerId");

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("contactTeamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("adminTeamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD FOREIGN KEY ("contactId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD FOREIGN KEY ("roadmapId") REFERENCES "RoadmapItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadmapItemCategory" ADD FOREIGN KEY ("roadmapId") REFERENCES "Roadmap"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadmapItemCategory" ADD FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadmapItemVote" ADD FOREIGN KEY ("feedbackUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadmapItemVote" ADD FOREIGN KEY ("feedbackId") REFERENCES "Feedback"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadmapItemVote" ADD FOREIGN KEY ("roadmapId") REFERENCES "RoadmapItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadmapItemComment" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadmapItemComment" ADD FOREIGN KEY ("roadmapId") REFERENCES "RoadmapItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadmapItemComment" ADD FOREIGN KEY ("parentCommentId") REFERENCES "RoadmapItemComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Roadmap" ADD FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadmapItem" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadmapItem" ADD FOREIGN KEY ("roadmapId") REFERENCES "Roadmap"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadmapItem" ADD FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadmapItem" ADD FOREIGN KEY ("roadmapItemCategoryId") REFERENCES "RoadmapItemCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadmapItem" ADD FOREIGN KEY ("changelogEntryId") REFERENCES "ChangelogEntry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamIntegration" ADD FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamAPIKey" ADD FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChangelogLabel" ADD FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChangelogLabel" ADD FOREIGN KEY ("changelogEntryId") REFERENCES "ChangelogEntry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChangelogEntry" ADD FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
