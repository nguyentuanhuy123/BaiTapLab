async function postData() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: "Hello Async",
                body: "This is a test post",
                userId: 1,
            }),
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error: any) {
        console.error(error.message);
        return null;
    }
}
postData();
