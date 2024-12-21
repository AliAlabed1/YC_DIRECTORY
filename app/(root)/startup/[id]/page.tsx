import { formateDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client'
import { PLAYLIST_BY_SLUG_QUIRY, STARTUP_BY_ID_QUERY } from '@/sanity/lib/quiries';
import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense } from 'react'
import markdownit from 'markdown-it'
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import StartupCard, { StartupTypeCard } from '@/components/StartupCard';
export const experimental_ppr = true;
const page = async ( {params}:{params:Promise<{id:string}>}) => {
    const id = (await params).id

    const [post] = await Promise.all([
        client.fetch(STARTUP_BY_ID_QUERY,{id}),
    ])
    const md = markdownit();
    


    const parsedContent = md.render(post?.pitch || '')

    
    return (
        <>
            <section className='pink_container !min-h-[230px]'>
                <p className='tag'>{formateDate(post?._createdAt)}</p>
                <h1 className='heading'>{post?.title}</h1>
                <p className='sub-heading !max-w-5xl'>{post?.description}</p>
            </section>
            <section className='section_container'>
                <img 
                    src={post.image} 
                    alt="thumbnail"
                    className='w-full h-auto rounded-xl' 
                />
                <div className='space-y-5 mt-10 max-w-4xl mx-auto' >
                    <div className='flex-between gap-5'>
                        <Link href={`/user/${post?.author._id}`} className='flex items-center gap-2 mb-3'>
                            <Image src={post?.author.image} alt="user-profile" width={64} height={64} className='rounded-full drop-shadow-lg'/>
                            <div>
                                <p className='text-20-medium'>
                                    {post.author.name}
                                </p>
                                <p className='text-16-medium !text-black-300'>
                                    @{post.author.username}
                                </p>
                            </div> 
                        </Link>
                        <div className='category-tag'>{post.category}</div>
                    </div>
                    <h3 className='text-30-bold'>Pitch Details</h3>
                    {
                        parsedContent?(
                            <article
                                dangerouslySetInnerHTML={
                                    {__html:parsedContent}
                                }
                                className='prose max-w-4xl font-work-sans break-all'
                            />
                        ):(
                            <p className='no-result'>No deatails provided</p>
                        )
                    }
                </div>
                
                <Suspense 
                    fallback = {
                        <Skeleton
                            className='view-skeleton'
                        />
                    }
                >
                    <View id = {id}/>
                </Suspense>
            </section>
        </>
    )
}

export default page
