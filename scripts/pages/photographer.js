/**
 * Cette fonction lit et renvoie les données concernant le photographe "id", 
 * ainsi que la liste de ses médias, et son compteur de "likes"
 *
 * @param {*} id : id du photograph
 * @returns {[photograph, medias, totalLikes]}
 * photographer: le photographe (Cf. photographerFactory)
 * medias: type array. le tableau des medias (Cf. mediaFactory)
 * totalLikes: le gestionnaire de la div "likes" et prix par jour
 */
async function getPhotographerAndMedias(id) {
    const photographersApi = new PhotographersApi(BaseURL.base+"data/photographers.json")
    const [photographersData,mediasData] = await photographersApi.getPhotographersAndMedias()
    // le bon résultat est dans photographs[0] car id unique
    const photographers = photographersData
                                .filter(photograf => photograf.id === id)
                                .map(photograf => photographerFactory(photograf))
    // Le factory de la div totallikes and price
    const totalLikes = TotalLikesFactory(photographers[0].price)
    const medias = mediasData
                        .filter(media => media.photographerId === id)
                        .map(media => mediaFactory(media,totalLikes,photographers[0].name))


    return [photographers[0],medias, totalLikes]
}

/**
 * Génère et place la div header header contenant les informations générales concernant le photographe dans le document
 * @param {*} photograph
 * le photographe 
 */
async function displayHeader(photograph) {
    const photographSection = document.querySelector(".opacity-if-modale");
    const userCardDOM = photograph.getUserCardDOM(true);
    photographSection.prepend(userCardDOM);

};

/**
 * Insère les élèments HTML permettant la visualisation des médias dans le document
 * et initialise le caroussel sans l'afficher
 * @param {*} photograph 
 * le photographe
 * @param {*} medias
 * ses médias
 */
async function displayMedias(photograph,medias){
    const mediasSection = document.querySelector(".medias_section")
    mediasList = new MediasList(medias)
    mediasList.mediasList.forEach((media,index) => {
        const userCardDOM = media.getUserCardDOM()
        mediasSection.appendChild(userCardDOM)
        media.SetListeners()
    }); 
    mediasList.CarousselRender()    
}

/**
 * Insère l'élément HTML contenant les likes et le prix par jour
 * @param {*} totalLikes 
 * Le gestionnaire de likes
 */
async function displayTotalLikes(totalLikes){
    totalLikes.UserDivDOM()
}

/**
 * Initialise l'URL permettant de revenir à la liste des photographes. 
 */
function LogoAddLinkToHome(){
    const headerElement = document.querySelector(".link-to-home")
    headerElement.setAttribute('href',BaseURL.base)    
}

/**
 * Fonction d'inialisation de l'application et des fonction d'évènements
 */
async function init(){
    // BaseURL singleton allows to have a "relatif" or "absolute" site URL
    new BaseURL

    LogoAddLinkToHome()
    // Get the photograph id from URL
    let params = (new URL(document.location)).searchParams;
    let photographerID = parseInt(params.get('id'))
    if( isNaN(photographerID) ){
        return
    }

    // Init and Load datas
    const [photograph, medias, totalLikes] = await getPhotographerAndMedias(photographerID);

    // Fill page
    displayHeader(photograph)
    displayMedias(photograph,medias)
    displayTotalLikes(totalLikes)
    // Initialisation de la select box des filtres
    SortBoxManagement(medias)
    // initialisation du listener du submit du formulaire de contact
    contactEventControl()
}

/**
 * photographer.html : Première fonction appelée
 */
init()