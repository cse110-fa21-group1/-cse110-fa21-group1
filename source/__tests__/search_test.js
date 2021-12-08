jest.setTimeout(20000);
describe('Testing search.js', () => {
  // First, visit the website
  beforeAll(async () => {
    await page.goto('http://localhost:8080/Explore.html?searched=true&q=&');
    // Wait for the website to load
    await new Promise((resolve) => setTimeout(resolve, 2500));
  });

  it('Test if search from spoonacular is displayed', async () => {
    console.log('click generate random recipe');
    // check if the button has been correctly triggered
    const spoonResultBtn = await page.$('input[id="search-spoon"]');
    const isRadioSelected = await (await spoonResultBtn
        .getProperty('checked')).jsonValue();
    expect(isRadioSelected).toBe(true);
  }, 10000);

  it('Test if user button is off', async () => {
    console.log('check the user button');
    const userResultBtn = await page.$('input[id="search-user"]');
    const isRadioSelected = await (await userResultBtn
        .getProperty('checked')).jsonValue();
    expect(isRadioSelected).toBe(false);
  }, 10000);

  it('Test if correct amount of recipes showed up', async () => {
    // Get all the recipe cards displayed on the page
    console.log('check the correct amount of recipes displayed');
    const recipes = await page.$$('recipe-card');
    expect(recipes.length <= 12).toBe(true);
  }, 10000);
});

describe('Testing search.js with key word', () => {
  // First, visit the website
  beforeAll(async () => {
    // using chicken as the key word.
    await page.goto('http://localhost:8080/Explore.html?searched=true&q=chicken&');
    // Wait for the website to load
    await new Promise((resolve) => setTimeout(resolve, 2500));
  });

  it('Test correct amount of recipes after searching chicken', async () => {
    console.log('check the correct amount of recipes displayed after search');
    const recipes = await page.evaluate(() => {
      return document.querySelectorAll('recipe-card').length;
    });
    expect(recipes <= 12).toBe(true);
  }, 10000);

  it('Test does recipe contains key word', async () => {
    console.log('check a random recipe title');
    const randomCard = await page.$('recipe-card');
    const shadowRoot = await randomCard.getProperty('shadowRoot');
    const title = await shadowRoot.$('p');
    let value = await title.evaluate((el) => el.textContent);
    value = value.toLowerCase();
    expect(value.includes('chicken')).toBe(true);
  });

  it('Test does all recipes contains key word', async () => {
    console.log('check all recipe titles');
    checked = true;
    const recipes = await page.$$('recipe-card');
    for (let i = 1; i < recipes.length; ++i) {
      const shadowRoot = await recipes[i].getProperty('shadowRoot');
      const title = await shadowRoot.$('p');
      let value = await title.evaluate((el) => el.textContent);
      value = value.toLowerCase();
      if (!value.includes('chicken')) {
        checked = false;
      }
    }
    expect(checked).toBe(true);
  });

  it('Test if next page button is displayed', async () => {
    console.log('check the next page button');
    checked = true;
    const nextBtn = await page.$('#next-page');
    if (nextBtn == null) {
      checked = false;
    }
    expect(checked).toBe(true);
  });
});
describe('click next page', () => {
  // Click next page using chicken for keyword.
  beforeAll(async () => {
    // using chicken as the key word.
    await page.goto('http://localhost:8080/Explore.html?searched=true&q=chicken&&offset=12&');
    // Wait for the website to load
    await new Promise((resolve) => setTimeout(resolve, 2500));
  });

  it('Test correct amount of recipes after clicked next', async () => {
    console.log('check the correct amount of recipes displayed after search');
    const recipes = await page.evaluate(() => {
      return document.querySelectorAll('recipe-card').length;
    });
    expect(recipes <= 12).toBe(true);
  }, 10000);

  it('Test does recipes still contain the key word', async () => {
    console.log('check a random recipe title');
    const randomCard = await page.$('recipe-card');
    const shadowRoot = await randomCard.getProperty('shadowRoot');
    const title = await shadowRoot.$('p');
    let value = await title.evaluate((el) => el.textContent);
    value = value.toLowerCase();
    expect(value.includes('chicken')).toBe(true);
  });

  it('Test does all recipes still contain the key word', async () => {
    console.log('check all recipe titles');
    checked = true;
    const recipes = await page.$$('recipe-card');
    for (let i = 1; i < recipes.length; ++i) {
      const shadowRoot = await recipes[i].getProperty('shadowRoot');
      const title = await shadowRoot.$('p');
      let value = await title.evaluate((el) => el.textContent);
      value = value.toLowerCase();
      if (!value.includes('chicken')) {
        checked = false;
      }
    }
    expect(checked).toBe(true);
  });

  it('Test if next page button is still displayed', async () => {
    console.log('check the next page button');
    checked = true;
    const nextBtn = await page.$('#next-page');
    if (nextBtn == null) {
      checked = false;
    }
    expect(checked).toBe(true);
  });

  it('Test if previous page button is still displayed', async () => {
    console.log('check the next page button');
    checked = true;
    const nextBtn = await page.$('#previous-page');
    if (nextBtn == null) {
      checked = false;
    }
    expect(checked).toBe(true);
  });
});
