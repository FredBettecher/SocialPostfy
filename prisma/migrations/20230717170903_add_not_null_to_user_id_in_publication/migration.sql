/*
  Warnings:

  - Made the column `userId` on table `publications` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `dateToPublish` on the `publications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "publications" ALTER COLUMN "userId" SET NOT NULL,
DROP COLUMN "dateToPublish",
ADD COLUMN     "dateToPublish" VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "password" SET DATA TYPE VARCHAR(100);
