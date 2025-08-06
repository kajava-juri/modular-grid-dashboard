export function cssStringify(obj: Record<string, string>): string {
	return Object.keys(obj)
		.map((k) => `${k}: ${obj[k]}`)
		.join(';');
}
