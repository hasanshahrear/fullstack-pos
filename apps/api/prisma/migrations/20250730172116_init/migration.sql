-- CreateEnum
CREATE TYPE "public"."EDiscountType" AS ENUM ('flat', 'percentage');

-- CreateEnum
CREATE TYPE "public"."EProductType" AS ENUM ('single', 'group', 'variation');

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" SERIAL NOT NULL,
    "categoryName" TEXT NOT NULL,
    "categoryCode" TEXT NOT NULL,
    "parentCategoryId" INTEGER,
    "categoryImage" TEXT,
    "categoryColor" TEXT,
    "categorySort" INTEGER NOT NULL,
    "categoryStatus" BOOLEAN NOT NULL,
    "categoryId" INTEGER,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Brand" (
    "id" SERIAL NOT NULL,
    "brandName" TEXT NOT NULL,
    "brandCode" TEXT NOT NULL,
    "brandImage" TEXT,
    "brandStatus" BOOLEAN NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Unit" (
    "id" SERIAL NOT NULL,
    "unitName" TEXT NOT NULL,
    "unitShortName" TEXT NOT NULL,
    "unitStatus" BOOLEAN NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductVariantOption" (
    "id" SERIAL NOT NULL,
    "optionName" TEXT NOT NULL,
    "optionStatus" BOOLEAN NOT NULL,

    CONSTRAINT "ProductVariantOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductVariantOptionValue" (
    "id" SERIAL NOT NULL,
    "optionValueName" TEXT NOT NULL,
    "optionValueStatus" BOOLEAN NOT NULL,
    "variantOptionId" INTEGER NOT NULL,

    CONSTRAINT "ProductVariantOptionValue_pkey" PRIMARY KEY ("id")
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

    CONSTRAINT "ProductVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductVariantOptionAssignment" (
    "id" SERIAL NOT NULL,
    "productVariantId" INTEGER NOT NULL,
    "variantOptionId" INTEGER NOT NULL,
    "variantOptionValueId" INTEGER NOT NULL,

    CONSTRAINT "ProductVariantOptionAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" SERIAL NOT NULL,
    "productName" TEXT NOT NULL,
    "productSKU" TEXT NOT NULL,
    "minQuantity" INTEGER NOT NULL,
    "stockAlert" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "productStatus" BOOLEAN NOT NULL,
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

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GroupProduct" (
    "id" SERIAL NOT NULL,
    "groupProductId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "productQuantity" INTEGER NOT NULL,
    "productVariantId" INTEGER,

    CONSTRAINT "GroupProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Purchase" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "product_id" INTEGER NOT NULL,
    "warehouseId" INTEGER,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Sales" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" DOUBLE PRECISION NOT NULL,
    "total_price" DOUBLE PRECISION,
    "product_id" INTEGER NOT NULL,
    "taxId" INTEGER,
    "couponId" INTEGER,
    "warehouseId" INTEGER,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Tax" (
    "id" SERIAL NOT NULL,
    "taxName" TEXT NOT NULL,
    "taxCode" TEXT NOT NULL,
    "taxRate" DOUBLE PRECISION NOT NULL,
    "isActive" BOOLEAN NOT NULL,

    CONSTRAINT "Tax_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Coupon" (
    "id" SERIAL NOT NULL,
    "couponCode" TEXT NOT NULL,
    "discountType" "public"."EDiscountType" NOT NULL,
    "discountValue" DOUBLE PRECISION NOT NULL,
    "validFrom" TIMESTAMP(3),
    "validUntil" TIMESTAMP(3),
    "usageLimit" INTEGER,
    "usedCount" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Branch" (
    "id" SERIAL NOT NULL,
    "branchName" TEXT NOT NULL,
    "branchCode" TEXT NOT NULL,
    "address" TEXT,
    "isActive" BOOLEAN NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Warehouse" (
    "id" SERIAL NOT NULL,
    "warehouseName" TEXT NOT NULL,
    "warehouseCode" TEXT NOT NULL,
    "branchId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL,

    CONSTRAINT "Warehouse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Bin" (
    "id" SERIAL NOT NULL,
    "binCode" TEXT NOT NULL,
    "warehouseId" INTEGER NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL,

    CONSTRAINT "Bin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BinInventory" (
    "id" SERIAL NOT NULL,
    "warehouseId" INTEGER NOT NULL,
    "binId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "productVariantId" INTEGER,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "BinInventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_ProductCoupons" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ProductCoupons_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_categoryCode_key" ON "public"."Category"("categoryCode");

-- CreateIndex
CREATE INDEX "Category_categoryCode_idx" ON "public"."Category"("categoryCode");

-- CreateIndex
CREATE INDEX "Category_parentCategoryId_idx" ON "public"."Category"("parentCategoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_brandCode_key" ON "public"."Brand"("brandCode");

-- CreateIndex
CREATE INDEX "Brand_brandCode_idx" ON "public"."Brand"("brandCode");

-- CreateIndex
CREATE UNIQUE INDEX "Product_productSKU_key" ON "public"."Product"("productSKU");

-- CreateIndex
CREATE INDEX "Product_productSKU_idx" ON "public"."Product"("productSKU");

-- CreateIndex
CREATE INDEX "Product_categoryId_idx" ON "public"."Product"("categoryId");

-- CreateIndex
CREATE INDEX "Product_brandId_idx" ON "public"."Product"("brandId");

-- CreateIndex
CREATE INDEX "Product_salesUnitId_idx" ON "public"."Product"("salesUnitId");

-- CreateIndex
CREATE INDEX "Product_taxId_idx" ON "public"."Product"("taxId");

-- CreateIndex
CREATE INDEX "GroupProduct_groupProductId_idx" ON "public"."GroupProduct"("groupProductId");

-- CreateIndex
CREATE INDEX "Purchase_warehouseId_idx" ON "public"."Purchase"("warehouseId");

-- CreateIndex
CREATE INDEX "Sales_taxId_idx" ON "public"."Sales"("taxId");

-- CreateIndex
CREATE INDEX "Sales_couponId_idx" ON "public"."Sales"("couponId");

-- CreateIndex
CREATE INDEX "Sales_warehouseId_idx" ON "public"."Sales"("warehouseId");

-- CreateIndex
CREATE UNIQUE INDEX "Tax_taxCode_key" ON "public"."Tax"("taxCode");

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_couponCode_key" ON "public"."Coupon"("couponCode");

-- CreateIndex
CREATE UNIQUE INDEX "Branch_branchCode_key" ON "public"."Branch"("branchCode");

-- CreateIndex
CREATE INDEX "Branch_branchCode_idx" ON "public"."Branch"("branchCode");

-- CreateIndex
CREATE UNIQUE INDEX "Warehouse_warehouseCode_key" ON "public"."Warehouse"("warehouseCode");

-- CreateIndex
CREATE INDEX "Warehouse_warehouseCode_idx" ON "public"."Warehouse"("warehouseCode");

-- CreateIndex
CREATE INDEX "Warehouse_branchId_idx" ON "public"."Warehouse"("branchId");

-- CreateIndex
CREATE UNIQUE INDEX "Bin_binCode_key" ON "public"."Bin"("binCode");

-- CreateIndex
CREATE INDEX "Bin_binCode_idx" ON "public"."Bin"("binCode");

-- CreateIndex
CREATE INDEX "Bin_warehouseId_idx" ON "public"."Bin"("warehouseId");

-- CreateIndex
CREATE INDEX "BinInventory_warehouseId_idx" ON "public"."BinInventory"("warehouseId");

-- CreateIndex
CREATE INDEX "BinInventory_binId_idx" ON "public"."BinInventory"("binId");

-- CreateIndex
CREATE INDEX "BinInventory_productId_idx" ON "public"."BinInventory"("productId");

-- CreateIndex
CREATE INDEX "BinInventory_productVariantId_idx" ON "public"."BinInventory"("productVariantId");

-- CreateIndex
CREATE INDEX "_ProductCoupons_B_index" ON "public"."_ProductCoupons"("B");

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductVariantOptionValue" ADD CONSTRAINT "ProductVariantOptionValue_variantOptionId_fkey" FOREIGN KEY ("variantOptionId") REFERENCES "public"."ProductVariantOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductVariant" ADD CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductVariantOptionAssignment" ADD CONSTRAINT "ProductVariantOptionAssignment_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "public"."ProductVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductVariantOptionAssignment" ADD CONSTRAINT "ProductVariantOptionAssignment_variantOptionId_fkey" FOREIGN KEY ("variantOptionId") REFERENCES "public"."ProductVariantOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductVariantOptionAssignment" ADD CONSTRAINT "ProductVariantOptionAssignment_variantOptionValueId_fkey" FOREIGN KEY ("variantOptionValueId") REFERENCES "public"."ProductVariantOptionValue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "public"."Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_salesUnitId_fkey" FOREIGN KEY ("salesUnitId") REFERENCES "public"."Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_taxId_fkey" FOREIGN KEY ("taxId") REFERENCES "public"."Tax"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GroupProduct" ADD CONSTRAINT "GroupProduct_groupProductId_fkey" FOREIGN KEY ("groupProductId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GroupProduct" ADD CONSTRAINT "GroupProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GroupProduct" ADD CONSTRAINT "GroupProduct_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "public"."ProductVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Purchase" ADD CONSTRAINT "Purchase_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Purchase" ADD CONSTRAINT "Purchase_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "public"."Warehouse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sales" ADD CONSTRAINT "Sales_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sales" ADD CONSTRAINT "Sales_taxId_fkey" FOREIGN KEY ("taxId") REFERENCES "public"."Tax"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sales" ADD CONSTRAINT "Sales_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "public"."Coupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sales" ADD CONSTRAINT "Sales_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "public"."Warehouse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Warehouse" ADD CONSTRAINT "Warehouse_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "public"."Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Bin" ADD CONSTRAINT "Bin_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "public"."Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BinInventory" ADD CONSTRAINT "BinInventory_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "public"."Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BinInventory" ADD CONSTRAINT "BinInventory_binId_fkey" FOREIGN KEY ("binId") REFERENCES "public"."Bin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BinInventory" ADD CONSTRAINT "BinInventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BinInventory" ADD CONSTRAINT "BinInventory_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "public"."ProductVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ProductCoupons" ADD CONSTRAINT "_ProductCoupons_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Coupon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ProductCoupons" ADD CONSTRAINT "_ProductCoupons_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
