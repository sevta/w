-- DropForeignKey
ALTER TABLE "Template" DROP CONSTRAINT "Template_userId_fkey";

-- CreateTable
CREATE TABLE "_TemplateToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TemplateToUser_AB_unique" ON "_TemplateToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TemplateToUser_B_index" ON "_TemplateToUser"("B");

-- AddForeignKey
ALTER TABLE "_TemplateToUser" ADD FOREIGN KEY ("A") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TemplateToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
