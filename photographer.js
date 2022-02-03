/* ---------------------- FONCTIONS -------------------- */
// Récupération de l'ID du photographe sélectionné dans l'index.html
function getPhotographersIdFromUrl() {
    const queryString = window.location.search;
    //?id=243&param2=toto
    //console.log("The query is " + queryString);
    const urlParams = new URLSearchParams(queryString); //décompose fin de l'url

    const id = urlParams.get('id');
    //console.log(id);
    //243
    return id;
}

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

function getMediaFromJson(photographerId, jsonObj) {
    let mediaArray = jsonObj.media;
    let resultArray = [];

    for (let i = 0; i < mediaArray.length; i++) {
        if (mediaArray[i].photographerId == photographerId) {
            resultArray.push(mediaArray[i]);   
        }
    }
    //console.log("Les objets media sont " + resultArray); //Pourquoi?
    return resultArray;
}

// Fonction qui, selon l'extension du fichier, affichera une photo ou une vidéo
function isImage(filename) {
    let result = false;
    if (filename.endsWith('.jpg') || filename.endsWith('.jpeg') || filename.endsWith('.png')) {
        result = true;
    }
    return result;
}

//Fonction qui génère, dans la modale de contact, le nom et le prénom du photographe
function generatePhotographerNameInModal(photographer) {
    let modalHeaderText = document.querySelector(".modal_header_text");
    let photographerNameInModal = document.createElement ('p');
    photographerNameInModal.classList.add('photographer_name');

    photographerNameInModal.innerHTML = 
        '<div aria-label="photographer\'s name">' + photographer.name + '</div>';
    //console.log(photographerNameInModal.innerHTML + " : photographer's name");

    modalHeaderText.appendChild(photographerNameInModal);
}

//Fonction qui génère, dans la DIV "photographerHeader", le contenu HTML relatif aux données du photographe
function generateSectionPhotograph(photographer) {
    let photographerHeader = document.querySelector(".photographer-header");
    let sectionPhotograph = document.createElement('div');
    sectionPhotograph.classList.add('PhotographerData');
    sectionPhotograph.innerHTML =
        '<div class="name" aria-label="photographer\'s name">' + photographer.name + '</div>' + 
        '<div class="location" aria-label="photographer\'s location">' + photographer.city + ', ' + photographer.country + '</div>' + 
        '<div class="marketingHook" aria-label="photographer\'s marketing hook">' + photographer.tagline + '</div>';

    //console.log(sectionPhotograph.innerHTML);
    //console.log(photographerHeader.innerHTML);

    photographerHeader.appendChild(sectionPhotograph);
}

//Fonction qui génère, dans la DIV "photographerHeader", le contenu HTML relatif au bouton pour contacter le photographe
function generateSectionButton() {
    let photographerHeader = document.querySelector(".photographer-header");
    let sectionButton = document.createElement('button');
    sectionButton.classList.add('contact_button');
    sectionButton.classList.add('contact_me');
    sectionButton.innerHTML = 'Contactez-moi';
    photographerHeader.appendChild(sectionButton);
}

//Fonction qui génère, dans la DIV "photographerHeader", le contenu HTML relatif à la photo du photographe
function generateSectionPortrait(photographer) {
    let photographerHeader = document.querySelector(".photographer-header");
    let sectionPortrait = document.createElement('div');
    
    sectionPortrait.classList.add('photographerPortrait');
    sectionPortrait.innerHTML = 
        '<div class="portrait"> <img alt= ' + photographer.name + ' src="Photos/Photographers_ID_Photos/' + photographer.portrait + '"/> </div>' 

    //console.log(sectionPortrait.innerHTML);
    //console.log(photographerHeader.innerHTML);

    photographerHeader.appendChild(sectionPortrait);
}

