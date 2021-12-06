describe('Pin function in recipe page', () => {
    beforeAll(async () => {
      // TODO change to http://localhost:8080/xxx.html
      // use a random recipe for testing
      await page.goto('http://localhost:8080/Recipe.html?searched=true&id=207035');
    });
    // Recipe page: check if the pin button in recipe page work as intended
    it('test pin button in the recipe page...', async () => {
        const pinButton = await page.$("#pin-button");
        await pinButton.click();
        let innerText = await pinButton.getProperty('innerText');
        // check if the button switch to unpin
        expect(innerText['_remoteObject'].value).toBe('Remove from favorite');
    })

    // Recipe page: check if the unpin button in recipe page work as intended
    it('test unpin button in the recipe page...', async () => {
        const pinButton = await page.$("#pin-button");
        await pinButton.click();
        let innerText = await pinButton.getProperty('innerText');
        // check if the button switch to unpin
        expect(innerText['_remoteObject'].value).toBe('Add to favorite');
    })
});