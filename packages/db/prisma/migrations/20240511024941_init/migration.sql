-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "lg_account" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "refresh_token_expires_in" INTEGER,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "lg_account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lg_session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lg_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lg_user" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileImage" TEXT,
    "url" TEXT,

    CONSTRAINT "lg_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lg_verification_token" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "lg_link" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "name" TEXT,
    "description" TEXT,
    "image" TEXT,
    "color" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lg_link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "lg_account_userId_idx" ON "lg_account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "lg_account_provider_providerAccountId_key" ON "lg_account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "lg_session_sessionToken_key" ON "lg_session"("sessionToken");

-- CreateIndex
CREATE INDEX "lg_session_userId_idx" ON "lg_session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "lg_user_email_key" ON "lg_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "lg_user_url_key" ON "lg_user"("url");

-- CreateIndex
CREATE UNIQUE INDEX "lg_verification_token_token_key" ON "lg_verification_token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "lg_verification_token_identifier_token_key" ON "lg_verification_token"("identifier", "token");

-- CreateIndex
CREATE INDEX "lg_link_userId_idx" ON "lg_link"("userId");

-- AddForeignKey
ALTER TABLE "lg_account" ADD CONSTRAINT "lg_account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "lg_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lg_session" ADD CONSTRAINT "lg_session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "lg_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lg_link" ADD CONSTRAINT "lg_link_userId_fkey" FOREIGN KEY ("userId") REFERENCES "lg_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
