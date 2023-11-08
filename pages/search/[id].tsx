import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";

export default function Query() {
	const router = useRouter();
	const params = useParams();
	console.log(router.query);
	return (
		<div>
			<h1>Query Page</h1>
			<p>hello {params?.id || "Null"}</p>
		</div>
	);
}
