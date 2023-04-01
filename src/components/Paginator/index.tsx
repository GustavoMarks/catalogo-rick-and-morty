import { useApiGet, useAppSelector } from "@/hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Paginator() {

	const { results, info } = useAppSelector((state) => state.page);  // Buscando informações da página carregada no estado global
	const router = useRouter();
	const { page } = router.query;

	const itemsInPage = results?.length || 0;
	const maxItemsInPage = 20;
	let pageNumber: number = 1;

	if (page)
		pageNumber = +page;

	const totalItensAfter = maxItemsInPage * (pageNumber - 1) + 1;

	// Primeiro botão da paginação escolhido de forma dinâmica
	let firstButton = pageNumber < 5 ? 1 : pageNumber - 2;
	// ùltimo botão monstrando um intervalo de 7 botões dinamicamente
	let lastButton: number = firstButton + 6 < (info?.pages || 42) ? firstButton + 6 : (info?.pages || 42);
	if (lastButton === info?.pages) firstButton = lastButton - 6;

	const buttonsNumbers = Array.from({ length: lastButton - firstButton + 1 }, (value, index) => firstButton + index);
	// Salvando variáveis para incluir primeiro e último botões de forma estática caso eles não estejam no array
	const hasButtonPage1 = buttonsNumbers.find(item => item === 1);
	// Caso o penúltimo botão esteja visível dinamicamente, o último também ficará visível
	const hasLastButtonPage = buttonsNumbers.find(item => item === (info?.pages || 42) - 1);

	const pageNavigate = (pageQuery: number) => {
		router.push(`/?page=${pageQuery}`);
	}

	useEffect(() => { }, [page, info]);

	return <div>
		<p> Page {pageNumber}/{info?.pages || page}, {totalItensAfter}~{totalItensAfter - 1 + itemsInPage} </p>
		{!hasButtonPage1 ? <>
			<button onClick={() => pageNavigate(1)} >
				1 </button>...</> : null}

		{buttonsNumbers.map((item, index) => {
			return <button key={index} onClick={() => pageNavigate(item)}>
				{item} </button>
		})}

		{!hasLastButtonPage ? <>...
			<button onClick={() => pageNavigate(info?.pages || 1)}>
				{info?.pages || 1} </button></> : null}
	</div>
}