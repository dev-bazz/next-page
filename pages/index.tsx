import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const [myData, setMyData] = useState<null | {
		name: string;
		data: { products: { name: string }[] };
	}>();
	useEffect(() => {
		const handleHelloApi = async () => {
			const { data } = await axios.get("/api/hello");
			setMyData(data);
			console.log(data);
		};
		handleHelloApi();
	}, []);
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

					{myData && (
						<>
							<h1>{myData.name}</h1>
						</>
					)}
				</ul>
			</nav>
			<button onClick={handleMessage}>Click Me to Post</button>
			<button onClick={handleGetMessage}>Click me to Get</button>
			<h1>Hello Next World</h1>
		</>
	);
}
