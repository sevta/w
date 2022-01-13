import { prisma } from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Response, User } from "types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
): Promise<any> {
  if (req.method === "GET") {
    const session = await getSession({ req });

    console.log("session from api", { session });

    if (session?.user) {
      const users = await prisma.user.findUnique({
        where: {
          email: session?.user?.email || "",
        },
        include: {
          template: true,
        },
      });
      console.log({ users });
      res.status(200).json({ message: "ok", data: users || [] });
    }
  }
}
