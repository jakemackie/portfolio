import allProjects from "app/showcase/projects.json";
import Card from "app/components/card";

export default function Projects() {
  return (
    <div className="flex flex-col gap-10">
      {allProjects.map((project, index) => (
        <Card key={index} data={project} />
      ))}
    </div>
  );
}
