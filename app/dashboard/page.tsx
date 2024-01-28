"use client"

import AddUrlForm from '@/components/AddUrlForm';
import TrackingList from '@/components/TrackingList';
import { useToast } from '@/components/ui/use-toast';
import supabaseClient from '@/lib/supabase-client';
import { useAuth } from '@clerk/clerk-react';
import React, { useEffect, useState } from "react";

export type urls = {
	url: string,
	url_id: string;
}

const Dashboard = () => {
	const { getToken } = useAuth();
	const [urls, setUrls] = useState<urls[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const { toast } = useToast()


 
  useEffect(() => {

		const fetchData = async () => {
			try {
				setIsLoading(true)

				// Get the user JWT from Clerk
				const supabaseAccessToken = await getToken({ template: 'supabase' });
				const supabase = await supabaseClient(supabaseAccessToken);
				
				// Get data from supabase db
				const { data } = await supabase.from('urls_tracked').select('url, url_id');
				
				if (data) {
					setUrls(data);
				}
			} catch (error) {
				toast({
					variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request. Try again.",
        })
			} finally {
				setIsLoading(false)
			}
		}
    
		fetchData()
	}, [])

	const handleDelete = async (urlId: string) => {
		try {
			setIsLoading(true)

			const supabaseAccessToken = await getToken({ template: 'supabase' });
			const supabase = await supabaseClient(supabaseAccessToken);

			const { error } = await supabase.from('urls_tracked').delete().eq('url_id', urlId);
			const filteredUrls = urls.filter(url => url.url_id !== urlId)
			setUrls(filteredUrls)

			if (error) {
				toast({
					variant: "destructive",
					title: "Uh oh! Something went wrong.",
					description: "There was a problem with your request. Try again."
				})
			}
		} catch (error) {
			
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<section className="flex flex-col justify-center items-center gap-10 xl:max-w-[70rem] mx-10">
			<h1 className="text-xl font-extrabold">
				Dashboard
			</h1>
			<AddUrlForm />

			{isLoading ? <div>Loading...</div>
			:
			<TrackingList urls={urls} handleDelete={handleDelete}/>
			}
		</section>
	);
};

export default Dashboard;
