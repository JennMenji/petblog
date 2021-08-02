async function newpetFormHandler(event) {
    event.preventDefault();
  
    const name = document.querySelector("#pet-name").value.trim();
    const animal = document.querySelector("#animal").value.trim();
    const age = document.querySelector("#age").value.trim();
  
    if (name && animal && age) {
      const response = await fetch("/api/pet", {
        method: "POST",
        body: JSON.stringify({
          name,
          animal,
          breed,
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