require("dotenv").config();

//List of HTML
const main = document.querySelector("main");
const section = document.querySelector("section");
const categories = document.querySelectorAll(".cat");
const aside = document.querySelector("aside");
const about = document.querySelector(".about");
const contact = document.querySelector(".contact");
const links = document.querySelectorAll("a");
const navbar = document.querySelector("nav");

//Naviagtion
function handleNav() {
  section.classList.add("hide");
  aside.classList.add("hide");
}
links[0].addEventListener("click", () => {
  section.classList.remove("hide");
  aside.classList.remove("hide");
  about.remove();
  contact.remove();
});

links[1].addEventListener("click", () => {
  section.classList.remove("hide");
  aside.classList.remove("hide");
  about.remove();
  contact.remove();
});

links[2].addEventListener("click", () => {
  handleNav();
  contact.remove();
  main.appendChild(about);
});

links[3].addEventListener("click", () => {
  handleNav();
  about.remove();
  main.appendChild(contact);
});

//Nav-scroll
window.addEventListener("scroll", myFunction);
var sticky = navbar.offsetTop;
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

//Api fetch
const apiKey = process.env.API_KEY;
let country = "us";
let apiURL = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=`;
window.addEventListener("load", () => {
  about.remove();
  contact.remove();
  displayNews(apiURL);
});

//Api filter by catergories
categories.forEach((category) => {
  category.addEventListener("click", () => {
    let userInput = category.getAttribute("data-filter");
    apiURL = `https://newsapi.org/v2/top-headlines?country=${userInput}&apiKey=ba6a8e2ce4714e3a99cba68b2eb928ae`;
    clearField();
    displayNews(apiURL);
  });
});

function clearField() {
  const articles = document.querySelectorAll("article");
  articles.forEach((article) => {
    article.remove();
  });
}

function displayNews(pUrl) {
  fetch(pUrl)
    .then((res) => res.json())
    .then((data) => {
      data.articles.forEach((item) => {
        const article = document.createElement("article");
        const img = document.createElement("img");
        const content = document.createElement("div");
        const h4 = document.createElement("h4");
        const p = document.createElement("p");
        const author = document.createElement("p");
        const small = document.createElement("small");
        const div = document.createElement("div");
        const input = document.createElement("input");
        input.type = "button";
        input.value = "Read More";
        article.addEventListener("click", () => {
          parent.open(item.url);
        });
        input.addEventListener("click", () => {
          parent.open(item.url);
        });
        div.appendChild(input);
        author.appendChild(small);
        author.classList.add("author");
        article.classList.add("main-article");
        content.classList.add("content");

        img.src = item.urlToImage
          ? `${item.urlToImage}`
          : "https://images.unsplash.com/photo-1624258012851-c59960784150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c21pbGV5JTIwZmFjZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60";
        h4.innerHTML = `${item.title}`;
        p.innerHTML = item.description ? `${item.description}` : null;
        small.innerHTML = item.author ? `${item.author}` : "Unknown";

        article.appendChild(img);
        content.appendChild(h4);
        content.appendChild(p);
        content.appendChild(div);
        content.appendChild(author);
        article.appendChild(content);
        section.appendChild(article);
      });
    });
}
