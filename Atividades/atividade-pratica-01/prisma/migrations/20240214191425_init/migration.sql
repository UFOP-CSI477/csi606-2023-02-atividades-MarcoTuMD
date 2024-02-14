-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Doacoes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pessoaId" INTEGER NOT NULL,
    "localId" INTEGER NOT NULL,
    "data" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Doacoes_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "Pessoas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Doacoes_localId_fkey" FOREIGN KEY ("localId") REFERENCES "LocaisColeta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Doacoes" ("created_at", "data", "id", "localId", "pessoaId", "updated_at") SELECT "created_at", "data", "id", "localId", "pessoaId", "updated_at" FROM "Doacoes";
DROP TABLE "Doacoes";
ALTER TABLE "new_Doacoes" RENAME TO "Doacoes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
