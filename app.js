const submitButton = document.querySelector(".submitButton");
const loginChooser = document.querySelector(".loginChooser");
const signUpChooseButton = document.querySelector(".signUpChooser");
const loader = document.querySelector(".loader");

const firstBox = document.querySelector(".top-box");
const lastBox = document.querySelector(".last-box");

const name_in = document.querySelector("#name_in");
const email_in = document.querySelector("#email_in");
const pass_in = document.querySelector("#pass_in");
const gender_in_male = document.querySelector("#gender_in_male");
const gender_in_female = document.querySelector("#gender_in_female");

const loginFormDiv = document.querySelector(".loginForm");
const loginFormBoxes = document.querySelectorAll(".loginForm .login-box");
const buttonGroup = document.querySelector(".buttonGroup");
const notificationDiv = document.querySelector(".notificationDiv");

//0 = signUp 1=login
let submitState = 0;

let loginData = {};
let signUpData = {};

//false= no  request currently going on
//true= request currently going on
let requestGoingOn = false;

//DOM Manipulation--------------------------------------------------------------------------
loginChooser.addEventListener("click", (e) => {
  firstBox.classList.add("noneDisplay");
  lastBox.classList.add("noneDisplay");
  submitState = 1;
  loginChooser.classList.add("activeBackground");
  signUpChooseButton.classList.remove("activeBackground");
});
signUpChooseButton.addEventListener("click", (e) => {
  firstBox.classList.remove("noneDisplay");
  lastBox.classList.remove("noneDisplay");
  submitState = 0;
  loginChooser.classList.remove("activeBackground");
  signUpChooseButton.classList.add("activeBackground");
});

function gotResponse(s = 0, response, notificationMessage) {
  //s=0 means bad response s=1 means good response

  requestGoingOn = false; //changing request state
  loader.classList.add("noneDisplay");
  submitButton.classList.remove("submitButtonDownState");
  notificationDiv.innerHTML = notificationMessage;

  if (s === 1) {
    //good response

    //Dom Manipulation
    loginFormDiv.classList.add("scaleX");
    for (let box of loginFormBoxes) {
      box.classList.add("fadeoutanim");
    }
    buttonGroup.classList.add("fadeoutanim");
    submitButton.classList.add("noneDisplay");
    notificationDiv.style.backgroundColor = "rgba(125, 241, 57, 0.678)";
    console.log(response);
  } else {
    //bad response
    notificationDiv.style.backgroundColor = "rgba(255, 207, 210,1)";
    console.log(response);
  }
  notificationDiv.classList.add("notificationAnimClass");
  setTimeout(() => {
    notificationDiv.classList.remove("notificationAnimClass");
  }, 2000);
}

//Login or Sign up-------------------------------------------------------------------------------------------
submitButton.addEventListener("click", (e) => {
  //Dom Manipulation
  submitButton.classList.add("submitButtonDownState");
  loader.classList.remove("noneDisplay");

  //sign up request
  if (submitState === 0 && !requestGoingOn) {
    requestGoingOn = true;

    let gender;
    if (gender_in_male) {
      gender = "male";
    } else {
      gender = "female";
    }
    signUpData = {
      name: name_in.value,
      email: email_in.value,
      password: pass_in.value,
      gender: gender,
    };
    //Request---------------------------------------------------

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/",
      data: signUpData,
    })
      .then(function (response) {
        gotResponse(1, response, "SignUp Successfull");
      })
      .catch(function (error) {
        gotResponse(0, error, "Invalid credentials");
      });

    //-----------------------------------------------------------
  } else if (submitState === 1 && !requestGoingOn) {
    requestGoingOn = true;

    loginData = {
      email: email_in.value,
      password: pass_in.value,
    };
    //Request Login------------------
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/login",
      data: loginData,
    })
      .then(function (response) {
        gotResponse(1, response, "Logged in");
      })
      .catch(function (error) {
        gotResponse(0, error, "Incorrect Email or Password ");
      });
    //-----------------------------
  }
});
