// let url = "https://www.gamerpower.com/api/giveaways";
const filter_button = document.querySelector(".filter-by");
const platform_filter = document.querySelector(".platform");
const sort_filter = document.querySelector(".sort-by");
const sort_genres = document.querySelector(".category");
const option = document.querySelector(".option");

const freeGamesURL = "https://www.freetogame.com/api/games";

function createDOM(result, limit) {
  let container = document.querySelector(".cards-container");
  container.textContent = "";
  const limitedResult = result.filter((e, index) => index < limit);
  console.log(limitedResult);
  limitedResult.forEach((element) => {
    container.append(createCard(element));
  });
}

function createCard(element) {
  const card = document.createElement("div");
  card.classList.add("game-card");
  const thumbnail = document.createElement("img");
  thumbnail.setAttribute("src", element.thumbnail);
  thumbnail.classList.add("game-img");
  thumbnail.setAttribute("alt", "Thumbnail");
  const parentDiv = document.createElement("div");
  parentDiv.classList.add("card-details");
  const title = document.createElement("h2");
  title.textContent = element.title;
  const link = document.createElement("a");
  link.setAttribute("href", element.game_url);
  link.append(title);

  const div = document.createElement("div");
  div.classList.add("content");
  const genre = document.createElement("span");
  genre.textContent = element.genre;
  genre.classList.add("genre");
  const platform = document.createElement("span");
  platform.textContent = element.platform;
  platform.classList.add("platform-name");
  div.append(genre, platform);

  const description = document.createElement("p");
  description.textContent = element.short_description;
  description.classList.add("game-description");

  //   const div2 = document.createElement('div');
  const publisher = document.createElement("span");
  publisher.textContent = `Publisher ${element.publisher} `;
  const developer = document.createElement("span");
  developer.textContent = `Developer ${element.developer}`;
  const date = document.createElement("span");
  date.textContent = `Release Date ${element.release_date}`;
  parentDiv.append(link, div, description, publisher, developer, date);
  card.append(thumbnail, parentDiv);
  return card;
}

function fetch(url, cb) {
  let xhr = new XMLHttpRequest();
  const proxyURL = `https://api.codetabs.com/v1/proxy?quest=${url}`;
  let returnedData;
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      returnedData = JSON.parse(xhr.responseText);
      console.log(returnedData, "2222");
      cb(returnedData, 20);
    }
  };
  xhr.open("GET", proxyURL, true);

  xhr.send();
}

fetch(freeGamesURL, createDOM);

let selectors = [platform_filter, sort_genres, sort_filter];

function selectFilter(arr, cb) {
  let activeSelectors = arr.filter((element) => element.value);
  let link = activeSelectors.reduce((acc, element, index) => {
    if (index == 0) {
      return (acc += `${element.className}=${element.value}`);
    } else {
      return (acc += `&${element.className}=${element.value}`);
    }
    return acc;
  }, `${freeGamesURL}?`);

  console.log(link);
  cb(link, createDOM);
}
filter_button.addEventListener("click", () => {
  // console.log(fetch);
  selectFilter(selectors, fetch);
}); //
