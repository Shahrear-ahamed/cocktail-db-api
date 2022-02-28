window.onload = () => {
  loadDrinksData("Alcoholic");
  loadDrinksData("Non_Alcoholic");
};
const loadDrinksData = (itemsName) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${itemsName}`;
  fetch(url)
    .then((res) => res.json())
    // .then((data) => showAlcohol(data.drinks.slice(0, 8)));
    .then((data) => {
      if (itemsName == "Alcoholic") {
        showAlcohol(data.drinks.slice(0, 8));
      } else if (itemsName == "Non_Alcoholic") {
        showNonAlcohol(data.drinks.slice(0, 8));
      }
    });
};
// load alcohol data
const showAlcohol = (alcohols) => {
  const alcoholContainer = document.getElementById("alcohol-container");
  alcohols.forEach((alcohol) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
      <div class="card h-100">
        <img src="${alcohol.strDrinkThumb}" class="card-img-top w-100" alt="..." />
        <div class="card-body">
        <h5 class="card-title">${alcohol.strDrink}</h5>
        </div>
      </div>
        `;
    alcoholContainer.appendChild(div);
  });
};

// show non-alcohol drinks
const showNonAlcohol = (nonAlcohols) => {
  const nonAlcoholContainer = document.getElementById("non-alcohol-container");
  nonAlcohols.forEach((nonAlcohol) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100">
        <img src="${nonAlcohol.strDrinkThumb}" class="card-img-top w-100" alt="..." />
        <div class="card-body">
        <h5 class="card-title">${nonAlcohol.strDrink}</h5>
        </div>
      </div>
    `;
    nonAlcoholContainer.appendChild(div);
  });
};
// show search results by btn
const searchInput = document.getElementById("search-input");
const container = document.getElementById("container");
document.getElementById("search-btn").addEventListener("click", () => {
  searchByResult(searchInput.value);
  searchInput.value = "";
  container.textContent = "";
});
const searchByResult = (resultItems) => {
  document.getElementById("result-drink-container").innerHTML = "";
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${resultItems}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => loadSearchDrinks(data.drinks));
};
const loadSearchDrinks = (searchDrinks) => {
  const searchResult = document.getElementById("result-drink-container");
  searchDrinks.forEach((drink) => {
    console.log(drink);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100">
        <img src="${drink.strDrinkThumb}" class="card-img-top w-100" alt="..." />
        <div class="card-body">
        <h5 class="card-title">${drink.strDrink}</h5>
        <p>${drink.strAlcoholic}</p>
        <p>${drink.strGlass}</p>
        </div>
      </div>
    `;
    searchResult.appendChild(div);
  });
};
