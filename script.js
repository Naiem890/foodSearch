const inputField = document.getElementById("input-search");
const foodContainer = document.getElementById("food-container");

// Search Food

function searchFood() {
  let inputText = inputField.value;
  console.log(inputText);
  inputField.value = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`)
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      foodContainer.innerHTML = "";
      data.meals?.forEach((food) => {
        const col = document.createElement("div");
        col.classList.add("col");
        col.innerHTML = `
            <div onclick="foodDetails(${food.idMeal})"
            data-bs-toggle="modal"
        data-bs-target="#foodDetails"
             class="p-2 shadow p-3 bg-body rounded">
            <img
              class="img-fluid"
              src="${food.strMealThumb}"
              alt=""
            />
            <h5 class="text-center mt-4">${food.strMeal}</h5>
            
          </div>
          `;
        foodContainer.appendChild(col);
        // console.log(food);
      });
    });
}
inputField.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    // event.preventDefault();
    document.getElementById("button-search").click();
  }
});

const foodDetails = (mealId) => {
  console.log(mealId);
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => showModal(data.meals));
};

/* <p class="text-center mt-4">
  ${food.strInstructions.split(" ").slice(0, 15).join(" ")}
</p>; */
const modalContainer = document.getElementById("modal-container");
function showModal(food) {
  console.log(food);
  const modal = document.createElement("div");
  modal.innerHTML = "";

  modal.innerHTML = `
    <!-- Modal -->
      <div
        class="modal show d-block fade"
        id="foodDetails"
        tabindex="-1"
        aria-labelledby="foodModal"
        aria-modal="true"
      >
        <div
          class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
        >
          <div class="modal-content">
            <div class="modal-header text-center">
              <h3 class="modal-title" id="foodModal">How to make</h3>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <iframe
                class="container-fluid"
                height="400"
                src="https://www.youtube.com/embed/fTuVWwTQegQ"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              <div class="row row-col mt-3 mx-0 g-4">
                <div class="col col-4">
                  <div class="">
                    <h5>Ingradients</h5>
                    <p id="ingredients"></p>
                  </div>
                </div>
                <div class="col col-8">
                  <div class="ms-auto">
                    <h5>Instrction</h5>

                    <p class="text-secondary">
                      Preheat oven to 350° F. Spray a 9x13-inch baking pan with
                      non-stick spray.\r\nCombine soy sauce, ½ cup water, brown
                      sugar, ginger and garlic in a small saucepan and cover.
                      Bring to a boil over medium heat. Remove lid and cook for
                      one minute once boiling.\r\nMeanwhile, stir together the
                      corn starch and 2 tablespoons of water in a separate dish
                      until smooth. Once sauce is boiling, add mixture to the
                      saucepan and stir to combine. Cook until the sauce starts
                      to thicken then remove from heat.\r\nPlace the chicken
                      breasts in the prepared pan. Pour one cup of the sauce
                      over top of chicken. Place chicken in oven and bake 35
                      minutes or until cooked through. Remove from oven and
                      shred chicken in the dish using two forks.\r\n*Meanwhile,
                      steam or cook the vegetables according to package
                      directions.\r\nAdd the cooked vegetables and rice to the
                      casserole dish with the chicken. Add most of the remaining
                      sauce, reserving a bit to drizzle over the top when
                      serving. Gently toss everything together in the casserole
                      dish until combined. Return to oven and cook 15 minutes.
                      Remove from oven and let stand 5 minutes before serving.
                      Drizzle each serving with remaining sauce. Enjoy!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  modalContainer.appendChild(modal);
  console.log(food);
  document.getElementById("foodDetails").click();
}
