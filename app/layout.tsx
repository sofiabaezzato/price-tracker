import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Nav from "@/components/Nav";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
	title: "Price Tracker",
	description: "Track products' price and save money",
};

export const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body
					className={cn(
						"h-screen bg-background font-sans antialiased",
						fontSans.variable,
					)}
				>
					<Nav />
					<main className="flex flex-col justify-center items-center py-20 w-full">
						{children}
					</main>
					<Toaster />
				</body>
			</html>
		</ClerkProvider>
	);
}
