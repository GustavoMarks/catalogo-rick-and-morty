import { useEffect, useState } from 'react';
import { useApiGet } from '../../hooks';
import { useRouter } from 'next/router';

const Character = () => {

	const [data, setData] = useState(null);
	const apiGet = useApiGet();
	const router = useRouter();
	const { id } = router.query;

	const requestData = async () => await apiGet.request(`/character/${id}`);

	useEffect(() => {
		if (!apiGet.loaded) requestData();
		else setData(apiGet.data);

	}, [apiGet.data]);

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
				<button> Favorite </button>
			</div>
		}
	</main>
}

export default Character;