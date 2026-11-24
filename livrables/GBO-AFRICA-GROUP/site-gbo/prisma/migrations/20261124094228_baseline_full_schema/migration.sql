-- CreateTable
CREATE TABLE "Lead" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "objective" TEXT NOT NULL,
    "profile" TEXT NOT NULL DEFAULT '—',
    "source" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NOUVEAU',
    "commune" TEXT NOT NULL DEFAULT '—',
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "contactName" TEXT,
    "poleName" TEXT,
    "practiceLocation" TEXT,
    "nutrition" BOOLEAN NOT NULL DEFAULT false,
    "nutritionObjective" TEXT,
    "availability" TEXT,
    "comment" TEXT,
    "consentAt" DATETIME,
    "coachId" INTEGER,
    "relationEndedAt" DATETIME,
    "anonymizedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Lead_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

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

-- CreateTable
CREATE TABLE "Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "body" TEXT,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Coach" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "spec" TEXT NOT NULL,
    "zones" TEXT NOT NULL,
    "dispo" TEXT NOT NULL DEFAULT 'DISPONIBLE',
    "clients" INTEGER NOT NULL DEFAULT 0,
    "phone" TEXT,
    "photoUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "authorName" TEXT NOT NULL,
    "context" TEXT,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLoginAt" DATETIME
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tokenHash" TEXT NOT NULL,
    "adminUserId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME NOT NULL,
    CONSTRAINT "PasswordResetToken_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "AdminUser" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tokenHash" TEXT NOT NULL,
    "adminUserId" INTEGER NOT NULL,
    "userAgent" TEXT,
    "ipHash" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME NOT NULL,
    CONSTRAINT "Session_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "AdminUser" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "adminUserId" INTEGER,
    "action" TEXT NOT NULL,
    "targetType" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "detail" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AuditLog_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "AdminUser" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RateLimitHit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bucketKey" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ClientAccount" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "leadId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "mustChangePassword" BOOLEAN NOT NULL DEFAULT true,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLoginAt" DATETIME,
    CONSTRAINT "ClientAccount_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ClientPasswordResetToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tokenHash" TEXT NOT NULL,
    "clientAccountId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME NOT NULL,
    CONSTRAINT "ClientPasswordResetToken_clientAccountId_fkey" FOREIGN KEY ("clientAccountId") REFERENCES "ClientAccount" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CoachAccount" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "coachId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "mustChangePassword" BOOLEAN NOT NULL DEFAULT true,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLoginAt" DATETIME,
    CONSTRAINT "CoachAccount_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CoachPasswordResetToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tokenHash" TEXT NOT NULL,
    "coachAccountId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME NOT NULL,
    CONSTRAINT "CoachPasswordResetToken_coachAccountId_fkey" FOREIGN KEY ("coachAccountId") REFERENCES "CoachAccount" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ClientSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tokenHash" TEXT NOT NULL,
    "clientAccountId" INTEGER NOT NULL,
    "userAgent" TEXT,
    "ipHash" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME NOT NULL,
    CONSTRAINT "ClientSession_clientAccountId_fkey" FOREIGN KEY ("clientAccountId") REFERENCES "ClientAccount" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CoachSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tokenHash" TEXT NOT NULL,
    "coachAccountId" INTEGER NOT NULL,
    "userAgent" TEXT,
    "ipHash" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME NOT NULL,
    CONSTRAINT "CoachSession_coachAccountId_fkey" FOREIGN KEY ("coachAccountId") REFERENCES "CoachAccount" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Formule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "nbSeances" INTEGER NOT NULL,
    "dureeJours" INTEGER NOT NULL,
    "prix" INTEGER NOT NULL,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Abonnement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clientAccountId" INTEGER NOT NULL,
    "formuleId" INTEGER NOT NULL,
    "seancesRestantes" INTEGER NOT NULL,
    "statut" TEXT NOT NULL DEFAULT 'ACTIF',
    "demarreLe" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expireLe" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Abonnement_clientAccountId_fkey" FOREIGN KEY ("clientAccountId") REFERENCES "ClientAccount" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Abonnement_formuleId_fkey" FOREIGN KEY ("formuleId") REFERENCES "Formule" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Paiement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "abonnementId" INTEGER NOT NULL,
    "montant" INTEGER NOT NULL,
    "methode" TEXT NOT NULL,
    "enregistreParAdminUserId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Paiement_abonnementId_fkey" FOREIGN KEY ("abonnementId") REFERENCES "Abonnement" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Seance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clientAccountId" INTEGER NOT NULL,
    "coachAccountId" INTEGER NOT NULL,
    "abonnementId" INTEGER NOT NULL,
    "datePrevue" DATETIME NOT NULL,
    "lieu" TEXT,
    "contenuPrevu" TEXT,
    "statut" TEXT NOT NULL DEFAULT 'PLANIFIEE',
    "motifAnnulation" TEXT,
    "annulePar" TEXT,
    "decompteeMalgreAnnulation" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Seance_clientAccountId_fkey" FOREIGN KEY ("clientAccountId") REFERENCES "ClientAccount" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Seance_coachAccountId_fkey" FOREIGN KEY ("coachAccountId") REFERENCES "CoachAccount" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Seance_abonnementId_fkey" FOREIGN KEY ("abonnementId") REFERENCES "Abonnement" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PropositionCoach" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "seanceId" INTEGER NOT NULL,
    "coachAccountId" INTEGER NOT NULL,
    "statut" TEXT NOT NULL DEFAULT 'PROPOSEE_AU_COACH',
    "motifRefusClient" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PropositionCoach_seanceId_fkey" FOREIGN KEY ("seanceId") REFERENCES "Seance" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PropositionCoach_coachAccountId_fkey" FOREIGN KEY ("coachAccountId") REFERENCES "CoachAccount" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SeanceHistorique" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "seanceId" INTEGER NOT NULL,
    "champ" TEXT NOT NULL,
    "ancienneValeur" TEXT,
    "nouvelleValeur" TEXT,
    "modifiePar" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SeanceHistorique_seanceId_fkey" FOREIGN KEY ("seanceId") REFERENCES "Seance" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CompteRendu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "seanceId" INTEGER NOT NULL,
    "contenu" TEXT NOT NULL,
    "valide" BOOLEAN NOT NULL DEFAULT false,
    "valideLe" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CompteRendu_seanceId_fkey" FOREIGN KEY ("seanceId") REFERENCES "Seance" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clientAccountId" INTEGER,
    "coachAccountId" INTEGER,
    "canal" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "statut" TEXT NOT NULL DEFAULT 'EN_ATTENTE',
    "detail" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Notification_clientAccountId_fkey" FOREIGN KEY ("clientAccountId") REFERENCES "ClientAccount" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Notification_coachAccountId_fkey" FOREIGN KEY ("coachAccountId") REFERENCES "CoachAccount" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Lead_code_key" ON "Lead"("code");

