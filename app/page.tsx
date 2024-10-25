import Link from "next/link";
import Technologies from "app/components/technologies";

export default function Page() {
  const words = `Apprentice Fullstack Developer`;
  return (
    <div>
      <h1 className="mb-8 text-6xl font-semibold tracking-tighter">
        Jake Mackie
      </h1>
      <p>19 year old apprentice fullstack developer based in Cornwall.</p>

      <div className="mt-12 space-y-8">
        <h2 className="text-xl font-semibold tracking-tighter">
          My experience
        </h2>
        <div className="flex flex-col gap-8">
          <div className="h-full border-l-2 pl-4 border-zinc-600">
            <h3 className="text-lg font-semibold tracking-tighter">
              2024 - Current
            </h3>
            <p>
              I am currently working as a fullstack developer apprentice at{" "}
              <Link
                href="https://hiyield.co.uk/"
                target="_blank"
                className="text-blue-500 underline"
              >
                Hiyield
              </Link>
              {","} where I contribute to various real-world projects.
            </p>
          </div>

          <div className="h-full border-l-2 pl-4 border-zinc-600">
            <h3 className="text-lg font-semibold tracking-tighter">2023</h3>
            <p>
              Work experience at{" "}
              <Link
                href="https://cits.royalcornwallhospitals.nhs.uk/"
                target="_blank"
                className="text-blue-500 underline"
              >
                CITS
              </Link>
              {" (NHS), "} where I made JavaScript assesments for patients,
              conforming to the NHS design system.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-4">
        <h2 className="text-xl font-semibold tracking-tighter">
          Familiar technologies
        </h2>
        <p>
          Below you can find a list of technologies that I am familiar with. You
          can explore use cases of these technologies in the{" "}
          <Link href="/showcase" className="text-blue-500 underline">
            showcase section
          </Link>
          {", "}featuring a mix of personal and professional projects.
        </p>
        <Technologies />
      </div>
    </div>
  );
}
