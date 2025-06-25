import Link from "next/link"
import { Code } from "lucide-react"
import { motion } from "framer-motion"

export function MainNav() {
  return (
    <div className="flex items-center gap-6 md:gap-10">
      <Link href="/" className="flex items-center gap-2 font-bold text-xl">
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Code className="h-6 w-6 text-primary" />
        </motion.div>
        <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          CodeMasters
        </span>
      </Link>
      <nav className="hidden md:flex gap-6">
        <Link href="/contests" className="text-sm font-medium hover:text-primary transition-colors relative group">
          Contests
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
        </Link>
        <Link href="/practice" className="text-sm font-medium hover:text-primary transition-colors relative group">
          Practice
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
        </Link>
        <Link href="/leaderboard" className="text-sm font-medium hover:text-primary transition-colors relative group">
          Leaderboard
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
        </Link>
      </nav>
    </div>
  )
}