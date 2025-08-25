-- DropForeignKey
ALTER TABLE "public"."AddonProduct" DROP CONSTRAINT "AddonProduct_productId_fkey";

-- AddForeignKey
ALTER TABLE "public"."AddonProduct" ADD CONSTRAINT "AddonProduct_addonProductId_fkey" FOREIGN KEY ("addonProductId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
