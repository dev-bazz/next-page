import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios";
import {
	ChangeEventHandler,
	useEffect,
	useRef,
	useState,
} from "react";
import styles from "./styles.module.scss";
import { PDFDocument } from "pdf-lib";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const downLoad = useRef<HTMLAnchorElement>(null);
	const [name, setName] = useState<string>("");
	const [urlDownload, setURLDownload] = useState("");

	const generatePDF = async (params: any) => {
		const exByte = await fetch("/cet.pdf"),
			res = await exByte.arrayBuffer();

		const pdfDoc = await PDFDocument.load(res),
			uri = await pdfDoc.saveAsBase64({
				dataUri: true,
			});
		const encoder = new TextEncoder();
		const uriArr = encoder.encode(uri);
		const blobData = new Blob([uriArr], {
			type: "application/pdf",
		});
		const pdfURL = URL.createObjectURL(blobData);

		return uri;
	};

	useEffect(() => {
		drawCanvas();
	});

	function drawCanvas() {
		// Create Canvas
		const canvas = document.createElement("canvas");
		canvas.width = 1080;
		canvas.height = 800;
		const ctx = canvas.getContext("2d");
		// Get Image
		const image = document.createElement("img");
		image.src = "/certi.png";
		image.onload = function () {
			// Draw On the Canvas
			ctx?.drawImage(
				image,
				0,
				0,
				canvas?.width || 0,
				canvas?.height || 0,
			);
			ctx!.font = `48px monotype corsiva`;
			ctx!.fillStyle = `#29e`;
			ctx!.fillText(
				`${name}`,
				canvas.width / 2 - 150,
				canvas.height / 2 - 30,
			);
			if (name) {
				setURLDownload(canvas.toDataURL());
			}
		};
	}

	function drawImage(
		ctx: CanvasRenderingContext2D | null,
		image: HTMLImageElement,
		canvas: HTMLCanvasElement,
	) {
		ctx?.drawImage(
			image,
			0,
			0,
			canvas?.width || 0,
			canvas?.height || 0,
		);
		ctx!.font = `48px monotype corsiva`;
		ctx!.fillStyle = `#29e`;
		ctx!.fillText(
			`${name}`,
			canvas.width / 2 - 150,
			canvas.height / 2 - 30,
		);
		if (name) {
			setURLDownload(canvas.toDataURL());
		}
	}

	function handleName(e: React.ChangeEvent<HTMLInputElement>) {
		setName(e.target.value);
	}

	return (
		<>
			<h2>Canvas Certificate Generator</h2>

			<input
				type="text"
				value={name || ""}
				onChange={handleName}
			/>
			<a
				download={`${name}.png`}
				ref={downLoad}
				href={urlDownload}
			>
				Download Certificate
			</a>
		</>
	);
}
