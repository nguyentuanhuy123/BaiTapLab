async function simulateTask7(id: number, time: number) {
    await new Promise((resolve) => setTimeout(resolve, time));
    return `Task ${id} finished after ${time} ms`;
}
async function queueProcess() {
    const tasks = [
        () => simulateTask7(1, 1000),
        () => simulateTask7(2, 1500),
        () => simulateTask7(3, 1200),
        () => simulateTask7(4, 800),
        () => simulateTask7(5, 2000),
    ];
    for (const task of tasks) {
        const result = await task();
        console.log(result);
    }
}

queueProcess();
