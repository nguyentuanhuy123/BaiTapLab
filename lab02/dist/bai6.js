"use strict";
var p1 = new Promise(function (resolve) {
    setTimeout(() => {
        resolve("Hello Async");
    }, 2000);
});
var p3 = new Promise(function (resolve, reject) {
    setTimeout(() => {
        resolve("Something went wrong");
    }, 2000);
});
var p4 = new Promise(function (resolve, reject) {
    let num = Math.random();
    if (num >= 0) {
        resolve(num);
    }
    else {
        reject('Error');
    }
});
Promise.all([p1, p3, p4])
    .then(val => {
    console.log("Tat ca loi hua da duoc thuc hien: ", val);
})
    .catch(err => {
    console.log("Loi: ", err);
});
