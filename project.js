const projectInfos = document.querySelector("#project-infos");
const articlesList = document.querySelector("#articles-list");

async function renderProjectInfos(projectName)
{
   let htmlCode = "";

   let projectObj = await fetch(`/projects/${projectName}/project.json`).then(r => r.json())
   .catch(console.error);

   let { title, thumbnail, description } = projectObj;

   if(thumbnail == "placeholder") thumbnail = "https://picsum.photos/200";
   else if(!thumbnail.startsWith("http")) thumbnail = `/projects/${projectName}` + thumbnail;

   projectInfos.innerHTML = `
      <span><img src="${thumbnail}" style="float: left;" class="project-img-big" alt="">
      <div style="float: left;"><h2>${title}</h2>
      <h4 style="white-space: pre-wrap;">${description}</h4></span></div>`;


   let articlesObj = await fetch(`/projects/${projectName}/articles/articles.json`).then(r => r.json()).catch(console.error);

   for(articleKeyIndex in Object.keys(articlesObj.articles_metadata).reverse()) // reverse to have latest first
   {
      let articleName = Object.keys(articlesObj.articles_metadata).reverse()[articleKeyIndex];
      let articleObj = articlesObj.articles_metadata[articleName];

      let { title, top_background, description, publish_date } = articleObj;

      if(top_background == "placeholder") top_background = "https://picsum.photos/200";
      if(top_background == "none") top_background = "/none.png"
      else if(!top_background.startsWith("http")) top_background = `/projects/${projectName}` + top_background;

      
      htmlCode += `
            <div class="col s4 m2" id="article-${projectName}">
               <div class="card card-article blue-grey darken-1" onclick="window.location.assign('/projects/${projectName}/article/${articleName}')">
                  <div class="card-image">
                     <img src="${top_background}">
                     <span class="card-title article-card-title">${title}</span>
                  </div>
                  <div class="card-content">
                     <small>${description}</small>
                  </div>
                  <div class="card-action">
                     <small>Release date: ${parseDate(publish_date.match(/\d+\/\d+\/\d+/g)[0], "dd/mm/yyyy").toLocaleDateString('fr-FR')}</small>
                  </div>
               </div>
            </div>`; // date hack because of stupid american locale
   }

   articlesList.innerHTML = htmlCode;
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
   let projectName = window.location.toString().match(/\/projects\/(.*)/g)[0].split("/")[2];
   
   document.querySelector("title").innerText = projectName + " project (llrblog)";

   renderProjectInfos(projectName);
});