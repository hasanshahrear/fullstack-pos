/*
  Warnings:

  - You are about to drop the column `productQuantity` on the `GroupProduct` table. All the data in the column will be lost.
  - Added the required column `groupProductId` to the `GroupProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupProductQuantity` to the `GroupProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."GroupProduct" DROP COLUMN "productQuantity",
ADD COLUMN     "groupProductId" INTEGER NOT NULL,
ADD COLUMN     "groupProductQuantity" INTEGER NOT NULL,
ADD COLUMN     "groupProductVariantId" INTEGER;
