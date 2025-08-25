/*
  Warnings:

  - A unique constraint covering the columns `[productId,addonProductId]` on the table `AddonProduct` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `addonProductId` on the `AddonProduct` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."AddonProduct" DROP CONSTRAINT "AddonProduct_productId_fkey";

-- DropIndex
DROP INDEX "public"."AddonProduct_addonProductId_key";

-- AlterTable
ALTER TABLE "public"."AddonProduct" DROP COLUMN "addonProductId",
ADD COLUMN     "addonProductId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AddonProduct_productId_addonProductId_key" ON "public"."AddonProduct"("productId", "addonProductId");

-- AddForeignKey
ALTER TABLE "public"."AddonProduct" ADD CONSTRAINT "AddonProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AddonProduct" ADD CONSTRAINT "AddonProduct_addonProductId_fkey" FOREIGN KEY ("addonProductId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
