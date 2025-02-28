import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { PrismaClient } from "@prisma/client"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const isPremium = searchParams.get("isPremium") === "true"

  try {
    const assets = await prisma.asset.findMany({
      where: {
        ...(category ? { category } : {}),
        isPremium,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(assets)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch assets" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const data = JSON.parse(formData.get("data") as string)

    // In a real app, you would upload the file to a storage service
    // and get back a URL to store in the database
    const fileUrl = "https://example.com/assets/file.zip" // Placeholder

    const asset = await prisma.asset.create({
      data: {
        title: data.title,
        description: data.description,
        fileUrl,
        imageUrl: data.imageUrl || null,
        category: data.category,
        isPremium: data.isPremium,
        price: data.isPremium ? data.price : null,
        sellixProductId: data.isPremium ? data.sellixProductId : null,
        userId: session.user.id,
      },
    })

    return NextResponse.json(asset)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create asset" }, { status: 500 })
  }
}

