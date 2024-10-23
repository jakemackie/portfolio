import allProjects from "app/showcase/projects.json";
import Card from "app/components/card";

export default function Projects() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-16">
      {allProjects.map((project) => (
        <Card key={project.key} data={project} />
      ))}
    </div>
  );
}
