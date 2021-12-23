/* ---------------------- Fonctions -------------------- */
// Récupération de l'ID du photographe sélectionné dans l'index.html
function getPhotographersIdFromUrl() {
    const queryString = window.location.search;
    //?id=243&param2=toto
    console.log("The query is " + queryString);
    const urlParams = new URLSearchParams(queryString); //décompose fin de l'url

    const id = urlParams.get('id');
    console.log(id);
    //243
    return id;
}

//Réécrire avec un foreach, lever une alerte lorsque l'id est incorrect et tester
function getPhotographerFromJson(id, jsonObj) {
    let photographersArray = jsonObj.photographers;
    let result;

    for (let i = 0; i < photographersArray.length; i++) {
        if (photographersArray[i].id == id) {
            result = photographersArray[i];
            console.log("L'objet photographe est " + result.name);
            break;
        }
    }
    return result;
}

/*function getPhotographerFromJson(id, jsonObj) {
    let photographersArray = jsonObj.photographers;
    let result;
    
    photographersArray.forEach(photographer => {
        if (photographer.id == id) {
            result = photographersArray;
            console.log("L'objet photographe est " + result.name)
            break;
        } else if (photographer.id != id) {
            alert("L\'id est incorrect.");
        }
    }
    return result;
})
*/

// Réécrire avec un foreach
function getMediaFromJson(photographerId, jsonObj) {
    let mediaArray = jsonObj.media;
    let resultArray = [];

    for (let i = 0; i < mediaArray.length; i++) {
        if (mediaArray[i].photographerId == photographerId) {
            resultArray.push(mediaArray[i]);   
        }
    }
    console.log("Les objets media sont " + resultArray); //Pourquoi?
    return resultArray;
}

/*function getMediaFromJson(photographerId, jsonObj) {
    let mediaArray = jsonObj.media;
    let resultArray = [];

    mediaArray.forEach(media => {
        if (mediaArray.photographer == photographerId) {
            resultArray.push(mediaArray);
        }
    })
    console.log("Les objets média sont " + resultArray);
}
*/

// Fonction qui, selon l'extension du fichier, affichera une photo ou une vidéo
function isImage(filename) {
    let result = false;
    if (filename.endsWith('.jpg') || filename.endsWith('.jpeg') || filename.endsWith('.png')) {
        result = true;
    }
    return result;
}


function generateSectionPhotograph(photographer) {
    let photographHeader = document.querySelector(".photograph-header");
    let sectionPhotograph = document.createElement('div');
    sectionPhotograph.classList.add('PhotographerData');
    sectionPhotograph.innerHTML =
        '<div class="name">' + photographer.name + '</div>' + 
        '<div class="location">' + photographer.city + ', ' + photographer.country + '</div>' + 
        '<div class="marketingHook">' + photographer.tagline + '</div>';

    console.log(sectionPhotograph.innerHTML);
    console.log(photographHeader.innerHTML);

    photographHeader.appendChild(sectionPhotograph);
}


function generateSectionButton() {
    let photographHeader = document.querySelector(".photograph-header");
    let sectionButton = document.createElement('button');
    sectionButton.classList.add('contact_button');
    sectionButton.classList.add('contact_me');
    //sectionButton.setAttribute("onclick", "displayModal()")
    sectionButton.innerHTML = 'Contactez-moi';
    photographHeader.appendChild(sectionButton);
}


function generateSectionPortrait(photographer) {
    let photographHeader = document.querySelector(".photograph-header");
    let sectionPortrait = document.createElement('div');
    
    sectionPortrait.classList.add('photographerPortrait');
    sectionPortrait.innerHTML = 
        '<div class="portrait"> <img src="Photos/Photographers ID Photos/' + photographer.portrait + '"/> </div>' 

    console.log(sectionPortrait.innerHTML);
    console.log(photographHeader.innerHTML);

    photographHeader.appendChild(sectionPortrait);
}


