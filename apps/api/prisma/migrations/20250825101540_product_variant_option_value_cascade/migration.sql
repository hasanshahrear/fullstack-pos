-- DropForeignKey
ALTER TABLE "public"."ProductVariantOptionValue" DROP CONSTRAINT "ProductVariantOptionValue_variantOptionId_fkey";

-- AddForeignKey
ALTER TABLE "public"."ProductVariantOptionValue" ADD CONSTRAINT "ProductVariantOptionValue_variantOptionId_fkey" FOREIGN KEY ("variantOptionId") REFERENCES "public"."ProductVariantOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;
