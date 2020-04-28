const guideList = document.querySelector(".guides");

//set up some gides
const setupGuides = (data) => {
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
