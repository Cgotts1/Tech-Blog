async function updateComment(){
  const id = document.getElementById('comment-btn').dataset.id
  const body = document.querySelector('#comment-box').value.trim();

  
const response = await fetch(`/project/${id}/comment`, {
      method: 'POST',
      body: JSON.stringify({ body }),
      headers: { 'Content-Type': 'application/json' },
    });
    debugger;
    if (response.ok) {
    console.log("----------------")
    
    console.log(id)
    console.log(description)
    console.log(body)
    console.log("----------------")
    // document.location.reload();
   document.location.replace(`/project`);
    } else {
      alert(response.statusText);

    }
  }
