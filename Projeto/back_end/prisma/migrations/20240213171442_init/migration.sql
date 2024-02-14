-- CreateTable
CREATE TABLE "Corrida" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" TEXT NOT NULL,
    "duracao" REAL NOT NULL,
    "distancia" REAL NOT NULL,
    "bpm" INTEGER NOT NULL,
    "localId" INTEGER NOT NULL,
    "equipamentoId" INTEGER NOT NULL,
    CONSTRAINT "Corrida_localId_fkey" FOREIGN KEY ("localId") REFERENCES "Local" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Corrida_equipamentoId_fkey" FOREIGN KEY ("equipamentoId") REFERENCES "Equipamento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Equipamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "dtPrimeiroUso" TEXT NOT NULL,
    "distanciaUso" REAL NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Local" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);
