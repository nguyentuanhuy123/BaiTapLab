async function tripleNumber(num:number) {
    return new Promise(function (resolve, reject) {
        setTimeout(()=>resolve(num*3),1000);
    });
}
async function runTask() {
    try {
        const p14=await tripleNumber(50)
        console.log(p14);
        
    } catch (error) {
        console.error("Error:", error)
    }
}
runTask();