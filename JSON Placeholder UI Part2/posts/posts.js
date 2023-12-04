const urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get("userId");
let path = window.location.search;
let data;
async function main() {
    try
    {
  const temp = getComments();
  const [comments] = await Promise.all([temp]);
  let container = document.getElementsByClassName("container")[0];
  let buttondiv = document.getElementsByClassName("button-div")[0];
  let wrapper = document.getElementsByClassName("row")[0];
  function createCards(comment) {
    return `<div class="card" style="width: 34rem;">
              <div class="card-body">
                <h6>${comment.title}</h3>
                <p>${comment.body}</p>
              </div>
          </div>`;
  }
  for (let i = 0; i < comments.length; i++) {
    wrapper.innerHTML += createCards(comments[i]);
  }
  let button = document.createElement("button")
  let a = document.createElement("a")
  a.innerHTML = "Kullanıcılara Dön"
  button.classList.add("btn","btn-secondary")
  a.href = "/"
  button.appendChild(a);
  buttondiv.appendChild(button);
  container.appendChild(wrapper);
}
catch (err) {
    console.log("Bir hatayla karşılaştık!\n",err);
}
}
async function getComments() {
      if(userId == "" || undefined || null)
      {
          userId = prompt("Gönderilerine erişmek istediğiniz kullanıcının id numarasını giriniz(0-10):")
          userId = Number(userId)
          if(userId>=1 && userId<=10)
          {
            window.location.href = `/posts/posts.html?userId=${userId}`
          }
          else
          {
            alert("Hatalı bir giriş yaptınız. Lütfen 1 ile 10 arasında sayı giriniz!")
            throw new Error("Hatalı bir giriş yaptınız. Lütfen 1 ile 10 arasında sayı giriniz!\nHata:")
          }
        }
    if(path == "")
    {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        data = await response.json();
    }
    else
    {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts?userId="+userId);
        data = await response.json();
    }
return data;
}
main()
