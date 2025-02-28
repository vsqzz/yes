"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

// Mock data for featured assets
const mockFreeAssets = [
  {
    id: "free-1",
    title: "Basic UI Kit",
    description: "Essential UI components for web design",
    imageUrl: "/placeholder.svg?height=200&width=300",
    category: "UI/UX",
    downloads: 1245,
  },
  {
    id: "free-2",
    title: "Icon Pack",
    description: "50+ minimalist icons for your projects",
    imageUrl: "/placeholder.svg?height=200&width=300",
    category: "Graphics",
    downloads: 982,
  },
  {
    id: "free-3",
    title: "Background Textures",
    description: "Subtle patterns for website backgrounds",
    imageUrl: "/placeholder.svg?height=200&width=300",
    category: "Textures",
    downloads: 756,
  },
]

const mockPremiumAssets = [
  {
    id: "premium-1",
    title: "Pro UI Kit Bundle",
    description: "Complete UI kit with 300+ components",
    imageUrl: "/placeholder.svg?height=200&width=300",
    category: "UI/UX",
    price: 49.99,
    sellixId: "product_id_1",
  },
  {
    id: "premium-2",
    title: "3D Icon Collection",
    description: "100+ premium 3D icons with source files",
    imageUrl: "/placeholder.svg?height=200&width=300",
    category: "3D",
    price: 29.99,
    sellixId: "product_id_2",
  },
  {
    id: "premium-3",
    title: "Motion Graphics Pack",
    description: "Animated elements for video projects",
    imageUrl: "/placeholder.svg?height=200&width=300",
    category: "Animation",
    price: 39.99,
    sellixId: "product_id_3",
  },
]

export function FeaturedAssets() {
  const [activeTab, setActiveTab] = useState("free")

  return (
    <section className="py-16 container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Featured Assets</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our handpicked selection of high-quality assets for your creative projects
        </p>
      </div>

      <Tabs defaultValue="free" className="max-w-5xl mx-auto" onValueChange={setActiveTab}>
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-cols-2 w-[400px]">
            <TabsTrigger value="free">Free Assets</TabsTrigger>
            <TabsTrigger value="premium">Premium Assets</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="free" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockFreeAssets.map((asset, index) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <img
                      src={asset.imageUrl || "/placeholder.svg"}
                      alt={asset.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <Badge className="absolute top-3 right-3">{asset.category}</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle>{asset.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{asset.description}</p>
                    <p className="text-sm mt-2 text-muted-foreground">{asset.downloads} downloads</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={`/free-assets/${asset.id}`}>
                        <Download className="mr-2 h-4 w-4" /> Download
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/free-assets">View All Free Assets</Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="premium" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPremiumAssets.map((asset, index) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <img
                      src={asset.imageUrl || "/placeholder.svg"}
                      alt={asset.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <Badge variant="secondary" className="absolute top-3 right-3">
                      {asset.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle>{asset.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{asset.description}</p>
                    <p className="text-lg font-bold mt-2">${asset.price.toFixed(2)}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={`/premium/${asset.id}`}>
                        <ShoppingCart className="mr-2 h-4 w-4" /> Buy Now
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/premium">View All Premium Assets</Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}

