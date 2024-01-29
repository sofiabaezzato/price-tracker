import { fetchData } from '@/actions/fetchDataAction';
import AddUrlForm from '@/components/AddUrlForm';
import TrackingList from '@/components/TrackingList';
import { toast, useToast } from '@/components/ui/use-toast';
import supabaseClient from '@/lib/supabase-client';
import { useAuth } from '@clerk/clerk-react';
import React, { useEffect, useState } from "react";
import ProductList from '@/components/ProductList';

export type products = {
  url: string,
  url_id: string
}[] | null

const Dashboard = async () => {
	const fetchedData = await fetchData()

  if (!fetchedData) {
    toast({
			variant: "destructive",
			title: "Uh oh! Something went wrong.",
			description: "There was a problem with your request. Try again."
		})
		return
  }

  const products = fetchedData.success

	if (!products) return <p className="">Nothing to show here.</p>
	

	/* const handleDelete = async (urlId: string) => {
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
	} */

	return (
		<section className="flex flex-col justify-center items-center gap-2 xl:max-w-[70rem] mx-10">
			<h1 className="text-2xl font-extrabold mb-10">
				Tracked products
			</h1>
			<AddUrlForm />
			<ProductList products={products} />
			
		</section>
	);
};

export default Dashboard;
