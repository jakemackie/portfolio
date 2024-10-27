import Image from "next/image";

interface TechnologyProps {
  icon: string;
  highlight: string;
  name: string;
  type: string;
}

export default function Technology({
  icon,
  highlight,
  name,
  type,
}: TechnologyProps) {
  return (
    <div className="w-full flex gap-3 bg-zinc-950 border border-neutral-800 p-2 rounded-xl hover:bg-zinc-900 hover:border-neutral-700 duration-200 ease-in-out">
      <div className={`p-2 ${highlight} rounded-xl overflow-hidden`}>
        <Image
          src={icon}
          alt={name}
          width={48}
          height={48}
          className="object-cover rounded-lg"
          draggable={false}
        />
      </div>
      <div className="flex flex-col">
        <p className="text-lg">{name}</p>
        <p className="text-sm text-neutral-400">{type}</p>
      </div>
    </div>
  );
}
