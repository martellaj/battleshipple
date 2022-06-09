const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const getDailyPuzzleNumber = () => {
  if (params?.p) {
    return parseInt(params.p);
  }

  const refDate = new Date(2022, 5, 7, 0, 0, 0, 0);
  const _date = new Date();
  const val =
    new Date(_date).setHours(0, 0, 0, 0) - refDate.setHours(0, 0, 0, 0);
  return Math.round(val / 864e5);
};

export default getDailyPuzzleNumber;
