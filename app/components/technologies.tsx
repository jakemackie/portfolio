import Technology from "./technology";
import technologies from "app/json/technologies.json";

export default function Technologies() {
  return (
    <div className="mt-8 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
      {technologies.map((technology: any, index: number) => (
        <Technology key={index} {...technology} />
      ))}
    </div>
  );
}