function generatePhotographerWork(photographerMedia, photographer) {
    let mediaList = document.querySelector(".mediaList");
    photographerMedia.forEach(mediaElement => {
        let sectionMedia = document.createElement('div');

        sectionMedia.classList.add('photographerWork');

        console.log("========================>" +mediaElement.image);
        if (mediaElement.image) {
            sectionMedia.innerHTML =
            '<a href="#"> <div class="media"> <img class="media" onclick="openLightbox()" src="/Photos/' + photographer.name + '/' + mediaElement.image + '"/> </div> </a>' +
            '<div class="caption"> <span class="title">' + mediaElement.title + '</span> <span class="likes">' + mediaElement.likes + ' </span> <i class="fas fa-heart coeur"> </i></div>';
        } else {
            sectionMedia.innerHTML =
            '<a href="#"> <div class="media"> <video class="media" onclick="openLightbox()"> <source src="/Photos/' + photographer.name + '/' + mediaElement.video + '"></video></div></a>' + 
            '<div class="caption"> <span class="title">' + mediaElement.title + '</span> <span class="likes">' + mediaElement.likes + '</span>  <i class="fas fa-heart coeur"></i>  </div>';
        }

        //console.log(sectionMedia.innerHTML);
        //console.log(mediaList.innerHTML);

        mediaList.appendChild(sectionMedia);
    });
}

/*function generateCompteurGlobalEtTarif(photographer, photographerMedia) {
    let photographerLikes = document.querySelector(".photographerLikes");
    let tarifJournalier = photographer.price;
    let nombreTotalDeLikes = CalculNombreTotalDeLikes(photographerMedia);
    
    let sectionCompteurLikes = document.createElement('span');
    let sectionPricePerDay = document.createElement('span');

    sectionCompteurLikes.classList.add('compteurLikes');
    sectionPricePerDay.classList.add('pricePerDay');

    sectionCompteurLikes.innerHTML =
        '<span>' + nombreTotalDeLikes + '</span> <i class="fas fa-heart"></i> ';
    sectionPricePerDay.innerHTML =
        '<span>' + tarifJournalier + '€ / jour </span>';

    photographerLikes.appendChild(sectionCompteurLikes);
    photographerLikes.appendChild(sectionPricePerDay);
}*/

function displayCompteurGlobal(nombreTotalDeLikes) {   
    let photographerLikes = document.querySelector(".photographerLikes");

    let sectionCompteurLikes = document.createElement('span');
    sectionCompteurLikes.classList.add('compteurLikes');
    sectionCompteurLikes.innerHTML =
        '<span>' + nombreTotalDeLikes + '</span> <i class="fas fa-heart"></i> ';

    photographerLikes.appendChild(sectionCompteurLikes);
}

function displayTarif(tarifJournalier) {

    let photographerLikes = document.querySelector(".photographerLikes");

    let sectionPricePerDay = document.createElement('span');

    sectionPricePerDay.classList.add('pricePerDay');
    sectionPricePerDay.innerHTML =
        '<span>' + tarifJournalier + '€ / jour </span>';

    photographerLikes.appendChild(sectionPricePerDay);
}

function CalculNombreTotalDeLikes(photographerMedia) {
    let LikesSum = 0;
    photographerMedia.forEach(mediaElement => {
        LikesSum = LikesSum + mediaElement.likes;
    });
    return LikesSum;
}


/* ---------------------- Lightbox -------------------- */

