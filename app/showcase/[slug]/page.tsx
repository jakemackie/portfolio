import { notFound } from "next/navigation";
import { getProjects, getProject } from "app/showcase/utils";
import { baseUrl } from "app/sitemap";

import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  let projects = getProjects();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata(props) {
  const params = await props.params;
  let project = getProjects().find((project) => project.slug === params.slug);
  if (!project) {
    return;
  }

  let { name: title, description, image, publishedAt } = project;
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    publishedAt,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `${baseUrl}/showcase/${project.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Project(props) {
  const params = await props.params;
  let project = getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <div className="flex flex-col">
        <div className="mb-8 flex items-stretch bg-zinc-900 border border-neutral-800 p-2 rounded-xl hover:bg-zinc-800 hover:border-neutral-700 duration-200 ease-in-out">
          <Image
            placeholder="blur"
            blurDataURL={project.blurImage}
            src={project.image}
            alt={project.name}
            width={500}
            height={200}
            className="object-cover rounded-lg aspect-video grow"
          />
        </div>
        <h1 className="mb-2 text-4xl font-semibold tracking-tighter">
          {project.name}
        </h1>
        <div className="flex flex-col gap-2 text-neutral-400 tabular-nums">
          <p>{project.description}</p>
          <ul className="mt-2 flex gap-2">
            {project.technologies.map((technology, index) => (
              <li
                key={index}
                className="after:content-[','] last:after:content-['']"
              >
                {technology}
              </li>
            ))}
          </ul>
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
