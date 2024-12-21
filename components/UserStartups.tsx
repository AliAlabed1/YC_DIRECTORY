import { client } from '@/sanity/lib/client'
import {  STARTUPs_BY_AUTHOR_QUIRY } from '@/sanity/lib/quiries'
import React from 'react'
import StartupCard, { StartupTypeCard } from './StartupCard'

const UserStartups = async({id}:{id:string}) => {
    const startups = await client.fetch(STARTUPs_BY_AUTHOR_QUIRY,{id})
    
    return <>
        {
            startups.length > 0 ?startups.map((startup:StartupTypeCard)=>(
                <StartupCard
                    post={startup}
                    key={startup._id}
                />
            )):(
                <p className='no_result'>No Startups Yet.</p>
            )
        }
    </>
}

export default UserStartups
