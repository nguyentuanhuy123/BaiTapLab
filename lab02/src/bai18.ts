async function fetchUser(id: number) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
        id: id,
        name: `User ${id}`,
        email: `user${id}@example.com`
    };
}
(async () => {
    const user = await fetchUser(1);
    console.log(user);
})();
