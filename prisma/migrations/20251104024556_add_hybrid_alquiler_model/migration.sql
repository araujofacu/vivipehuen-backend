/*
  Warnings:

  - You are about to drop the column `precio_por_noche` on the `Alquiler` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Alquiler" DROP COLUMN "precio_por_noche",
ADD COLUMN     "aire_acondicionado" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "camas" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "cochera" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "detalles" JSONB,
ADD COLUMN     "distancia_playa" INTEGER,
ADD COLUMN     "dormitorios" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "pileta" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "vista_al_mar" BOOLEAN NOT NULL DEFAULT false;
