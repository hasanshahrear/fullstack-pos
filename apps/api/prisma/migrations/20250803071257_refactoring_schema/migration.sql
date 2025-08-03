/*
  Warnings:

  - You are about to drop the column `brandStatus` on the `Brand` table. All the data in the column will be lost.
  - You are about to drop the column `categoryStatus` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `loyaltyPoints` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `productStatus` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `optionStatus` on the `ProductVariantOption` table. All the data in the column will be lost.
  - You are about to drop the column `optionValueStatus` on the `ProductVariantOptionValue` table. All the data in the column will be lost.
  - You are about to drop the column `unitStatus` on the `Unit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[optionName]` on the table `ProductVariantOption` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[optionValueName]` on the table `ProductVariantOptionValue` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[unitName]` on the table `Unit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[unitShortName]` on the table `Unit` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `status` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `paymentStatus` on the `Payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `StockTransfer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."EUserRole" AS ENUM ('admin', 'manager', 'cashier', 'viewer');

-- CreateEnum
CREATE TYPE "public"."EOrderStatus" AS ENUM ('pending', 'completed', 'cancelled', 'returned');

-- CreateEnum
CREATE TYPE "public"."EPaymentStatus" AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- CreateEnum
CREATE TYPE "public"."ETransferStatus" AS ENUM ('pending', 'completed', 'cancelled');

-- AlterTable
ALTER TABLE "public"."Bin" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT,
ALTER COLUMN "isActive" SET DEFAULT true;

-- AlterTable
ALTER TABLE "public"."Branch" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT,
ALTER COLUMN "isActive" SET DEFAULT true;

-- AlterTable
ALTER TABLE "public"."Brand" DROP COLUMN "brandStatus",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "public"."Category" DROP COLUMN "categoryStatus",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "public"."Coupon" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT,
ALTER COLUMN "isActive" SET DEFAULT true;

-- AlterTable
ALTER TABLE "public"."Customer" DROP COLUMN "loyaltyPoints",
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "updatedBy" TEXT,
ALTER COLUMN "isActive" SET DEFAULT true,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "updatedBy" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."EOrderStatus" NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Payment" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT,
DROP COLUMN "paymentStatus",
ADD COLUMN     "paymentStatus" "public"."EPaymentStatus" NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "productStatus",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "public"."ProductVariantOption" DROP COLUMN "optionStatus",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "public"."ProductVariantOptionAssignment" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "public"."ProductVariantOptionValue" DROP COLUMN "optionValueStatus",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "public"."Purchase" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "public"."Return" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT,
ALTER COLUMN "createdAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."StockTransfer" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "updatedBy" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."ETransferStatus" NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Supplier" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "updatedBy" TEXT,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Tax" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT,
ALTER COLUMN "isActive" SET DEFAULT true;

-- AlterTable
ALTER TABLE "public"."Unit" DROP COLUMN "unitStatus",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "updatedBy" TEXT,
DROP COLUMN "role",
ADD COLUMN     "role" "public"."EUserRole" NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Warehouse" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT,
ALTER COLUMN "isActive" SET DEFAULT true;

-- DropEnum
DROP TYPE "public"."OrderStatus";

-- DropEnum
DROP TYPE "public"."PaymentStatus";

-- DropEnum
DROP TYPE "public"."TransferStatus";

-- DropEnum
DROP TYPE "public"."UserRole";

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariantOption_optionName_key" ON "public"."ProductVariantOption"("optionName");

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariantOptionValue_optionValueName_key" ON "public"."ProductVariantOptionValue"("optionValueName");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_unitName_key" ON "public"."Unit"("unitName");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_unitShortName_key" ON "public"."Unit"("unitShortName");
