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
      //removing self from all users list
      for (var i = 0; i < allusersArray.length; i++) {
        if (allusersArray[i]._id === currentUser._id) {
          allusersArray.splice(i, 1);
        }
      }
      for (let element of allusersArray) {
        let lastSeenDate = new Date(element.lastSeen);
        userListString += `<li class="userListElement">
      <div class="userListImage">${element.name[0].toUpperCase()}</div>
      <p class="chatUsername">${element.name}</p>
      <p class="lastSeen">${lastSeenDate.getDate()}-${lastSeenDate.getMonth()}-${lastSeenDate.getFullYear()}</p>
      </li>`;
      }
      usersList.innerHTML = userListString;
    })
    .catch((err) => err);
}

usersList.addEventListener("click", (e) => {
  let clickedIndex = getIndex(e.target);
  let chatExistFlag1 = false,
    chatExistFlag2 = false;
  let chatID;
  for (let chatMemberUser of currentUser.chatMembers) {
    if (chatMemberUser[0] == allusersArray[clickedIndex].name) {
      chatExistFlag1 = true;
    }
  }
  for (let chatMemberother of allusersArray[clickedIndex].chatMembers) {
    if (chatMemberother[0] == currentUser.name) {
      chatExistFlag2 = true;
      chatID = chatMemberother[1];
    }
  }
  if (chatExistFlag1 && chatExistFlag2) {
    console.log("get");
    getChat(chatID)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("create");
    createChat(currentUser._id, allusersArray[clickedIndex]._id)
      .then((res) => {
        console.log(res);
        currentUser.chatMembers.push([
          allusersArray[clickedIndex].name,
          res.data.chat._id,
        ]);
        allusersArray[clickedIndex].chatMembers.push([
          currentUser.name,
          res.data.chat._id,
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
