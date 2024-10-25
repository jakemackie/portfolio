import type { Metadata } from 'next'
import { BlogPosts } from "app/components/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "A collection of posts I've written about various topics. From tech to personal, I write about what interests me.",
  openGraph: {
    title: "Blog",
  }
};

export default function Blog() {
  return (
    <div>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Latest posts</h1>
      <BlogPosts />
    </div>
  );
}
