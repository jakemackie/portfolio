import Link from "next/link";

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
        I love, which is why I made this one. Here you can find out all about what
        I get up to, whether it's tech-related or personal, with a specfic section
        to showcase projects.
      </span>
    </div>
  );
}
