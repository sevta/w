import { prisma } from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { Response, User } from "types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
): Promise<any> {
  if (req.method === "POST") {
    const { name, email, password, templateId }: User = req.body;

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      const createUser = await prisma.user.create({
        data: {
          name,
          email,
          password,
          template: {
            connect: [{ id: templateId }],
          },
        },
      });
      console.log({ createUser });
      res.status(200).json({ message: "ok", data: createUser });
    } else {
      res.status(500).json({
        message: "email has been registered before",
        data: { name, email },
      });
    }
  }
}
