const submitButton = document.querySelector(".submitButton");
const loginChooser = document.querySelector(".loginChooser");
const signUpChooseButton = document.querySelector(".signUpChooser");

const firstBox = document.querySelector(".top-box");
const lastBox = document.querySelector(".last-box");

const name_in = document.querySelector("#name_in");
const email_in = document.querySelector("#email_in");
const pass_in = document.querySelector("#pass_in");
const gender_in_male = document.querySelector("#gender_in_male");
const gender_in_female = document.querySelector("#gender_in_female");

let submitState = 0;
let loginData = {};
let signUpData = {};
//0 = signUp 1=login

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

//Login or Sign up-------------------------------------------------------------------------------------------
submitButton.addEventListener("click", (e) => {
  submitButton.classList.add("color");

  //sign up request
  if (submitState === 0) {
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
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    //-----------------------------------------------------------
  } else {
  }
});
