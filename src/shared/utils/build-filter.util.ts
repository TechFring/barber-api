/* eslint-disable @typescript-eslint/no-explicit-any */
export default function buildFilterUtil(obj: any) {
	const ignoredKeys = ['page', 'per_page'];
	const filters = Object.keys(obj).filter(key => obj[key] && !ignoredKeys.includes(key));

	if (!filters.length) {
		return { query: '', parameters: {} }
	}

	const query = filters.map(key => {
		const operator = isNaN(obj[key]) ? 'LIKE' : '=';
		return `${key} ${operator} :${key}`
	}).join(' AND ');

	const parameters: any[] = filters.map(key => {
		if (isNaN(obj[key]))
			return { [key]: `%${obj[key]}%` };
		else
			return { [key]: obj[key] };
	});

	return { query, parameters: Object.assign({}, ...parameters)}
}
