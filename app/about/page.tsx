import type { Metadata } from "next"
import { Person } from "app/types/personType";
import Me from "app/json/me.json";
import Image from "next/image";


export const metadata: Metadata = {
  title: "About",
  description: "All about myself! Find below a brief description of my journey so far and feel free to contact me using any one of the listed contact methods.",
  openGraph: {
    title: "About"
  }
}

export default function About() {
  const jsonLd: Person = {
    "@context": "https://schema.org",
    "@type": "Person",
    ...Me
  }

  return (
    <div className="">
      {/* Load JSON-LD Data for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <p className="mb-8">
        Hey! This is unfinished if you know, you couldn't tell.
        Here's my dog for the time being.
      </p>
      <Image
        src="/dog.jpg"
        alt="Picture of my dog"
        width={200}
        height={200}
        className="object-contain rounded-xl"
      />
    </div>
  )
}  

