import {test} from "tap";
import { SortedArray } from "../src/index";

test("SortedArray",  (t) => {
	t.test("constructor with items", (t) => {
		const sortedArray = new SortedArray([3, 2, 1]);
		t.equal(sortedArray.length, 3);
		t.same(sortedArray, [1, 2, 3]);
		t.end();
	});

	t.test("constructor with items and comparator", (t) => {
		const comparator = (a: number, b: number) => b - a;
		const sortedArray = new SortedArray([1, 2, 3], comparator);
		t.equal(sortedArray.length, 3);
		t.same(sortedArray, [3, 2, 1]);
		t.end();
	});

	t.test("constructor with comparator", (t) => {
		const comparator = (a: number, b: number) => b - a;
		const sortedArray = new SortedArray(comparator);
		sortedArray.push(1, 2, 3);
		t.equal(sortedArray.length, 3);
		t.same(sortedArray, [3, 2, 1]);
		t.end();
	});

	t.test("insert", (t) => {
		const sortedArray = new SortedArray<number>();
		sortedArray.insert(1);
		sortedArray.insert(3);
		sortedArray.insert(2);
		t.equal(sortedArray.length, 3);
		t.same(sortedArray, [1, 2, 3]);
		t.end();
	});

	t.test("push", (t) => {
		const sortedArray = new SortedArray<number>();
		sortedArray.push(1, 3, 2);
		t.equal(sortedArray.length, 3);
		t.same(sortedArray, [1, 2, 3]);
		t.end();
	});

	t.test("unshift", (t) => {
		const sortedArray = new SortedArray<number>();
		sortedArray.unshift(1, 3, 2);
		t.equal(sortedArray.length, 3);
		t.same(sortedArray, [1, 2, 3]);
		t.end();
	});

	t.test("splice", (t) => {
		const sortedArray = new SortedArray<number>();
		sortedArray.push(1, 2, 3);
		t.throws(() => sortedArray.splice(1, 1));
		t.end();
	});

	t.test("sort", (t) => {
		const sortedArray = new SortedArray<number>();
		sortedArray.push(1, 2, 3);
		t.throws(() => sortedArray.sort());
		t.end();
	});

	t.test("reverse", (t) => {
		const sortedArray = new SortedArray<number>();
		sortedArray.push(1, 2, 3);
		t.throws(() => sortedArray.reverse());
		t.end();
	});

	t.test("copyWithin", (t) => {
		const sortedArray = new SortedArray<number>();
		sortedArray.push(1, 2, 3);
		t.throws(() => sortedArray.copyWithin(1, 1));
		t.end();
	});

	t.test("fill", (t) => {
		const sortedArray = new SortedArray<number>();
		sortedArray.push(1, 2, 3);
		t.throws(() => sortedArray.fill(1));
		t.end();
	})

	t.test("compare sorted array with array+sort", (t) => {
		const sortedArray = new SortedArray<number>();
		const array: number[] = [];
		for (let i = 0; i < 1000; i++) {
			const item = Math.random();
			sortedArray.insert(item);
			array.push(item);
		}
		array.sort();
		t.same(sortedArray, array);
		t.end();
	});
	t.end();
});