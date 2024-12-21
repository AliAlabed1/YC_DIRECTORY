import { auth } from '@/auth';
import { StartupCardSkeleton } from '@/components/StartupCard';
import UserStartups from '@/components/UserStartups';
import { client } from '@/sanity/lib/client';
import {  USER_BY_ID_QUERY } from '@/sanity/lib/quiries';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'


export const experimental_ppr = true;

const page = async({params}:{params:Promise<{id:string}>}) => {
    const id = (await params)?.id;
    const session =await  auth();
    const user = await client.fetch(USER_BY_ID_QUERY,{id})
    
    if(!user) return notFound();

    return <>
        <section className='profile_container'>
            <div className='profile_card'>
                <div className='profile_title'>
                    <h3 className='text-2-black uppercase text-center line-clamp-1'>
                        {user.name}
                    </h3>
                </div>
                <Image
                    src = {user.image}
                    alt={user.name}
                    width = {220}
                    height={220}
                    className='profile_image'

                />
                <p className='text-30-extrabold mt-7 text-center'>@{user?.username}</p>
                <p className='mt-1 text-center text-14-normal'>{user?.bio}</p>
            </div>
            <div className='flex-1 flex flex-col gap-5 lg:mt-5'>
                <p className='text-30-bold'>
                    {
                        session?.id===id ? 'Your':'ALL'
                    } Startups
                </p>
                <ul className='card_grid-sm'>
                    <Suspense fallback={<StartupCardSkeleton/>}>
                        <UserStartups id={id} />
                    </Suspense>
                </ul>
            </div>
        </section>
    </>
}

export default page
