
fetch("FishEyeData.json")
.then(response => {return response.json()})
.then(function generatePhotograph(jsonObj) {
  let photographers = jsonObj.photographers;
  console.log(photographers);

  let photographersList = document.querySelector(".photographersList");
  photographers.forEach(photographer => {

    let sectionPhotograph = document.createElement('div');

    sectionPhotograph.classList.add('profile');
    sectionPhotograph.innerHTML= '<a href="photographer.html?id=' + photographer.id +'"><div class="portrait"><img src="Photos/Photographers ID Photos/' + photographer.portrait + '"/> </div> <div class="name">' + photographer.name + '</div>  <div class="location">' + photographer.city + ', ' + photographer.country + '</div> <div class="marketingHook">' + photographer.tagline + '</div><div class="price">' + photographer.price + '€/jour </div> </a>';

    console.log(sectionPhotograph.innerHTML);
    console.log(photographersList.innerHTML);
    photographersList.appendChild(sectionPhotograph);
  });
})