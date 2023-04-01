import { useAppSelector } from "@/hooks";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function CharactersTable() {

	const result = useAppSelector((state) => state.page);
	const router = useRouter();

	const goToCharacterPage = (id: number) => {
		return router.push(`/character/${id}`);
	}

	useEffect(() => {
		// Rendização a cada novo request de página na API
	}, [result]);

	return <>
		<div>
			<input placeholder="Search..." />
		</div>
		<table>
			<thead>
				<tr>
					<th> Characther </th>
					<th> Status </th>
					<th> Species </th>
					<th> Type </th>
					<th> Gender </th>
				</tr>
			</thead>
			<tbody>
				{result?.results?.map((item, index) => {
					return <tr key={index} onClick={() => goToCharacterPage(item.id)} >
						<td>{item.name}</td>
						<td>{item.status}</td>
						<td>{item.species}</td>
						<td>{item.type || "--"}</td>
						<td>{item.gender}</td>
					</tr>
				})}
			</tbody>
		</table>
	</>
}
