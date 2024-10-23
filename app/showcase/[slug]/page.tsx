import { notFound } from "next/navigation";
import allProjects from "app/showcase/projects.json";
import { ProjectType } from "app/showcase/projectType";
import { getProject } from "app/showcase/utils";

import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {}

export function generateMetadata() {}

export default function Project({ params }) {
  let project = getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="w-fit rounded-2xl overflow-hidden">
          <Image
            src={project.image}
            alt={project.name}
            width={500}
            height={200}
            className="object-cover aspect-video"
          />
        </div>
        <h1 className="text-2xl font-semibold tracking-tighter">
          {project.name}
        </h1>
        <div className="flex flex-col gap-2 text-neutral-600 dark:text-neutral-400 tabular-nums">
          <p>{project.description}</p>
          <Link
            target="_blank"
            href={project.url}
            className="text-blue-500 underline"
          >
            Visit the project
          </Link>
        </div>
      </div>
    </div>
  );
}
