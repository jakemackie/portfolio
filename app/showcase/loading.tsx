export default function LoadingShowcase() {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-16">
          <div className="col-span-1 flex flex-col gap-4">
            <div className="flex items-stretch rounded-2xl overflow-hidden">
              <div className="aspect-video bg-neutral-400 animate-pulse grow"></div>
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

          <div className="col-span-1 flex flex-col gap-4">
            <div className="flex items-stretch rounded-2xl overflow-hidden">
              <div className="aspect-video bg-neutral-400 animate-pulse grow"></div>
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
        </div>
      </div>
    </section>
  );
}
