"use server"

import { isAmazonLink } from "@/lib/checkLink";
import supabaseClient from "@/lib/supabase-client";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import getStaticProps from "./scraper";

type FormState = {
  message: string,
  errors: string | undefined,
  inputUrl: string
}

export const addUrl = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  const { getToken, userId } = auth();
  
  const newUrl = formData.get("urlInput")
  
  if (newUrl === null || newUrl === "") {
    return {
      message: "The provided URL is missing or not valid.",
      errors: "Error: invalid link!",
      inputUrl: ""
    }
  } else if (!isAmazonLink(newUrl as string)) {
    return {
      message: "Double-check your coordinates, and make sure you're pointing to an Amazon star, not a black hole.",
      errors: "Error: not an Amazon link!",
      inputUrl: ""
    }
  }

  const supabaseAccessToken = await getToken({ template: "supabase" });
  const supabase = await supabaseClient(supabaseAccessToken);

  if (userId) {
    const { props } = await getStaticProps(newUrl)
    const { data } = await supabase
    .from("urls_tracked")
    .insert({ url: newUrl as string, user_id: userId, name: props.name, initial_price: props.price, symbol: props.symbol, image: props.image, last_scraped: props.lastScraped })
    .select()
  }
  
  revalidatePath('/dashboard')

  return {
    message: "success",
    errors: undefined,
    inputUrl: ""
  }
}