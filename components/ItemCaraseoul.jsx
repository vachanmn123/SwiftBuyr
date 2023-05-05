import { useState } from "react";

export default function ItemCaraseoul({ item }) {
	const [currentImage, setCurrentImage] = useState(0);

	const nextImg = () => {
		if (currentImage + 1 <= item.imageUrls.length)
			setCurrentImage(currentImage + 1);
	};

	const prevImage = () => {
		if (currentImage - 1 >= 0) setCurrentImage(currentImage - 1);
	};

	return (
		<div className="rounded-box w-64">
			<center>
				<img
					src={item.imageUrls[currentImage]}
					className="w-full fit"
					alt="Product Image"
				/>
				<small>
					{currentImage + 1}/{item.imageUrls.length}
				</small>
				<br />
				<button
					className="btn btn-circle btn-secondary m-1"
					onClick={prevImage}
					disabled={currentImage - 1 < 0}
				>
					{"prev\n<-"}
				</button>
				<button
					className="btn btn-circle btn-primary m-1"
					onClick={nextImg}
					disabled={currentImage + 1 >= item.imageUrls.length}
				>
					{"next\n->"}
				</button>
			</center>
		</div>
	);
}
