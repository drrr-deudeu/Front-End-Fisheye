    /**
     * 
     * @returns {photographers} la map des photographes, données traitées 
     */
    async function getPhotographers() {
        new BaseURL
        const photographersApi = new PhotographersApi(BaseURL.base+"data/photographers.json")
        const photographersData = await photographersApi.getPhotographers()
        
        const photographers = photographersData
                                .map(
                                    photographer => photographerFactory(photographer)
                                    )
        return ({photographers: photographers})
    }

    /**
     * 
     * @param {*} photographers 
     * La collection de photographes
     */
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const userCardDOM = photographer.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    /**
     * Fonction d'initialisation.
     * Affichage des vignettes et des évènements qui y sont liés
     */
    async function init() {
        // Récupère et traite les datas des photographes
        const { photographers } = await getPhotographers();
        // Et les affiche
        displayData(photographers);
    };
    
    /**
     * index.html : Première fonction appelée
     */
    init();
    