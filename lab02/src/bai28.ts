async function simulateTask6(id: number, time: number) {
    await new Promise((resolve) => setTimeout(resolve, time));
    return `Task ${id} finished after ${time} ms`;
}
async function batchProcess() {
    const tasks = [
        simulateTask6(1, 1000),
        simulateTask6(2, 1500),
        simulateTask6(3, 2000),
        simulateTask6(4, 1200),
        simulateTask6(5, 1800),
    ];

    const results = await Promise.all(tasks);
    results.forEach((result) => console.log(result));

}
batchProcess();
