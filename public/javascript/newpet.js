async function newpetFormHandler(event) {
    event.preventDefault();
  
    const name = document.querySelector("#pet-name").value.trim();
    const type = document.querySelector("#type").value.trim();
    const age = document.querySelector("#age").value.trim();
  
    if (name && type && age) {
      const response = await fetch("/api/pet", {
        method: "post",
        body: JSON.stringify({
          name,
          type,
          age,
        }),
        headers: { "Content-Type": "application/json" },
      });
      // check the response status
      if (response.ok) {
        console.log("success");
        document.location.replace("/");
      } else {
        alert(response.statusText);
      }
    }
  }

  document
  .querySelector(".pet-form")
  .addEventListener("submit", newpetFormHandler);