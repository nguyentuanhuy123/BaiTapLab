import { simulateTask2 } from "./bai12"
async function runTask() {
    try {
        const p13=await simulateTask2(1000)
        console.log(p13);
        
    } catch (error) {
        console.error("Error:", error)
    }
}
runTask();