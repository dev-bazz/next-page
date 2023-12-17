import { saveAs } from "file-saver";
import JSZip from "jszip";

import { PDFDocument } from "pdf-lib";
import {
	ChangeEventHandler,
	useEffect,
	useRef,
	useState,
} from "react";

interface dataType {
	"Participant's Name": string;
	"Employer(Client)": string;
	"Course Title": string;
	"Course Date:(MM/DD/YYYY)": string;
}
export default function Home() {
	const [data] = useState<dataType[]>([
		{
			"Participant's Name": "Clement Bazuaye",
			"Employer(Client)": "InterSwitch",
			"Course Title": "Intro to Webdev",
			"Course Date:(MM/DD/YYYY)": "11/12/2023",
		},
		{
			"Participant's Name": "Jane Doe",
			"Employer(Client)": "Tech Solutions Inc.",
			"Course Title": "Advanced JavaScript",
			"Course Date:(MM/DD/YYYY)": "11/15/2023",
		},
		{
			"Participant's Name": "John Smith",
			"Employer(Client)": "Data Innovators",
			"Course Title": "Data Science Fundamentals",
			"Course Date:(MM/DD/YYYY)": "11/18/2023",
		},
	]);

	function createOneCertificate(
		ctx: CanvasRenderingContext2D | null,
		image: HTMLImageElement,
		canvas: HTMLCanvasElement,
		data: dataType,
	) {
		ctx?.drawImage(
			image,
			0,
			0,
			canvas?.width || 0,
			canvas?.height || 0,
		);

		// Holder Name
		ctx!.font = `48px monotype corsiva`;
		ctx!.fillStyle = `#29e`;
		ctx!.textAlign = "center";
		ctx!.fillText(
			`${data[`Participant's Name`]}`,
			canvas.width / 2,
			canvas.height / 2 - 50,
		);

		//  Course Title
		ctx!.font = ` 32px monotype corsiva`;
		ctx!.fillText(
			`${data["Course Title"]}`,
			canvas.width / 2,
			canvas.height / 2 + 80,
		);

		// Issued Date
		ctx!.font = ` 28px monotype corsiva`;
		ctx!.fillText(
			`${data["Course Date:(MM/DD/YYYY)"]}`,
			canvas.width / 2 - 200,
			canvas.height / 2 + 130,
		);

		// Employer Name
		ctx!.font = ` 32px monotype corsiva`;
		ctx!.fillText(
			`${data["Course Title"]}`,
			canvas.width / 2,
			canvas.height / 2 + 80,
		);
	}

	const generateCertificates = async (data: dataType[]) => {
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
						canvas.width = 1056;
						canvas.height = 816;

						console.log(image.width, image.height, image.src);
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
			zip.file(`${holder["Participant's Name"]}.png`, imageBlob);
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
