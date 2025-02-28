import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    // Find the asset
    const asset = await prisma.asset.findUnique({
      where: { id },
    })

    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 })
    }

    // If it's a premium asset, check if the user has purchased it
    if (asset.isPremium) {
      // In a real app, you would check if the user has purchased the asset
      // For this example, we'll just return an error
      return NextResponse.json({ error: "This is a premium asset" }, { status: 403 })
    }

    // Increment download count
    await prisma.asset.update({
      where: { id },
      data: { downloads: { increment: 1 } },
    })

    // In a real app, you would generate a download URL or stream the file
    // For this example, we'll just return the file URL
    return NextResponse.json({ downloadUrl: asset.fileUrl })
  } catch (error) {
    return NextResponse.json({ error: "Failed to process download" }, { status: 500 })
  }
}

