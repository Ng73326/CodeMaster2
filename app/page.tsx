"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Trophy, Users, Target, Zap, Award } from "lucide-react"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"

// Import ThemeToggle with SSR disabled
const ThemeToggle = dynamic(() => import("@/components/theme-toggle").then((mod) => mod.ThemeToggle), {
  ssr: false,
  loading: () => <div className="w-10 h-10" />,
})

export default function Home() {
  // Use client-side only rendering
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="flex flex-col min-h-screen">
      <motion.header
        className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <motion.div 
              initial={{ rotate: -10 }} 
              animate={{ rotate: 0 }} 
              transition={{ duration: 0.5 }}
              whileHover={{ rotate: 10, scale: 1.1 }}
            >
              <Code className="h-6 w-6 text-primary" />
            </motion.div>
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              CodeMasters
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {["Contests", "Practice", "Leaderboard"].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * i }}
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="text-sm font-medium hover:text-primary transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Link href="/login">
                <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                  Login
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                  Sign Up
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
              <motion.div
                className="flex flex-col justify-center space-y-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-muted"
                  >
                    🚀 Welcome to the future of coding competitions
                  </motion.div>
                  <motion.h1
                    className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Master Coding Through
                    <span className="block bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                      Epic Competitions
                    </span>
                  </motion.h1>
                  <motion.p
                    className="max-w-[600px] text-muted-foreground md:text-xl leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    Join our thriving community of developers. Compete in live contests, solve challenging problems, 
                    and level up your programming skills with real-time feedback and rankings.
                  </motion.p>
                </div>
                <motion.div
                  className="flex flex-col gap-3 min-[400px]:flex-row"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Link href="/signup">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                        Start Competing <ArrowRight className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </Link>
                  <Link href="/contests">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="lg" variant="outline" className="gap-2">
                        <Trophy className="h-4 w-4" />
                        View Contests
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.div
                  className="relative"
                  initial={{ scale: 0.9, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <div className="w-96 h-96 bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-3xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-600/10 animate-pulse"></div>
                    <Code className="h-32 w-32 text-primary/60" />
                    <div className="absolute top-4 right-4 w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                      <Trophy className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="absolute bottom-4 left-4 w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Target className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Why Choose CodeMasters?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to excel in competitive programming and advance your coding career.
                </p>
              </div>
            </motion.div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  icon: <Trophy className="h-8 w-8 text-yellow-600" />,
                  title: "Live Competitions",
                  description: "Participate in real-time coding contests with instant feedback and live leaderboards.",
                  color: "from-yellow-500/10 to-orange-500/10"
                },
                {
                  icon: <Target className="h-8 w-8 text-blue-600" />,
                  title: "Skill Assessment",
                  description: "Track your progress with detailed analytics and personalized skill recommendations.",
                  color: "from-blue-500/10 to-cyan-500/10"
                },
                {
                  icon: <Users className="h-8 w-8 text-green-600" />,
                  title: "Global Community",
                  description: "Connect with thousands of developers worldwide and learn from the best.",
                  color: "from-green-500/10 to-emerald-500/10"
                },
                {
                  icon: <Zap className="h-8 w-8 text-purple-600" />,
                  title: "Instant Feedback",
                  description: "Get immediate results on your submissions with detailed test case analysis.",
                  color: "from-purple-500/10 to-pink-500/10"
                },
                {
                  icon: <Code className="h-8 w-8 text-indigo-600" />,
                  title: "Multiple Languages",
                  description: "Code in your preferred language - JavaScript, Python, C++, Java, and more.",
                  color: "from-indigo-500/10 to-blue-500/10"
                },
                {
                  icon: <Award className="h-8 w-8 text-red-600" />,
                  title: "Achievements",
                  description: "Earn badges and certificates as you complete challenges and win competitions.",
                  color: "from-red-500/10 to-pink-500/10"
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="group relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  <div className="relative flex flex-col items-center space-y-4 text-center p-6 rounded-xl border bg-background/50 backdrop-blur-sm">
                    <motion.div
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-muted"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {[
                { number: "10K+", label: "Active Coders" },
                { number: "500+", label: "Contests Hosted" },
                { number: "50K+", label: "Problems Solved" },
                { number: "95%", label: "Success Rate" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="space-y-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary/5 to-blue-600/5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Level Up Your Coding?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                  Join thousands of developers who are already sharpening their skills and advancing their careers with CodeMasters.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col gap-3 min-[400px]:flex-row"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link href="/signup">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                      Create Free Account
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/practice">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" variant="outline" className="gap-2">
                      <Code className="h-4 w-4" />
                      Start Practicing
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>

      <motion.footer
        className="border-t py-8 md:py-12 bg-muted/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="container flex flex-col items-center justify-center gap-6 px-4 md:px-6 md:flex-row md:justify-between">
          <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
            <Code className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              CodeMasters
            </span>
          </motion.div>
          <nav className="flex gap-6">
            {[
              { name: "About", href: "/about" },
              { name: "Terms", href: "/terms" },
              { name: "Privacy", href: "/privacy" },
              { name: "Contact", href: "/contact" }
            ].map((item, i) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link href={item.href} className="text-xs hover:text-primary transition-colors">
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="text-xs text-muted-foreground text-center md:text-right">
            © 2025 CodeMasters. All rights reserved.
          </div>
        </div>
      </motion.footer>
    </div>
  )
}