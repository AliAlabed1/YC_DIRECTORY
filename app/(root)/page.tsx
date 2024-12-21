import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUP_QUIRY } from "@/sanity/lib/quiries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({searchParams}:{searchParams:Promise<{query?:string}>}) {
  const query = (await searchParams).query
  const params = { search: query || null }
  const {data:posts} = await sanityFetch({query:STARTUP_QUIRY,params:params})
  console.log(`posts:`, posts)
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup <br /> Connect with Ent repreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and git noticed in virtual Competitions.
        </p>
        <SearchForm query={query}/>
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query?`Search results for "${query}"`:"All Startups"}
        </p>
        <ul className="mt-7  card_grid">
          {
            posts?.length>0 && posts.map((post:StartupTypeCard,index:number)=>(
              <StartupCard key={post._id} post ={post}/>
            ))
          }
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
