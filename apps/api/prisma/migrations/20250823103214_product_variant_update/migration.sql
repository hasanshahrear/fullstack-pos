/*
  Warnings:

  - You are about to drop the `ProductVariantOptionAssignment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `variantOptionId` to the `ProductVariant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variantOptionValueId` to the `ProductVariant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."ProductVariantOptionAssignment" DROP CONSTRAINT "ProductVariantOptionAssignment_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductVariantOptionAssignment" DROP CONSTRAINT "ProductVariantOptionAssignment_variantOptionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductVariantOptionAssignment" DROP CONSTRAINT "ProductVariantOptionAssignment_variantOptionValueId_fkey";

-- AlterTable
ALTER TABLE "public"."ProductVariant" ADD COLUMN     "variantOptionId" INTEGER NOT NULL,
ADD COLUMN     "variantOptionValueId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."ProductVariantOptionAssignment";

-- AddForeignKey
ALTER TABLE "public"."ProductVariant" ADD CONSTRAINT "ProductVariant_variantOptionId_fkey" FOREIGN KEY ("variantOptionId") REFERENCES "public"."ProductVariantOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductVariant" ADD CONSTRAINT "ProductVariant_variantOptionValueId_fkey" FOREIGN KEY ("variantOptionValueId") REFERENCES "public"."ProductVariantOptionValue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
