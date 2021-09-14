export function toCapitalize(input: string) {
	return `${input[0].toUpperCase()}${input.slice(1)}`;
}

export function getArrayPartial(array: any[], key: string, values: string[]) {
	return array.filter((item) => values.includes(item[key]));
}
