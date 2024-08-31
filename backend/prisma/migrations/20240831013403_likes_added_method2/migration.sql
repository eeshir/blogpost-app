/*
  Warnings:

  - You are about to drop the column `likedBy` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "likedBy",
DROP COLUMN "likes";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "likes";
