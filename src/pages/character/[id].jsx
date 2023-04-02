import { useEffect, useState } from 'react';
import { useApiGet, useLocalStorageFavorites } from '../../hooks';
import { useRouter } from 'next/router';
import { MdKeyboardBackspace, MdStar, MdCancelPresentation } from 'react-icons/md'

import Image from 'next/image';
import BackgroundImg from '../../assets/background.webp';

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

	return <main className="characterContainer">
		<header>
			<Image id="main-background" src={BackgroundImg} alt="green portal" />
			<span>
				<h1>
					<b>Rick and Morty </b> Catalog
				</h1>
				<p>
					Character page
				</p>
				<button onClick={() => router.back()} > <MdKeyboardBackspace /> return </button>
			</span>
		</header>

		<article>
			{!data ? <h1> Loading... </h1> :
				<span>
					<img id="characterImg" width={200} src={data.image} />
					<aside>
						<h2> {data.name} </h2>
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
						<div>
							<button onClick={handleClickFav} >
								{isFav ? <> <MdCancelPresentation width={30} /> Remove favorite </> :
									<> <MdStar width={30} /> Favorite </>}
							</button>
						</div>
					</aside>
				</span>
			}
		</article>
	</main>
}

export default Character;