import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center p-24 gap-10">
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
				Price Tracker
			</h1>
			<Button>Sign in</Button>
		</main>
	);
}
