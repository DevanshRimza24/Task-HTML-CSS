-- DropForeignKey
ALTER TABLE "Training" DROP CONSTRAINT "Training_employeeId_fkey";

-- CreateTable
CREATE TABLE "_EmployeeToTraining" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EmployeeToTraining_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_EmployeeToTraining_B_index" ON "_EmployeeToTraining"("B");

-- AddForeignKey
ALTER TABLE "_EmployeeToTraining" ADD CONSTRAINT "_EmployeeToTraining_A_fkey" FOREIGN KEY ("A") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmployeeToTraining" ADD CONSTRAINT "_EmployeeToTraining_B_fkey" FOREIGN KEY ("B") REFERENCES "Training"("id") ON DELETE CASCADE ON UPDATE CASCADE;
