import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function RecentContests() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>WC</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Weekly Challenge #5</p>
          <p className="text-sm text-muted-foreground">Feb 28, 2025</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge>Rank #3</Badge>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Algorithm Sprint #2</p>
          <p className="text-sm text-muted-foreground">Feb 15, 2025</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge>Rank #7</Badge>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>WC</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Weekly Challenge #4</p>
          <p className="text-sm text-muted-foreground">Feb 7, 2025</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge variant="outline">Rank #12</Badge>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>CM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Code Masters Cup</p>
          <p className="text-sm text-muted-foreground">Jan 25, 2025</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge variant="secondary">Semi-Finalist</Badge>
        </div>
      </div>
    </div>
  )
}

