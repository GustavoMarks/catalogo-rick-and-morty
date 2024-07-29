/* eslint-disable import/prefer-default-export */
export function getAngle(cx: number, cy: number, ex: number, ey: number): number {
	const dy = ey - cy;
	const dx = ex - cx;
	const rad = Math.atan2(dy, dx);
	const deg = (rad * 180) / Math.PI;
	return deg;
}

export function setMovingEyesAnimation(
	event: MouseEvent,
	setAngleMovingAnimation: (angle: number) => void,
	MAIN_IMG_ID: string,
) {
	const anchor = document.getElementById(MAIN_IMG_ID);
	if (!anchor) return;

	const rekt = anchor.getBoundingClientRect();
	const anchorX = rekt.left + rekt.width / 2;
	const anchorY = rekt.top + rekt.height / 2;

	const mouseX = event.clientX;
	const mouseY = event.clientY;

	const newAngle = getAngle(mouseX, mouseY, anchorX, anchorY);
	setAngleMovingAnimation(newAngle);
}

export function getIdFromApiURL(apiURL: string): string {
	const parts = apiURL.split('/');
	const id = parts[parts.length - 1];
	return String(id);
}

export function convertObjectToQueryString(object: { [key: string]: any }): string {
	let result = '';
	let firstValidFinded = false;
	Object.keys(object).forEach((key) => {
		if (object[key] !== undefined) {
			if (!firstValidFinded) {
				result += `?${key}=${object[key]}`;
				firstValidFinded = true;
			} else {
				result += `&${key}=${object[key]}`;
			}
		}
	});
	return result;
}
