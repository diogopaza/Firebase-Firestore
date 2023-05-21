document
  .getElementById("postForm")    //busca o elemento com o id postForm
  .addEventListener("submit", function (event) { //fica escutando o evento submit, quando ele for acionado chama uma função callback
    event.preventDefault();
    const text = document.getElementById("postText").value;
    const post = {
      text: text,
      user_id: "diogo",
      likes: 0,
      comments: [],
    };
    const postsCollection = firebase.firestore().collection("posts");
    postsCollection.add(post).then(() => {
      document.getElementById("postText").value = "";
      loadPosts();
    });
  });

function addPosts(post) {
  const postTemplate = `
    <li id="${post.id}">
        ${post.data().text} ❤️ ${post.data().likes}
    </li> `;
  document.getElementById("posts").innerHTML += postTemplate;
}

function loadPosts() {
  const postsCollection = firebase.firestore().collection("posts");
  document.getElementById("posts").innerHTML = "Carregando ...";
  postsCollection.get().then((snap) => {
    document.getElementById("posts").innerHTML = "";
    snap.forEach((doc) => {
      console.log(doc.id);
      addPosts(doc);
    });
  });
}

function deletePost(postId) {
  const post = firebase.firestore().collection("posts").doc(postId);
  post
    .delete()
    .then(() => {
      loadPosts();
    })
    .catch((error) => {
      console.log("Erro ao excluir post");
    });
}
