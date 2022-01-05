/* ---------------------- FONCTIONS -------------------- */
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

// Réécrire avec un foreach ou un .filter ?
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

//Fonction qui génère, dans la DIV "photographHeader", le contenu HTML relatif aux données du photographe
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

//Fonction qui génère, dans la DIV "photographHeader", le contenu HTML relatif au bouton pour contacter le photographe
function generateSectionButton() {
    let photographHeader = document.querySelector(".photograph-header");
    let sectionButton = document.createElement('button');
    sectionButton.classList.add('contact_button');
    sectionButton.classList.add('contact_me');
    sectionButton.setAttribute("onclick", "displayModal()")
    sectionButton.innerHTML = 'Contactez-moi';
    photographHeader.appendChild(sectionButton);
}

//Fonction qui génère, dans la DIV "photographHeader", le contenu HTML relatif à la photo du photographe
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

//Fonction qui génère, dans la DIV "mediaList", le contenu HTML relatif aux oeuvres (picturales et animées) du photographe
function generatePhotographerWork(photographerMedia, photographer) {
    let mediaList = document.querySelector(".mediaList");
    let elementsHTML = []; // création d'un tableau vide
    
    photographerMedia.forEach(mediaElement => {
        let sectionMedia = document.createElement('div');
        
        sectionMedia.classList.add('photographerWork');

        //console.log("========================>" + mediaElement.image);
        if (mediaElement.image) {
            sectionMedia.innerHTML =
            '<a href="#"> <div class="divMedia"> <img class="media" onclick="openLightbox()" src="/Photos/' + photographer.name + '/' + mediaElement.image + '"/> </div> </a>' +
            '<div class="caption"> <span class="title">' + mediaElement.title + '</span> <span class="likes">' + mediaElement.likes + ' </span> <i class="fas fa-heart coeur"> </i></div>';
        } else if (mediaElement.video) {
            sectionMedia.innerHTML =
            '<a href="#"> <div class="divMedia"> <video class="media" onclick="openLightbox()" src="/Photos/' + photographer.name + '/' + mediaElement.video + '"></video></div></a>' + 
            '<div class="caption"> <span class="title">' + mediaElement.title + '</span> <span class="likes">' + mediaElement.likes + '</span>  <i class="fas fa-heart coeur"></i>  </div>';
        }

        //console.log(sectionMedia.innerHTML);
        //console.log(mediaList.innerHTML);
        elementsHTML.push(sectionMedia); // ajout de "sectionMedia" dans le tableau "elementsHTML"
    });
    mediaList.replaceChildren(...elementsHTML); // méthode qui s'applique à mediaList et qui prend en argument le tableau "elementsHTML" (éléments à remplacer)
}

//Fonctions qui permettent d'afficher, dans la div "photographerLikes" située en bas de page, 

// le nombre total de likes du photographe
function displayCompteurGlobal(nombreTotalDeLikes) {   
    let photographerLikes = document.querySelector(".photographerLikes");

    let sectionCompteurLikes = document.createElement('span');
    sectionCompteurLikes.classList.add('compteurLikes');
    sectionCompteurLikes.innerHTML =
        '<span class="valeurCompteurGlobal">' + nombreTotalDeLikes + '</span> <i class="fas fa-heart"></i>';

    photographerLikes.appendChild(sectionCompteurLikes);
}

// le tarif journalier du photographe
function displayTarif(tarifJournalier) {

    let photographerLikes = document.querySelector(".photographerLikes");

    let sectionPricePerDay = document.createElement('span');

    sectionPricePerDay.classList.add('pricePerDay');
    sectionPricePerDay.innerHTML =
        '<span>' + tarifJournalier + '€ / jour </span>';

    photographerLikes.appendChild(sectionPricePerDay);
}

//Fonction qui, à partir du fichier Json, calcule le nombre total de likes du photographe 
function calculNombreTotalDeLikes(photographerMedia) {
    let likesSum = 0;
    photographerMedia.forEach(mediaElement => {
        likesSum = likesSum + mediaElement.likes;
    });
    return likesSum;
}

