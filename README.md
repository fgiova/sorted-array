# SortedArray
[![NPM version](https://img.shields.io/npm/v/@fgiova/sorted-array.svg?style=flat)](https://www.npmjs.com/package/@fgiova/sorted-array)
![CI workflow](https://github.com/fgiova/sorted-array/actions/workflows/node.js.yml/badge.svg)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

## Description
This simple module provides an array implementation, with a sorting feature using binary search algorithm.

Each time an element is inserted, it is placed in the correct position, so that the array is always sorted.<br/>
The sorting is implemented using binary search algorithm, so the complexity is O(log n).<br/>
All the elements are compared using the comparator function assigned on constructor or by default sort function.<br/>
The array as implemented using a native array, so it is not a linked list.<br/>
The array is mutable, but you cannot change the length of the array or remove elements except from the starting or ending array.<br/>
Methods that change the sort order are not implemented; the array is always sorted according to the default order of the comparison function.<br/>

## Installation
```bash
npm install @fgiova/sorted-array
```
## Usage
```typescript
import { SortedArray } from "@fgiova/sorted-array";

const array = new SortedArray<number>();

array.push(1, 3);
array.insert(2);

console.log(array); // [1, 2, 3]
```

### Constructor
```typescript
new SortedArray<T>(items?: T[] comparator?: (a: T, b: T) => number);
```
default comparator is:
```typescript
function comparatorFunction(a, b) {
    if (a < b) return -1;
    if (a >= b) return 1;
    return 0;
}
```
	
### Not implemented methods
- `splice`
- `sort`
- `reverse`
- `copyWithin`
- `fill`

### Benchmark
I have made a simple benchmark using [Benchmark.js](https://benchmarkjs.com/), comparing the performance of the `push` + `sort` methods of the native array and the `insert` method of this module.<br/>
The benchmark is available in the `benchmark` folder.<br/>
The results are the following:

| Function          |                |           |
|-------------------|----------------|-----------|
| Simple Sort Array | 228 ops/sec    | ±91.75%   |
| Sorted Array      | 3,340 ops/sec  | ±46.99%   |

