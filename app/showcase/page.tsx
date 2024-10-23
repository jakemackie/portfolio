import Projects from "app/components/projects";

export default function Showcase() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">Showcase</h1>
      <p className="mb-4">{`Take a look at these projects`}</p>
      <div className="my-8">
        <Projects />
      </div>
    </section>
  );
}
