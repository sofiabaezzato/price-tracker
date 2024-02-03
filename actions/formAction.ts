"use server"

import { isAmazonLink } from "@/lib/checkLink";
import supabaseClient from "@/lib/supabase-client";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import getStaticProps from "./scraper";
import { getUser } from "./getUserAction";

type FormState = {
  message: string,
  errors: string | undefined,
  inputUrl: string
}

export const addUrl = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {  
  const newUrl = formData.get("urlInput")
  
  if (newUrl === null || newUrl === "") {
    return {
      message: "The provided URL is missing or not valid.",
      errors: "Error: invalid link!",
      inputUrl: ""
    }
  }
  const link = isAmazonLink(newUrl as string)
  
  if (link === null) {
    return {
      message: "Double-check your coordinates, and make sure you're pointing to an Amazon star, not a black hole.",
      errors: "Error: not an Amazon product link!",
      inputUrl: ""
    }
  }

  const user = await getUser()
  const userId = user?.id

  if (userId) {
    const response = await getStaticProps(link)
    console.log(response?.error)
    if (response.error !== undefined) return {
      message: "I can't retrive data. Make sure to provide only Amazon product page URLs.",
      errors: "Error, try again!",
      inputUrl: ""
    }

    const props = response.props
    console.log(props)
    if (!props.price) return {
      message: "I can't retrive data. Make sure to provide only Amazon product page URLs.",
      errors: "Error, try again!",
      inputUrl: ""
    }

    const { getToken } = auth();
    const supabaseAccessToken = await getToken({ template: "supabase" });
    const supabase = await supabaseClient(supabaseAccessToken);
    
    const { data: newUrlData } = await supabase
    .from("urls_tracked")
    .insert([
      {
        url: link as string,
        user_id: userId,
        name: props.name,
        initial_price: props.price,
        symbol: props.symbol,
        image: props.image
      }
    ])
    .select()

    console.log(newUrlData)
  }
  
  revalidatePath('/dashboard')

  return {
    message: "success",
    errors: undefined,
    inputUrl: ""
  }
}