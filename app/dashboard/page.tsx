import { evalData } from '@/actions/evalData';
import { fetchData } from '@/actions/fetchDataAction';
import AddUrlForm from '@/components/AddUrlForm';
import ProductList, { product } from '@/components/ProductList';
import { revalidatePath } from 'next/cache';

const Dashboard = async () => {
	const fetchedData = await fetchData()
  const products = fetchedData.success
	if (!products) return

	const updatedProducts : product[] = []

	products?.map(async product => {
		const updatedProduct = await evalData(product)

		if (updatedProduct?.errors) {
			console.log(updatedProduct.errors)
		} else if (updatedProduct?.data) {
			updatedProducts.push(updatedProduct.data)
		}
	})

	revalidatePath('/dashboard')

	return (
		<section className="flex flex-col justify-center items-center gap-2 xl:max-w-[70rem] mx-10">
			<h1 className="text-2xl font-extrabold mb-10">
				Tracked products
			</h1>
			<AddUrlForm />
			{!products || products.length === 0 ? (
				<p className="mt-8 text-center">Nothing to show here, yet!</p>
				) : <ProductList products={updatedProducts}/>
			}
			
		</section>
	);
};

export default Dashboard;
