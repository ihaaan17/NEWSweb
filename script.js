const APIkey="24d2219e3ace47efbf8f72e1830235b0";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));


async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${APIkey}`);
    const data = await res.json();
    bindData(data.articles); 
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template1");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;



}  
let selectednav=null;
function onnavitemclick(id){
    fetchNews(id);
    const naviitem=document.getElementById(id);
    selectednav?.classList.remove('active');
    selectednav=naviitem;
    selectednav.classList.add('active');

}

const searchButton = document.getElementById("search-btn");
const searchText=document.getElementById("search-text");

searchButton.addEventListener("click",()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    selectednav?.classList.remove('active');
    selectednav=null;
});

function reload(){
    window.location.reload();
}