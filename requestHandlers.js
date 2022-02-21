//----------------------------------------------------------------------
async function getAllUsersRequest() {
  try {
    const res = await axios.get("http://127.0.0.1:8000/");
    return res;
  } catch (err) {
    return err;
  }
}
//----------------------------------------------------------------------
async function signUpRequest(data) {
  try {
    let response = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/",
      data: data,
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
//----------------------------------------------------------------------
async function loginRequest(data) {
  try {
    let response = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/login",
      data: data,
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
//----------------------------------------------------------------------
async function getChat(currentUserID, otherUserID) {
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/chat/${currentUserID}/${otherUserID}`
    );
    return res;
  } catch (err) {
    throw new Error(err);
  }
}
