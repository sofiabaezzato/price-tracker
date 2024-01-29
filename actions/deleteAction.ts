"use server"

import supabaseClient from "@/lib/supabase-client";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

const deleteProduct = async (urlId: string) => {
	const { getToken, userId } = auth();

  if (!userId) {
    throw Error('Unauthenticated user!')
  }

  try {
    // Get the user JWT from Clerk
    const supabaseAccessToken = await getToken({ template: 'supabase' });
    const supabase = await supabaseClient(supabaseAccessToken);

    const { error } = await supabase.from('urls_tracked').delete().eq('url_id', urlId);

    revalidatePath('/dashboard')

  } catch (error) {
    console.log(error)
  }
}

export default deleteProduct