async function tripleNumber2(num:number) {
    return new Promise(function (resolve, reject) {
        setTimeout(()=>resolve(num*3),1000);
    });
}
async function runTask1() {
    try {
        const p141=await tripleNumber2(50)
        console.log(p141);

        const p142=await tripleNumber2(150)
        console.log(p142);

        const p143=await tripleNumber2(250)
        console.log(p143);

        const p144=await tripleNumber2(350)
        console.log(p144);
        
    } catch (error) {
        console.error("Error:", error)
    }
}
runTask1();