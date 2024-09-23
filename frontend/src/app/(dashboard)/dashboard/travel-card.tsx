"use client"

import Link from "next/link"
import { TravelPreference } from "@prisma/client"

import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function TravelCard({ data }: { data: TravelPreference }) {
  return (
    <Card className="w-full max-w-xl overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:scale-105">
      <div className="h-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
      <CardHeader className="bg-white p-6 py-2 dark:bg-gray-800">
        <h2 className="text-2xl font-bold capitalize text-gray-800 dark:text-white">
          {data.specialPreference}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {data.tourType}
        </p>
      </CardHeader>
      <CardContent className="bg-gray-50 p-6 dark:bg-gray-700">
        <p className="text-gray-700 dark:text-gray-300">
          Budget: {data.minBudget} - {data.maxBudget}₹
        </p>
      </CardContent>
      <CardFooter className="bg-white p-6 dark:bg-gray-800">
        <Link
          href={"/dashboard/map"}
          className={buttonVariants({
            className:
              "w-full rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 px-4 py-2 font-bold text-white transition-opacity duration-300 hover:opacity-90",
          })}
        >
          Details
        </Link>
      </CardFooter>
    </Card>
  )
}
