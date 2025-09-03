async function waitFiveSeconds() {
    console.log("Doi 5 giay");
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log("XOng");
}

waitFiveSeconds();
