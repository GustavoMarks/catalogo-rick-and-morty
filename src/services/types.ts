export interface InfoPaginationSchema {
	count: number; // The length of the response
	pages: number; // The amount of pages
	next?: string; // Link to the next page
	prev?: string; // Link to the previous page
}
