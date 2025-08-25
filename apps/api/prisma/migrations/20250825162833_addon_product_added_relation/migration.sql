-- AddForeignKey
ALTER TABLE "public"."AddonProduct" ADD CONSTRAINT "AddonProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
