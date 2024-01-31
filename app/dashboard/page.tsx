import { fetchData } from '@/actions/fetchDataAction';
import AddUrlForm from '@/components/AddUrlForm';
import ProductList from '@/components/ProductList';

const Dashboard = async () => {
	const fetchedData = await fetchData()

  const products = fetchedData.success
	
	console.log(products)
	if (!products) {
		return
	}

	return (
		<section className="flex flex-col justify-center items-center gap-2 xl:max-w-[70rem] mx-10">
			<h1 className="text-2xl font-extrabold mb-10">
				Tracked products
			</h1>
			<AddUrlForm />
			{!products || products.length === 0 ? (
				<p className="mt-8 text-center">Nothing to show here, yet!</p>
				) : <ProductList products={products}/>
			}
			
		</section>
	);
};

export default Dashboard;
