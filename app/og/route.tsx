import { ImageResponse } from "next/og";
import DotPattern from "app/components/ui/dot-pattern";
import { cn } from "lib/utils";

export function GET(request: Request) {
  let url = new URL(request.url);
  let title =
    url.searchParams.get("title") || "Jake Mackie — Fullstack Developer";

  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full items-center justify-center bg-[#0c0c0c] text-[#e2e8f0]">
        <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
          <h2 tw="flex flex-col text-6xl font-bold tracking-tight text-center">
            {title}
          </h2>
        </div>
        <DotPattern
          tw={cn(
            "-z-10 opacity-50 [mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
          )}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
