import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

import AnimatedGradientText from "./components/animated-gradient"
import { services } from "./services"

export default async function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-6 lg:py-20">
        <div className="container z-10 flex max-w-5xl flex-col items-center gap-4 text-center">
          <Link
            href={"/docs"}
            className="z-10 flex items-center justify-center"
          >
            <AnimatedGradientText>
              🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
              <span
                className={cn(
                  `animate-gradient inline bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                )}
              >
                Explore all courses
              </span>
              <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedGradientText>
          </Link>
        </div>
        <div className="container flex max-w-7xl flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
            Stand Out in Your College Applications With Live Project-Based
            Bootcamps, Workshops & Mentorship
          </h1>
          <p className="mt-6 flex gap-4 text-xl lg:gap-8 2xl:gap-12">
            High schoolers, elevate your profile by engaging in hands-on
            projects, conducting research, and receiving expert mentorship to
            strengthen your college applications.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 pt-12">
          <Link
            href={"/programs#technology"}
            className={buttonVariants({
              className: "w-[400px] border-2 border-yellow-600 p-6",
              variant: "secondary",
            })}
          >
            Technology Programs
          </Link>
          <Link
            href={"/programs#entrepreneurship"}
            className={buttonVariants({
              className: "w-[400px] border-2 border-yellow-600 p-6",
              variant: "secondary",
            })}
          >
            Entrepreneurship Programs
          </Link>
          <Link
            href={"/programs#research"}
            className={buttonVariants({
              className: "w-[400px] border-2 border-yellow-600 p-6",
              variant: "secondary",
            })}
          >
            Research Programs
          </Link>
        </div>
      </section>
      <section className="w-full bg-secondary py-8 md:py-12 lg:py-24">
        <h3 className="mb-12 text-center font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          PROGRAMS THAT DELIVER RESULTS
        </h3>
        <div className="flex items-center justify-center gap-12">
          {[
            { title: "Empowered", subtitle: "500+", value: "High Schoolers" },
            { title: "Rated", subtitle: "4.5/5", value: "By Students" },
            {
              title: "Led By",
              subtitle: "20+",
              value: "Selective Expert Mentors",
            },
            {
              title: "Helped Buid",
              subtitle: "100+",
              value: "Real World Projects",
            },
          ].map((i) => (
            <div className="flex h-72 w-60 flex-col justify-between rounded-2xl bg-primary p-4 py-12 font-extrabold text-primary-foreground">
              <h4 className="text-center text-xl">{i.title}</h4>
              <h4 className="text-center text-4xl">{i.subtitle}</h4>
              <h4 className="text-center text-xl">{i.value}</h4>
            </div>
          ))}
        </div>
      </section>
      <section className="w-full bg-primary/90 p-12">
        <h3 className="mb-12 text-center font-heading text-xl text-primary-foreground sm:text-2xl md:text-3xl lg:text-4xl">
          Trending Programs
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-24">
          {[
            {
              title: "App Dev Internship Bootcamp Program",
              desc: "The App Development Internship BootCamp by BetterMind Labs is an intensive program designed for high school students eager to dive into the world of app development. Over several weeks, participants learn the fundamentals of app development, work on hands-on projects, and receive mentorship from industry professionals. By the end of the bootcamp, students will have created their own fully functional apps, gaining practical experience, valuable resources, and networking opportunities. This experience not only equips them with essential tech skills but also adds significant value to their college applications, demonstrating creativity, problem-solving, and a proactive approach to learning.",
            },
            {
              title: "AI/ML Internship Bootcamp program",
              desc: "The AI/ML Internship BootCamp by BetterMind Labs is a focused program designed for high school students interested in Artificial Intelligence and Machine Learning. Over several weeks, participants learn core AI/ML concepts, engage in hands-on projects, and receive mentorship from industry experts. By the end of the bootcamp, students will have developed their own AI/ML models and gained practical experience, networking opportunities, and access to valuable resources. This experience not only builds essential tech skills but also adds significant value to college applications, showcasing a strong commitment to learning and innovation in a cutting-edge field.",
            },
          ].map((i) => (
            <div className="relative h-[500px] w-[450px] overflow-hidden rounded-3xl border bg-primary/70 pt-12 text-primary-foreground shadow-xl">
              <h3 className="mb-8 px-12 text-2xl">{i.title}</h3>
              <p className="px-12">4 week internship program</p>
              <p className="mb-6 px-12">⭐⭐⭐⭐⭐</p>
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
        <h3 className="mb-12 mt-24 text-center font-heading text-xl text-primary-foreground sm:text-2xl md:text-3xl lg:text-4xl">
          Previous Programs
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-24">
          {[
            {
              title: "Computer Science and Business Internship Program",
              desc: "The Computer Science and Business Internship BootCamp by BetterMind Labs is a comprehensive program tailored for high school students interested in the intersection of technology and business. Over several weeks, participants gain foundational knowledge in computer science, explore business concepts, and work on real-world projects that integrate both fields. Guided by industry mentors, students develop practical skills, create business solutions, and build a strong professional network. This experience not only enhances their technical and entrepreneurial abilities but also adds significant value to college applications, showcasing a well-rounded skill set and a forward-thinking approach to their education.",
            },
            {
              title: "STEM Hackathon to High School Students",
              desc: "The STEM Hackathon by BetterMind Labs is an exciting, fast-paced event designed for high school students passionate about Science, Technology, Engineering, and Math. Over the course of a weekend, participants collaborate in teams to solve real-world challenges, using their STEM skills to innovate and create practical solutions. Guided by mentors and industry experts, students engage in coding, design, and problem-solving, culminating in a final presentation of their projects. This experience not only hones critical thinking and teamwork but also adds significant value to college applications, highlighting creativity, collaboration, and technical expertise in STEM fields",
            },
          ].map((i) => (
            <div className="relative h-[550px] w-[450px] overflow-hidden rounded-3xl border bg-primary/70 pt-12 text-primary-foreground shadow-xl">
              <h3 className="mb-8 px-12 text-2xl">{i.title}</h3>
              <p className="px-12">4 week internship program</p>
              <p className="mb-2 px-12">⭐⭐⭐⭐⭐</p>
              <div className="mb-6 flex items-center gap-4 px-12">
                <span className="size-12 rounded-full bg-green-700" />
                <p className="text-xl">Registration Closed</p>
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
      <section className="w-full bg-primary/90 py-12">
        <h3 className="mb-12 mt-24 pl-36 font-heading text-xl text-primary-foreground sm:text-2xl md:text-3xl lg:text-4xl">
          Bettermind advantage
        </h3>
        <div className="flex bg-background p-36 pt-12">
          <div className="">
            <h4 className="mb-6 text-3xl">Learn from the experts</h4>
            <p className="max-w-lg text-xl">
              Develop real-world skills with our programs and projects designed
              by industry experts and practitioners
            </p>
          </div>
          <div className="flex"></div>
        </div>
        <div className="flex bg-background p-36 pt-12">
          <div className="">
            <h4 className="mb-6 text-3xl">Why BetterMind Labs?</h4>
            <p className="max-w-lg text-xl">
              We focus on personalized mentorship and real-world application
              with live projects to craft your X factor and help you uniquely
              stand out in your college applications
            </p>
          </div>
          <div className="flex"></div>
        </div>
        <div className="flex justify-center gap-16 bg-background p-36 pt-12">
          {[
            {
              title: "Real Hands-on Projects",
              desc: "Work on real world problems and solve using technology",
            },
            {
              title: "Real Hands-on Projects",
              desc: "Solve problems with expert guidance in the field",
            },
            {
              title: "Real Hands-on Projects",
              desc: "Receive signed letters of recommendation and certificate to showcase your contribution value",
            },
          ].map((i) => (
            <div className="h-52 w-80 rounded-3xl border bg-primary p-8 text-primary-foreground">
              <h3 className="mb-8 text-xl font-bold">{i.title}</h3>
              <h3>{i.desc}</h3>
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col bg-primary text-primary-foreground">
        <h3 className="mb-6 text-center text-5xl font-bold">
          Why highschoolers love BetterMind?
        </h3>
        <p className="mb-12 text-center">
          SEE WHAT HIGH SCHOOLERS HAVE TO SAY ABOUT OUR PROGRAMS
        </p>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-around gap-12">
          {[
            {
              rating: "4.9 Rating",
              desc: "Participating in the internship and mentorship program was a game-changer for me. The hands-on experience and mentorship I received helped me stand out in my college applications. I'm beyond excited to be joining Stanford University! The topics were  taught in a clear. I really enjoyed the lessons.",
              id: "Riya Sharma Texas",
            },
            {
              rating: "4.9 Rating",
              desc: "Participating in the internship and mentorship program was a game-changer for me. The hands-on experience and mentorship I received helped me stand out in my college applications. I'm beyond excited to be joining Stanford University! The topics were  taught in a clear. I really enjoyed the lessons.",
              id: "Riya Sharma Texas",
            },
          ].map((i) => (
            <div className="h-[350px] w-[500px] rounded-3xl border p-8">
              <h2 className="mb-12 text-4xl font-extrabold">{i.rating}</h2>
              <p className="mb-10">{i.desc}</p>
              <p>{i.id}</p>
            </div>
          ))}
          <div className="my-36 flex items-center justify-center">
            <div className="flex w-[90%] items-center gap-8 rounded-3xl bg-blue-900 p-8 text-primary">
              <div>
                <h2 className="mb-12 text-4xl font-extrabold">
                  Still Confused?
                </h2>
                <h2 className="text-2xl font-extrabold">
                  Need more information about the programs? Talk to an expert
                  =&gt;
                </h2>
              </div>
              <Button className="bg-yellow-600 p-8 px-12 hover:bg-yellow-500">
                Contact Us <ChevronRight />
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section
        id="open-source"
        className="w-full bg-primary py-8 md:py-12 lg:py-24"
      >
        <div className="flex h-[20vh] w-full flex-col">
          <h3 className="mx-auto mb-12 max-w-5xl text-center font-heading text-5xl text-primary-foreground">
            Boost your college applications with our tech & research programs
          </h3>
          <Link
            href={"/"}
            className={buttonVariants({
              className:
                "rounded-[20px] bg-primary-foreground hover:bg-primary-foreground px-16 text-xl mx-auto text-white mb-36",
            })}
          >
            Explore Programs
          </Link>
        </div>
      </section>
    </>
  )
}
