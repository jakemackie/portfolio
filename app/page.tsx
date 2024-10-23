import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Who am I?
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
        team.
      </span>
    </div>
  );
}
