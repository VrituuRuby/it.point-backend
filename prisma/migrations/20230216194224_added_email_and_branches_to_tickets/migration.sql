-- AlterTable
ALTER TABLE "tickets" ADD COLUMN     "branch_id" TEXT,
ADD COLUMN     "email" TEXT;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE SET NULL ON UPDATE CASCADE;
