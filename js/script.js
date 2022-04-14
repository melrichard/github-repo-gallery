const  overview = document.querySelector(".overview"); // div where your profile information will appear
const username = "melrichard";

// function to fetch API JSON Data

const getGitHubProfile = async function () {
    const res = await fetch (`https://api.github.com/users/${username}`);
    const userData = await res.json();
    console.log(userData);
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
};
