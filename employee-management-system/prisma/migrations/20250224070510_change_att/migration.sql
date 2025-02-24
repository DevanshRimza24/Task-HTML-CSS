/*
  Warnings:

  - Changed the type of `checkInTime` on the `Attendance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `checkOutTime` on the `Attendance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "checkInTime",
ADD COLUMN     "checkInTime" TIMESTAMP(3) NOT NULL,
DROP COLUMN "checkOutTime",
ADD COLUMN     "checkOutTime" TIMESTAMP(3) NOT NULL;
