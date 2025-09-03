async function fetchWithRetry(url: string, retries: number = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            console.log(`Attempt ${attempt} to fetch ${url}`);
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error: any) {
            console.error(`Attempt ${attempt} failed: ${error.message}`);

            if (attempt === retries) {
                throw new Error(`Failed after ${retries} attempts`);
            }
        }
    }
}
(async () => {
    try {
        await fetchWithRetry("https://jsonplaceholder.typicode.com/todos/1", 3);
    } catch (error: any) {
        console.error( error.message);
    }
})();
