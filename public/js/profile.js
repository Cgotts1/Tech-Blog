const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#project-name').value.trim();
  const description = document.querySelector('#project-desc').value.trim();

  if (name && description) {
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

const newPostBtn = document.querySelector('.new-post-button');
const addNewPostEl = document.querySelector('.hide');
const yourPostsEl = document.querySelector('.shown');

newPostBtn.addEventListener('click', function () {
  addNewPostEl.style.display = 'block';
  yourPostsEl.style.display = 'none';
});

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);

//   var post= document.getElementById("post");
// post.addEventListener("click", function(){
//     var commentBoxValue= document.getElementById("comment-box").value;

//     var li = document.createElement("li");
//     var text = document.createTextNode(commentBoxValue);
//     li.appendChild(text);
//     document.getElementById("unordered").appendChild(li);

// });
