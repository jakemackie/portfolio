export default function LoadingShowcase() {
  return (
    <section>
      <div className="flex flex-col gap-4">
        <div className="flex items-stretch">
          <div className="aspect-video bg-neutral-400 animate-pulse grow max-w-[500px] rounded-2xl"></div>
        </div>
        <div className="h-6 w-36 bg-neutral-400 animate-pulse"></div>
        <div className="w-full flex flex-col gap-2">
          <div className="h-4 w-full bg-neutral-400 animate-pulse"></div>
          <div className="h-4 w-1/2 bg-neutral-400 animate-pulse"></div>
        </div>
        <div className="mt-4 w-full flex gap-2">
          <div className="h-4 w-1/6 bg-neutral-400 animate-pulse"></div>
          <div className="h-4 w-1/6 bg-neutral-400 animate-pulse"></div>
          <div className="h-4 w-1/6 bg-neutral-400 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
