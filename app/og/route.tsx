import { ImageResponse } from "next/og";

export function GET(request: Request) {
  let url = new URL(request.url);
  let title =
    url.searchParams.get("title") || "Jake Mackie — Fullstack Developer";

  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full items-center justify-center bg-[#0c0c0c] text-[#e2e8f0]">
        <div tw="flex flex-col w-full py-12 px-4 justify-between p-38">
          <h2 tw="text-6xl font-medium tracking-tight text-left">
            Jake Mackie — Blog
          </h2>
          <h1 tw="text-8xl font-bold tracking-tight text-left">{title}</h1>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
