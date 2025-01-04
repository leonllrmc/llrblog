const projectList = document.querySelector("#project-list");

async function renderProjectList()
{
   let projectsMetadatas = await fetch("/projects/projects.json").then(r => r.json()).catch(console.error);

   let htmlCode = "";

   for(projectIndex in projectsMetadatas.projects)
   {
      let projectName = projectsMetadatas.projects[projectIndex];
      let projectObj = await fetch(`/projects/${projectName}/project.json`).then(r => r.json()).catch(console.error);

      let { title, thumbnail, description } = projectObj;
      let articlesObj = await fetch(`/projects/${projectName}/articles/articles.json`).then(r => r.json()).catch(console.error);
      console.log(articlesObj.articles_metadata)
      let articleCount = Object.keys(articlesObj.articles_metadata).length;   

      if(thumbnail == "placeholder") thumbnail = "https://picsum.photos/200";
      else if(!thumbnail.startsWith("http")) thumbnail = `/projects/${projectName}` + thumbnail;

      htmlCode += `
      <div class="row" id="project-${projectName}">
         <div class="col s12 m6">
            <div class="card card-project blue-grey darken-1" onclick="window.location.assign('/projects/${projectName}')">
               <div class="card-content white-text">
                  <span class="card-title"><img src="${thumbnail}" class="project-logo"> ${title}</span>
                  <p>${description}</p>
               </div>
                           
               <div class="card-action">
                  <small>Article count: ${articleCount}</small>
               </div>
            </div>
         </div>
      </div>`;
   }

   projectList.innerHTML = htmlCode;
}

window.addEventListener("DOMContentLoaded", async () => {
   renderProjectList();
})