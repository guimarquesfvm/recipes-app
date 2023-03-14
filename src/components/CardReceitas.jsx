import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Loading from './Loading';

// const receitas = {
//   meals: [
//     {
//       idMeal: '52882',
//       strMeal: 'Three Fish Pie',
//       strDrinkAlternate: null,
//       strCategory: 'Seafood',
//       strArea: 'British',
//       strInstructions: 'Preheat the oven to 200C\/400F\/Gas 6 (180C fan).\r\nPut the potatoes into a saucepan of cold salted water. Bring up to the boil and simmer until completely tender. Drain well and then mash with the butter and milk. Add pepper and taste to check the seasoning. Add salt and more pepper if necessary.\r\nFor the fish filling, melt the butter in a saucepan, add the leeks and stir over the heat. Cover with a lid and simmer gently for 10 minutes, or until soft. Measure the flour into a small bowl. Add the wine and whisk together until smooth.\r\nAdd the milk to the leeks, bring to the boil and then add the wine mixture. Stir briskly until thickened. Season and add the parsley and fish. Stir over the heat for two minutes, then spoon into an ovenproof casserole. Scatter over the eggs. Allow to cool until firm.\r\nSpoon the mashed potatoes over the fish mixture and mark with a fork. Sprinkle with cheese.\r\nBake for 30-40 minutes, or until lightly golden-brown on top and bubbling around the edges.',
//       strMealThumb: 'https:\/\/www.themealdb.com\/images\/media\/meals\/spswqs1511558697.jpg',
//       strTags: 'Fish,Seafood,Dairy,Pie',
//       strYoutube: 'https:\/\/www.youtube.com\/watch?v=Ds1Jb8H5Sg8',
//       strIngredient1: 'Potatoes',
//       strIngredient2: 'Butter',
//       strIngredient3: 'Milk',
//       strIngredient4: 'Gruy\u00e8re',
//       strIngredient5: 'Butter',
//       strIngredient6: 'Leek',
//       strIngredient7: 'Plain Flour',
//       strIngredient8: 'White Wine',
//       strIngredient9: 'Milk',
//       strIngredient10: 'Parsley',
//       strIngredient11: 'Salmon',
//       strIngredient12: 'Haddock',
//       strIngredient13: 'Smoked Haddock',
//       strIngredient14: 'Eggs',
//       strIngredient15: '',
//       strIngredient16: '',
//       strIngredient17: '',
//       strIngredient18: '',
//       strIngredient19: '',
//       strIngredient20: '',
//       strMeasure1: '1kg',
//       strMeasure2: 'Knob',
//       strMeasure3: 'Dash',
//       strMeasure4: '50g',
//       strMeasure5: '75g',
//       strMeasure6: '2 sliced',
//       strMeasure7: '75g',
//       strMeasure8: '150ml',
//       strMeasure9: '568ml',
//       strMeasure10: '2 tbs chopped',
//       strMeasure11: '250g',
//       strMeasure12: '250g',
//       strMeasure13: '250g',
//       strMeasure14: '6',
//       strMeasure15: '',
//       strMeasure16: '',
//       strMeasure17: '',
//       strMeasure18: '',
//       strMeasure19: '',
//       strMeasure20: '',
//       strSource: 'https:\/\/www.bbc.co.uk\/food\/recipes\/three_fish_pie_58875',
//       dateModified: null,
//     },
//   ],
// };
// const categorys = { meals: [{ strCategory: 'Beef' },
//   { strCategory: 'Breakfast' }, { strCategory: 'Chicken' },
//   { strCategory: 'Dessert' }, { strCategory: 'Goat' },
//   { strCategory: 'Lamb' }, { strCategory: 'Miscellaneous' },
//   { strCategory: 'Pasta' }, { strCategory: 'Pork' },
//   { strCategory: 'Seafood' }, { strCategory: 'Side' },
//   { strCategory: 'Starter' }, { strCategory: 'Vegan' }, { strCategory: 'Vegetarian' }] };

const limiter = 5;
const limiter2 = 12;
export default function CardReceitas() {
  const { toggleButton, toggleButtonAll, api,
    loading, page, categorysApi } = useContext(RecipesContext);

  // pega o storage para comparacao em casa do nao iniciar na rota /login
  const getStorage = JSON.parse(localStorage.getItem('user'));
  if (!getStorage) {
    localStorage.setItem('user', JSON.stringify({ email: '' }));
  }
  if (loading) {
    return <Loading />;
  }
  const pageName = (page === 'meals' && 'Meal') || (page === 'drinks' && 'Drink');
  // console.log(page, api[0]);
  return (

    <div>
      <label>
        <button
          type="button"
          onClick={ toggleButtonAll }
          data-testid="All-category-filter"
        >
          All
        </button>
        {categorysApi.map((category, ind) => ind < limiter
        && (
          <button
            key={ ind }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ toggleButton }
            name={ category.strCategory }
          >
            {category.strCategory}

          </button>
        ))}

      </label>
      {loading && api.length > 0 ? <Loading /> : api.map((receita, index) => (index < limiter2
      && (
        <div
          key={ receita[`id${pageName}`] }
          data-testid={ `${index}-recipe-card` }
        >
          <Link
            to={ `/${page}/${receita[`id${pageName}`]}` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ receita[`str${pageName}Thumb`] }
              alt={ receita[`str${pageName}`] }
              width="300px"
            />
            <span
              data-testid={ `${index}-card-name` }
            >
              {receita[`str${pageName}`]}

            </span>
          </Link>
        </div>
      )
      ))}
    </div>

  );
}
