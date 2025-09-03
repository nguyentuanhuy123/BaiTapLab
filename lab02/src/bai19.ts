async function fetchUser2(id: number) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
        id: id,
        name: `User ${id}`,
        email: `user${id}@example.com`
    };
}
async function fetchUsers(ids: number[]) {
    const results = [];
    for (const id of ids) {
        const user = await fetchUser2(id);
        results.push(user);
    }
    return results;
}
(async () => {
    const users = await fetchUsers([1, 2, 3]);
    console.log(users);
})();
