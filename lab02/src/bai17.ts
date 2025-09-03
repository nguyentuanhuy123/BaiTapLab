async function simulateTask5(time: number) {
    await new Promise((resolve) => setTimeout(resolve, time));
    return `Task done after ${time} ms`;
}

async function runTask4() {
    const tasks = [
        simulateTask5(1000),
        simulateTask5(2000),
        simulateTask5(1500),
    ];

    console.log("Start tasks with for await...of");

    for await (const result of tasks) {
        console.log(result);
    }

    console.log("All tasks finished!");
}

runTask4();
