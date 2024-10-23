import { ProjectType } from "./projectType";
import allProjects from "./projects.json";

export function getProject(key: string): ProjectType | undefined {
  return allProjects.find((project) => project.key === key);
}

export function getProjects(): ProjectType[] {
  return allProjects;
}
