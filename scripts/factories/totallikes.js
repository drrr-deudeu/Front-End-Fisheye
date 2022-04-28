/**
 * Classe singleton gérant le compteur total
 */
class TotalLikes{
    constructor(){
        if (TotalLikes.exists) {
            return TotalLikes.instance
        }
        this._total = 0
        TotalLikes.instance = this
        TotalLikes.exists = true
        return this
    }

    /**
     * 
     * @param {*} incr
     * Nombre entier relatif 
     */
    incr(incr=1){
        this._total+=incr
    }

    /**
     * getter de la propriété total
     * @returns {total}
     * Total des likes
     * 
     */
    get total(){
        return this._total
    }
}
/**
 * Factory du total des likes et du prix par jour du photographe
 * Offre une fonction de rendu de la div
 * de bas de page comprenant la somme des likes et le prix par jour du photographe
 * @param {*} price
 * Prix par jour du photographe
 * @returns {UserDivDOM} 
 * fonction render de la DIV associée
 */
function TotalLikesFactory(price)
{
    const pricePerDay = price
    const totalLikes = new TotalLikes()
    
    /**
     * Fonction de rendu de la div likes et prix par jour
     */
    function UserDivDOM(){
        const totalEl = document.querySelector('.likes-and-price')
        totalEl.innerHTML = `<div><span>${totalLikes.total}</span>
        <i class="fa fa-heart"></i></div><span>${pricePerDay}€ / jour</span>`
    }
    return {UserDivDOM}
}