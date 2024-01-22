import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Nav from "@/components/Nav";
import { ClerkProvider } from '@clerk/nextjs'

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
					<div className="flex justify-center items-center p-24">
						{children}
					</div>
				</body>
			</html>
		</ClerkProvider>
	);
}
