import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const handleMessage = async () => {
		const { data } = await axios.post("/api/pages", {
			loveMsg: "Carlister is one of a kind",
		});
		console.log(data);
		return data;
	};

	const handleGetMessage = async () => {
		const { data } = await axios("/api/pages", {
			method: "GET",
			params: {
				name: "bazz",
			},
		});
		console.log(data);
		return data;
	};

	return (
		<>
			<nav>
				<ul>
					<li>Search</li>
				</ul>
			</nav>
			<button onClick={handleMessage}>Click Me to Post</button>
			<button onClick={handleGetMessage}>Click me to Get</button>
			<h1>Hello Next World</h1>
		</>
	);
}
