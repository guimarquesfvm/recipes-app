let URL = 'themealdb';

export const mealsAPI = async (page) => {
  if (page === 'meals') { URL = 'themealdb'; }
  if (page === 'drinks') { URL = 'thecocktaildb'; }
  console.log(URL);
  const response = await fetch(`https://www.${URL}.com/api/json/v1/1/search.php?s=`);
  const data = await response.json();
  // console.log(data);
  return data[Object.keys(data)[0]];
};

export const filterApi = async (endPoint, page) => {
  if (page === 'meals') { URL = 'themealdb'; }
  if (page === 'drinks') { URL = 'thecocktaildb'; }
  const response = await fetch(`https://www.${URL}.com/api/json/v1/1/filter.php?c=${endPoint}`);
  const data = await response.json();
  // console.log(data);
  return data[Object.keys(data)[0]];
};

export const categoryApi = async (page) => {
  if (page === 'meals') { URL = 'themealdb'; }
  if (page === 'drinks') { URL = 'thecocktaildb'; }
  const response = await fetch(`https://www.${URL}.com/api/json/v1/1/list.php?c=list`);
  const data = await response.json();
  console.log(data);
  return data[Object.keys(data)[0]];
};
