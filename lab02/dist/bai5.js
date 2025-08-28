"use strict";
function simulateTask(time) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => resolve(`"Task done" after ${time} ms.`), time);
    });
}
var p5 = simulateTask(5000);
p5.then(mess => console.log(mess));
