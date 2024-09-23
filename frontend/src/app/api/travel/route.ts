import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { RequiresProPlanError } from "@/lib/exceptions"
import { getUserSubscriptionPlan } from "@/lib/subscription"

const travelCreateSchema = z.object({
  maxBudget: z.number().default(0),
  minBudget: z.number().default(0),
  maxDistance: z.number().default(0),
  numberOfPersons: z.number().default(0),
  tourType: z.string().default(""),
  specialPreference: z.string().default(""),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session
    const plans = await db.travelPreference.findMany({
      where: {
        userId: user.id,
      },
    })

    return new Response(JSON.stringify(plans))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session
    const subscriptionPlan = await getUserSubscriptionPlan(user.id)

    // If user is on a free plan.
    // Check if user has reached limit of 3 posts.
    if (!subscriptionPlan?.isPro) {
      const count = await db.travelPreference.count({
        where: {
          userId: user.id,
        },
      })

      if (count >= 3) {
        throw new RequiresProPlanError()
      }
    }

    const json = await req.json()
    const body = travelCreateSchema.parse(json)
    console.log(body)

    const post = await db.travelPreference.create({
      data: {
        maxBudget: body.maxBudget,
        minBudget: body.minBudget,
        maxDistance: body.maxDistance,
        numberOfPersons: body.numberOfPersons,
        specialPreference: body.specialPreference,
        tourType: body.tourType,
        userId: user.id,
      },
      select: {
        id: true,
      },
    })

    return new Response(JSON.stringify(post))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof RequiresProPlanError) {
      return new Response("Requires Pro Plan", { status: 402 })
    }

    return new Response(null, { status: 500 })
  }
}
