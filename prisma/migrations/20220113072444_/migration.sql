/*
  Warnings:

  - Added the required column `userId` to the `Template` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bride` to the `Wedding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groom` to the `Wedding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Wedding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Wedding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Wedding` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Wedding" ADD COLUMN     "bride" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "groom" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wedding" ADD CONSTRAINT "Wedding_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
