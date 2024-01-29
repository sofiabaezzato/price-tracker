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

    const { data } = await supabase.from('urls_tracked').select('url, url_id');

    revalidatePath('/dashboard')

    return { success: data }

  } catch (error) {
    return { error }
  }
}