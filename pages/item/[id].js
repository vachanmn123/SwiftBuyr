import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ItemCaraseoul from "../../components/ItemCaraseoul";

export default function ItemListing() {
	const router = useRouter();
	const { id } = router.query;
	const [item, setItem] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!id) return;
		fetch(`/api/getItem?id=${id}`).then((res) =>
			res.json().then((data) => {
				setItem(data);
				setLoading(false);
			})
		);
	}, [id]);
	if (loading) return <div>Loading...</div>;
	return (
		<div className="m-3">
			<ItemCaraseoul item={item} />
		</div>
	);
}
