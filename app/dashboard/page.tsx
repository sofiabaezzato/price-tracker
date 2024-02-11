import { fetchData } from '@/actions/fetchDataAction';
import AddUrlForm from '@/components/AddUrlForm';
import ProductList from '@/components/ProductList';
import { getUser } from '@/actions/getUserAction';
import { differenceInMinutes } from 'date-fns';
import { updateProduct } from '@/actions/updateProductAction';
import { updateUser } from '@/actions/updateUserAction';




const Dashboard = async () => {

	const user = await getUser()
	
	const lists = user?.lists

	const data = await fetchData()
 
	if (!data) {
		return
	}
	let products = data.data

	if (user?.last_scraped) {
		const diff = differenceInMinutes(
			new Date(),
			new Date(user.last_scraped)
		)

		if (diff > 60) {
			console.log('Data', diff, 'min old. Scraping new data.')
			products?.map(async product => {
				product = await updateProduct(product)
			})
			
			updateUser(user.id as string)
		}
	}
	
	return (
		<section className="flex flex-col justify-center items-center gap-2 xl:w-[70rem] mx-10">
			<h1 className="text-2xl font-extrabold mb-10">
				Tracked products
			</h1>
			<AddUrlForm lists={lists}/>
			{!products || products.length === 0 ? (
				<p className="mt-8 text-center">Nothing to show here, yet!</p>
				) : <ProductList products={products}/>
			}
			
		</section>
	);
};

export default Dashboard;
