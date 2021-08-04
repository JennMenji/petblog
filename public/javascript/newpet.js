async function newpetFormHandler(event) {
  event.preventDefault();

  const name = document.querySelector("#pet-name").value.trim();
  const animal = document.querySelector("#animal").value.trim();
  const breed = document.querySelector("#breed").value.trim();
  const age = document.querySelector("#age").value.trim();
  const dog_image = document.getElementById("dog_image").files[0];
  //name && animal && age && breed && 







  if (dog_image) {

    let data = new FormData()
data.append("file", dog_image)
data.append("age", age )
data.append("breed",breed)
data.append("animal", animal)
data.append("name",name)




    const response = await fetch("/api/pet", {
      method: "POST",
      // body: JSON.stringify({
      //   // name,
      //   // animal,
      //   // breed,
      //   // age,
      //   dog_image
      // }),
      body: data

      //headers: { "Content-Type": "multipart/form-data" },
    });


    // let reader = new FileReader();
    // reader.onload = function (event) {
    //   $($.parseHTML("<img>"))
    //     .attr("src", event.target.result)
    //     .appendTo(placeToInsertImagePreview);


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