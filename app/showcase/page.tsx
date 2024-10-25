import type { Metadata } from 'next'
import Projects from "app/components/projects";

export const metadata: Metadata = {
  title: "Showcase",
  description: "An overview of the projects I've made contributions to.",
  openGraph: {
    title: "Showcase",
  }
};

export default function Showcase() {
  return (
    <div>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">Showcase</h1>
      <p className="mb-4">
        {`An overview of the projects I've made contributions to.
        These projects are a mix of personal projects and ones I've worked on 
        as part of my role at Hiyield. Click on a project to see more information.`}
      </p>
      <div className="my-8 lg:my-12">
        <Projects />
      </div>
    </div>
  );
}
