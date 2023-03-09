const recipeDetailsAPI = async (endpoint) => {
  const response = await fetch(endpoint); // FETCH VAZIO!!!!
  const data = response.json();
  return data;
};

export default recipeDetailsAPI;
