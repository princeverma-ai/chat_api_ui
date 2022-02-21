//chat opened elements
const mainPageDiv = document.querySelector(".mainPage");
const chatDiv = document.querySelector(".chatDiv");
const topBarName = document.querySelector(".topBarName");
const usersList = document.querySelector(".usersList");
const userModeButton = document.querySelectorAll(".userModeButton");
const userListImage = document.querySelectorAll(".userListImage");
const lastSeen = document.querySelectorAll(".lastSeen");

let userListString = ``;
let allusersArray;

//0=all user 1=chats
let userMode = 0;

function getIndex(element) {
  var index;
  if (!element.classList.contains("usersList")) {
    if (!element.classList.contains("userListElement")) {
      var parent = element.parentElement.parentNode;
      index = Array.prototype.indexOf.call(
        parent.children,
        element.parentElement
      );
    } else {
      var parent = element.parentNode;
      index = Array.prototype.indexOf.call(parent.children, element);
    }
  }
  return index;
}
//Chat Screen Handler-------------------------------------------------------------------------
function loadChatScreen(response) {
  //Dom manipulation
  loginDiv.style.display = "none";
  mainPageDiv.style.display = "unset";
  mainPageDiv.classList.add("mainPageFadein");

  //updating fields
  topBarName.innerText = response.data.user.name;

  getAllUsersRequest()
    .then((res) => {
      allusersArray = res.data.data.users;
      allusersArray.forEach((element) => {
        let lastSeenDate = new Date(element.lastSeen);
        userListString += `<li class="userListElement">
      <div class="userListImage">${element.name[0].toUpperCase()}</div>
      <p class="chatUsername">${element.name}</p>
      <p class="lastSeen">${lastSeenDate.getDate()}-${lastSeenDate.getMonth()}-${lastSeenDate.getFullYear()}</p>
      </li>`;
      });
      usersList.innerHTML = userListString;
    })
    .catch((err) => err);
}

usersList.addEventListener("click", (e) => {
  let clickedIndex=getIndex(e.target)
  getChat(currentUser._id,allusersArray[clickedIndex]._id).then(response=>{
    console.log(response)
  })
});
