const userCardcontainer = document.querySelector("[data-user-cards-container]");
/**ul */
const searchInput = document.querySelector("[data-search]");

let users = []; /**data ka copy rakhne k liye */

searchInput.addEventListener("input", (e) => {
  const input = e.target.value.toLowerCase();
  console.log("input " + input);

  const display = users.filter((user) => {
  /**it will filter the users array. If input matches the name or email*/
    let name = user.name.toLowerCase();
    let email = user.email.toLowerCase();

    let flag = name.includes(input) || email.includes(input);
    return flag;
    /**if flag is true it will return the user into array */
  });

  console.log(display);
  displayUsers(display);             /**To display filtered array on the screen */

  if (input == "") {                 /**When there is nothing written in search bar */
    displayUsers(users);             /**To display everything */
  }

  if (display.length == 0) {         /**to display when nothing matches */
    let emptyMsg = document.createElement("li");
    emptyMsg.setAttribute("class", "card");
    emptyMsg.innerHTML = `
      <p class="header" data-header>Sorry broooo!! </p>
      <p class="body" data-body> Not Found </p>
      `;
    userCardcontainer.appendChild(emptyMsg);        /**li appenden in ul */
  }
});

fetch("https://jsonplaceholder.typicode.com/users") /**Fetch the data from server */
  .then((res) => res.json())                        /**Stringfy converted to object */
  .then((data) => {
    data.forEach((user) => {
      users.push(user);                             /**data pushed to user array */
    });
    console.table(users);
    displayUsers(data);                             /**To display everything */
  });

function displayUsers(users) {
  const HtmlString = users
    .map((user) => {
      return `
      <li class="card">
      <p class="header" data-header> ${user.name} </p>
      <p class="body" data-body> ${user.email} </p>
    </li>   
      `;
    })
    .join("");                                     /**join se comma vala problem gaya */

  userCardcontainer.innerHTML = HtmlString;
}
