document.addEventListener("DOMContentLoaded", () => {
  const page = document.querySelector("div");
  const userInput = document.querySelector("#search-bar.input.message");
  const submitButton = document.getElementsByTagName("input")[1];
  const newLocal = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
  const url = newLocal;
  const newLocal2 =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";
  //const itemLookUp = `${userInput.value}`;

  const form = document.querySelector(".block-card");
  const field = document.querySelector("fieldset");
  form.style.position = "absolute";
  field.style.position = "sticky";


  function drinkCard({ drinks }) {
    for (const item of drinks) {
      //console.log(item)
      const boxContent = document.createElement("section");
      const drinkName = document.createElement("h4");
      const drinkImage = document.createElement("img");
      const ingredients = document.createElement("p");
      drinkImage.id = item.idDrink;
      //ingredients.textContent = item.map
      //ingredients.textContent =
      drinkImage.addEventListener("click", () => {
        ingredientsList(item.idDrink);
      });
      drinkName.textContent = item.strDrink;
      drinkName.style.paddingLeft = "1rem";
      drinkImage.setAttribute("src", item.strDrinkThumb);
      drinkImage.setAttribute("width", 325);
      drinkImage.setAttribute("height", 325);
      drinkImage.style.paddingLeft = "1rem";
      boxContent.append(drinkName, drinkImage, ingredients);
      boxContent.classList.add("content");
      page.appendChild(boxContent);
    }
    return page;
  }

  const config = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    //body: JSON.stringify(`${userInput.value}`)
  };

  // function labelPrep(cocktail) {
  //     for (let i = 0; i < cocktail.length; i++) {
  //         const element = cocktail[i];

  //     }
  // }

  function outOfOrder() {
    return alert("Sorry, this isn't in the mix!");
  }

  function drinkOrder() {
    return (
      fetch(`${url}${userInput.value}`)
        .then(function (resp) {
          if (!resp.ok || !resp) {
            throw new Error(resp.statusText);
          }
          const result = resp.json();
          return result;
        })
        .then(drinkCard)
        //return console.log(strDrink.map(item => item))

        .catch((err) => outOfOrder())
    ); //console.log(err.message))
  }

  submitButton.addEventListener("click", () => {
    return drinkOrder();
  });

  function ingredientsList(idDrink) {
    //www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007
    const idCall = "https://thecocktaildb.com/api/json/v1/1/lookup.php?i=";
    //console.log(idDrink)
    return fetch(`${idCall}${idDrink}`)
      .then(function (resp) {
        if (!resp.ok || !resp) {
          throw new Error(resp.statusText);
        }
        const result = resp.json();
        return result;
      })
      .then((data) => {
        //console.log(data)

        for (let i = 1; i <= 15; i++) {
          const label = document.createElement("p");

          if (data.drinks[0][`strIngredient${i}`]) {
            const contents = document.createElement("span");
            contents.textContent = data.drinks[0][`strIngredient${i}`];

            label.append(contents);
            boxContent.append(label);  //  defined in another function - talk about putting it in global scope
            //return page
          }
        }

        //console.log(item.strIngredient1)

        //drinkCard
        //console.log(data)
      })
      .catch((err) => console.log(err.message));
  }
});
