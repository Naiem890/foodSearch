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
      data.meals?.forEach((food) => showResult(food));
    });
}
inputField.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    // event.preventDefault();
    document.getElementById("button-search").click();
  }
});

function showResult(food) {
  console.log(food.strYoutube);
  const videoId = food.strYoutube.split("=")[1];
  console.log(videoId);
  const col = document.createElement("div");
  col.classList.add("col");
  col.innerHTML = `
            <div"
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
}

const foodDetails = (mealId) => {
  console.log(mealId);
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => showModal(data.meals));
};
