/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Category" DROP CONSTRAINT "Category_categoryId_fkey";

-- AlterTable
ALTER TABLE "public"."Category" DROP COLUMN "categoryId";

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
