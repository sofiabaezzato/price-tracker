"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import deleteProduct from "@/actions/deleteAction"
import { formatDate } from 'date-fns'

export type product = {
  created_at: string;
  current_price: number | null;
  id: string;
  image: string | null;
  initial_price: number | null;
  list: string | null;
  name: string | null;
  symbol: string | null;
  url: string;
  user_id: string;
  users: {
      id: string,
      last_scraped: string | null
  } | null;
}

const ProductList = ( {products} : {products: product[]} ) => {
  let updatedAt = 'undefined'
  if (products[0].users?.last_scraped) {
    updatedAt = formatDate(products[0].users?.last_scraped, "dd MMM yyyy kk:mm ")
  }
  return (
    <div className="flex flex-col">
      <p className="text-xs text-gray-600 mt-4 text-center">Data updated every hour. Last update: {updatedAt}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-10 w-full">
        {products.map(product => (
          <Card
            key={product.id}
            className="flex flex-col justify-between"
          >
            <CardHeader>
              <CardTitle className="line-clamp-2 leading-5">{product.name}</CardTitle>
              <CardDescription>Current price: {!product?.current_price ? (
                <span>{product?.initial_price?.toFixed(2).replace('.', ',')} {product?.symbol}</span>
                ) : (
                  <span>{product?.current_price?.toFixed(2).replace('.', ',')} {product?.symbol}</span>
                )}
              </CardDescription>
              {product?.current_price === product?.initial_price || !product?.current_price ? null : (
                <CardDescription className='text-xs'>
                  Initial price: <span>{product?.initial_price?.toString().replace('.', ',')} {product?.symbol}</span>
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
      
                {product.image ? (
                  <div className='flex flex-col gap-4'>
                    <Image
                      width={100}
                      height={100}
                      src={product.image}
                      alt="product-img"
                      className='self-center object-contain max-h-32 w-auto'
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
                  if (product) await deleteProduct(product.id)}}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ProductList