"use client"

import { useState } from "react"
import { Edit, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

// Mock data for assets
const mockAssets = [
  {
    id: "asset-1",
    title: "Basic UI Kit",
    category: "UI/UX",
    isPremium: false,
    downloads: 1245,
    dateAdded: "2023-10-15",
  },
  {
    id: "asset-2",
    title: "Icon Pack",
    category: "Graphics",
    isPremium: false,
    downloads: 982,
    dateAdded: "2023-10-20",
  },
  {
    id: "asset-3",
    title: "Pro UI Kit Bundle",
    category: "UI/UX",
    isPremium: true,
    price: 49.99,
    sales: 87,
    revenue: 4349.13,
    dateAdded: "2023-11-05",
  },
  {
    id: "asset-4",
    title: "3D Icon Collection",
    category: "3D",
    isPremium: true,
    price: 29.99,
    sales: 124,
    revenue: 3718.76,
    dateAdded: "2023-11-12",
  },
  {
    id: "asset-5",
    title: "Background Textures",
    category: "Textures",
    isPremium: false,
    downloads: 756,
    dateAdded: "2023-11-18",
  },
]

export function AssetManagement() {
  const [assets, setAssets] = useState(mockAssets)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [assetToDelete, setAssetToDelete] = useState<string | null>(null)

  const filteredAssets = assets.filter(
    (asset) =>
      asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteClick = (assetId: string) => {
    setAssetToDelete(assetId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (assetToDelete) {
      setAssets(assets.filter((asset) => asset.id !== assetToDelete))
      toast({
        title: "Asset deleted",
        description: "The asset has been successfully deleted",
      })
      setDeleteDialogOpen(false)
      setAssetToDelete(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search assets..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Stats</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No assets found
                </TableCell>
              </TableRow>
            ) : (
              filteredAssets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell className="font-medium">{asset.title}</TableCell>
                  <TableCell>{asset.category}</TableCell>
                  <TableCell>
                    {asset.isPremium ? <Badge variant="secondary">Premium</Badge> : <Badge>Free</Badge>}
                  </TableCell>
                  <TableCell className="text-right">
                    {asset.isPremium ? (
                      <div>
                        <div>${asset.price.toFixed(2)}</div>
                        <div className="text-xs text-muted-foreground">{asset.sales} sales</div>
                      </div>
                    ) : (
                      <div>
                        <div>{asset.downloads} downloads</div>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{asset.dateAdded}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(asset.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this asset? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

