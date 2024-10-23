import { ProjectType } from "app/showcase/projectType";

import Image from "next/image";
import Link from "next/link";

interface CardProps {
  data: ProjectType;
}

export default function Card({ data }: CardProps) {
  return (
    <Link href={`/showcase/${data.key}`} className="group">
      <div className="flex flex-col gap-4">
        <div className="w-fit rounded-2xl overflow-hidden">
          <Image
            src={data.image}
            alt={data.name}
            width={500}
            height={200}
            className="object-cover aspect-video"
          />
        </div>
        <h2 className="text-xl font-medium tracking-tighter group-hover:text-blue-500 group-hover:underline">
          {data.name}
        </h2>
        <div className="text-neutral-600 dark:text-neutral-400 tabular-nums">
          <p>{data.description}</p>
          <ul className="mt-4 flex gap-2">
            {data.technologies.map((technology, index) => (
              <li
                key={technology}
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
