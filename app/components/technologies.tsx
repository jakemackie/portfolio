import Technology from "./technology";
import technologies from "app/json/technologies.json";

export default function Technologies() {
  return (
    <div className="mx-auto sm:mx-0 mt-8 w-fit grid grid-cols-3 sm:grid-cols-5 gap-6 sm:gap-4">
      {technologies.map((technology: any, index: number) => (
        <Technology key={index} {...technology} />
      ))}
    </div>
  );
}
