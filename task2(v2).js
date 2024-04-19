if (!localStorage.getItem("userStorage")) {
  localStorage.setItem("userStorage", JSON.stringify({}));
}

const getBondsData = async ({ date, isins }) => {
  if (!date || !isins.length) {
    return [];
  }

  let results = [];
  let parsedStorage = JSON.parse(localStorage.getItem("userStorage"));

  if (parsedStorage[date]) {
    let existedIsins = [];
    const cachedIsins = parsedStorage[date];

    cachedIsins.forEach((cachedIsin) => {
      if (isins.includes(cachedIsin.isin)) {
        results.push(cachedIsin);
        existedIsins.push(cachedIsin.isin);
      }
    });

    isins = isins.filter((isin) => !existedIsins.includes(isin));
  }

  if (isins.length > 0) {
    try {
      const response = await http.post({
        url: `/bonds/${date}`,
        body: isins,
      });

      if (response) {
        parsedStorage[date] = response;
        localStorage.setItem("userStorage", JSON.stringify(parsedStorage));
        results = [...results, ...response];
      }
    } catch (e) {
      console.error(`Error fetching: `, e.message);
    }
  }

  return results;
};
