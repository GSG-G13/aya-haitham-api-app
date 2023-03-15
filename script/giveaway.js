const sort_by = document.querySelector(".sort-by");
const sort_types = document.querySelector(".type");
const platform_filter = document.querySelector(".platform");
const filter_button = document.querySelector(".filter-by");

const giveAwayUrl = "https://www.gamerpower.com/api/giveaways";

let selectors = [sort_by, sort_types, platform_filter];
function createCards(element) {
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
  link.setAttribute("href", element.open_giveaway_url);
  link.append(title);

  const div = document.createElement("div");
  div.classList.add("content");
  const genre = document.createElement("span");
  genre.textContent = element.type;
  genre.classList.add("genre");
  const worth = document.createElement("span");
  worth.textContent = element.worth;
  worth.classList.add("platform-name");
  div.append(worth, genre);

  const description = document.createElement("p");
  description.textContent = element.description;
  description.classList.add("game-description");
  const date = document.createElement("span");
  date.textContent = `Release Date ${element.published_date}`;
  parentDiv.append(link, div, description, date);
  card.append(thumbnail, parentDiv);
  return card;
}
function createDOM2(result, limit) {
  let container = document.querySelector(".cards-container");
  container.textContent = "";
  const limitedResult = result
    .filter((e, index) => e.worth != "N/A")
    .filter((e, index) => index < limit);
  console.log(limitedResult);
  limitedResult.forEach((element) => {
    container.append(createCards(element));
  });
}
fetch(giveAwayUrl, createDOM2);
filter_button.addEventListener("click", () => {
  selectFilter(selectors, fetch, giveAwayUrl, createDOM2);
}); //
