const  overview = document.querySelector(".overview"); // div where your profile information will appear
const username = "melrichard";
const repoList = document.querySelector(".repo-list");
const reposSection = document.querySelector(".repos");
const individualRepoData = document.querySelector(".repo-data");


// function to fetch API JSON Data

const getGitHubProfile = async function () {
    const res = await fetch (`https://api.github.com/users/${username}`);
    const userData = await res.json();
    //console.log(userData);
    displayUserData(userData);
};

getGitHubProfile();

const displayUserData= function (userData){
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    userInfo.innerHTML = `
    <figure>
      <img alt="user avatar" src=${userData.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${userData.name}</p>
      <p><strong>Bio:</strong> ${userData.bio}</p>
      <p><strong>Location:</strong> ${userData.location}</p>
      <p><strong>Number of public repos:</strong> ${userData.public_repos}</p>
    </div> `;
    overview.append(userInfo);
    getRepoList();
}; 

const getRepoList = async function (){
  const fetchRepo = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const reposData = await fetchRepo.json();
  console.log(reposData);
  displayRepos(reposData);
}

//Display repos
const displayRepos = function (repos){
  for (const repo of repos){
    let li = document.createElement("li");
    li.classList.add ("repo");
    li.innerHTML = `<h3> ${repo.name} </h3>`;
    repoList.append(li);
  }
}

repoList.addEventListener ("click", function(e){
    if (e.target.matches("h3")){
        const repoName = e.target.innerText; 
        //console.log(repoName);
        getRepoInfo(repoName);
    };   
});

const getRepoInfo = async function (repoName){
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);
    //list of languages
    const languages = [];
    for (const language in languageData){
         languages.push(language);
    }
    
    //console.log(languages);
    displayRepoInfo(repoInfo, languages);
};

//display specific repo info
const displayRepoInfo = function (repoInfo, languages) {
    individualRepoData.innerHTML = "";
    individualRepoData.classList.remove("hide");
    reposSection.classList.add("hide");
    

    const repoDataDiv = document.createElement ("div");
    repoDataDiv.innerHTML =`<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    individualRepoData.append(repoDataDiv);

  

}