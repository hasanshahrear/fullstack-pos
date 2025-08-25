/*
  Warnings:

  - You are about to drop the column `productVariantId` on the `GroupProduct` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."GroupProduct" DROP CONSTRAINT "GroupProduct_productVariantId_fkey";

-- AlterTable
ALTER TABLE "public"."GroupProduct" DROP COLUMN "productVariantId";

-- AddForeignKey
ALTER TABLE "public"."GroupProduct" ADD CONSTRAINT "GroupProduct_groupProductVariantId_fkey" FOREIGN KEY ("groupProductVariantId") REFERENCES "public"."ProductVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GroupProduct" ADD CONSTRAINT "GroupProduct_groupProductId_fkey" FOREIGN KEY ("groupProductId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
