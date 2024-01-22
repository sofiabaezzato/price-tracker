import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation';

export default function Home() {
	const { userId } = auth()

	if (userId) redirect('/dashboard')
	return (
		<main className="flex h-screen flex-col items-center gap-10">
			<h1 className="text-4xl font-extrabold lg:text-5xl">
				Price Tracker Home
			</h1>
		</main>
	);
}
