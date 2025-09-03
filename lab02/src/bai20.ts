async function fetchUser3(id: number) {
    const delay = Math.floor(Math.random() * 3000) + 500;

    return new Promise<{ id: number; name: string; email: string }>((resolve) => {
        setTimeout(() => {
            resolve({
                id,
                name: `User ${id}`,
                email: `user${id}@example.com`,
            });
        }, delay);
    });
}

async function fetchUserWithTimeout(id: number, timeoutMs = 2000) {
    const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), timeoutMs)
    );
    return Promise.race([fetchUser3(id), timeout]);
}
(async () => {
    try {
        const user = await fetchUserWithTimeout(1);
        console.log("User fetched:", user);
    } catch (error: any) {
        console.error("Error:", error.message);
    }
})();
