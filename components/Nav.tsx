"use client";

import React from "react";
import Link from "next/link";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

const Nav = () => {
	const { user, isLoaded } = useUser();

	return (
		<nav className="w-full p-4 border-b border-slate-200">
			<div className="max-w-[70rem] mx-auto flex justify-between items-center">
				<Link href={"/"}>Home</Link>

				{isLoaded && user ? (
					<div className="flex gap-2 items-center">
						<Link href={"/dashboard"}>Dashboard</Link>
						<UserButton afterSignOutUrl="/" />
					</div>
				) : (
					<SignInButton afterSignInUrl="/dashboard" />
				)}
			</div>
		</nav>
	);
};

export default Nav;
