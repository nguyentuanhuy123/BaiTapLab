"use strict";
var p4 = new Promise(function (resolve, reject) {
    let num = Math.random();
    if (num >= 0) {
        resolve(num);
    }
    else {
        reject('Error');
    }
});
p4.then(mess => {
    console.log(mess);
})
    .catch(err => {
    console.log(err);
});
