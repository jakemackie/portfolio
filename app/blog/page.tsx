import { BlogPosts } from "app/components/posts";

export const metadata = {
  title: "Blog",
  description: "A collection of posts I've written about various topics. From tech to personal, I write about what interests me.",
};

export default function Page() {
  return (
    <div>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Blog</h1>
      <BlogPosts />
    </div>
  );
}
