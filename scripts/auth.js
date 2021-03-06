//add admin cloud function
const adminForm = document.querySelector(".admin-actions");
adminForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const adminEmail = document.querySelector("#admin-email").value;
  const addAdminRole = functions.httpsCallable("addAdminRole");
  addAdminRole({ email: adminEmail }).then((result) => {
    console.log(result);
  });
});

//listen for auth status changes
auth.onAuthStateChanged((user) => {
  if (user) {
    user.getIdTokenResult().then((IdTokenResult) => {
      user.admin = IdTokenResult.claims.admin;
      setupUI(user);
    });
    //get data
    db.collection("guides").onSnapshot((snapshot) => {
      setupGuides(snapshot.docs);
    });
  } else {
    setupGuides([]);
    setupUI();
  }
});

//crate new guide
const createForm = document.querySelector("#create-form");
createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("guides")
    .add({
      title: createForm["title"].value,
      content: createForm["content"].value,
    })
    .then(() => {
      //close modal and reset form
      const modal = document.querySelector("#modal-create");
      M.Modal.getInstance(modal).close();
      createForm.reset();
    })
    .cath((er) => {
      console.log(er.massage);
    });
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
    .then((cred) => {
      return db.collection("users").doc(cred.user.uid).set({
        bio: signUpForm["signup-bio"].value,
      });
    })
    .then(() => {
      signUpForm.reset();
      let modal = document.querySelector("#modal-signup");
      M.Modal.getInstance(modal).close();
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
