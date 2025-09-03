async function fetchTodo2(id: number) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    return response.json();
}

async function fetchTodos(ids: number[]) {
    try {
        const todos = await Promise.all(ids.map((id) => fetchTodo2(id)));
        todos.forEach((todo) => {
            console.log(todo);
        });
    } catch (error: any) {
        console.error(error.message);
    }
}
fetchTodos([1, 2, 3]);
