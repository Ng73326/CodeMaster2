"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 12,
  },
  {
    name: "Feb",
    total: 18,
  },
  {
    name: "Mar",
    total: 24,
  },
  {
    name: "Apr",
    total: 30,
  },
  {
    name: "May",
    total: 27,
  },
  {
    name: "Jun",
    total: 36,
  },
  {
    name: "Jul",
    total: 42,
  },
  {
    name: "Aug",
    total: 38,
  },
  {
    name: "Sep",
    total: 45,
  },
  {
    name: "Oct",
    total: 50,
  },
  {
    name: "Nov",
    total: 48,
  },
  {
    name: "Dec",
    total: 55,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}

