"use server"

import supabaseClient from "@/lib/supabase-client";
import { auth } from "@clerk/nextjs";

export const getUser = async  () => {
  const { getToken, userId } = auth();
  const supabaseAccessToken = await getToken({ template: "supabase" });
  const supabase = await supabaseClient(supabaseAccessToken);

  const { data: userData } = await supabase
  .from('users')
  .select()

  // if user doesn't exist, add a new user in the users table
  if (userData?.length === 0 && userId) {
    console.log('User not found. Adding a new user in users table')
    
    const { data: userData } = await supabase
    .from("users")
    .insert({ id: userId, last_scraped: new Date().toISOString() })
    .select()

    console.log('New user added to users table: ', userData)
    if (userData) return userData[0]
  }

  console.log('User found: ', userData)
  if (userData) return userData[0]
}