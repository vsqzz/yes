"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AssetUploadForm } from "@/components/asset-upload-form"
import { AssetManagement } from "@/components/asset-management"
import { MenuBar } from "@/components/menu-bar"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AdminPage() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState("upload")

  // Check if user is authenticated and is an admin
  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (status === "unauthenticated" || session?.user?.role !== "admin") {
    redirect("/login?callbackUrl=/admin")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">AssetVault Admin</h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <MenuBar />
        </div>
      </header>

      <main className="container mx-auto p-4 py-8">
        <Card className="max-w-5xl mx-auto">
          <CardHeader>
            <CardTitle>Admin Dashboard</CardTitle>
            <CardDescription>Manage your digital assets, track downloads, and handle payments</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upload" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upload">Upload Assets</TabsTrigger>
                <TabsTrigger value="manage">Manage Assets</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="mt-6">
                <AssetUploadForm />
              </TabsContent>

              <TabsContent value="manage" className="mt-6">
                <AssetManagement />
              </TabsContent>

              <TabsContent value="analytics" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3,427</div>
                      <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$1,245.89</div>
                      <p className="text-xs text-muted-foreground">+23% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">4.6%</div>
                      <p className="text-xs text-muted-foreground">+0.8% from last month</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">Analytics charts will appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

