"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ShoppingCart, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

// Mock data for premium assets
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
  {
    id: "premium-4",
    title: "Website Template Bundle",
    description: "10 premium website templates with source code",
    imageUrl: "/placeholder.svg?height=200&width=300",
    category: "Templates",
    price: 59.99,
    sellixId: "product_id_4",
  },
  {
    id: "premium-5",
    title: "Sound Effects Library",
    description: "500+ high-quality sound effects",
    imageUrl: "/placeholder.svg?height=200&width=300",
    category: "Audio",
    price: 24.99,
    sellixId: "product_id_5",
  },
  {
    id: "premium-6",
    title: "Photoshop Actions Pack",
    description: "50 professional Photoshop actions",
    imageUrl: "/placeholder.svg?height=200&width=300",
    category: "Graphics",
    price: 19.99,
    sellixId: "product_id_6",
  },
]

export function PremiumAssetsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [priceFilter, setPriceFilter] = useState("all")

  const filteredAssets = mockPremiumAssets.filter((asset) => {
    const matchesSearch =
      asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || asset.category.toLowerCase() === categoryFilter.toLowerCase()

    let matchesPrice = true
    if (priceFilter === "under-20") {
      matchesPrice = asset.price < 20
    } else if (priceFilter === "20-50") {
      matchesPrice = asset.price >= 20 && asset.price <= 50
    } else if (priceFilter === "over-50") {
      matchesPrice = asset.price > 50
    }

    return matchesSearch && matchesCategory && matchesPrice
  })

  // Extract unique categories
  const categories = ["all", ...new Set(mockPremiumAssets.map((asset) => asset.category.toLowerCase()))]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search assets..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={priceFilter} onValueChange={setPriceFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="under-20">Under $20</SelectItem>
            <SelectItem value="20-50">$20 - $50</SelectItem>
            <SelectItem value="over-50">Over $50</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredAssets.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No assets found matching your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset, index) => (
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
      )}
    </div>
  )
}

