import supabaseClient from "@/lib/supabase-client";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";


export const updateUser = async ( id : string ) => {
  if (!id) return
  const { getToken } = auth();
  const supabaseAccessToken = await getToken({ template: "supabase" });
  const supabase = await supabaseClient(supabaseAccessToken);
  
  const { data: updatedUserData } = await supabase
  .from("users")
  .update(
    { last_scraped: new Date().toISOString() }
  )
  .eq("id", id)
  .select()
  console.log('User DB last scraped updated.', updatedUserData)

  revalidatePath('/dashboard')
}