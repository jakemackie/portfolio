import type { Metadata } from "next"
import { Person } from "app/types/personType";
import Me from "app/json/me.json";


export const metadata: Metadata = {
  title: "About",
  description: "All about myself! Find below a brief description of my journey so far and feel free to contact me using any one of the listed contact methods.",
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

      <p>Hey!</p>
    </div>
  )
}  

