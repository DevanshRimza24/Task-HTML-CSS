-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
