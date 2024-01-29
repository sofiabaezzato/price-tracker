// deprecated

import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from './ui/button'
import imageEx from '@/public/imgs/example.jpg'
import Image from 'next/image'
import { auth } from '@clerk/nextjs'
import supabaseClient from '@/lib/supabase-client'
import { revalidatePath } from 'next/cache'

const TrackingList = async () => {

  const { getToken } = auth();
  const supabaseAccessToken = await getToken({ template: 'supabase' });
  const supabase = await supabaseClient(supabaseAccessToken);

  const { data } = await supabase.from('urls_tracked').select('url, url_id');
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-10 w-full">
      {data?.map(url => (
        <Card
          key={url.url_id}
        >
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Current price: <span>16,45 €</span></CardDescription>
            <CardDescription className='text-xs'>Initial price: <span>15,45 €</span></CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col gap-4'>
              <Image
                src={imageEx}
                alt="product-img"
                width={150}
                className='self-center object-contain'
              />
              <p className="truncate text-xs">{url.url}</p>
            </div>
          </CardContent>
          <CardFooter className='flex justify-center gap-4'>
            <Button
              variant={'outline'}
            >
              <a
                href={url.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open
              </a>
            </Button>
            <Button
              /* onClick={() => handleDelete(url.url_id)} */
            >
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>

    

  )
}

export default TrackingList