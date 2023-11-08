import React from "react";
import fs from "fs/promises";
import path from "path";
interface props {
	products: { name: string }[];
}

export default function Search(props: props) {
	const { products } = props;

	console.log(products);
	return (
		<>
			<h1>Search</h1>
			{products.map((value, key) => (
				<div key={key}>{value.name}</div>
			))}
		</>
	);
}

export async function getStaticProps() {
	const filePath = path.join(
		process.cwd(),
		"data",
		"data.json",
	);

	const jsonData: string = await fs.readFile(
		filePath,
		"utf-8",
	);

	const data = JSON.parse(jsonData);
	return {
		props: {
			products: data.products,
		},
	};
}
