async function simulateTask4(time: number) {
    await new Promise((resolve) => setTimeout(resolve, time));
    return `Task done after ${time} ms`;
}
async function runTask3() {
    console.log("Start parallel tasks...");

    const [result1, result2, result3] = await Promise.all([
        simulateTask4(1000),
        simulateTask4(2000),
        simulateTask4(1500),
    ]);

    console.log(result1);
    console.log(result2);
    console.log(result3);


}

runTask3();
