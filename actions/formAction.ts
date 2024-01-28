"use server"

import { isAmazonLink } from "@/lib/checkLink";
import supabaseClient from "@/lib/supabase-client";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

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
      message: "No input",
      errors: "noLink",
      inputUrl: ""
    };
  } else if (!isAmazonLink(newUrl as string)) {
    return {
      message: "Not an amazon link",
      errors: "noAmazon",
      inputUrl: ""
    }
  }

  const supabaseAccessToken = await getToken({ template: "supabase" });
  const supabase = await supabaseClient(supabaseAccessToken);

  if (userId) {
    const { data } = await supabase
    .from("urls_tracked")
    .insert({ url: newUrl as string, user_id: userId })
    .select()
  }
  revalidatePath('/dashboard')

  return {
    message: "success",
    errors: undefined,
    inputUrl: ""
  }
}