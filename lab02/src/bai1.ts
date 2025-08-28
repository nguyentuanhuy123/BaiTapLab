var p1 = new Promise(function(resolve) {
    setTimeout(() => {
        resolve("Hello Async");
    }, 2000);
});
export {p1}

