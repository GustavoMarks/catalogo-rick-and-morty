import { useAppSelector } from "@/hooks";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function CharactersTable() {

	const { results, info } = useAppSelector((state) => state.page);
	const router = useRouter();

	const goToCharacterPage = (id: number) => {
		return router.push(`/character/${id}`);
	}

	useEffect(() => {
		// Rendização a cada novo request de página na API
	}, [results, info]);

	if (!results || results?.length < 1) return <p> Nothing to see... </p>

	return <div id="centerContainer">
		<div id="scrollerContainer">
			<table className="characterTable">
				<thead>
					<tr>
						<th> Characther </th>
						<th> Status </th>
						<th> Species </th>
						<th> Type </th>
						<th> Gender </th>
						<th> Origin </th>
						<th> Location </th>
					</tr>
				</thead>
				<tbody>
					{results?.map((item, index) => {
						return <tr key={index} onClick={() => goToCharacterPage(item.id)} >
							<td>{item.name}</td>
							<td>{item.status}</td>
							<td>{item.species}</td>
							<td>{item.type || "--"}</td>
							<td>{item.gender}</td>
							<td>{item.origin?.name || "--"}</td>
							<td>{item.location?.name || "--"}</td>
						</tr>
					})}
				</tbody>
			</table>
		</div>
	</div>
}
