-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "title" TEXT,
ALTER COLUMN "years_of_experience" DROP NOT NULL;

-- CreateTable
CREATE TABLE "CompanyFollowers" (
    "companyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CompanyFollowers_pkey" PRIMARY KEY ("companyId","userId")
);
