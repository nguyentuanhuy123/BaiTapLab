function getEvenNumber(arr:number[]) {
    return new Promise(function (resolve, reject) {
        resolve(arr.filter(function(num){
            return num%2===0;
        }))
    });
}
var arr=[1,2,3345,76,78,34,67]
var p9=getEvenNumber(arr)
p9.then(val=>console.log(val))