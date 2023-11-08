import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function NotFound() {
	return (
		<div>
			<h1>NotFound</h1>
		</div>
	);
}

const Nav = () => {
	const router = useRouter();
	return (
		<nav>
			<ul>
				{/* Add your navigation items here */}
				<Link href={"Home"}> hdhhd</Link>
			</ul>
		</nav>
	);
};
