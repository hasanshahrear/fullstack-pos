/*
  Warnings:

  - You are about to drop the column `groupProductId` on the `GroupProduct` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."GroupProduct" DROP CONSTRAINT "GroupProduct_groupProductId_fkey";

-- AlterTable
ALTER TABLE "public"."GroupProduct" DROP COLUMN "groupProductId";
