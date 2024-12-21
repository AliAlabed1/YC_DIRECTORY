import { auth, signIn, signOut} from '@/auth'
import { BadgePlus, LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'

const Navbar = async () => {
    const session = await auth()
  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
        <nav className='flex justify-between items-center'>
            <Link href={"/"}>
                <Image src="/logo.png" alt="logo" width={144} height={30} />
            </Link>
            <div className='flex text-center justify-center items-center gap-5 text-black'>
                {
                    session && session.user ? (
                        <>
                            <Link href="/startup/create"> 
                                <span className='max-sm:hidden'>Create</span>
                                <BadgePlus className='size-6 sm:hidden'/>
                                
                            </Link>
                            <form action={async()=>{ 
                                'use server';
                                await signOut({redirectTo:"/"});
                            }}>
                                <button type='submit'>
                                    <span className='max-sm:hidden'>Logout</span>
                                </button>
                                <LogOut className='size-6 sm:hidden text-red-500'/>
                            </form>

                            <Link href={`/user/${session?.id}`}>
                                <Avatar className='size-10'>
                                    <AvatarImage src={session?.user?.image || ''} alt = {session?.user?.name || ''}/>
                                    <AvatarFallback>{session?.user?.name.split(0,2)}</AvatarFallback>
                                </Avatar>
                            </Link>
                        </>
                    ):(
                        <form action={async()=>{ 
                            'use server'
                            await signIn('github')
                        }}>
                            <button type='submit'>Login</button>
                        </form>
                    )
                }
            </div>

        </nav>
    </header>
  )
}

export default Navbar
