const guideList = document.querySelector(".guides");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const accountDetails = document.querySelector(".account-details");

//prevent links before fetching data from firebase auth
for (link of loggedOutLinks) {
  link.style.display = "none";
}
for (link of loggedInLinks) {
  link.style.display = "none";
}

const setupUI = (user) => {
  if (user) {
    //account info
    const html = `
      <div>Logged in as ${user.email}</div>
    `;
    accountDetails.innerHTML = html;
    //toggle UI elements
    loggedInLinks.forEach((item) => (item.style.display = "block"));
    loggedOutLinks.forEach((item) => (item.style.display = "none"));
  } else {
    //hide account info
    accountDetails.innerHTML = "";
    //toggle again
    loggedInLinks.forEach((item) => (item.style.display = "none"));
    loggedOutLinks.forEach((item) => (item.style.display = "block"));
  }
};

//set up some gides
const setupGuides = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const guide = doc.data();
      const li = `
      <li>
      <div class="collapsible-header grey lighten-4">${guide.title}</div>
      <div class="collapsible-body white">
      <span>${guide.content}</span>
      </div>
      </li>
      `;
      html += li;
    });
    guideList.innerHTML = html;
  } else {
    guideList.innerHTML = `<h5 class='center-align' >Login to view guides</h5>`;
  }
};

{
  /* <li>
<div class="collapsible-header grey lighten-4">Guide title</div>
<div class="collapsible-body white">
  <span>Lorem ipsum dolor sit amet.</span>
</div>
</li> */
}

// setup materialize components
document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});
