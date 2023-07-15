const API_KEY = 'd2fc9af029a84adbb13e8930a7480de3';
const url = 'https://newsapi.org/v2/everything?q=';

window.addEventListener('load', ()=>fetchNews("India"));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    // console.log(data)
    bindData(data.articles);
}

function bindData(articles){
    const cardContainer = document.getElementById("card-container");
    const newsTemplateCard = document.getElementById("template-news-card");
    cardContainer.innerHTML="";
    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsTemplateCard.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector("#news-image");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    // from google
    const date = new Date(article.publishedAt).toLocaleDateString("en-us",{
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener("click", ()=>{
        window.open(article.url, "_blank");
    });
}

let curNavItem = null;
function navItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curNavItem?.classList.remove("active");
    curNavItem = navItem;
    curNavItem.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", ()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curNavItem?.classList.remove("active");
    curNavItem = null;
})

function reload(){
    window.location.reload();
};