//Fonction qui génère, dans la DIV "mediaList", le contenu HTML relatif aux oeuvres (picturales et animées) du photographe
function generatePhotographerWork(photographerMedia, photographer) {
    let mediaList = document.querySelector(".mediaList");
    let elementsHTML = []; // création d'un tableau vide
    
    photographerMedia.forEach(mediaElement => {
        let sectionMedia = document.createElement('div');
        sectionMedia.setAttribute("tabindex", -1);
        
        sectionMedia.classList.add('photographerWork');

        //console.log("===>" + mediaElement.image);
        if (mediaElement.image) {
            sectionMedia.innerHTML =
            '<a href="#" tabindex="-1"> <div class="divMedia" tabindex="-1"> <img class="media" tabindex="0" alt= '+ mediaElement.title +' aria-label= "'+ mediaElement.title +'"src="/Photos/' + photographer.foldername + '/' + mediaElement.image + '"/> </div> </a>' +
            '<div class="caption"> <span class="title">' + mediaElement.title + '</span> <span class="likes">' + mediaElement.likes + ' </span> <i class="fas fa-heart coeur" tabindex="0"> </i></div>';
        } else if (mediaElement.video) {
            sectionMedia.innerHTML =
            '<a href="#" tabindex="-1"> <div class="divMedia" tabindex="-1"> <video class="media" tabindex="0" aria-label= "'+ mediaElement.title +'"src="/Photos/' + photographer.foldername + '/' + mediaElement.video + '"></video></div></a>' + 
            '<div class="caption"> <span class="title">' + mediaElement.title + '</span> <span class="likes">' + mediaElement.likes + '</span>  <i class="fas fa-heart coeur" tabindex="0"></i>  </div>';
        }

        //console.log(sectionMedia.innerHTML);
        //console.log(mediaList.innerHTML);
        elementsHTML.push(sectionMedia); // ajout de "sectionMedia" dans le tableau "elementsHTML"
    });
    mediaList.replaceChildren(...elementsHTML); // méthode qui s'applique à mediaList et qui prend en argument le tableau "elementsHTML" (éléments à remplacer)
}

//Fonctions qui permettent d'afficher, dans la div "photographerLikes" située en bas de page, ...

// ... le nombre total de likes du photographe
function displayCompteurGlobal(nombreTotalDeLikes) {   
    let photographerLikes = document.querySelector(".photographerLikes");

    let sectionCompteurLikes = document.createElement('span');
    sectionCompteurLikes.classList.add('compteurLikes');
    sectionCompteurLikes.innerHTML =
        '<span class="valeurCompteurGlobal" aria-label="nombre total de likes du photographe">' + nombreTotalDeLikes + '</span> <i class="fas fa-heart"></i>';

    photographerLikes.appendChild(sectionCompteurLikes);
}

