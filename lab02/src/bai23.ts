async function fetchCompletedTodos() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        const todos: { id: number; title: string; completed: boolean }[] = await response.json();
        const completed = todos.filter((todo) => todo.completed);
        completed.forEach((todo) => {
            console.log(`- [${todo.id}] ${todo.title}`);
        });

        return completed;
    } catch (error: any) {
        console.error(error.message);
        return [];
    }
}
fetchCompletedTodos();
