/*
  Warnings:

  - You are about to drop the column `type` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `contactId` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `roadmapId` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `originalUrl` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `sourceType` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the `ChangelogEntry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChangelogLabel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RW_DataMigration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Roadmap` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoadmapItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoadmapItemCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoadmapItemComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoadmapItemVote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamAPIKey` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamIntegration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChangelogEntry" DROP CONSTRAINT "ChangelogEntry_teamId_fkey";

-- DropForeignKey
ALTER TABLE "ChangelogLabel" DROP CONSTRAINT "ChangelogLabel_changelogEntryId_fkey";

-- DropForeignKey
ALTER TABLE "ChangelogLabel" DROP CONSTRAINT "ChangelogLabel_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Roadmap" DROP CONSTRAINT "Roadmap_teamId_fkey";

-- DropForeignKey
ALTER TABLE "RoadmapItem" DROP CONSTRAINT "RoadmapItem_changelogEntryId_fkey";

-- DropForeignKey
ALTER TABLE "RoadmapItem" DROP CONSTRAINT "RoadmapItem_roadmapId_fkey";

-- DropForeignKey
ALTER TABLE "RoadmapItem" DROP CONSTRAINT "RoadmapItem_roadmapItemCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "RoadmapItem" DROP CONSTRAINT "RoadmapItem_teamId_fkey";

-- DropForeignKey
ALTER TABLE "RoadmapItem" DROP CONSTRAINT "RoadmapItem_userId_fkey";

-- DropForeignKey
ALTER TABLE "RoadmapItemCategory" DROP CONSTRAINT "RoadmapItemCategory_roadmapId_fkey";

-- DropForeignKey
ALTER TABLE "RoadmapItemCategory" DROP CONSTRAINT "RoadmapItemCategory_teamId_fkey";

-- DropForeignKey
ALTER TABLE "RoadmapItemComment" DROP CONSTRAINT "RoadmapItemComment_parentCommentId_fkey";

-- DropForeignKey
ALTER TABLE "RoadmapItemComment" DROP CONSTRAINT "RoadmapItemComment_roadmapId_fkey";

-- DropForeignKey
ALTER TABLE "RoadmapItemComment" DROP CONSTRAINT "RoadmapItemComment_userId_fkey";

-- DropForeignKey
ALTER TABLE "RoadmapItemVote" DROP CONSTRAINT "RoadmapItemVote_feedbackId_fkey";

-- DropForeignKey
ALTER TABLE "RoadmapItemVote" DROP CONSTRAINT "RoadmapItemVote_feedbackUserId_fkey";

-- DropForeignKey
ALTER TABLE "RoadmapItemVote" DROP CONSTRAINT "RoadmapItemVote_roadmapId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "TeamAPIKey" DROP CONSTRAINT "TeamAPIKey_teamId_fkey";

-- DropForeignKey
ALTER TABLE "TeamIntegration" DROP CONSTRAINT "TeamIntegration_teamId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_adminTeamId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_contactTeamId_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_contactId_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_roadmapId_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_userId_fkey";

-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "type",
DROP COLUMN "teamId",
DROP COLUMN "userId",
DROP COLUMN "contactId",
DROP COLUMN "roadmapId",
DROP COLUMN "metadata",
DROP COLUMN "originalUrl",
DROP COLUMN "sourceType";


-- DropTable
DROP TABLE "ChangelogEntry";

-- DropTable
DROP TABLE "ChangelogLabel";

-- DropTable
DROP TABLE "RW_DataMigration";

-- DropTable
DROP TABLE "Roadmap";

-- DropTable
DROP TABLE "RoadmapItem";

-- DropTable
DROP TABLE "RoadmapItemCategory";

-- DropTable
DROP TABLE "RoadmapItemComment";

-- DropTable
DROP TABLE "RoadmapItemVote";

-- DropTable
DROP TABLE "Team";

-- DropTable
DROP TABLE "TeamAPIKey";

-- DropTable
DROP TABLE "TeamIntegration";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "ChangelogStatus";

-- DropEnum
DROP TYPE "ChangelogType";

-- DropEnum
DROP TYPE "FeedbackType";

-- DropEnum
DROP TYPE "IntegrationTypes";

-- DropEnum
DROP TYPE "RoadmapStatusTypes";

-- DropEnum
DROP TYPE "RoleType";

-- DropEnum
DROP TYPE "SourceType";

-- DropEnum
DROP TYPE "VisibilityType";
