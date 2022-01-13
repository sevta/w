import { Template } from "@prisma/client";
import { prisma } from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { Response } from "types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
): Promise<any> {
  if (req.method === "GET") {
    const templates = await prisma.template.findMany();

    res.status(200).json({ message: "ok", data: templates });
  }
  if (req.method === "POST") {
    const { name, price }: Template = req.body;
    const newTemplate = await prisma.template.create({
      data: {
        name,
        price: Number(price),
      },
    });

    res.status(200).json({ message: "ok", data: newTemplate });
  }
}
