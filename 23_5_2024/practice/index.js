const elemFormCreate = document.querySelector("#formCreate");
const elemInputTitle = elemFormCreate.querySelectorAll("input")[0];
const elemInputViews = elemFormCreate.querySelectorAll("input")[1];
const elemPostsLength = document.querySelector("#postLength");
const elemFormDelete = document.querySelector("#formDelete");
const elemInputIdToDelete = elemFormDelete.querySelector("input");

const baseUrl = "http://localhost:8001";
const elemSuccess = document.querySelector("#success");
const elemFailure = document.querySelector("#failure");
const urlPosts = `${baseUrl}/posts`;
elemFormCreate.addEventListener("submit", addPost);

function getLength() {
  axios
    .get(urlPosts)
    .then(function (response) {
      const posts = response.data;
      elemPostsLength.innerText = posts.length;
      setSuccess();
    })
    .catch(function (error) {
      setFailure();
    });
}

function setSuccess() {
  elemSuccess.innerText = "success";
}

function deletePost(e) {
  e.preventDefault();
  const url = `${baseUrl}/posts/${elemInputIdToDelete.value}`;
  try {
    axios.delete(url);
    setSuccess();
  } catch (error) {
    setFailure();
  }
}

function addPost(e) {
  e.preventDefault();
  const body = {
    title: elemInputTitle.value,
    views: elemInputViews.value,
  };
  axios
    .post(urlPosts, body)
    .then(function (response) {
      getLength();
      console.log(response);
      setSuccess();
    })
    .catch(function (error) {
      console.log(error);
      setFailure();
    });
}
function setFailure() {
  elemFailure.innerText = "failure";
}


const formdata = new FormData(elemFormCreate);
console.log(formdata);