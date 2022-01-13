import APIGuard from "helper";

import { prisma } from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Response, User } from "types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
): Promise<any> {
  if (req.method === "GET") {
    await APIGuard(req, res);
    const users = await prisma.user.findMany();

    res.status(200).json({ message: "ok", data: users });
  }
}
