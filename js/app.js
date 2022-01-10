document.addEventListener("DOMContentLoaded", findParentOfStars);

let count = 0;

// Вешаем делегирование на родителя звездочек
function findParentOfStars() {
  const formRatingList = document.querySelector(".form-rating__list");

  if (formRatingList) {
    formRatingList.addEventListener("click", (e) =>
      onHandleStar(e, formRatingList)
    );
  }
}

// Обработка событий во время выбора рейтинга пользователем
async function onHandleStar(e, formRatingList) {
  const element = e.target;

  if (count === 0) {
    if (element.classList.contains("form-rating__star")) {
      const selectedRating = element.value;
      const stars = formRatingList.querySelectorAll(".form-rating__star");

      for (const star of stars) {
        star.disabled = true;
      }

      // Взависимости от ответа с сервера делаем что-то дальше
      // const response = await submitSelectedRating(selectedRating);
      count += 1;
      showResult();
    }
  } else {
    alert("Sorry, you have already voted.");
  }
}

// Отправка выбранного рейтинга пользователем на сервер
async function submitSelectedRating(rating) {
  try {
    const response = await fetch("url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rating),
    });

    return await response.json();
  } catch (error) {
    console.error("Ошибка:", error);
  }
}

// Показать сообщение о успешном голосовании
function showResult() {
  const ratingCountElement = document.querySelector(".rating-bonus__rated");

  const findTotalNumber =
    Number(
      ratingCountElement.textContent.match(/\d+((.|,)\d+)?/)[0].replace(/,/, "")
    ) + 1;

  ratingCountElement.innerHTML = `Rated by (${numberWithCommas(
    findTotalNumber
  )})`;

  alert("You have successfully voted, thank you!");
}

// Добавить запятые в число
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

if (window.innerWidth <= 480) {
  document
    .querySelector("input[type=radio]:checked")
    .removeAttribute("checked");
  document.getElementById("rating-bonus__5").checked = true;
}
