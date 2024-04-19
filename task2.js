const { isArrayEquals } = require("./helpers.js");
let cache = new Map();

const getBondsData = async ({ date, isins }) => {
  if (!date || !isins.length) {
    return [];
  }

  let results = [];
  let existedIsins = [];

  if (cache.has(date)) {
    const cachedIsins = cache.get(date);
    cachedIsins.forEach((cachedIsin) => {
      if (isins.includes(cachedIsin.isin)) {
        results.push(cachedIsin);
        existedIsins.push(cachedIsin.isin);
      }
    });

    isins = isins.filter((isin) => !existedIsins.includes(isin));
  }

  if (date && isins.length > 0) {
    try {
      const response = await http.post({
        url: `/bonds/${date}`,
        body: isins,
      });

      if (response) {
        cache.set(date, response);
        results = [...results, ...response];
      }
    } catch (e) {
      console.error(`Error fetching: `, e.message);
    }
  }

  return results;
};



// TEST PART
const test = () => {
  const firstDateCase = "20200102";
  const secondDateCase = "20200103";
  const firstIsinsCase = [{ isin: "XS0971721963", data: { usd: 2000 } }];
  const secondIsinsCase = [
    { isin: "RU000A0JU4L3", data: { rub: 1500 } },
    { isin: "XS0971721963", data: { usd: 450 } },
  ];

  cache.set(firstDateCase, firstIsinsCase);
  cache.set(secondDateCase, secondIsinsCase);

  getBondsData({
    //TEST CASE #1
    date: firstDateCase,
    isins: ["XS0971721963"],
  })
    .then((response) => {
      if (isArrayEquals(response, firstIsinsCase)) {
        console.log(`Test #1 Passed`);
      }
    })
    .catch(() => console.error(`Incorrect work of 'getBondsData' function`));

  getBondsData({
    //TEST CASE #2
    date: secondDateCase,
    isins: ["RU000A0JU4L3", "XS0971721963"],
  })
    .then((response) => {
      if (isArrayEquals(response, secondIsinsCase)) {
        console.log(`Test #2 Passed`);
      }
    })
    .catch(() => console.error(`Incorrect work of 'getBondsData' function`));

  getBondsData({
    //TEST CASE #3
    date: "",
    isins: [],
  })
    .then((response) => {
      if (isArrayEquals(response, [])) {
        console.log(`Test #3 Passed`);
      }
    })
    .catch(() => console.error(`Incorrect work of 'getBondsData' function`));
};

test();
