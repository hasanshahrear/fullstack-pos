/*
  Warnings:

  - You are about to drop the `product_variants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."BinInventory" DROP CONSTRAINT "BinInventory_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BinInventory" DROP CONSTRAINT "BinInventory_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "public"."GroupProduct" DROP CONSTRAINT "GroupProduct_groupProductId_fkey";

-- DropForeignKey
ALTER TABLE "public"."GroupProduct" DROP CONSTRAINT "GroupProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."GroupProduct" DROP CONSTRAINT "GroupProduct_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "public"."OrderItem" DROP CONSTRAINT "OrderItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."OrderItem" DROP CONSTRAINT "OrderItem_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Purchase" DROP CONSTRAINT "Purchase_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."StockTransfer" DROP CONSTRAINT "StockTransfer_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."StockTransfer" DROP CONSTRAINT "StockTransfer_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ProductCoupons" DROP CONSTRAINT "_ProductCoupons_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."product_variants" DROP CONSTRAINT "product_variants_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."product_variants" DROP CONSTRAINT "product_variants_variantOptionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."product_variants" DROP CONSTRAINT "product_variants_variantOptionValueId_fkey";

-- DropForeignKey
ALTER TABLE "public"."products" DROP CONSTRAINT "products_brandId_fkey";

-- DropForeignKey
ALTER TABLE "public"."products" DROP CONSTRAINT "products_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."products" DROP CONSTRAINT "products_salesUnitId_fkey";

-- DropForeignKey
ALTER TABLE "public"."products" DROP CONSTRAINT "products_taxId_fkey";

-- DropTable
DROP TABLE "public"."product_variants";

-- DropTable
DROP TABLE "public"."products";

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" SERIAL NOT NULL,
    "productName" TEXT NOT NULL,
    "productSKU" TEXT NOT NULL,
    "minQuantity" INTEGER NOT NULL,
    "stockAlert" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discountType" "public"."EDiscountType",
    "discountedValue" DOUBLE PRECISION,
    "expireDate" TIMESTAMP(3),
    "isAddonProduct" BOOLEAN NOT NULL,
    "productDescription" TEXT,
    "thumbnail" TEXT,
    "productType" "public"."EProductType" NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "brandId" INTEGER,
    "salesUnitId" INTEGER NOT NULL,
    "taxId" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductVariant" (
    "id" SERIAL NOT NULL,
    "variantName" TEXT NOT NULL,
    "variantQuantity" INTEGER NOT NULL,
    "variantPrice" DOUBLE PRECISION NOT NULL,
    "variantDiscountType" "public"."EDiscountType",
    "variantDiscountedValue" DOUBLE PRECISION,
    "productId" INTEGER NOT NULL,
    "variantOptionId" INTEGER NOT NULL,
    "variantOptionValueId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ProductVariant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_productSKU_key" ON "public"."Product"("productSKU");

-- CreateIndex
CREATE INDEX "Product_categoryId_idx" ON "public"."Product"("categoryId");

-- CreateIndex
CREATE INDEX "Product_brandId_idx" ON "public"."Product"("brandId");

-- CreateIndex
CREATE INDEX "Product_salesUnitId_idx" ON "public"."Product"("salesUnitId");

-- CreateIndex
CREATE INDEX "Product_taxId_idx" ON "public"."Product"("taxId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_productId_variantOptionId_variantOptionValue_key" ON "public"."ProductVariant"("productId", "variantOptionId", "variantOptionValueId");

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "public"."Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_salesUnitId_fkey" FOREIGN KEY ("salesUnitId") REFERENCES "public"."Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_taxId_fkey" FOREIGN KEY ("taxId") REFERENCES "public"."Tax"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductVariant" ADD CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductVariant" ADD CONSTRAINT "ProductVariant_variantOptionId_fkey" FOREIGN KEY ("variantOptionId") REFERENCES "public"."ProductVariantOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductVariant" ADD CONSTRAINT "ProductVariant_variantOptionValueId_fkey" FOREIGN KEY ("variantOptionValueId") REFERENCES "public"."ProductVariantOptionValue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GroupProduct" ADD CONSTRAINT "GroupProduct_groupProductId_fkey" FOREIGN KEY ("groupProductId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GroupProduct" ADD CONSTRAINT "GroupProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GroupProduct" ADD CONSTRAINT "GroupProduct_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "public"."ProductVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Purchase" ADD CONSTRAINT "Purchase_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BinInventory" ADD CONSTRAINT "BinInventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BinInventory" ADD CONSTRAINT "BinInventory_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "public"."ProductVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "public"."ProductVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StockTransfer" ADD CONSTRAINT "StockTransfer_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StockTransfer" ADD CONSTRAINT "StockTransfer_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "public"."ProductVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ProductCoupons" ADD CONSTRAINT "_ProductCoupons_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
