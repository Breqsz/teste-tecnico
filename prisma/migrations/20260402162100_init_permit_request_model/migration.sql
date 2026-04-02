-- CreateTable
CREATE TABLE "PermitRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ownerName" TEXT NOT NULL,
    "responsibleCpf" TEXT NOT NULL,
    "propertyAddress" TEXT NOT NULL,
    "sqlCode" TEXT NOT NULL,
    "workType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
