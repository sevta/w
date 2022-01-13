import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Response } from "types";

export default async function APIGuard(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const session: any = await getSession({ req });

  if (session?.user?.role !== "ADMIN")
    return res.status(401).json({ message: "unauthorized", data: [] });
}
