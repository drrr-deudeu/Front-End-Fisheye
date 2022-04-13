class MediasList {
    constructor(mediasList,tri = "Popularité"){
        if (MediasList.exists) {
            return MediasList.instance
        }
        this._mediasList = mediasList
        this._tri = tri
        this.sort(this._tri)
        this._mediasSection = document.querySelector(".medias_section")
        MediasList.instance = this
        MediasList.exists = true
        return this
    }

    sort(tri){
        switch(tri){
            case "Popularité":
                this._mediasList = Array.from(this._mediasList).sort((a, b) => b.counter.count - a.counter.count)
                break
            case "Date":
                this._mediasList = Array.from(this._mediasList).sort(
                    (a, b) => (b.date > a.date)?1:-1)
                break
            case "Titre":
                this._mediasList = Array
                        .from(this._mediasList)
                        .sort((a,b) => (a.title >= b.title)?1:-1)
                break
        }
        return this._mediasList        
    }

    get mediasList(){
        return this._mediasList
    }

    render(){
        this._mediasSection.innerHTML = ""
        this._mediasList.forEach((media) => {
            const userCardDOM = media.getUserCardDOM()
            this._mediasSection.appendChild(userCardDOM)
            //media.SetListeners()
        });
    
    }
    sortAndRender(tri){
        if(this._tri === tri){
            return
        }
        this.sort(tri)
        this._tri = tri
        this.render()
    }

    CarousselRender(i=0){
        this._indexMedia = i
        this.CarousselRenderMedia(this._indexMedia)
        document.querySelector(".arrow-left")
            .addEventListener('click',e => {
                if(this._indexMedia > 0) {
                    this._indexMedia--
                    this.CarousselRenderMedia(this._indexMedia)
                }
            })
        document.querySelector(".arrow-right")
            .addEventListener('click',e => {
                if((this._indexMedia+1) < this._mediasList.length) {
                    this._indexMedia++
                    this.CarousselRenderMedia(this._indexMedia)
                }
            })
    }
    CarousselRenderMedia(indexMedia){
        this._indexMedia = indexMedia
        const lightBox = document.querySelector(".media-caroussel-render")
        lightBox.innerHTML=this._mediasList[this._indexMedia].LightBoxRender()
    } 
}