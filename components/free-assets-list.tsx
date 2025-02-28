"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

// Mock data for free assets
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
  {
    id: "free-4",
    title: "Font Collection",
    description: "10 free fonts for modern web design",
    imageUrl: "/placeholder.svg?height=200&width=300",
    category: "Typography",
    downloads: 623,
  },
  {
    id: "free-5",
    title: "CSS Animations",
    description: "Ready-to-use CSS animation snippets",
    imageUrl: "/placeholder.svg?height=200&width=300",
    category: "Code",
    downloads: 489,
  },
  {
    id: "free-6",
    title: "Social Media Icons",
    description: "Complete set of social media icons",
    imageUrl: "/placeholder.svg?height=200&width=300",
    category: "Graphics",
    downloads: 1102,
  },
]

export function FreeAssetsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredAssets = mockFreeAssets.filter((asset) => {
    const matchesSearch =
      asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || asset.category.toLowerCase() === categoryFilter.toLowerCase()

    return matchesSearch && matchesCategory
  })

  // Extract unique categories
  const categories = ["all", ...new Set(mockFreeAssets.map((asset) => asset.category.toLowerCase()))]

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
      )}
    </div>
  )
}

