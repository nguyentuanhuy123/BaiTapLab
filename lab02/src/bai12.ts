async function simulateTask2(time:number) {
    return new Promise(function (resolve, reject) {
        setTimeout(()=>resolve(`"Task done" after ${time} ms.`),time);
    });
}
export {simulateTask2};

(async () => {
    const p12=await simulateTask2(2000)
    console.log(p12);
})();