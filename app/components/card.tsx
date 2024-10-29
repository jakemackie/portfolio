import { ProjectType } from "app/types/projectType";

import Image from "next/image";
import Link from "next/link";

interface CardProps {
  data: ProjectType;
}

export default function Card({ data }: CardProps) {
  return (
    <Link href={`/showcase/${data.slug}`} className="group">
      <div className="flex flex-col">
        <div className="relative mb-4 flex items-stretch bg-zinc-900 border border-neutral-700 p-2 rounded-xl group-hover:bg-zinc-800 group-hover:border-neutral-600 duration-200 ease-in-out">
          <Image
            placeholder="blur"
            blurDataURL={data.blurImage}
            src={data.image}
            alt={data.name}
            width={500}
            height={200}
            className="object-cover rounded-lg aspect-video grow"
          />

          <h2 className="absolute inset-0 flex items-center justify-center text-2xl font-semibold tracking-tighter text-white bg-black/80 opacity-100 md:opacity-0 rounded-xl opacity-0 md:group-hover:opacity-100 duration-200 ease-in-out">
            Read More
          </h2>
        </div>
        <h2 className="w-fit mb-2 text-xl font-medium tracking-tighter">
          {data.name}
        </h2>
        <div className="mb-2 text-neutral-400 tabular-nums leading-normal">
          <p>
            {data.description.length > 70
              ? (() => {
                  const truncationPoint = 70;
                  const nextSpaceIndex = data.description.indexOf(
                    " ",
                    truncationPoint
                  );

                  const cutoffIndex =
                    nextSpaceIndex !== -1
                      ? nextSpaceIndex
                      : data.description.length;

                  let truncatedText = data.description.substring(
                    0,
                    cutoffIndex
                  );

                  if (!/[a-zA-Z]$/.test(truncatedText)) {
                    truncatedText = truncatedText.slice(0, -1);
                  }

                  return `${truncatedText}...`;
                })()
              : data.description}
          </p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {data.technologies.map((technology, index) => (
              <li
                key={index}
                className="after:content-[','] last:after:content-[''] text-sm"
              >
                {technology}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}
