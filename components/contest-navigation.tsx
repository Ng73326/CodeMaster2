import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface ContestNavigationProps {
  contestId: string
  backTo?: "contests" | "contest"
  backLabel?: string
}

export function ContestNavigation({
  contestId,
  backTo = "contests",
  backLabel = "Back to Contests",
}: ContestNavigationProps) {
  const backHref = backTo === "contest" ? `/contests/${contestId}` : "/contests"

  return (
    <div className="mb-6">
      <Link href={backHref}>
        <Button variant="ghost" size="sm" className="gap-1">
          <ArrowLeft className="h-4 w-4" /> {backLabel}
        </Button>
      </Link>
    </div>
  )
}

