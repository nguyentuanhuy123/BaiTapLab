async function fetchTodo() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
        const data = await response.json();
        console.log(data);
    } catch (error: any) {
        console.error(error.message);
    }
}

fetchTodo();
