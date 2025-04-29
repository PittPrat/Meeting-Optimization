import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import { FileUp, LayoutDashboard, PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Meeting Optimization AI System",
  description: "Analyze meeting effectiveness and get actionable recommendations",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <SidebarProvider>
            <div className="flex min-h-screen">
              <Sidebar>
                <SidebarHeader>
                  <div className="flex items-center gap-2 px-4 py-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                      <span className="text-lg font-bold text-primary-foreground">M</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">Meeting Optimizer</span>
                      <span className="text-xs text-muted-foreground">AI System</span>
                    </div>
                  </div>
                </SidebarHeader>
                <SidebarContent>
                  <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <Link href="/">
                              <LayoutDashboard />
                              <span>Dashboard</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <Link href="/analyze">
                              <PlusCircle />
                              <span>Analyze Meeting</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <Link href="/import">
                              <FileUp />
                              <span>Import Data</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                  <div className="p-4">
                    <Button className="w-full" asChild>
                      <Link href="/analyze">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Analysis
                      </Link>
                    </Button>
                  </div>
                </SidebarFooter>
              </Sidebar>
              <div className="flex-1">{children}</div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