-- CreateIndex
CREATE INDEX "Lead_type_idx" ON "Lead"("type");

-- CreateIndex
CREATE INDEX "Lead_status_idx" ON "Lead"("status");

-- CreateIndex
CREATE UNIQUE INDEX "GymPartner_code_key" ON "GymPartner"("code");

-- CreateIndex
CREATE INDEX "GymPartner_status_idx" ON "GymPartner"("status");

-- CreateIndex
CREATE UNIQUE INDEX "NutritionFollowUp_leadId_key" ON "NutritionFollowUp"("leadId");

-- CreateIndex
CREATE INDEX "NutritionFollowUp_status_idx" ON "NutritionFollowUp"("status");

-- CreateIndex
CREATE INDEX "Message_type_idx" ON "Message"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Coach_name_key" ON "Coach"("name");

-- CreateIndex
CREATE INDEX "Review_status_idx" ON "Review"("status");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_tokenHash_key" ON "PasswordResetToken"("tokenHash");

-- CreateIndex
CREATE INDEX "PasswordResetToken_adminUserId_idx" ON "PasswordResetToken"("adminUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_tokenHash_key" ON "Session"("tokenHash");

-- CreateIndex
CREATE INDEX "Session_adminUserId_idx" ON "Session"("adminUserId");

-- CreateIndex
CREATE INDEX "RateLimitHit_bucketKey_createdAt_idx" ON "RateLimitHit"("bucketKey", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "ClientAccount_leadId_key" ON "ClientAccount"("leadId");

-- CreateIndex
CREATE UNIQUE INDEX "ClientAccount_email_key" ON "ClientAccount"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ClientPasswordResetToken_tokenHash_key" ON "ClientPasswordResetToken"("tokenHash");

-- CreateIndex
CREATE INDEX "ClientPasswordResetToken_clientAccountId_idx" ON "ClientPasswordResetToken"("clientAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "CoachAccount_coachId_key" ON "CoachAccount"("coachId");

-- CreateIndex
CREATE UNIQUE INDEX "CoachAccount_email_key" ON "CoachAccount"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CoachPasswordResetToken_tokenHash_key" ON "CoachPasswordResetToken"("tokenHash");

-- CreateIndex
CREATE INDEX "CoachPasswordResetToken_coachAccountId_idx" ON "CoachPasswordResetToken"("coachAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "ClientSession_tokenHash_key" ON "ClientSession"("tokenHash");

-- CreateIndex
CREATE INDEX "ClientSession_clientAccountId_idx" ON "ClientSession"("clientAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "CoachSession_tokenHash_key" ON "CoachSession"("tokenHash");

-- CreateIndex
CREATE INDEX "CoachSession_coachAccountId_idx" ON "CoachSession"("coachAccountId");

-- CreateIndex
CREATE INDEX "Abonnement_clientAccountId_idx" ON "Abonnement"("clientAccountId");

-- CreateIndex
CREATE INDEX "Abonnement_statut_idx" ON "Abonnement"("statut");

-- CreateIndex
CREATE INDEX "Paiement_abonnementId_idx" ON "Paiement"("abonnementId");

-- CreateIndex
CREATE INDEX "Seance_clientAccountId_idx" ON "Seance"("clientAccountId");

-- CreateIndex
CREATE INDEX "Seance_coachAccountId_idx" ON "Seance"("coachAccountId");

-- CreateIndex
CREATE INDEX "Seance_abonnementId_idx" ON "Seance"("abonnementId");

-- CreateIndex
CREATE INDEX "Seance_statut_idx" ON "Seance"("statut");

-- CreateIndex
CREATE INDEX "PropositionCoach_seanceId_idx" ON "PropositionCoach"("seanceId");

-- CreateIndex
CREATE INDEX "PropositionCoach_coachAccountId_idx" ON "PropositionCoach"("coachAccountId");

-- CreateIndex
CREATE INDEX "SeanceHistorique_seanceId_idx" ON "SeanceHistorique"("seanceId");

-- CreateIndex
CREATE UNIQUE INDEX "CompteRendu_seanceId_key" ON "CompteRendu"("seanceId");

-- CreateIndex
CREATE INDEX "Notification_clientAccountId_idx" ON "Notification"("clientAccountId");

-- CreateIndex
CREATE INDEX "Notification_coachAccountId_idx" ON "Notification"("coachAccountId");
