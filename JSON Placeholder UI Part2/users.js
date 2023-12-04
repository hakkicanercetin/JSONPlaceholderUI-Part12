let data;
        async function main() {
          const temp = getUsers()
          const [users] = await Promise.all([temp])
          let container = document.getElementsByClassName("container")[0];
          let wrapper = document.getElementsByClassName("row")[0];
          function createCards(user) {
            return `<div class="card" style="width: 34rem;">
              <div class="card-body">
                  <h5><i class="fa-solid fa-user"></i>Personal Informations</h5>
                  <p>${user.name}</p>
                  <p>${user.username}</p>
                  <hr>
                  <h5><i class="fa-solid fa-building"></i>Addres</h5>
                  <p>${user.address.street}</p>
                  <p>${user.address.suite}</p>
                  <p>${user.address.city}</p>
                  <p>${user.address.zipcode}</p>
                  <hr>
                  <h5><i class="fa-solid fa-location-dot"></i>Company</h5>
                  <p>${user.company.name}</p>
                  <p>${user.company.catchPhrase}</p>
                  <p>${user.company.bs}</p>
                  <hr>
                  <h5><i class="fa-solid fa-phone"></i>Contact</h5>
                  <p>${user.email}</p>
                  <p>${user.phone}</p>
                  <p>${user.website}</p>
                  <hr>
                  <a href="/posts/posts.html?userId=${user.id}" class="btn btn-link">Kullanıcının Gönderilerini Görüntüle</a>
              </div>
          </div>`;
          }
          for (let i = 0; i < users.length; i++) {
            wrapper.innerHTML += createCards(users[i]);
          }
          container.appendChild(wrapper);
        }
        async function getUsers() {
          try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
          );
          data = await response.json();
       } catch (err) {
        console.log("Bir hatayla karşılaştık!")
       }
        return data;
      }
      main()