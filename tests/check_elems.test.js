const Differencify = require("differencify");
const differencify = new Differencify({ mismatchThreshold: 0 });
let urlToTest = "http://127.0.0.1:8080/";

describe("Zadanie nr. 2", () => {
  const timeout = 30000;
  let page;

  beforeAll(async () => {
    await differencify.launchBrowser({
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const target = differencify.init({ chain: false });
    page = await target.newPage();
    await page.goto(urlToTest);
    await page.waitFor(1000);
  }, timeout);
  afterAll(async () => {
    await differencify.cleanup();
  });

  it("Dodano div o rozmiarze 500 x 500", async () => {
    const div = await page.$eval("div", elem => {
      return getComputedStyle(elem).width === "500px"
        && getComputedStyle(elem).height === "500px"
    });
    expect(div).toBe(true);
  }, timeout);

  it("Dodano poprawny gradient dla parametru 'background'", async () => {
    await page.setViewport({width: 1024, height: 1000});
    const bg = await page.$eval("div", elem => getComputedStyle(elem).background === "rgba(0, 0, 0, 0) linear-gradient(rgb(176, 206, 86) 0%, rgb(117, 195, 216) 100%) repeat scroll 0% 0% / auto padding-box border-box");
    expect(bg).toBe(true);
  }, timeout);
});
