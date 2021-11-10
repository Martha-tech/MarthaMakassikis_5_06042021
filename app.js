
fetch("FishEyeData.json")
.then(response => {return response.json()} )
.then(function generatePhotograph(jsonObj) {
  let photographers = jsonObj.photographers;
  console.log(photographers);

  let photographList = document.querySelector(".photographList");
  photographers.forEach(photographer => {
    let sectionPhotograph = document.createElement('div');
    sectionPhotograph.classList.add('profil');
    sectionPhotograph.innerHTML= '<div class="name">' + photographer.name + '</div> <img src="' + photographer.portrait + '"/>';
    photographList.appendChild(sectionPhotograph);
  });
})