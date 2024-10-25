import Link from "next/link";
import Image from "next/image";
import Github from "../../public/icons/github.svg";
import LinkedIn from "../../public/icons/linkedin.svg";
import Devto from "../../public/icons/devto.svg";

export default function Footer() {
  return (
    <footer className="mt-8 mb-16 flex flex-col sm:flex-row justify-center sm:justify-start sm:items-center gap-4 sm:gap-8">
      <p className="text-neutral-300">
        © {new Date().getFullYear()} Jake Mackie. All rights reserved.
      </p>
      <div className="flex items-center gap-4 shrink-0">
        <Link
          aria-label="Github"
          href="https://github.com/jakemackie"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={Github}
            alt="Github"
            width={32}
            height={32}
            className="opacity-50 hover:opacity-100 duration-300 ease-in-out"
          />
        </Link>

        <Link
          aria-label="LinkedIn"
          href="https://www.linkedin.com/in/jakemackie/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={LinkedIn}
            alt="LinkedIn"
            width={32}
            height={32}
            className="opacity-50 hover:opacity-100 duration-300 ease-in-out"
          />
        </Link>

        <Link
          aria-label="Dev.to"
          href="https://dev.to/jakemackie"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={Devto}
            alt="Dev.to"
            width={32}
            height={32}
            className="opacity-50 hover:opacity-100 duration-300 ease-in-out"
          />
        </Link>
      </div>
    </footer>
  );
}
