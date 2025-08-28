var p3 = new Promise(function(_,reject) {
    setTimeout(() => {
        reject("Something went wrong");
    }, 2000);
});
export {p3}
p3.catch((err) => {
    console.log("Bai 3:")
    console.log(err);
});