//Fonction ajoutant un écouteur d'évènement sur chaque "like" qui permet d'incrémenter les compteurs individuel et global
function installLikeEventListeners(coeurs) {
    coeurs.forEach(coeur => {
        coeur.addEventListener("click", e => {
            let valeurCompteurIndividuel = e.target.previousElementSibling;
            valeurCompteurIndividuel.innerHTML = parseInt(valeurCompteurIndividuel.innerHTML) + 1; //mise à jour de la valeur
            console.log(valeurCompteurIndividuel.innerHTML + " : valeurCompteurIndividuel incrémenté");
            let valeurCompteurGlobal = document.querySelector(".valeurCompteurGlobal");
            valeurCompteurGlobal.innerHTML = parseInt(valeurCompteurGlobal.innerHTML) + 1;
            console.log(valeurCompteurGlobal.innerHTML + " : valeurCompteurGlobal incrémenté");
        });
    });
}

//Fonctions qui permettent de lancer et de fermer la lightbox
function openLightbox() {
    document.querySelector(".lightbox").style.display = "block";
}
  
function closeLightbox() {
    document.querySelector(".lightbox").style.display = "none";
}


var globalIndex = 0; // pour partager sa valeur entre 3 fonctions

//Fonction qui permet d'afficher, dans la Lightbox, une image ou une vidéo
function displayImageOrVideoInLightbox(source, hiddenImage, hiddenVideo) {
    if (source.endsWith(".jpg")) {
        hiddenImage.setAttribute("src", source);
        hiddenImage.style.display = "block";
        hiddenVideo.style.display = "none";
        console.log(source + " : source image");
    } else if (source.endsWith(".mp4")) {
        hiddenVideo.setAttribute("src", source);
        hiddenVideo.style.display ="block";
        hiddenImage.style.display = "none";
        console.log(source + " : source vidéo");
    }
}

//Fonctions qui permettent d'afficher les diapositives courante, suivante et précédente de la Lightbox
function displayLightboxCurrentSlide(allMediaArray, hiddenImage, hiddenVideo) {
    allMediaArray.forEach(media => {
        media.addEventListener("click", e => {
            let source = e.target.getAttribute("src"); // image ou vidéo cliquée
            globalIndex = allMediaArray.indexOf(e.target);
            console.log(source + " : source");
            console.log(globalIndex + " : index");
            displayImageOrVideoInLightbox(source, hiddenImage, hiddenVideo);
        })
    })
}

function displayLightboxNextSlide(allMediaArray, hiddenImage, hiddenVideo) {
    let lightboxNext = document.querySelector(".lightbox__next");

    lightboxNext.addEventListener("click", e => {
        globalIndex = globalIndex + 1;
        console.log(globalIndex + " : indexNext");
        console.log(allMediaArray + " : allMediaArray");

        if (globalIndex > allMediaArray.length - 1){
            globalIndex = 0;
        } 

        let source = allMediaArray[globalIndex].getAttribute('src');
        displayImageOrVideoInLightbox(source, hiddenImage, hiddenVideo);
    })
}

function displayLightboxPreviousSlide(allMediaArray, hiddenImage, hiddenVideo) {
    let lightboxPrev = document.querySelector(".lightbox__prev");

    lightboxPrev.addEventListener("click", e => {
        globalIndex = globalIndex - 1;
        console.log(globalIndex + " : indexPrev");

        if (globalIndex < 0) {
            globalIndex = allMediaArray.length - 1;
        }

        let source = allMediaArray[globalIndex].getAttribute("src");
        displayImageOrVideoInLightbox(source, hiddenImage, hiddenVideo);
    })
}



