import { p1 } from "./bai1";
import { getNumber10 } from "./bai2";

p1.then((message) => {
    console.log("Bai 1:")
    console.log(message);
});

getNumber10.then((message) => {
    console.log("Bai 2:")
    console.log(message);
});
