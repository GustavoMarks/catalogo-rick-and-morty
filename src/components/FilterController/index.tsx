import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { MdStar, MdFilterAlt, MdSearch, MdFilterAltOff } from 'react-icons/md'

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

	return <form className="filter-form" onSubmit={submitFilterAply}>
		<button id="showFavsBtn" type="button" onClick={filterFavs} >
			{showFavs ?
				<> <MdFilterAlt size={20} /> see filters </> :
				<> <MdStar size={20} /> see favorites </>}
		</button>
		{!showFavs ?
			<fieldset disabled={showFavs}>
				<label> name:
					<input value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder="filter by..." />
				</label>
				<label> status:
					<select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} >
						<option value="" > Select a status... </option>
						{statusOptions.map((item, index) => {
							return <option key={index} value={item}>{item}</option>
						})}
					</select>
				</label>
				<label> species:
					<input value={speciesInput} onChange={(e) => setSpeciesInput(e.target.value)} placeholder="filter by..." />
				</label>
				<label> type:
					<input value={typeInput} onChange={(e) => setTypeInput(e.target.value)} placeholder="filter by..." />
				</label>
				<label> gender:
					<select value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)} >
						<option value="" > Select a gender... </option>
						{genderOptions.map((item, index) => {
							return <option key={index} value={item}>{item}</option>
						})}
					</select>
				</label>

				<span>
					<button type="submit" >
						<MdSearch size={20} /> Search </button>
					<button type="button" id="clearFilters" onClick={clearInputs} >
						<MdFilterAltOff size={20} /> Clear </button>
				</span>
			</fieldset> : null
		}
	</form>
}

