"use server"

import supabaseClient from "@/lib/supabase-client";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export const fetchData = async () => {
	const { getToken, userId } = auth();

  if (!userId) {
    throw Error('Unauthenticated user!')
  }

  try {
    // Get the user JWT from Clerk
    const supabaseAccessToken = await getToken({ template: 'supabase' });
    const supabase = await supabaseClient(supabaseAccessToken);
    
    const { data } = await supabase
    .from('urls_tracked')
    .select(`
      *,
      users (
        id,
        last_scraped
      )
    `)

    revalidatePath('/dashboard')

    return { data }

  } catch (error) {
    return { error: "Something went wrong" }
  }
}