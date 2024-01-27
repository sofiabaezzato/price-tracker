"use client";

import React from "react";
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";

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
					<div className="flex gap-2">
						<Button><SignInButton /></Button>
						<SignUpButton afterSignInUrl="/dashboard" />
					</div>
				)}
			</div>
		</nav>
	);
};

export default Nav;
