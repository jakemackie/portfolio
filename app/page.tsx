"use client";

import Link from "next/link";
import Technologies from "app/components/technologies";
import DotPattern from "app/components/ui/dot-pattern";
import { cn } from "lib/utils";

export default function Page() {
  const words = `Apprentice Fullstack Developer`;
  return (
    <div>
      <div className="my-12">
        <h1 className="mb-2 text-5xl md:text-5xl md:text-6xl font-semibold tracking-tighter text-center">
          Jake Mackie
        </h1>
        <p className="mx-auto max-w-sm mb-2 text-center font-medium">
          19 year old apprentice fullstack developer based in Cornwall, United
          Kingdom.
        </p>
        <Link
          href="mailto:jake.wmackie@gmail.com"
          className={`
            mx-auto my-8 group w-fit flex items-stretch bg-zinc-950 border border-neutral-700 
            px-4 py-1.5 rounded-xl hover:bg-zinc-900 hover:border-neutral-600 duration-200 
            ease-in-out outline-2 outline-transparent focus:outline-blue-500 font-medium
          `}
        >
          Contact me
        </Link>
      </div>

      <div className="mt-40 space-y-8">
        <h2 className="text-xl font-semibold tracking-tighter">
          My experience
        </h2>
        <div className="flex flex-col gap-8">
          <div className="h-full border-l-2 pl-4 border-zinc-600">
            <h3 className="text-lg font-semibold tracking-tighter">
              2024 - Current
            </h3>
            <p className="text-neutral-400">
              I am currently working as an apprentice fullstack developer at{" "}
              <Link
                href="https://hiyield.co.uk/"
                target="_blank"
                className="text-blue-500 underline outline-2 outline-transparent focus:outline-blue-500"
              >
                Hiyield
              </Link>
              {","} where I contribute to various real-world projects.
            </p>
          </div>

          <div className="h-full border-l-2 pl-4 border-zinc-600">
            <h3 className="text-lg font-semibold tracking-tighter">2023</h3>
            <p className="text-neutral-400">
              Work experience at{" "}
              <Link
                href="https://cits.royalcornwallhospitals.nhs.uk/"
                target="_blank"
                className="text-blue-500 underline outline-2 outline-transparent focus:outline-blue-500"
              >
                CITS
              </Link>
              {" (NHS), "} where I made JavaScript assesments for patients,
              conforming to the NHS design system.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 lg:mt-20 space-y-4">
        <h2 className="text-xl font-semibold tracking-tighter">
          Familiar technologies
        </h2>
        <p className="text-neutral-400">
          Below you can find a list of technologies that I am familiar with. You
          can explore use cases of these technologies in the{" "}
          <Link
            href="/showcase"
            className="text-blue-500 underline outline-2 outline-transparent focus:outline-blue-500"
          >
            showcase section
          </Link>
          {", "}featuring a mix of personal and professional projects.
        </p>
        <Technologies />
      </div>

      <DotPattern
        className={cn(
          "-z-10 opacity-50 [mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
        )}
      />
    </div>
  );
}