/* ---------------------- FETCH -------------------- */
fetch ("FishEyeData.json")
.then(response => {return response.json()}) //extrait le json
.then(function generatePhotograph(jsonObj) {

  // Récupération de données
    let photographerId = getPhotographersIdFromUrl();
    let photographer = getPhotographerFromJson(photographerId, jsonObj);
    console.log(photographer); 

    let photographerMedia = getMediaFromJson(photographerId, jsonObj);
    console.log(photographerMedia);

    let nombreTotalDeLikes = calculNombreTotalDeLikes(photographerMedia);

    let tarifJournalier = photographer.price;
    console.log("----------------" + tarifJournalier);

    // Génération du HTML
    generateSectionPhotograph(photographer);
    generateSectionButton();
    generateSectionPortrait(photographer);

    // Appels de fonctions
    generatePhotographerWork(photographerMedia, photographer);
    displayCompteurGlobal(nombreTotalDeLikes);
    displayTarif(tarifJournalier);
    
    // Listener sur le bouton "Contactez-moi" pour déclencher l'ouverture de la modale
    let contactModal = document.getElementById("contact_modal");
    let contactMe = document.querySelector(".contact_me");
        
    contactMe.addEventListener("click", function(){
        contactModal.style.display="block";
    });

    // Listeners sur les coeurs
    const coeurs = document.querySelectorAll(".coeur");
    installLikeEventListeners(coeurs);
    
    // Listeners sur la Lightbox
    let hiddenImage = document.querySelector(".hiddenImage");
    let hiddenVideo = document.querySelector(".hiddenVideo");
    let allMediaArray = [...document.querySelectorAll(".media")];
        
    displayLightboxCurrentSlide(allMediaArray, hiddenImage, hiddenVideo);
    displayLightboxNextSlide(allMediaArray, hiddenImage, hiddenVideo);
    displayLightboxPreviousSlide(allMediaArray, hiddenImage, hiddenVideo);
    
    // Listeners sur le menu déroulant "tri" & tri des médias par popularité, date, titre & ouverture de la Lightbox

    /* sort entries in photographerMedia by popularity (like count), in descending order*/
    let sortByPopularity = document.querySelector(".sortByPopularity");

    sortByPopularity.addEventListener("click", e => {
        photographerMedia.sort(function compareMedia(a, b) {return a.likes < b.likes;});
        generatePhotographerWork(photographerMedia, photographer); //rafraîchit le html

        let hiddenImage = document.querySelector(".hiddenImage");
        let hiddenVideo = document.querySelector(".hiddenVideo");
        let allMediaArray = [...document.querySelectorAll(".media")];
        
        displayLightboxCurrentSlide(allMediaArray, hiddenImage, hiddenVideo);
        displayLightboxNextSlide(allMediaArray, hiddenImage, hiddenVideo);
        displayLightboxPreviousSlide(allMediaArray, hiddenImage, hiddenVideo);

        const coeurs = document.querySelectorAll(".coeur");
        installLikeEventListeners(coeurs);
    });

    /* sort entries in photographerMedia by date value (year-month-day), in ascending order*/
    let sortByDate = document.querySelector(".sortByDate");

    sortByDate.addEventListener("click", e => {
        photographerMedia.sort(function compareMedia (a, b) {return Date.parse(a.date) - Date.parse(b.date);});
        generatePhotographerWork(photographerMedia, photographer);
        //La date, dans le json, est exprimée sous forme de chaîne de caractères. On recourt à "Date.parse()" pour convertir le string en objet de type "date".
        //On prend l'attribut "date" de l'objet "a". On le passe en paramètre à la méthode "Date.parse" pour convertir la chaîne de caractères en date.
    
        let hiddenImage = document.querySelector(".hiddenImage");
        let hiddenVideo = document.querySelector(".hiddenVideo");
        let allMediaArray = [...document.querySelectorAll(".media")];
        
        displayLightboxCurrentSlide(allMediaArray, hiddenImage, hiddenVideo);
        displayLightboxNextSlide(allMediaArray, hiddenImage, hiddenVideo);
        displayLightboxPreviousSlide(allMediaArray, hiddenImage, hiddenVideo);

        const coeurs = document.querySelectorAll(".coeur");
        installLikeEventListeners(coeurs);
    });

    /* sort entries in photographerMedia by title (alphabetical order), in ascending order*/
    let sortByTitle = document.querySelector(".sortByTitle");

    sortByTitle.addEventListener("click", e => {
        photographerMedia.sort(function compareMedia(a, b) {return a.title > b.title;});
        //photographerMedia.sort( (a, b) => a.title.localeCompare(b.title, 'fr', {ignorePunctuation: true}));
        generatePhotographerWork(photographerMedia, photographer);
   
        let hiddenImage = document.querySelector(".hiddenImage");
        let hiddenVideo = document.querySelector(".hiddenVideo");
        let allMediaArray = [...document.querySelectorAll(".media")];
        
        displayLightboxCurrentSlide(allMediaArray, hiddenImage, hiddenVideo);
        displayLightboxNextSlide(allMediaArray, hiddenImage, hiddenVideo);
        displayLightboxPreviousSlide(allMediaArray, hiddenImage, hiddenVideo);

        const coeurs = document.querySelectorAll(".coeur");
        installLikeEventListeners(coeurs);
    });

})

/*------------------------------FIN DU FETCH-------------------------*/


