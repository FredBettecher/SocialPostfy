-- CreateTable
CREATE TABLE "publications" (
    "id" TEXT NOT NULL,
    "userId" VARCHAR(255),
    "image" VARCHAR(255) NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "text" TEXT NOT NULL,
    "dateToPublish" TIMESTAMPTZ(6) NOT NULL,
    "published" BOOLEAN DEFAULT false,
    "socialMedia" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "publications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(20) NOT NULL,
    "avatar" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "publications" ADD CONSTRAINT "publications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
