import Link from "next/link"
import { ChevronRight } from "lucide-react"

import {
  entrepreneurship,
  live,
  previous,
  research,
  technology,
  upcoming,
} from "./data"

export default async function Programs() {
  return (
    <>
      <section className="w-full bg-primary/90 p-12" id="live">
        <h3 className="mb-12 mt-24 text-center font-heading text-xl text-primary-foreground sm:text-2xl md:text-3xl lg:text-4xl">
          Live Programs
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-24">
          {live.map((i) => (
            <div className="relative h-[370px] w-[450px] overflow-hidden rounded-3xl border bg-primary/70 pt-12 text-primary-foreground shadow-xl">
              <h3 className="mb-8 px-12 text-2xl">{i.title}</h3>
              <p className="px-12">4 week internship program</p>
              <p className="mb-2 px-12">⭐⭐⭐⭐⭐</p>
              <div className="mb-6 flex items-center gap-4 px-12">
                <span className="size-12 rounded-full bg-green-700" />
                {i.status === "closed" && (
                  <p className="text-xl">Registration Closed</p>
                )}
                {i.status === "open" && (
                  <p className="text-xl">Program is Live</p>
                )}
              </div>
              <p className="px-12 text-xs">{i.desc}</p>
              <Link
                href={"/"}
                className="absolute bottom-0 flex w-full items-center justify-center gap-6 border-t bg-secondary/30 p-3 text-center text-2xl"
              >
                View Course
                <ChevronRight />
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section className="w-full bg-primary/90 p-12" id="technology">
        <h3 className="mb-12 mt-24 text-center font-heading text-xl text-primary-foreground sm:text-2xl md:text-3xl lg:text-4xl">
          Technology Programs
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-24">
          {technology.map((i) => (
            <div className="relative h-[370px] w-[450px] overflow-hidden rounded-3xl border bg-primary/70 pt-12 text-primary-foreground shadow-xl">
              <h3 className="mb-8 px-12 text-2xl">{i.title}</h3>
              <p className="px-12">4 week internship program</p>
              <p className="mb-2 px-12">⭐⭐⭐⭐⭐</p>
              <div className="mb-6 flex items-center gap-4 px-12">
                <span className="size-12 rounded-full bg-green-700" />
                {i.status === "closed" && (
                  <p className="text-xl">Registration Closed</p>
                )}
                {i.status === "open" && (
                  <p className="text-xl">Program is Live</p>
                )}
              </div>
              <p className="px-12 text-xs">{i.desc}</p>
              <Link
                href={"/"}
                className="absolute bottom-0 flex w-full items-center justify-center gap-6 border-t bg-secondary/30 p-3 text-center text-2xl"
              >
                View Course
                <ChevronRight />
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section className="w-full bg-primary/90 p-12" id="entrepreneurship">
        <h3 className="mb-12 mt-24 text-center font-heading text-xl text-primary-foreground sm:text-2xl md:text-3xl lg:text-4xl">
          Entrepreneurship Programs
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-24">
          {entrepreneurship.map((i) => (
            <div className="relative h-[370px] w-[450px] overflow-hidden rounded-3xl border bg-primary/70 pt-12 text-primary-foreground shadow-xl">
              <h3 className="mb-8 px-12 text-2xl">{i.title}</h3>
              <p className="px-12">4 week internship program</p>
              <p className="mb-2 px-12">⭐⭐⭐⭐⭐</p>
              <div className="mb-6 flex items-center gap-4 px-12">
                <span className="size-12 rounded-full bg-green-700" />
                {i.status === "closed" && (
                  <p className="text-xl">Registration Closed</p>
                )}
                {i.status === "open" && (
                  <p className="text-xl">Program is Live</p>
                )}
              </div>
              <p className="px-12 text-xs">{i.desc}</p>
              <Link
                href={"/"}
                className="absolute bottom-0 flex w-full items-center justify-center gap-6 border-t bg-secondary/30 p-3 text-center text-2xl"
              >
                View Course
                <ChevronRight />
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section className="w-full bg-primary/90 p-12" id="research">
        <h3 className="mb-12 mt-24 text-center font-heading text-xl text-primary-foreground sm:text-2xl md:text-3xl lg:text-4xl">
          Research Programs
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-24">
          {research.map((i) => (
            <div className="relative h-[370px] w-[450px] overflow-hidden rounded-3xl border bg-primary/70 pt-12 text-primary-foreground shadow-xl">
              <h3 className="mb-8 px-12 text-2xl">{i.title}</h3>
              <p className="px-12">4 week internship program</p>
              <p className="mb-2 px-12">⭐⭐⭐⭐⭐</p>
              <div className="mb-6 flex items-center gap-4 px-12">
                <span className="size-12 rounded-full bg-green-700" />
                {i.status === "closed" && (
                  <p className="text-xl">Registration Closed</p>
                )}
                {i.status === "open" && (
                  <p className="text-xl">Program is Live</p>
                )}
              </div>
              <p className="px-12 text-xs">{i.desc}</p>
              <Link
                href={"/"}
                className="absolute bottom-0 flex w-full items-center justify-center gap-6 border-t bg-secondary/30 p-3 text-center text-2xl"
              >
                View Course
                <ChevronRight />
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section className="w-full bg-primary/90 p-12" id="upcoming">
        <h3 className="mb-12 mt-24 text-center font-heading text-xl text-primary-foreground sm:text-2xl md:text-3xl lg:text-4xl">
          Upcoming Programs
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-24">
          {upcoming.map((i) => (
            <div className="relative h-[370px] w-[450px] overflow-hidden rounded-3xl border bg-primary/70 pt-12 text-primary-foreground shadow-xl">
              <h3 className="mb-8 px-12 text-2xl">{i.title}</h3>
              <p className="px-12">4 week internship program</p>
              <p className="mb-2 px-12">⭐⭐⭐⭐⭐</p>
              <div className="mb-6 flex items-center gap-4 px-12">
                <span className="size-12 rounded-full bg-green-700" />
                {i.status === "closed" && (
                  <p className="text-xl">Registration Closed</p>
                )}
                {i.status === "open" && (
                  <p className="text-xl">Program is Live</p>
                )}
              </div>
              <p className="px-12 text-xs">{i.desc}</p>
              <Link
                href={"/"}
                className="absolute bottom-0 flex w-full items-center justify-center gap-6 border-t bg-secondary/30 p-3 text-center text-2xl"
              >
                View Course
                <ChevronRight />
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section className="w-full bg-primary/90 p-12" id="previous">
        <h3 className="mb-12 mt-24 text-center font-heading text-xl text-primary-foreground sm:text-2xl md:text-3xl lg:text-4xl">
          Previous Programs
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-24">
          {previous.map((i) => (
            <div className="relative h-[370px] w-[450px] overflow-hidden rounded-3xl border bg-primary/70 pt-12 text-primary-foreground shadow-xl">
              <h3 className="mb-8 px-12 text-2xl">{i.title}</h3>
              <p className="px-12">4 week internship program</p>
              <p className="mb-2 px-12">⭐⭐⭐⭐⭐</p>
              <div className="mb-6 flex items-center gap-4 px-12">
                <span className="size-12 rounded-full bg-green-700" />
                {i.status === "closed" && (
                  <p className="text-xl">Registration Closed</p>
                )}
                {i.status === "open" && (
                  <p className="text-xl">Program is Live</p>
                )}
              </div>
              <p className="px-12 text-xs">{i.desc}</p>
              <Link
                href={"/"}
                className="absolute bottom-0 flex w-full items-center justify-center gap-6 border-t bg-secondary/30 p-3 text-center text-2xl"
              >
                View Course
                <ChevronRight />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
