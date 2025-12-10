-- CreateTable
CREATE TABLE "Comercio" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "fotos" TEXT[],
    "horarios" TEXT,
    "medios_de_pago" TEXT[],
    "links" JSONB,
    "propietario_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comercio_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comercio" ADD CONSTRAINT "Comercio_propietario_id_fkey" FOREIGN KEY ("propietario_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
