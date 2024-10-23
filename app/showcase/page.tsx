import LoadingShowcase from "app/showcase/loading";
import Projects from "app/components/projects";

export default function Showcase() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">Showcase</h1>
      <p className="mb-4">
        {`An overview of the projects I've made contributions to.
        These projects are a mix of personal projects and ones I've worked on 
        as part of my role at Hiyield. Each show off the technologies I've used and
        an overview of the project itself. Each project has its own page where you
        can find out more.`}
      </p>
      <div className="my-8">
        <Projects />
      </div>
    </section>
  );
}
