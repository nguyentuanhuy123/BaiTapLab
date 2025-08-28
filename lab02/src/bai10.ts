var getNumber10=new Promise<number>(function(resolve){
    setTimeout(()=>{
        resolve(10)
    },1000)
})
getNumber10.then(mes=>console.log(mes))
.finally(()=>{console.log("Done");});