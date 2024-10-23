import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        My Portfolio
      </h1>
      <p className="mb-4">
        {`My name is Jake Mackie and I am a 19 year old from the UK. 
        Currently I work as a fullstack apprentice developer at Hiyield
        where I help create bespoke websites as part of the WordPress team.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
