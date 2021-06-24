export const getConversionRates = async (currToConvert: string, finalCurr: string) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  try {
    const conversionApiUrl = `https://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}`
    const res = await fetch(conversionApiUrl);
    const resObj = await res.json();
    return [
      resObj?.rates?.[currToConvert],
      resObj?.rates?.[finalCurr],
    ];
  } catch(err) {
    console.log(err);
  }
};