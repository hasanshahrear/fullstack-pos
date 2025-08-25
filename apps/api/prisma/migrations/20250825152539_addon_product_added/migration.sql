-- CreateTable
CREATE TABLE "public"."AddonProduct" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "addonProductId" INTEGER[],

    CONSTRAINT "AddonProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AddonProduct_addonProductId_key" ON "public"."AddonProduct"("addonProductId");

-- AddForeignKey
ALTER TABLE "public"."AddonProduct" ADD CONSTRAINT "AddonProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
