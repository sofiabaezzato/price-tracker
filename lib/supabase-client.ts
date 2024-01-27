import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";


const supabaseClient = async (supabaseAccessToken : string | null) => {
	const supabase = createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_KEY as string, {
		global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
	});
	// set Supabase JWT on the client object,
	// so it is sent up with all Supabase requests
	return supabase;
};

export default supabaseClient