//listen for auth status changes
auth.onAuthStateChanged((user) => {
  console.log(user);

  if (user) {
    //get data
    db.collection("guides")
      .get()
      .then((snapshot) => {
        setupGuides(snapshot.docs);
      });
  } else {
    setupGuides([]);
  }
});

//signup
const signUpForm = document.querySelector("#signup-form");
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get user info
  const email = signUpForm["signup-email"].value;
  const password = signUpForm["signup-password"].value;

  //sign up the user
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      signUpForm.reset();
      let modal = document.querySelector("#modal-signup");
      M.Modal.getInstance(modal).close();
    })
    .then(() => {
      console.log("user signed up");
    })
    .catch((er) => {
      console.error("error", er);
    });
});
//logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut();
});
//login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("click", (e) => {
  e.preventDefault();
  //get user info
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      //close the login modal and reset the form
      loginForm.reset();
      let modal = document.querySelector("#modal-login");
      M.Modal.getInstance(modal).close();
    })
    .catch((er) => {
      console.log(er.code, er.massage);
    });
});