import Link from "next/link";
import Technologies from "app/components/technologies";

export default function Page() {
  return (
    <div>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Jake Mackie — Fullstack Developer
      </h1>
      <span className="mb-4">
        My name is Jake Mackie and I am a 19 year old from the UK. Currently I
        work as a fullstack apprentice developer at{" "}
        <Link
          href="https://hiyield.co.uk/"
          target="_blank"
          className="text-blue-500 underline"
        >
          Hiyield
        </Link>{" "}
        where I contribute to creating bespoke websites as part of the WordPress
        team. I like to consider my time building websites as me doibg something
        I love, which is why I made this one. Here you can find out all about
        what I get up to, whether it's tech-related or personal, with a specfic
        section to showcase projects.
      </span>

      <div className="mt-12 space-y-4">
        <h2 className="text-xl font-semibold tracking-tighter">
          Familiar technologies
        </h2>
        <p>
          Below you can find a list of technologies that I am familiar with and
          have used in the past. You can find real world use cases of these
          technologies in the showcase section.
        </p>
        <Technologies />
      </div>
    </div>
  );
}
