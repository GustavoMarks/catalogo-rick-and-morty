import { useEffect, useState } from 'react';
import { useApiGet, useLocalStorageFavorites } from '../../hooks';
import { useRouter } from 'next/router';

const Character = () => {

	const [data, setData] = useState(null);
	const [favs, setFavs] = useState([]);

	const apiGet = useApiGet();
	const router = useRouter();
	const favsStorage = useLocalStorageFavorites();

	const { id } = router.query;

	const requestData = async () => { if (id) await apiGet.request(`/character/${id}`) };
	const isFav = favs.find(item => String(item) === id);

	const handleClickFav = () => {
		if (isFav) favsStorage.removeItem(id);
		else favsStorage.setNewItem(id);

		setFavs(favsStorage.getItems());
	}

	useEffect(() => {
		if (apiGet.error) router.push("/");

		if (!apiGet.loaded) requestData();
		else setData(apiGet.data);

		setFavs(favsStorage.getItems());
	}, [apiGet.data, id, apiGet.error]);

	return <main>
		<button onClick={() => router.back()} > voltar </button>
		{!data ? <h1> Loading... </h1> :
			<div>
				<img src={data.image} />
				<aside>
					<h3> {data.name} </h3>
					<div>
						<p>
							<span> Status: </span>
							{data.status} </p>
					</div>
					<div>
						<p>
							<span> Species: </span>
							{data.species} </p>
					</div>
					<div>
						<p>
							<span> Type: </span>
							{data.type || "--"} </p>
					</div>
					<div>
						<p>
							<span> Gender: </span>
							{data.gender || "--"} </p>
					</div>
					<div>
						<p>
							<span> Origin: </span>
							{data.origin?.name || "--"} </p>
					</div>
					<div>
						<p>
							<span> Location: </span>
							{data.location?.name} </p>
					</div>
				</aside>
				<button onClick={handleClickFav} >
					{isFav ? "Remove favorite" : "Favorite"}
				</button>
			</div>
		}
	</main>
}

export default Character;