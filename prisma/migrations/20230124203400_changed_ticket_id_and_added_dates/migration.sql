/*
  Warnings:

  - The primary key for the `tickets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `tickets` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_pkey",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3),
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "tickets_pkey" PRIMARY KEY ("id");
