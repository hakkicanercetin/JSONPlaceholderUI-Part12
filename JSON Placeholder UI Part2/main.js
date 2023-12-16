let data;
let data2;
function skeletonPost()
{
  return `
  <div class="card col-12 text-white">
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
for(let i=0;i<20;i++)
{
  document.getElementsByClassName("row")[0].innerHTML += skeletonPost();
}
async function printPosts()
{
    let randomNumber = createRandomNumber()
    const temp = getPosts()
    const temp2 = getUsers()
    const [posts] = await Promise.all([temp])
    const [users] = await Promise.all([temp2])
    let i=-1;
    function createPosts(post,randomNumber)
    {
        i=i+1;
        for (let user of users)
        {
            if(user.id == post.userId)
            {
                return `<div class="card col-12 text-white">
          <div class="row">
            <div class="col-1 py-4">
              <img class="img-fluid" style="border-radius:50%" src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png" alt="user">
            </div>
            <div class="col-10 py-4">
              <div class="card-body">
                <div class="d-flex mb-3">
                  <h5><a href="/posts/posts.html?userId=${user.id}">${user.name}</a></h5>
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
    let row = document.getElementsByClassName("row")[0];
    row.innerHTML = ""
     for(let i=0;i<20;i++)
    {
        row.innerHTML += createPosts(posts[randomNumber[i]],randNum);
    }
}
async function getPosts()
{
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts")
        data = await response.json();
        return data;
        
    } catch (error) {
        console.log(error)
    }
}
async function getUsers()
{
    try {
        const response2 = await fetch("https://jsonplaceholder.typicode.com/users")
        data2 = await response2.json();
        return data2;
        
    } catch (error) {
        console.log(error)
    }
}
function createRandomNumber()
{
    let randNumb = []
    while(randNumb.length < 20)
    {
    let temp = Math.floor(Math.random()*100)
    if(randNumb.includes(temp))
    {

    }
    else
    {
        randNumb.push(temp)
    }
    }
    return randNumb
}
function randomNum()
    {
      let postNumber = []
      let randomNumber = []
      let likeNumber = []
          for(let i=0;i<20;i++)
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
printPosts()
    
