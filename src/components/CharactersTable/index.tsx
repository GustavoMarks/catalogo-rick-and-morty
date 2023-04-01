import { useAppSelector } from "@/hooks"
import { useEffect } from "react"

export default function CharactersTable() {

	const result = useAppSelector((state) => state.page);

	useEffect(() => {
		// Rendização a cada novo request de página na API
	}, [result])

	return <>
		<div>
			<input placeholder="pesquisar..." />
		</div>
		<table>
			<thead>
				<tr>
					<th> Personagem </th>
					<th> Status </th>
					<th> Espécie </th>
					<th> Tipo </th>
					<th> Gênero </th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Rick Sanchez</td>
					<td>Vivo</td>
					<td>Humano</td>
					<td>--</td>
					<td>Masculino</td>
				</tr>
			</tbody>
		</table>
	</>
}
