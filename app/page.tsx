import Link from "next/link";
import Technologies from "app/components/technologies";

export default function Page() {
  return (
    <div>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Jake Mackie
      </h1>
      <span className="mb-4">
        I am a 19 year old from the UK. Currently I work as a fullstack 
        apprentice developer at{" "}
        <Link
          href="https://hiyield.co.uk/"
          target="_blank"
          className="text-blue-500 underline"
        >
          Hiyield
        </Link>{","} where I contribute to various real-world projects.
      </span>

      <div className="mt-12 space-y-4">
        <h2 className="text-xl font-semibold tracking-tighter">
          Familiar technologies
        </h2>
        <p>
          Below you can find a list of technologies that I am familiar with.
          {" "}You can explore use cases of these technologies in the{" "}
          <Link
            href="/showcase"
            className="text-blue-500 underline"
          >
            showcase section
          </Link>
          {", "}featuring a mix of personal and professional projects.
        </p>
        <Technologies />
      </div>
    </div>
  );
}
