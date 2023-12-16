const urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get("userId");
let path = window.location.search;
let data;
function skeletonProfileArea()
{
  return `
  <img class="skeleton">
    </div>
    <div class="col-12 mt-3  skeleton-profile-name">
        <p class="fs-3 skeleton mb-3"></p>
        <p class="fs-3 skeleton mb-3"></p>
    </div>
    <div class="col-12 mt-2 mb-2 skeleton-profile-link d-flex">
        <p class="skeleton"></p>
        <p class="skeleton ms-2"></p>
    </div>
    <div class="col-12 mt-2 d-flex skeleton-profile-follower">
        <p class="fs-3 skeleton"></p>
        <p class="ms-2 skeleton"></p>`
}
function skeletonTweets()
{
    return `<div class="card col-12 text-white">
  <div class="row">
    <div class="col-1 py-4">
      <img class="img-fluid">
    </div>
    <div class="col-10 py-4">
      <div class="card-body skeleton-card-body">
        <div class="d-flex mb-3">
          <h5 class="skeleton"></h5>
          <h5 class="mb-0 fw-light ms-2 skeleton"></h5>
          <h5 class="ms-1 mb-0 fw-light skeleton"></h5>
        </div>
        <h6 class="mb-3 text-uppercase skeleton"></h3>
        <p class="skeleton"></p>  
      </div>
      <div class="d-flex skeleton-icons-div mt-4">
        <i class="skeleton"><span></span></i>
        <i class="skeleton"></i>
        <i class="skeleton"><span></span></i>
        <i class="skeleton"></i>
      </div>
    </div>
  </div>
</div>`
}
for(let i=0;i<10;i++)
{
  document.getElementById("Tweets").innerHTML += skeletonTweets()
}
document.getElementById("profileArea").innerHTML = skeletonProfileArea()
async function main() {
  try {
    const temp = getPosts();
    const temp2 = getUserName();
    const [posts] = await Promise.all([temp]);
    const [users] = await Promise.all([temp2]);
    let container = document.getElementsByClassName("container")[0];
    let buttondiv = document.getElementsByClassName("button-div")[0];
    let wrapper = document.getElementsByClassName("row")[0];
    let profile = document.getElementById("profileArea");
    let tweets = document.getElementById("Tweets");
    let info = document.getElementById("Info");
    function createProfileArea()
    {
      for ( let user of users)
      {
        if(userId == user.id)
        {
      return `
        <img src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png" style="border-radius: 50%;width: 12rem;" alt="user">
    </div>
    <div class="col-12 mt-3">
        <p class="fs-3">${user.name}</p>
        <p class="fs-3" style="color: grey;">@${user.username}</p>
    </div>
    <div class="col-12 mt-3">
        <i class="fa-solid fa-location-dot"><span class="ms-1 fs-3">${user.address.city}</span></i>
        <i class="fa-solid fa-link ms-2"><a href="#" class="ms-1 fs-3" style="color: rgb(0, 174, 255);">${user.website}</a></i>
    </div>
    <div class="col-12 mt-2 d-flex">
        <p class="fs-3"><span class="fw-bolder fs-3">1690</span> Following</p>
        <p class="ms-3 fs-3"><span class="fw-bolder fs-3">3.2K</span> Followers</p>`
        }
      }
    }
    profile.innerHTML = ""
    profile.innerHTML += createProfileArea()
    function randomNum()
    {
      let postNumber = []
      let randomNumber = []
      let likeNumber = []
          for(let i=0;i<10;i++)
          {
            postNumber.push(Math.floor(Math.random()*10))
            likeNumber.push(Math.floor(Math.random()*100)+50)
            randomNumber.push(Math.floor(Math.random()*60))
          }
          randomNumber.sort(function(num1, num2) {
            return num1 - num2;
          });
          return [randomNumber,postNumber,likeNumber]
    }
    let [randNum,postNum,likeNum] = randomNum()
    let i=-1;
    function createCards(post,randomNumber) {
      i = i+1;
      for ( let user of users)
      {
        if(userId == user.id)
        {
          return `<div class="card col-12 text-white">
          <div class="row">
            <div class="col-1 py-4">
              <img class="img-fluid" style="border-radius:50%" src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png" alt="user">
            </div>
            <div class="col-10 py-4">
              <div class="card-body">
                <div class="d-flex mb-3">
                  <h5>${user.name}</h5>
                  <h5 class="mb-0 fw-light ms-2">@${user.username}</h5>
                  <h5 class="ms-1 mb-0 fw-light"><span class="mx-1">&#183;</span>${randomNumber[i]}min ago</h5>
                </div>
                <h6 class="mb-3 text-uppercase">${post.title}</h3>
                <p>${post.body}</p>  
              </div>
              <div class="d-flex icons-div mt-4">
                <i class="fa-regular fa-comment"><span>${postNum[i]}</span></i>
                <i class="fa-solid fa-repeat"></i>
                <i class="fa-regular fa-heart"><span>${likeNum[i]}</span></i>
                <i class="fa-solid fa-upload"></i>
              </div>
            </div>
          </div>
        </div>`;
        }
      }
      
    }
    function createInfoArea()
    {
      for ( let user of users)
      {
        if(userId == user.id)
        {
          return `<div class="row text-center">
            <div class="card col-6 col-lg-4 border-0 text-white p-0 card-info">
                    <h5 class="py-2"><i class="fa-solid fa-building me-2"></i>Addres</h5>
                    <p class="py-2">${user.address.street}</p>
                    <p class="py-2">${user.address.suite}</p>
                    <p class="py-2">${user.address.city}</p>
                    <p class="py-2">${user.address.zipcode}</p>
            </div>
            <div class="card col-6 col-lg-4 border-0 text-white p-0 card-info">
                <h5 class="py-2"><i class="fa-solid fa-location-dot me-2"></i>Company</h5>
                  <p class="py-2">${user.company.name}</p>
                  <p class="py-2">${user.company.catchPhrase}</p>
                  <p class="py-2">${user.company.bs}</p>
            </div>
            <div class="card col-12 col-lg-4 border-0 text-white p-0 card-info">
            <h5 class="py-2"><i class="fa-solid fa-phone me-2"></i>Contact</h5>
                <p class="py-2">${user.email}</p>
                <p class="py-2">${user.phone}</p>
                <p class="py-2">${user.website}</p>
            </div></div>`
        }
      }
    }
    info.innerHTML = createInfoArea();
    tweets.innerHTML = "";
    for (let i = 0; i < posts.length; i++) {
      tweets.innerHTML += createCards(posts[i],randNum,likeNum);
    }
    let button = document.createElement("button");
    let a = document.createElement("a");
    a.innerHTML = "<";
    button.classList.add("btn", "btn-danger");
    a.href = "/";
    button.appendChild(a);
    buttondiv.appendChild(button);
    container.appendChild(wrapper);
  } catch (err) {
    console.log("Bir hatayla karşılaştık!\n", err);
  }
}
async function getPosts() {
  if (userId == "" || undefined || null) {
    userId = prompt(
      "Gönderilerine erişmek istediğiniz kullanıcının id numarasını giriniz(0-10):"
    );
    userId = Number(userId);
    if (userId >= 1 && userId <= 10) {
      window.location.href = `/posts/posts.html?userId=${userId}`;
    } else {
      alert(
        "Hatalı bir giriş yaptınız. Lütfen 1 ile 10 arasında sayı giriniz!"
      );
      throw new Error(
        "Hatalı bir giriş yaptınız. Lütfen 1 ile 10 arasında sayı giriniz!\nHata:"
      );
    }
  }
  if (path == "") {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    data = await response.json();
  } else {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?userId=" + userId
    );
    data = await response.json();
  }
  return data;
}
async function getUserName() {
  try {
const response2 = await fetch(
  "https://jsonplaceholder.typicode.com/users"
  );
  data2 = await response2.json();
} catch (err) {
console.log("Bir hatayla karşılaştık!")
}
return data2;
}
let x = main();
function cityInfo(evt,cityName)
{
    let buttons = document.querySelectorAll("button")
    for(let i=0;i<buttons.length;i++)
    {
        if(buttons[i].classList.length>1)
        {
            buttons[i].classList.remove("active") 
        }
    }
    evt.currentTarget.classList.add("active")
    let choices = document.getElementsByClassName("choices");
    for(let i=0;i<choices.length;i++)
    {
        choices[i].style.display = "none";
    }
document.getElementById(cityName).style.display="block"
}
document.getElementsByClassName("defaultOpen")[0].click();  