function openLightbox() {
    document.querySelector(".lightbox").style.display = "block";
  }
  
  function closeLightbox() {
      const lightbox = document.querySelector(".lightbox");
      lightbox.style.display = "none";
  }
  
  var mediaIndex = 1;
  
  // Next/previous controls
  function plusMedias(n) {
    showLightboxMedias(mediaIndex += n);
  }
  
  function showLightboxMedias(n) {
    let medias = document.getElementsByClassName("lightboxItems");
  
    if (n > medias.length) {mediaIndex = 1;}
    if (n < 1) {mediaIndex = medias.length;}
    for (let i = 0; i < medias.length; i++) {
      medias[i].style.display = "none";
    }
   // medias[mediaIndex-1].style.display = "block";
  }
  
  function generateLightboxHtml(media, photographer) {
    let lightboxContainer = document.querySelector(".lightbox__container");
    media.forEach(mediaElement => {
      let sectionMedia = document.createElement('div');
  
      sectionMedia.classList.add('lightboxItems');
  
      console.log("=============>" + mediaElement.image);
      if (mediaElement.image) {
          sectionMedia.innerHTML =
          '<a href="#"> <div class="media"> <img class="media" src="/Photos/' + photographer.name + '/' + mediaElement.image + '"/> </div> </a>' +
          '<div class="caption"> <span class="title">' + mediaElement.title + '</div>';
      } else {
          sectionMedia.innerHTML =
          '<a href="#"> <div class="media"> <video class="media" controls> <source src="/Photos/' + photographer.name + '/' + mediaElement.video + '"></video></div></a>' + 
          '<div class="caption"> <span class="title">' + mediaElement.title + '</div>';
      }
  
     // console.log(sectionMedia.innerHTML);
      //console.log(lightboxContainer.innerHTML);
  
      lightboxContainer.appendChild(sectionMedia);
  
    });
  }
  /* ----------------------------- */


//Fetch
fetch ("FishEyeData.json")
.then(response => {return response.json()}) //extrait le json
.then(function generatePhotograph(jsonObj) {

  // RECUPERATION DES DONNEES
    let photographerId = getPhotographersIdFromUrl();
    let photographer = getPhotographerFromJson(photographerId, jsonObj);
    console.log(photographer); 

    let photographerMedia = getMediaFromJson(photographerId, jsonObj);
    console.log(photographerMedia);

    let nombreTotalDeLikes = CalculNombreTotalDeLikes(photographerMedia);

    let tarifJournalier = photographer.price;
    console.log("----------------" + tarifJournalier);

    // GENERATIION HTML
    generateSectionPhotograph(photographer);
    generateSectionButton();
    generateSectionPortrait(photographer);
    generatePhotographerWork(photographerMedia, photographer);
    generateLightboxHtml(photographerMedia, photographer);
    displayCompteurGlobal(nombreTotalDeLikes);
    displayTarif(tarifJournalier);

    //showMedias(mediaIndex);

    //var tableauDeLikesParMedia = [];
    //var nombreTotalDeLikes = 0;


    // Incrémentation du nombre de likes lorsqu'on clique sur l'icône "like"
    const compteurGlobal = document.querySelector(".compteurLikes");
    const compteurMedia = document.querySelector(".likes");

    function incrementeLikes () {
        compteurMedia = compteurMedia + 1;
        compteurGlobal = compteurGlobal + 1;
    }

    const coeurs = document.querySelectorAll(".coeur");
    coeurs.forEach(coeur => {
        coeur.addEventListener("click", e => {
            let currentLikes = e.target.previousElementSibling;
            console.log(e.target);
            console.log(currentLikes.innerHTML);
        });
    });

    // Listener
    let hiddenImage = document.querySelector(".hiddenImage");
    let selectedMedias = document.querySelectorAll(".media");
    /*let lightboxNext = document.querySelector(".lightbox__next");
    let lightboxPrev = document.querySelector(".lightbox__prev");*/

    selectedMedias.forEach(selectedMedia => {
        selectedMedia.addEventListener("click", e => {
            openLightbox();
            let source = e.target.getAttribute('src');
            console.log(source);
            hiddenImage.style.display = "block";
            hiddenImage.setAttribute('src', source);
        });   
    })

    /*lightboxNext.addEventListener("click", e => {

    })*/

    let contactModal = document.getElementById("contact_modal");
    let contactMe = document.querySelector(".contact_me");
    
    contactMe.addEventListener("click", function(){
        contactModal.style.display="block";
    });
    
    //END

})


