"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import imageEx from '@/public/imgs/example.jpg'
import { Button } from "@/components/ui/button"
import deleteProduct from "@/actions/deleteAction"

type product = {
  url: string;
  url_id: string;
  name: string | null;
  symbol: string | null;
  initial_price: number | null;
  current_price: number | null;
  image: string | null;
  last_scraped: string | null;
}

const ProductList = ( {products} : {products: product[]} ) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-10 w-full">
      {products.map(product => (
        <Card
          key={product.url_id}
          className="flex flex-col justify-between"
        >
          <CardHeader>
            <CardTitle className="line-clamp-2 leading-5">{product.name}</CardTitle>
            <CardDescription>Current price: <span>{product?.initial_price?.toString().replace('.', ',')} {product?.symbol}</span></CardDescription>
            <CardDescription className='text-xs'>Initial price: <span>15,45 €</span></CardDescription>
          </CardHeader>
          <CardContent>
            
              {product.image ? (
                <div className='flex flex-col gap-4 max-h-34'>
                  <Image
                    width={100}
                    height={100}
                    src={product.image}
                    alt="product-img h-34 w-auto"

                    className='self-center object-contain'
                  />
                </div>
              ) : null }
            
          </CardContent>
          <CardFooter className='flex justify-center gap-4 mt-4'>
            <Button
              variant={'outline'}
            >
              <a
                href={product?.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open
              </a>
            </Button>
            <Button
              onClick={async () => {
                if (product) await deleteProduct(product.url_id)}}
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