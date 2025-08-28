var promise1=new Promise((reject,resolve)=>setTimeout(reject,550,"promise 1 resolve first"))
var promise2=new Promise((reject,resolve)=>setTimeout(resolve,250,"promise 2 resolve first"))
var promise3=new Promise((reject,resolve)=>setTimeout(resolve,750,"promise 3 resolve first"))

Promise.race([promise1,promise2,promise3])
.then(val=>{
    console.log(val);
    
})
.catch(err=>{
    console.log(err);
    
})