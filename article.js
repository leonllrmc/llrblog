const articleInfos = document.querySelector("#article-infos");
const articlesList = document.querySelector("#articles-list");
const articleBodyMarkdown = document.querySelector("#article-markdown");

const markdownDecoder = new showdown.Converter();

async function renderProjectInfos(projectName, articleName)
{

   let articlesObj = await fetch(`/projects/${projectName}/articles/articles.json`).then(r => r.json()).catch(console.error);
   let articleObj = articlesObj.articles_metadata[articleName];

   let { title, top_background, description, publish_date } = articleObj;

   if(top_background == "placeholder") top_background = "https://picsum.photos/200";
   if(top_background == "none") top_background = "/none.png"
   else if(!top_background.startsWith("http")) top_background = `/projects/${projectName}` + top_background;

   articleInfos.innerHTML = `
   <span><img src="${top_background}" class="article-top-background" alt="">
   <div style="text-align: center;"><h2>${title}</h2>
   <h4 style="white-space: pre-wrap;">${description}</h4></span>
   <p>Release date: ${parseDate(publish_date.match(/\d+\/\d+\/\d+/g)[0], "dd/mm/yyyy").toLocaleDateString('fr-FR')}</p></div>
   <hr class="article-top-hr1">
   `;

   let articleText = await (fetch(`/projects/${projectName}/articles/${articleName}.md`).then((r) => {
         if(r.status.toString().startsWith("2")) return r.text()
         else window.location.assign("https://http.cat/" + r.status.toString())
      }).catch((err) => {
      console.error(err);
      window.location.assign("https://http.cat/500");
   }));

   articleBodyMarkdown.innerHTML = markdownDecoder.makeHtml(articleText);
}

function parseDate(input, format) {
   format = format || 'yyyy-mm-dd'; // default format
   var parts = input.match(/(\d+)/g), 
       i = 0, fmt = {};
   // extract date-part indexes from the format
   format.replace(/(yyyy|dd|mm)/g, function(part) { fmt[part] = i++; });
 
   return new Date(parts[fmt['yyyy']], parts[fmt['mm']]-1, parts[fmt['dd']]);
 }

window.addEventListener("DOMContentLoaded", async () => {
   // should have used regex group, but can't figure out how to get it working :(
   let [ , , projectName, , articleName] = window.location.toString().match(/\/projects\/(.*)\/article\/(.*)/g)[0].split("/");


   document.querySelector("title").innerText = articleName + " article (llrblog)";

   renderProjectInfos(projectName, articleName);
});