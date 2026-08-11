-- AlterTable
ALTER TABLE "Lead" ADD COLUMN "nutritionObjective" TEXT;

-- CreateTable
CREATE TABLE "NutritionFollowUp" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "leadId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NOUVEAU',
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "NutritionFollowUp_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "NutritionFollowUp_leadId_key" ON "NutritionFollowUp"("leadId");

-- CreateIndex
CREATE INDEX "NutritionFollowUp_status_idx" ON "NutritionFollowUp"("status");
