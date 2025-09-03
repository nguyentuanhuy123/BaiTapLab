async function downloadFile(filename: string) {
    console.log(`Starting download: ${filename} ...`);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log(`Download completed: ${filename}`);
}
(async () => {
    await downloadFile("example.zip");
})();
