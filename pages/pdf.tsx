import { saveAs } from "file-saver";
import JSZip from "jszip";

import { PDFDocument } from "pdf-lib";
import {
	ChangeEventHandler,
	useEffect,
	useRef,
	useState,
} from "react";

export default function Home() {
	const [data] = useState<any[]>([
		{ name: "Clement Bazuaye" },
		{ name: "Calister Bazuaye" },
		{ name: "Titi Omosiva osa Bazuaye" },
	]);

	function createOneCertificate(
		ctx: CanvasRenderingContext2D | null,
		image: HTMLImageElement,
		canvas: HTMLCanvasElement,
		data: {
			name: string;
		},
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
		ctx!.textAlign = "center";
		ctx!.fillText(
			`${data.name}`,
			canvas.width / 2,
			canvas.height / 2,
		);
	}

	const generateCertificates = async (data: any[]) => {
		// Create a new Instance  of JS Zip
		const zip = new JSZip();
		/**
		 *  Loop through the data of certificate holders
		 * and generate their individual certificates
		 */
		for (let holder of data) {
			// Create an HTML Canvas and image
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");
			const image = document.createElement("img");

			//Get the Image to use for the Certificate
			image.src = "/certi.png";

			/**
			 * Wait for the Image to load.
			 * Different images has different sizes which
			 * would take time to load
			 */
			try {
				await new Promise<void>((resolve, reject) => {
					image.onload = function () {
						// Set the dimension of image to the canvas
						canvas.width = image.width;
						canvas.height = image.height;
						createOneCertificate(ctx, image, canvas, holder);
						resolve();
					};
					image.onerror = function () {
						reject(new Error("Failed to load image"));
					};
				});
			} catch (error) {
				console.warn(error);
			}
			// Convert canvas to Data URL
			const base64Image = canvas.toDataURL();

			// Convert Data URL to blob
			const imageBlob = await fetch(base64Image).then((res) =>
				res.blob(),
			);

			// Add Blob to JS Zip Instance
			zip.file(`${holder.name}.png`, imageBlob);
		}

		// Generating the Zip File
		const zipBlob = await zip.generateAsync({ type: "blob" });

		// Save ZipFile
		saveAs(zipBlob, "certificates.zip");
	};
	return (
		<>
			<h2>Canvas Certificate Generator</h2>

			<button onClick={() => generateCertificates(data)}>
				Generate Certificates
			</button>
		</>
	);
}
