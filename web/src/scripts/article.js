var article = { // stores info about the article
    title: location.pathname.replace("/wiki/", "").replace(".html", "")
}

document.querySelectorAll(".nav-link")[2].href = `https://github.com/echhs/wiki/commits/main/web/wiki/content/${article.title}.md`;