// ... le tarif journalier du photographe
function displayTarif(tarifJournalier) {

    let photographerLikes = document.querySelector(".photographerLikes");

    let sectionPricePerDay = document.createElement('span');

    sectionPricePerDay.classList.add('pricePerDay');
    sectionPricePerDay.innerHTML =
        '<span aria-label="tarif journalier du photographe">' + tarifJournalier + '€ / jour </span>';

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

//Fonctions ajoutant un écouteur d'évènement sur chaque "like" et incrémentant les compteurs individuel et global
function incrementCounters(e) {
    let valeurCompteurIndividuel = e.target.previousElementSibling;
    valeurCompteurIndividuel.innerHTML = parseInt(valeurCompteurIndividuel.innerHTML) + 1; //mise à jour de la valeur
    //console.log(valeurCompteurIndividuel.innerHTML + " : valeurCompteurIndividuel incrémenté");
    let valeurCompteurGlobal = document.querySelector(".valeurCompteurGlobal");
    valeurCompteurGlobal.innerHTML = parseInt(valeurCompteurGlobal.innerHTML) + 1;
    //console.log(valeurCompteurGlobal.innerHTML + " : valeurCompteurGlobal incrémenté");
}

function installLikeEventListeners(coeurs) {
    coeurs.forEach(coeur => {
        coeur.addEventListener("click", incrementCounters);
        coeur.addEventListener("keyup", e => {
            if (e.key === "Enter") {
                incrementCounters(e);
            }
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
function displayImageOrVideoInLightbox(source) {
    let hiddenImage = document.querySelector(".hiddenImage");
    let hiddenVideo = document.querySelector(".hiddenVideo");

    if (source.endsWith(".jpg")) {
        hiddenImage.setAttribute("src", source);
        hiddenImage.style.display = "block";
        hiddenVideo.style.display = "none";
        //console.log(source + " : source image");
    } else if (source.endsWith(".mp4")) {
        hiddenVideo.setAttribute("src", source);
        hiddenVideo.style.display ="block";
        hiddenImage.style.display = "none";
        //console.log(source + " : source vidéo");
    }
}

//Fonction qui génère, dans la Lightbox, la légende sous chaque média affiché

function generateMediaCaptionInLightbox(media) {
    let title = media.getAttribute("aria-label");
    
    let lightboxCaption = document.createElement('p');
    lightboxCaption.classList.add('lightbox__caption');
    lightboxCaption.innerHTML = title;
    //console.log(title + " : légende de l'image");

    let oldLightboxCaption = document.querySelector(".lightbox__caption");
    //console.log(oldLightboxCaption + " : oldLightbox");

    let lightboxContainer = document.querySelector(".lightbox__container");

    if (oldLightboxCaption == null) {
        //console.log("append");
        lightboxContainer.appendChild(lightboxCaption);  
    } else {
        //console.log("replace");
        //console.log(oldLightboxCaption.className + " : oldLightbox");
        lightboxContainer.replaceChild(lightboxCaption, oldLightboxCaption);   
    }
}

//Fonctions qui permettent d'afficher les diapositives courante, suivante et précédente de la Lightbox

// Fonctions pour afficher la diapositive courante au clic de la souris et au clavier
function handleCurrentSlide(e) {
    //console.log("youhou!" + e.type);
    openLightbox();
    let source = e.target.getAttribute("src"); // image ou vidéo cliquée
    let allMediaArray = [...document.querySelectorAll(".media")];
    globalIndex = allMediaArray.indexOf(e.target);
    //console.log(source + " : source");
    //console.log(globalIndex + " : index");
    displayImageOrVideoInLightbox(source);
    generateMediaCaptionInLightbox(allMediaArray[globalIndex]);
}

function displayLightboxCurrentSlide() {
    console.log("entering displayLightboxCurrentSlide");
    let allMediaArray = [...document.querySelectorAll(".media")];
    allMediaArray.forEach(media => {
        media.addEventListener("click", handleCurrentSlide);
        media.addEventListener("keyup", e => {
            if (e.key === "Enter") {
                handleCurrentSlide(e);
            } else if (e.key === "Escape") {
                closeLightbox();
            }
        });
    });
}

// Fonctions pour afficher la diapositive suivante au clic de la souris et au clavier
function handleNextSlide(e) {
    globalIndex = globalIndex + 1;
    //console.log(globalIndex + " : indexNext");
    let allMediaArray = [...document.querySelectorAll(".media")];
    //console.log(allMediaArray);
    console.log(globalIndex);
    if (globalIndex > allMediaArray.length - 1) {
        globalIndex = 0;
    }
    let source = allMediaArray[globalIndex].getAttribute('src');
    displayImageOrVideoInLightbox(source);
    generateMediaCaptionInLightbox(allMediaArray[globalIndex]);
}

function displayLightboxNextSlide() {
    let lightboxNext = document.querySelector(".lightbox__next");
    console.log("displayLightboxNextSlide");
    lightboxNext.addEventListener("click", handleNextSlide);
    window.addEventListener("keyup", e => {
        if (e.key === "ArrowRight") {
            handleNextSlide(e);
        } else if (e.key === "Escape") {
            closeLightbox();
        }
    });
}

// Fonctions pour afficher la diapositive suivante au clic de la souris et au clavier

function handlePreviousSlide(e) {
    globalIndex = globalIndex - 1;
    //console.log(globalIndex + " : indexPrev");
    let allMediaArray = [...document.querySelectorAll(".media")];
    if (globalIndex < 0) {
        globalIndex = allMediaArray.length - 1;
    }
    let source = allMediaArray[globalIndex].getAttribute('src');
    displayImageOrVideoInLightbox(source);
    generateMediaCaptionInLightbox(allMediaArray[globalIndex]);
}

function displayLightboxPreviousSlide() {
    let lightboxPrev = document.querySelector(".lightbox__prev");
    console.log("displayLightboxPreviousSlide");
    lightboxPrev.addEventListener("click", handlePreviousSlide);
    window.addEventListener("keyup", e => {
        if (e.key === "ArrowLeft") {
            handlePreviousSlide(e);
        } else if (e.key === "Escape") {
            closeLightbox();
        }
    });
}


// Fonctions d'ouverture et de fermeture de la modale

function displayModal() {
    let contactModal = document.getElementById("contact_modal");
    let noScrollBody = document.querySelector(".no-scroll");

    //console.log("display modal entree");
    contactModal.style.display = "block";
    noScrollBody.style.overflow = "hidden";
    //console.log("display modal sortie");

    let inputFirstname = document.getElementById("prenom");
    inputFirstname.focus(); //ne fonctionne pas
    window.addEventListener("keyup", e => {
        if (e.key === "Escape") {
            closeModal(e);
        };
    })
}

function closeModal(e) {
    e.preventDefault();
    let contactModal = document.getElementById("contact_modal");
    let scrollBody = document.querySelector(".scroll");

    //console.log("close modal entree");
    contactModal.style.display = "none";
    scrollBody.style.overflow = "auto";
    //console.log("close modal sortie");
}

// Fonctions triant les médias du photographe 

// Fonction de tri des médias par popularité (nombre de "likes"), dans un ordre décroissant
    
function sortMediaByPopularity(photographerMedia, photographer) {
    let sortByPopularity = document.querySelector(".sortByPopularity");
    sortByPopularity.addEventListener("click", e => {
        //console.log("entering sortByPopularity click");
        photographerMedia.sort(function compareMedia(a, b) {return a.likes < b.likes;});
        generatePhotographerWork(photographerMedia, photographer); //rafraîchit le html

        displayLightboxCurrentSlide();
        displayLightboxNextSlide();
        displayLightboxPreviousSlide();

        const coeurs = document.querySelectorAll(".coeur");
        installLikeEventListeners(coeurs);
    });
    let sortingSelect = document.getElementById("sorting-select");
    sortingSelect.addEventListener("keyup", e => {
        if ((e.target.value === "popularity") && (e.key === "Enter")) {
            console.log("sort by popularity on keyboard");
            photographerMedia.sort(function compareMedia(a, b) {return a.likes < b.likes;});
            generatePhotographerWork(photographerMedia, photographer); //rafraîchit le html
            
            displayLightboxCurrentSlide();
            displayLightboxNextSlide();
            displayLightboxPreviousSlide();

            const coeurs = document.querySelectorAll(".coeur");
            installLikeEventListeners(coeurs);
        }
    });
}

 // Fonction de tri des médias par date (year-month-day), dans un ordre croissant

 function sortMediaByDate(photographerMedia, photographer) {
    let sortByDate = document.querySelector(".sortByDate");
    sortByDate.addEventListener("click", e => {
        photographerMedia.sort(function compareMedia (a, b) {return Date.parse(a.date) - Date.parse(b.date);});
        generatePhotographerWork(photographerMedia, photographer);
        //La date, dans le json, est exprimée sous forme de chaîne de caractères. On recourt à "Date.parse()" pour convertir le string en objet de type "date".
        //On prend l'attribut "date" de l'objet "a". On le passe en paramètre à la méthode "Date.parse" pour convertir la chaîne de caractères en date.

        displayLightboxCurrentSlide();
        displayLightboxNextSlide();
        displayLightboxPreviousSlide();

        const coeurs = document.querySelectorAll(".coeur");
        installLikeEventListeners(coeurs);
    });
    let sortingSelect = document.getElementById("sorting-select");
    sortingSelect.addEventListener("keyup", e => {
        if ((e.target.value === "date") && (e.key === "Enter")) {
            console.log("sort by date on keyboard");
            photographerMedia.sort(function compareMedia (a, b) {return Date.parse(a.date) - Date.parse(b.date);});
            generatePhotographerWork(photographerMedia, photographer);

            displayLightboxCurrentSlide();
            displayLightboxNextSlide();
            displayLightboxPreviousSlide();

            const coeurs = document.querySelectorAll(".coeur");
            installLikeEventListeners(coeurs);
        }
    });
}

// Fonction de tri des médias par titre (ordre alphabétique), dans un ordre croissant

function sortMediaByTitle(photographerMedia, photographer) {
    let sortByTitle = document.querySelector(".sortByTitle");
    sortByTitle.addEventListener("click", e => {
        photographerMedia.sort(function compareMedia(a, b) {return a.title > b.title;});
        //photographerMedia.sort( (a, b) => a.title.localeCompare(b.title, 'fr', {ignorePunctuation: true}));
        generatePhotographerWork(photographerMedia, photographer);

        displayLightboxCurrentSlide();
        displayLightboxNextSlide();
        displayLightboxPreviousSlide();

        const coeurs = document.querySelectorAll(".coeur");
        installLikeEventListeners(coeurs);
    });
    let sortingSelect = document.getElementById("sorting-select");
    sortingSelect.addEventListener("keyup", e => {
        if ((e.target.value === "title") && (e.key === "Enter")) {
            //console.log("sort by title on keyboard");
            photographerMedia.sort(function compareMedia(a, b) {return a.title > b.title;});
            //photographerMedia.sort( (a, b) => a.title.localeCompare(b.title, 'fr', {ignorePunctuation: true}));
            generatePhotographerWork(photographerMedia, photographer);

            displayLightboxCurrentSlide();
            displayLightboxNextSlide();
            displayLightboxPreviousSlide();

            const coeurs = document.querySelectorAll(".coeur");
            installLikeEventListeners(coeurs);
        } 
    });  
}

/* ---------------------- FETCH -------------------- */
fetch ("FishEyeData.json")
.then(response => {return response.json()}) //extrait le json
.then(function generatePhotograph(jsonObj) {

  // Récupération de données
    let photographerId = getPhotographersIdFromUrl();
    let photographer = getPhotographerFromJson(photographerId, jsonObj);
    //console.log(photographer.name); 

    let photographerMedia = getMediaFromJson(photographerId, jsonObj);
    //console.log(photographerMedia);

    let nombreTotalDeLikes = calculNombreTotalDeLikes(photographerMedia);

    let tarifJournalier = photographer.price;
    //console.log("----------------" + tarifJournalier);

    // Génération du HTML
    generateSectionPhotograph(photographer);
    generateSectionButton();
    generateSectionPortrait(photographer);

    // Appels de fonctions
    generatePhotographerNameInModal(photographer);
    generatePhotographerWork(photographerMedia, photographer);
    displayCompteurGlobal(nombreTotalDeLikes);
    displayTarif(tarifJournalier);
    
    // Listener sur le bouton "Contactez-moi" pour déclencher l'ouverture de la modale
    let contactMe = document.querySelector(".contact_me");
    contactMe.addEventListener("click", displayModal);

    // Listeners sur la croix "x" et sur le bouton "Envoyer" pour déclencher la fermeture de la modale
    let closeButton = document.querySelector(".close_modal");
    closeButton.addEventListener("click", closeModal);

    let formSendButton = document.querySelector(".form_send");
    formSendButton.addEventListener("click", closeModal);

    // Listeners sur les coeurs
    const coeurs = document.querySelectorAll(".coeur");
    installLikeEventListeners(coeurs);
    
    // Listeners sur la Lightbox      
    displayLightboxCurrentSlide();
    displayLightboxNextSlide();
    displayLightboxPreviousSlide();

    // Listeners sur le menu déroulant "tri" & tri des médias par popularité, date, titre
    sortMediaByPopularity(photographerMedia, photographer);
    sortMediaByDate(photographerMedia, photographer); 
    sortMediaByTitle(photographerMedia, photographer);
    
})

/*------------------------------FIN DU FETCH-------------------------*/


