"use strict";
const p8 = new Promise((resolve, reject) => {
    resolve(Math.pow(2, 2));
})
    .then((result) => {
    console.log(result);
    return result * 2;
})
    .then((result) => {
    console.log(result);
    return result + 5;
})
    .then((result) => {
    console.log(result);
});
