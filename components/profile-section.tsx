"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateUserProfile } from "@/lib/auth"
import type { AuthUser } from "@/lib/auth"
import { Loader2 } from "lucide-react"

interface ProfileSectionProps {
  user: AuthUser | null
  loading: boolean
  onSignOut: () => Promise<void>
}

export function ProfileSection({ user, loading, onSignOut }: ProfileSectionProps) {
  const router = useRouter()
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editLoading, setEditLoading] = useState(false)
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
  })
  const [message, setMessage] = useState("")

  const handleLogout = async () => {
    try {
      await onSignOut()
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
      setMessage("Error logging out. Please try again.")
    }
  }

  const handleEditProfile = () => {
    setEditForm({ name: user?.name || "" })
    setMessage("")
    setShowEditDialog(true)
  }

  const handleSaveProfile = async () => {
    if (!user) return

    setEditLoading(true)
    setMessage("")
    
    try {
      await updateUserProfile({ name: editForm.name })
      setShowEditDialog(false)
      setMessage("Profile updated successfully!")
      
      // Refresh the page to show updated data
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error) {
      console.error("Update profile error:", error)
      setMessage("Error updating profile. Please try again.")
    } finally {
      setEditLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="ml-2 text-sm">Loading...</span>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => router.push("/login")}>
          Login
        </Button>
        <Button onClick={() => router.push("/signup")}>
          Sign Up
        </Button>
      </div>
    )
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.image || ""} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleEditProfile}>
              Edit Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/profile")}>
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/settings")}>
              Settings
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-red-600">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={user.email}
                disabled
                className="col-span-3"
              />
            </div>
            {message && (
              <div className="col-span-4 text-sm text-center">
                <p className={message.includes("Error") ? "text-red-600" : "text-green-600"}>
                  {message}
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProfile} disabled={editLoading}>
              {editLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}