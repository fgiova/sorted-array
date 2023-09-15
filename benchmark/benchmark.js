const Benchmark = require("benchmark");
const {SortedArray} = require("../dist/index");

const simpleArray = [0];
const sortedArray = new SortedArray([0]);

const suite = new Benchmark.Suite("Performance test", {
    minSamples: 10,
    onCycle: (e) => {
        const benchmark = e.target;
        console.log(benchmark.toString());
    },
    onComplete: (e) => {
        const suite = e.currentTarget;
        const fastestOption = suite.filter("fastest").map("name");
        console.log(`The fastest option is ${fastestOption}`);
    }
});
suite.add("Simple Sort Array", () => {
    simpleArray.push(Math.random());
    return simpleArray.sort();
})
.add("Sorted Array", () => {
    return sortedArray.push(Math.random());
})
.run();