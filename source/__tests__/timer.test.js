describe('Timer', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:9999/source/Recipe.html');
  });

  // Check to make sure input hour counts down
  it('test timer hour input', async () => {
    console.log('Inputting numbers for hour');
    // set hours input to 10
    await page.$eval('#hours', (element) => element.innerText =
    '10');
    // create the start button
    const startbutton = await page.$('#start-button');
    // click the start button
    await startbutton.click();
    // wait 2 seconds to let timer countdown
    await new Promise((resolve) => setTimeout(resolve, 4000));
    // create pause/stop button
    const pausebutton = await page.$('#pause-button');
    const stopbutton = await page.$('#stop-button');
    // variable where true if timer is counting down,
    // false if timer did not count down.
    let testTimer = true;
    // if time still remains at 10, timer failed
    if (await page.$eval('#hours', (element) => element.innerText == '10')) {
      console.log('GET ME OUT OF HERE');
      testTimer=false;
    }
    // press pause button, then stop timer
    await pausebutton.click();
    await stopbutton.click();

    expect(testTimer).toBe(true);
  }, 10000);

  // check to make sure input minutes counts down
  it('test timer minutes input', async () => {
    console.log('Inputting numbers for minutes');
    // set minutes input to 10
    await page.$eval('#minutes', (element) => element.innerText =
    '10');
    // create the start button
    const startbutton = await page.$('#start-button');
    // click the start button
    await startbutton.click();
    // wait 2 seconds to let timer countdown
    await new Promise((resolve) => setTimeout(resolve, 4000));
    // create pause/stop button
    const pausebutton = await page.$('#pause-button');
    const stopbutton = await page.$('#stop-button');
    // variable where true if timer is counting down,
    // false if timer did not count down.
    let testTimer = true;
    // if time still remains at 10, timer failed
    if (await page.$eval('#minutes', (element) => element.innerText == '10')) {
      console.log('GET ME OUT OF HERE');
      testTimer=false;
    }
    // press pause button, then stop timer
    await pausebutton.click();
    await stopbutton.click();

    expect(testTimer).toBe(true);
  }, 10000);

  // check to make sure input seconds count down
  it('test timer seconds input', async () => {
    console.log('Inputting numbers for seconds');
    // set seconds input to 30
    await page.$eval('#seconds', (element) => element.innerText =
    '30');
    // create the start button
    const startbutton = await page.$('#start-button');
    // click the start button
    await startbutton.click();
    // wait 2 seconds to let timer countdown
    await new Promise((resolve) => setTimeout(resolve, 4000));
    // create pause/stop button
    const pausebutton = await page.$('#pause-button');
    const stopbutton = await page.$('#stop-button');
    // variable where true if timer is counting down,
    // false if timer did not count down.
    let testTimer = true;
    // if time still remains at 10, timer failed
    if (await page.$eval('#hours', (element) => element.innerText == '30')) {
      console.log('GET ME OUT OF HERE');
      testTimer=false;
    }
    // press pause button, then stop timer
    await pausebutton.click();
    await stopbutton.click();
    expect(testTimer).toBe(true);
  }, 10000);

  // check if pause/stop button is not hidden after pressing start
  // should not time out
  it('test start button hidden', async () => {
    // start timer
    const startbutton = await page.$('#start-button');
    startbutton.click();
    // wait and see if pause button is selectable
    const pause = await page.waitForSelector('#pause-button',
        {visible: true});
    // click pause button
    await pause.click();
    // wait and see if stop button is selectable
    const stop = await page.waitForSelector('#stop-button',
        {visible: true});
    // click stop button
    await stop.click();
  }, 5000);

  // check if pause/stop button is hidden again
  // after pressing stop
  it('test start button hidden', async () => {
    // start timer
    const startbutton = await page.$('#start-button');
    startbutton.click();
    // wait and see if pause button is selectable
    const pause = await page.waitForSelector('#pause-button',
        {visible: true});
    // click pause button
    await pause.click();
    // wait and see if stop button is selectable
    const stop = await page.waitForSelector('#stop-button',
        {visible: true});
    // click stop button
    await stop.click();
    // check if pause/stop button is hidden again
    await page.waitForSelector('#pause-button',
        {visible: false});
    await page.waitForSelector('#stop-button',
        {visible: false});
  }, 5000);
});
