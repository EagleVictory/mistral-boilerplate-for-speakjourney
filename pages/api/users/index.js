import { prisma } from "../../../config/prisma";

export default async function POST(req, res) {
  try {
    const body = await req.body;

    const result = await prisma.users.findUnique({
      where: {
        email: body.email,
      },
    });

    if (result) {
      // Email is already in use
      res.status(500).json({
        message: "Entered Email Already in use!!",
      }); // Bad Request status
    }

    await prisma.users.create({
      data: {
        email: body?.email,
        name: body?.name,
        password: body?.password,
      },
    });

    res.json({ message: "Account Successfully Created" });
  } catch (error) {
    res.json({ message: error.message });
  }
}
