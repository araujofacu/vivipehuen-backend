-- CreateTable
CREATE TABLE "Alquiler" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "capacidad" INTEGER NOT NULL DEFAULT 1,
    "pet_friendly" BOOLEAN NOT NULL DEFAULT false,
    "wifi" BOOLEAN NOT NULL DEFAULT false,
    "parrilla" BOOLEAN NOT NULL DEFAULT false,
    "precio_por_noche" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "propietario_id" INTEGER NOT NULL,

    CONSTRAINT "Alquiler_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Alquiler" ADD CONSTRAINT "Alquiler_propietario_id_fkey" FOREIGN KEY ("propietario_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
