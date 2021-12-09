describe('Navbar user flow', () => {
  beforeAll(async () => {
    // TODO change to http://localhost:8080/xxx.html
    // Start at home page
    await page.goto('http://localhost:8080/Home.html');
  });

  // Homepage: check if explore button in navbar is clickable
  it('test navigation to explore page...', async () => {
    const hamburButton = await page.$('.hamburger-icon');
    await hamburButton.click();

    const button = await page.$('#nav-recipes');
    await button.click();
    // await page.waitForNavigation();
    /*
          await Promise.all([
              await exploreButton.click(),
              page.waitForNavigation({
                waitUntil: 'networkidle0',
              }),
            ]);
            */
    // let url = await page.url();
    // expect(url).toBe('http://127.0.0.1:5501/source/Explore.html');
  });
});

describe('Navbar user flow', () => {
  beforeAll(async () => {
    // TODO change to http://localhost:8080/xxx.html
    // Start at home page
    await page.goto('http://localhost:8080/Home.html');
  });

  // Homepage: check if view button in navbar is clickable
  it('test navigation to view page...', async () => {
    const hamburButton = await page.$('.hamburger-icon');
    await hamburButton.click();

    const button = await page.$('#nav-view');
    await button.click();
  });
});

describe('Navbar user flow', () => {
  beforeAll(async () => {
    // TODO change to http://localhost:8080/xxx.html
    // Start at home page
    await page.goto('http://localhost:8080/Recipe.html?searched=true&id=207035');
  });

  // Homepage: check if edit button in navbar is clickable
  it('test navigation to edit page...', async () => {
    const hamburButton = await page.$('.hamburger-icon');
    await hamburButton.click();

    const button = await page.$('#nav-edit');
    await button.click();
  });
});

describe('Navbar user flow', () => {
  beforeAll(async () => {
    // TODO change to http://localhost:8080/xxx.html
    // Start at home page
    await page.goto('http://localhost:8080/Recipe.html?searched=true&id=207035');
  });

  // Homepage: check if delete button in navbar is clickable
  it('test navigation to delete page...', async () => {
    const hamburButton = await page.$('.hamburger-icon');
    await hamburButton.click();

    const button = await page.$('#nav-delete');
    await button.click();
  });
});
