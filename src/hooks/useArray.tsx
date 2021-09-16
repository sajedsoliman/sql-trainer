import { useState } from "react";

function useArray<T>(defaultValue: T[] | (() => T[])) {
	const [array, setArray] = useState(() => {
		if (typeof defaultValue === "function") {
			return defaultValue();
		} else return defaultValue;
	});

	function push(element: T) {
		setArray((a) => [...a, element]);
	}

	function filter(callback: (value: T) => boolean) {
		setArray((a) => a.filter(callback));
	}

	function update(index: number, item: (value: T) => T) {
		setArray((a) =>
			a.map((el, idx) => (idx === index ? item(array[index]) : el))
		);
	}

	function remove(index: number) {
		setArray((a) => [
			...a.slice(0, index),
			...a.slice(index + 1, a.length - 1),
		]);
	}

	function clear() {
		setArray([]);
	}

	return { array, set: setArray, push, filter, update, remove, clear };
}

export default useArray;
