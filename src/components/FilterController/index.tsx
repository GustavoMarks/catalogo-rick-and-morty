import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

const statusOptions = [
	"alive", "dead", "unknown"
];

const genderOptions = [
	"female", "male", "genderless", "unknown"
];

export default function FilterController() {

	const [nameInput, setNameInput] = useState("");
	const [speciesInput, setSpeciesInput] = useState("");
	const [typeInput, setTypeInput] = useState("");

	const [selectedStatus, setSelectedStatus] = useState("");
	const [selectedGender, setSelectedGender] = useState("");

	const [showFavs, setShowFavs] = useState(false);

	const router = useRouter();
	const { fav } = router.query;

	const clearInputs = () => {
		setNameInput("");
		setSpeciesInput("");
		setTypeInput("");
		setSelectedStatus("");
		setSelectedGender("");
	}

	const filterFavs = async () => {
		if (!showFavs) {
			setShowFavs(true);
			router.push("/?fav=true");
		} else {
			setShowFavs(false);
			router.push("/?page=1");
		}
	}

	const submitFilterAply = (e: FormEvent) => {
		e.preventDefault();

		let query = '/?page=1';

		if (nameInput) query += `&name=${nameInput}`;
		if (speciesInput) query += `&species=${speciesInput}`;
		if (typeInput) query += `&type=${typeInput}`;
		if (selectedStatus) query += `&status=${selectedStatus}`;
		if (selectedGender) query += `&gender=${selectedGender}`;

		return router.push(query);
	}

	useEffect(() => {
		if (fav) setShowFavs(true);

	}, [fav])

	return <form onSubmit={submitFilterAply}>
		<button type="button" onClick={filterFavs} > {showFavs ? "clear favorites" : "see favorites"} </button>
		<fieldset disabled={showFavs}>
			<label> Name: </label>
			<input value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder="filter by..." />
			<label> Status: </label>
			<select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} >
				<option value="" > Select a status... </option>
				{statusOptions.map((item, index) => {
					return <option key={index} value={item}>{item}</option>
				})}
			</select>
			<label> Species: </label>
			<input value={speciesInput} onChange={(e) => setSpeciesInput(e.target.value)} placeholder="filter by..." />
			<label> Type: </label>
			<input value={typeInput} onChange={(e) => setTypeInput(e.target.value)} placeholder="filter by..." />
			<label> Gender: </label>
			<select value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)} >
				<option value="" > Select a gender... </option>
				{genderOptions.map((item, index) => {
					return <option key={index} value={item}>{item}</option>
				})}
			</select>

			<span>
				<button type="submit" > Search </button>
				<button type="button" onClick={clearInputs} > Clear </button>
			</span>
		</fieldset>
	</form>
}

