"use server"

import supabaseClient from "@/lib/supabase-client";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import getStaticProps from "./scraper";
import { product } from "@/components/ProductList";


export const updateProduct = async (product : product) => {
  const updatedProduct = await getStaticProps(product.url)
  const updatedPrice = updatedProduct.props?.price

  const { getToken } = auth();
  const supabaseAccessToken = await getToken({ template: "supabase" });
  const supabase = await supabaseClient(supabaseAccessToken);

  if (updatedPrice && updatedPrice !== product.current_price) {
    product.current_price = updatedPrice
    console.log('Price updated. New price: ', updatedPrice)
    
    const { data: updatedUrlData } = await supabase
    .from("urls_tracked")
    .update(
      { current_price: updatedPrice }
    )
    .eq("id", product.id)
    .select()
    console.log('URL DB price updated.', updatedUrlData)
  }

  const { data: updatedUserData } = await supabase
  .from("users")
  .update(
    { last_scraped: new Date().toISOString() }
  )
  .eq("id", product.user_id)
  .select()
  console.log('User DB last scraped updated.', updatedUserData)

  revalidatePath('/dashboard')

  return product
}