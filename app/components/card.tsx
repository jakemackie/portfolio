import { ProjectType } from "app/types/projectType";

import Image from "next/image";
import Link from "next/link";

interface CardProps {
  data: ProjectType;
}

export default function Card({ data }: CardProps) {
  return (
    <Link href={`/showcase/${data.slug}`} className="group">
      <div className="flex flex-col gap-4">
        <div className="flex items-stretch rounded-2xl overflow-hidden">
          <Image
            placeholder="blur"
            blurDataURL={data.blurImage}
            src={data.image}
            alt={data.name}
            width={500}
            height={200}
            className="object-cover aspect-video grow"
          />
        </div>
        <h2 className="text-xl font-medium tracking-tighter group-hover:text-blue-500 group-hover:underline">
          {data.name}
        </h2>
        <div className="text-neutral-600 dark:text-neutral-400 tabular-nums">
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

          <ul className="mt-2 flex gap-2">
            {data.technologies.map((technology, index) => (
              <li
                key={index}
                className="after:content-[','] last:after:content-['']"
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
