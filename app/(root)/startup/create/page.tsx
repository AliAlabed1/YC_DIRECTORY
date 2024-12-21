import { auth } from '@/auth'
import StratupForm from '@/components/StratupForm'
import { redirect } from 'next/navigation';
import React from 'react'

const page =async () => {
    const session = await auth();
    if (!session){
        redirect('/')
    }
    return (
        <>
            <section className='pink_container !min-h-[230px]'>
                <h1 className='heading'>Submit Your Startup</h1>
            </section>
            <StratupForm />
        </>
    )
}

export default page
