/*
  Warnings:

  - A unique constraint covering the columns `[productId,variantOptionId,variantOptionValueId]` on the table `ProductVariant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_productId_variantOptionId_variantOptionValue_key" ON "public"."ProductVariant"("productId", "variantOptionId", "variantOptionValueId");
