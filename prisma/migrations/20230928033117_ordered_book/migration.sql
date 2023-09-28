/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `ordered_book` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ordered_book" DROP CONSTRAINT "ordered_book_bookId_fkey";

-- DropForeignKey
ALTER TABLE "ordered_book" DROP CONSTRAINT "ordered_book_orderId_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "updatedAt",
ADD COLUMN     "orderedBooks" JSONB[];

-- DropTable
DROP TABLE "ordered_book";
