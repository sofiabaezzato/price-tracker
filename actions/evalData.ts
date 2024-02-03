"use server"

import supabaseClient from "@/lib/supabase-client"
import { auth } from "@clerk/nextjs"
import { differenceInMinutes } from "date-fns"
import getStaticProps from "./scraper"
import { revalidatePath } from "next/cache"
import { product } from "@/components/ProductList"

export const evalData = async ( data : product) => {
  if (!data) return
  const last_scraped = data.last_scraped
  const link = data.url
  const urlId = data.url_id

  if (!last_scraped) return
  const diff = differenceInMinutes(
    new Date(),
    new Date(last_scraped)
  )

  // If last scraped data is older then 60 minutes, scrape again and update db
  if (diff > 5) {
    console.log('Scraping newer data', diff,last_scraped, new Date())
    
    const { getToken, userId } = auth();
    const supabaseAccessToken = await getToken({ template: "supabase" });
    const supabase = await supabaseClient(supabaseAccessToken);

    if (userId) {
      const response = await getStaticProps(link)
      console.log(response)
      if (response.error) {
        return {
        message: "Error",
        errors: "Can\'t retrive product data. Try again",
        data: undefined
      }}

      const props = response.props
      const { data } = await supabase
      .from("urls_tracked")
      .update({ current_price: props?.price, last_scraped: props?.lastScraped })
      .eq('url_id', urlId)
      .select('url, url_id, name, symbol, initial_price, current_price, image, last_scraped')

      revalidatePath('/')
      console.log('Path revalidated')
      if (data) {
        return {
          message: "success",
          errors: undefined,
          data: data[0]
        }
      }
    }
  } else {
    return {
      message: "success",
      errors: undefined,
      data: data
    }
  }
}

