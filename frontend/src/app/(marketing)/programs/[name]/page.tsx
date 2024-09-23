import Image from "next/image"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { ChevronRight } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"

import { programData } from "./data"

interface EditorPageProps {
  params: { name: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const program = programData.find((i) => i.path === params.name)

  if (!program) {
    notFound()
  }

  return (
    <>
      <section className="flex h-[80vh] items-center justify-center bg-primary p-8 pb-16 text-primary-foreground">
        <div className="h-full flex-1 space-y-4 p-8 py-24">
          <h1 className="max-w-lg font-heading text-4xl font-extrabold">
            {program.name}
          </h1>
          <p className="pb-16 text-xl font-extrabold">{program.duration}</p>
          <div className="flex gap-16 text-xl">
            <div className="space-y-6">
              <p className="font-bold">Cohort starts</p>
              <p>{program.start}</p>
            </div>
            <div className="space-y-6">
              <p className="font-bold">Application deadline</p>
              <p>{program.deadline}</p>
            </div>
          </div>
          <div className="flex gap-8 pt-12">
            <Link
              href={"/"}
              className={buttonVariants({
                className:
                  "bg-purple-700 rounded-[100px] p-12 px-20 text-white hover:bg-purple-600",
              })}
            >
              Apply Now
            </Link>
            <Link
              href={"/"}
              className={buttonVariants({
                className:
                  "border-2 border-purple-700 rounded-[100px] p-12 px-16 text-primary",
              })}
            >
              Download Curriculum
            </Link>
          </div>
        </div>
        <div className="relative h-full flex-1">
          <Image
            src={"/images/hero.png"}
            alt={program.name}
            fill
            className="object-cover"
          />
        </div>
      </section>
      <section className="w-full bg-primary p-12 text-primary-foreground">
        <h2 className="pb-12 text-center text-3xl font-extrabold">
          Program highlighs
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-12">
          {program.highlights.map((i) => (
            <div className="h-72 w-56 bg-secondary/10 p-4">
              <Image
                src={"/images/avatars/shadcn.png"}
                height={60}
                width={60}
                alt=""
              />
              <p className="pt-8 text-center">{i}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col pt-12">
          <Link
            href={"/"}
            className={buttonVariants({
              className:
                "bg-purple-700 rounded-[100px] p-12 px-20 text-white mx-auto hover:bg-purple-600",
            })}
          >
            Apply Now
          </Link>
          <p className="pt-6 text-center text-lg">
            Trusted by 500+ learners Rated 4.5
          </p>
        </div>
      </section>
      <section className="w-full bg-primary p-12 text-primary-foreground">
        <p className="mb-4 text-center text-lg font-bold">4.6 (203 ratings)</p>
        <p className="mb-12 text-center text-2xl font-bold">
          What students are saying
        </p>
        <div className="flex items-center justify-center gap-8">
          {program.testimonials.map((i) => (
            <div className="h-[300px] w-[500px] rounded-lg bg-secondary/10 p-4">
              <p className="mb-8">{i.desc}</p>
              <div className="flex gap-4">
                <Image
                  src={"/images/avatars/shadcn.png"}
                  height={60}
                  width={60}
                  alt=""
                  className="object-contain"
                />
                <div className="space-y-0">
                  <p className="text-lg font-bold">{i.name}</p>
                  <p className="font-light">{i.position}</p>
                  <p className="text-xs">Service Now</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="w-full bg-primary p-12 text-primary-foreground">
        <h2 className="mb-12 text-center text-2xl font-bold">
          What You&apos;ll get out of this course
        </h2>
        <div className="container max-w-5xl space-y-8">
          {program.benifits.map((i) => (
            <div className="w-full bg-secondary/10 p-4">
              <p className="mb-4 text-xl font-bold">{i.title}</p>
              <p className="text-md">{i.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="flex w-full flex-col bg-primary p-12 text-primary-foreground">
        <p className="mb-12 text-center text-3xl">
          What You&apos;ll get out of this course
        </p>
        <div className="container flex max-w-5xl flex-1 flex-wrap items-center justify-between gap-12">
          <p className="font-bold">
            📚 Participate in dynamic, instructor-led sessions.
          </p>
          <p className="font-bold">
            📊 Database Management: Efficiently manage data
          </p>
          <p className="font-bold">
            📹 On-Demand Recordings: Access replays anytime.
          </p>
          <p className="font-bold">
            👥 Supportive Community: Join a vibrant network
          </p>
          <p className="font-bold">
            🖥 Portfolio Building: Showcase your skills.
          </p>
          <p className="font-bold">
            🔗 Connect frontend and backend seamlessly.
          </p>
          <p className="font-bold">
            🎤 Present to peers, mentors, and industry experts
          </p>
        </div>
      </section>
      <section className="flex w-full flex-col bg-primary p-12 text-primary-foreground">
        <p className="mb-12 text-center text-3xl">Course Syllabus</p>
        <div className="container space-y-4">
          {program.syllabus.map((i) => (
            <div className="bg-secondary/10 p-4">
              <p className="pb-4 text-xl">{i.week}</p>
              <p className="mb-4 px-4 font-bold">
                module:
                <br />
                <span className="px-2">{i.module}</span>
              </p>
              <p className="px-8">{i.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="flex w-full flex-col bg-primary p-12 text-primary-foreground">
        <p className="mb-4 text-center text-3xl font-extrabold">
          Course Syllabus
        </p>
        <p className="mb-12 text-center text-lg">3 Hours Per week</p>
        <div className="container mb-8 max-w-3xl">
          <p className="text-xl font-bold">4 week programme</p>
          <p className="mb-4 text-yellow-500">3 hours per week</p>
          <p>
            All course lessons will release on date of course opening and can be
            viewed at student&apos;s pace
          </p>
        </div>
        <div className="container max-w-3xl">
          <p className="text-xl font-bold">Live Q&A</p>
          <p className="mb-4 text-yellow-500">1 hour</p>
          <p>
            A Live Q&A session with Allie and her senior App development fellow
            will take place approximately 2 weeks after the course lessons
          </p>
        </div>
      </section>
      <section className="flex w-full items-center justify-around bg-primary p-12 text-primary-foreground">
        <div>
          <p className="mb-4 text-center text-xl font-bold">
            Who is this program for
          </p>
          <Link
            href={"/"}
            className={buttonVariants({
              className:
                "bg-purple-700 rounded-[100px] p-12 px-20 text-white hover:bg-purple-600",
            })}
          >
            Talk to our admission counsellor
          </Link>
        </div>
        <div className="grid max-w-xl grid-cols-2 gap-16">
          <div className="col-span-1">
            <p className="mb-4 text-lg font-bold">Freshers in any field</p>
            <p>
              Learn A to Z of this in-demand role and become a sought after
              product manager in 14 weeks
            </p>
          </div>
          <div className="col-span-1">
            <p className="mb-4 text-lg font-bold">Freshers in any field</p>
            <p>
              Learn A to Z of this in-demand role and become a sought after
              product manager in 14 weeks
            </p>
          </div>
          <div className="col-span-1">
            <p className="mb-4 text-lg font-bold">Freshers in any field</p>
            <p>
              Learn A to Z of this in-demand role and become a sought after
              product manager in 14 weeks
            </p>
          </div>
          <div className="col-span-1">
            <p className="mb-4 text-lg font-bold">Freshers in any field</p>
            <p>
              Learn A to Z of this in-demand role and become a sought after
              product manager in 14 weeks
            </p>
          </div>
        </div>
      </section>
      <section className="flex w-full flex-col bg-primary p-12 text-primary-foreground">
        <h3 className="mb-12 text-center text-3xl font-extrabold">
          By end of the program you&apos;ll have
        </h3>
        <div className="flex items-center justify-center gap-8">
          {program.outputs.map((i) => (
            <div className="rounded-md bg-secondary/10 p-2">
              <div className="h-48 w-44 rounded bg-blue-500 p-2">{i}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="flex w-full items-center justify-around bg-primary p-12 text-primary-foreground">
        <div className="max-w-sm">
          <p className="mb-4 text-xl text-blue-500">Certify your learning</p>
          <p>
            Get a BetterMind Labs certificate upon successful completion of
            program
          </p>
        </div>
        <div className="flex gap-4">
          <div className="h-[400px] w-[270px] bg-blue-500"></div>
          <div className="h-[400px] w-[270px] bg-blue-500"></div>
        </div>
      </section>
      <section className="flex w-full flex-col bg-primary p-12 text-primary-foreground">
        <p className="mb-12 text-center text-3xl">Frequently Asked Questions</p>
        <div className="container max-w-5xl space-y-8">
          {program.faqs.map((i) => (
            <div className="p-4">
              <p className="text-md pb-4">{i.q}</p>
              <p className="mb-4 px-8 text-lg font-bold">{i.a}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="flex w-full justify-center gap-4 bg-primary p-12 text-primary-foreground">
        <div className="h-64 max-w-md flex-1 bg-purple-600"></div>
        <div className="grid h-64 max-w-md flex-1 grid-cols-2 gap-2">
          <div className="col-span-1 bg-purple-600"></div>
          <div className="col-span-1 bg-purple-600"></div>
          <div className="col-span-1 bg-purple-600"></div>
          <div className="col-span-1 bg-purple-600"></div>
          <div className="col-span-1 bg-purple-600"></div>
          <div className="col-span-1 bg-purple-600"></div>
        </div>
      </section>
      <section className="flex w-full justify-center gap-4 bg-primary text-primary-foreground">
        <div className="my-36 flex items-center justify-center">
          <div className="flex items-center gap-8 rounded-3xl bg-blue-900 p-8 text-primary">
            <div className="max-w-xl">
              <h2 className="mb-12 text-4xl font-extrabold">Still Confused?</h2>
              <h2 className="text-2xl font-extrabold">
                Need more information about the programs? Talk to an expert
                =&gt;
              </h2>
            </div>
            <Link
              href={"/"}
              className="flex bg-yellow-600 p-4 px-12 hover:bg-yellow-500"
            >
              Contact Us <ChevronRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
