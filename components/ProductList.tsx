"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import imageEx from '@/public/imgs/example.jpg'
import { Button } from "@/components/ui/button"
import deleteProduct from "@/actions/deleteAction"
import { products } from "@/app/dashboard/page"

const ProductList = ({ products } : {products: products}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-10 w-full">
      {products?.map(product => (
        <Card
          key={product.url_id}
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
              <p className="truncate text-xs">{product.url}</p>
            </div>
          </CardContent>
          <CardFooter className='flex justify-center gap-4'>
            <Button
              variant={'outline'}
            >
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open
              </a>
            </Button>
            <Button
              onClick={async () => {await deleteProduct(product.url_id)}}
            >
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default ProductList