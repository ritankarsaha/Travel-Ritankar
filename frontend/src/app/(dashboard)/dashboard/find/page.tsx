import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/header"
import { PostCreateButton } from "@/components/post-create-button"
import { DashboardShell } from "@/components/shell"

import { DestinationForm } from "./destination-form"

export const metadata = {
  title: "Find Locations",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Travel Form" text="Enter travel details here">
        <PostCreateButton />
      </DashboardHeader>
      <div className="size-full min-h-[50vh] flex-1">
        <DestinationForm />
      </div>
    </DashboardShell>
  )
}
