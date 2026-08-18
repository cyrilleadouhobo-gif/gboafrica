-- AlterTable
ALTER TABLE "Lead" ADD COLUMN "practiceLocation" TEXT;

-- CreateTable
CREATE TABLE "GymPartner" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "gymName" TEXT NOT NULL,
    "managerName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "whatsapp" TEXT,
    "email" TEXT NOT NULL,
    "commune" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "memberCount" TEXT,
    "hasSoftware" BOOLEAN,
    "reasons" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'NOUVEAU',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "GymPartner_code_key" ON "GymPartner"("code");

-- CreateIndex
CREATE INDEX "GymPartner_status_idx" ON "GymPartner"("status");
