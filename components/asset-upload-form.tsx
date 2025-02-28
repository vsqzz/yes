"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  isPremium: z.boolean().default(false),
  price: z.number().min(0).optional(),
  sellixProductId: z.string().optional(),
})

export function AssetUploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      isPremium: false,
      price: undefined,
      sellixProductId: "",
    },
  })

  const isPremium = form.watch("isPremium")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)

      // Create preview for images
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setPreview(e.target?.result as string)
        }
        reader.readAsDataURL(selecte  => {
          setPreview(e.target?.result as string)
        }\
        reader.readAsDataURL(selectedFile)
      }
    }
  }

  const clearFile = () => {
    setFile(null)
    setPreview(null)
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please upload a file",
        variant: "destructive",
      })
      return
    }

    setUploading(true)

    try {
      // Create FormData to send file and form values
      const formData = new FormData()
      formData.append("file", file)
      formData.append("data", JSON.stringify(values))

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Success",
        description: "Asset uploaded successfully",
      })

      // Reset form
      form.reset()
      clearFile()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload asset",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter asset title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter asset description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ui-ux">UI/UX</SelectItem>
                        <SelectItem value="graphics">Graphics</SelectItem>
                        <SelectItem value="3d">3D Models</SelectItem>
                        <SelectItem value="audio">Audio</SelectItem>
                        <SelectItem value="templates">Templates</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isPremium"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Premium Asset</FormLabel>
                      <FormDescription>Mark this asset as premium to sell it through Sellix</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {isPremium && (
                <>
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="Enter price"
                            {...field}
                            onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sellixProductId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sellix Product ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Sellix product ID" {...field} />
                        </FormControl>
                        <FormDescription>Create a product in Sellix first and enter its ID here</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>

            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <FormLabel className="block mb-2">Upload File</FormLabel>
                <div className="flex flex-col items-center justify-center gap-4">
                  {!file ? (
                    <div className="border-2 border-dashed rounded-lg p-8 w-full flex flex-col items-center justify-center">
                      <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Drag and drop or click to upload</p>
                      <Input type="file" className="hidden" id="file-upload" onChange={handleFileChange} />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("file-upload")?.click()}
                      >
                        Select File
                      </Button>
                    </div>
                  ) : (
                    <div className="w-full">
                      {preview ? (
                        <div className="relative">
                          <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-auto rounded-lg" />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={clearFile}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center">
                            <div className="ml-2">
                              <p className="text-sm font-medium">{file.name}</p>
                              <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                          </div>
                          <Button type="button" variant="ghost" size="icon" onClick={clearFile}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <FormLabel className="block mb-2">Preview Image (Optional)</FormLabel>
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="border-2 border-dashed rounded-lg p-8 w-full flex flex-col items-center justify-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Upload a preview image</p>
                    <Button type="button" variant="outline">
                      Select Image
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={uploading}>
            {uploading ? "Uploading..." : "Upload Asset"}
          </Button>
        </form>
      </Form>
    </div>
  )
}

