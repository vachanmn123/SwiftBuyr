export default function ItemCaraseoul({ item }) {
	return (
		<div className="w-64 carousel rounded-box">
			{item.imageUrls.map((image, index) => (
				<div className="carousel-item w-full">
					<img src={image} className="w-full" alt="Product Image" />
				</div>
			))}
		</div>
	);
}
