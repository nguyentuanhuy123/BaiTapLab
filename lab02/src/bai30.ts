async function fetchData(url: string) {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch ${url} (status ${res.status})`);
    }
    return res.json();
}
async function runMultipleAPIs() {
    const urls = [
        "https://jsonplaceholder.typicode.com/todos/1",
        "https://jsonplaceholder.typicode.com/todos/2",
        "https://jsonplaceholder.typicode.com/invalid-url"
    ];
    const results = await Promise.allSettled(urls.map(url => fetchData(url)));
    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            console.log(`API ${index + 1} success:`, result.value);
        } else {
            console.error(`API ${index + 1} failed:`, result.reason.message);
        }
    });
}
runMultipleAPIs();
