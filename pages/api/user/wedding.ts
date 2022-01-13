import { Wedding } from "@prisma/client";
import APIGuard from "helper";
import { prisma } from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Response } from "types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
): Promise<any> {
  await APIGuard(req, res);
  const session: any = await getSession({ req });

  if (req.method === "GET") {
    const wedding: any = await prisma.wedding.findFirst({
      where: {
        userId: session?.user?.id,
      },
    });

    console.log({ wedding });

    res.status(200).json({ message: "ok" });
  }

  if (req.method === "POST") {
    const { weddingDate, groom, bride }: Wedding = req.body;

    console.log({
      weddingDate,
      groom,
      bride,
    });

    res.status(200).json({ message: "ok" });
  }
}
