import Link from "next/link";
import Technologies from "app/components/technologies";
import DotPattern from "app/components/ui/dot-pattern";
import { cn } from "lib/utils";
import { baseUrl } from "./sitemap";
import Aos from "app/components/aos";

export default function Page() {
  return (
    <div>
      <div className="h-[calc(100vh-9rem)] flex flex-col justify-center">
        <h1 className="mb-2 text-6xl sm:text-7xl font-semibold tracking-tighter text-center">
          Jake Mackie
        </h1>
        <p className="mx-auto max-w-sm sm:max-w-md mb-2 text-center font-medium sm:text-xl">
          19-year-old apprentice full stack developer based in Cornwall, United
          Kingdom.
        </p>
        <Aos />
        <Link
          href="mailto:hello@jakemackie.co.uk"
          className={`
            mx-auto my-4 sm:my-6 group w-fit flex items-stretch bg-zinc-950 border border-neutral-700 
            px-4 sm:px-6 py-2 rounded-xl hover:bg-zinc-900 hover:border-neutral-600 duration-200 
            ease-in-out outline-2 outline-transparent focus:outline-blue-500 font-medium
          `}
          data-aos="zoom-out"
          data-aos-delay="150"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="300"
        >
          Contact me
        </Link>
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl lg:text-3xl font-semibold tracking-tighter text-center sm:text-left">
          My experience
        </h2>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col">
            <h3 className="text-xl lg:text-2xl font-semibold tracking-tighter mb-4">
              Hiyield
            </h3>
            <div className="h-full border-l-2 pl-4 border-zinc-600">
              <p className="text-lg font-semibold tracking-tighter">
                2024 - Current
              </p>
              <p className="text-neutral-400">
                I am currently working at{" "}
                <Link
                  href="https://hiyield.co.uk/"
                  target="_blank"
                  className="text-blue-500 underline outline-2 outline-transparent focus:outline-blue-500"
                >
                  Hiyield
                </Link>
                {","} where I contribute to various real-world projects. You can
                find these on the{" "}
                <Link
                  href={`${baseUrl}/showcase`}
                  className="text-blue-500 underline outline-2 outline-transparent focus:outline-blue-500"
                >
                  showcase
                </Link>{" "}
                page. Where I explain my involvement in each project and provide
                a link to the live site.
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-xl lg:text-2xl font-semibold tracking-tighter mb-4">
              Cornwall IT Services (NHS)
            </h3>
            <div className="h-full border-l-2 pl-4 border-zinc-600">
              <p className="text-lg font-semibold tracking-tighter">2023</p>
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
      </div>

      <div className="mt-16 lg:mt-20">
        <h2 className="text-2xl lg:text-3xl font-semibold tracking-tighter text-center sm:text-left">
          Familiar technologies
        </h2>
        <p className="mt-2 text-neutral-400 text-center sm:text-left">
          <span className="inline-block sm:hidden">Tap</span>
          <span className="hidden sm:inline-block">Hover</span> on an icon to
          view its name.
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
