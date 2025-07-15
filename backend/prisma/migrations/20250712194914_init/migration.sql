-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "gameboardId" INTEGER NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gameboard" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "source" TEXT NOT NULL,

    CONSTRAINT "Gameboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Objective" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "topLeftX" DOUBLE PRECISION NOT NULL,
    "topLeftY" DOUBLE PRECISION NOT NULL,
    "BottomRightX" DOUBLE PRECISION NOT NULL,
    "BottomRightY" DOUBLE PRECISION NOT NULL,
    "gameboardId" INTEGER NOT NULL,

    CONSTRAINT "Objective_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_gameboardId_fkey" FOREIGN KEY ("gameboardId") REFERENCES "Gameboard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Objective" ADD CONSTRAINT "Objective_gameboardId_fkey" FOREIGN KEY ("gameboardId") REFERENCES "Gameboard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
