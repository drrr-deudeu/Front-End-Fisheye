function closeCaroussel(){
    document.querySelector(".medias_caroussel").classList.toggle("visible")
    document.querySelector(".medias_caroussel").classList.toggle("invisible")
    const likesAndPrice = document.querySelector(".likes-and-price")
    likesAndPrice.classList.toggle("invisible")
    likesAndPrice.classList.toggle("visible")
    document.querySelector(".opacity-if-caroussel").classList.toggle("visible")
    document.querySelector(".opacity-if-caroussel").classList.toggle("invisible")

}

//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographerAndMedias(id) {
    const photographersApi = new PhotographersApi(BaseURL.base+"data/photographers.json")
    const [photographersData,mediasData] = await photographersApi.getPhotographersAndMedias()
    const photographers = photographersData
                                .filter(photograf => photograf.id === id)
                                .map(photograf => photographerFactory(photograf))

    const totalLikes = TotalLikesFactory(photographers[0].price)
    const medias = mediasData
                        .filter(media => media.photographerId === id)
                        .map(media => mediaFactory(media,totalLikes,photographers[0].name))


    return [photographers[0],medias, totalLikes]
}
async function displayHeader(photograph) {
    const photographSection = document.querySelector("#main");
    const userCardDOM = photograph.getUserCardDOM(true);
    photographSection.appendChild(userCardDOM);

};

async function displayMedias(photograph,medias){
    const mediasSection = document.querySelector(".medias_section")
    mediasList = new MediasList(medias)
    mediasList.mediasList.forEach((media,index) => {
        const userCardDOM = media.getUserCardDOM(10+(index*5))
        mediasSection.appendChild(userCardDOM)
        media.SetListeners()
    }); 
    mediasList.CarousselRender()    
}
async function displayTotalLikes(totalLikes){
    totalLikes.UserDivDOM()
}

function LogoAddLinkToHome(){
    const headerElement = document.querySelector(".link-to-home")
    headerElement.setAttribute('href',BaseURL.base)    
}

async function init(){
    new BaseURL
    LogoAddLinkToHome()
    let params = (new URL(document.location)).searchParams;
    let photographerID = parseInt(params.get('id'))
    if( isNaN(photographerID) ){
        return
    }
    const [photograph, medias, totalLikes] = await getPhotographerAndMedias(photographerID);
    displayHeader(photograph)
    displayMedias(photograph,medias)
    displayTotalLikes(totalLikes)
    SelectedBoxManagement(medias)
    contactEventControl()
}

init()