const contain = document.querySelector(`.container`);

const baseURL = `https://api.tvmaze.com/`;
const search = `search/shows?q=`;
const form = document.querySelector(`form`)

form.addEventListener(`submit` , () => {
    event.preventDefault();
    const show = form.elements.movie.value
    getShow(show)


})
async function getShow (ShowNae) {
    try {
    searchURL = baseURL + search + ShowNae
    let response = await axios.get(searchURL)
    Data = response.data
    contain.innerHTML = ""

    for (set in Data) {
        console.log(set)
        if (Data[set].show[`image`] == null) {
            continue;
        }
        else {

        const h3 = document.createElement(`h3`)
        const div = document.createElement(`div`)
        const img = document.createElement(`img`)

        img.src = Data[set].show[`image`].medium
        h3.innerText = Data[set].show[`name`]

        div.classList.add(`movie-card`)
        

        div.append(img)
        div.append(h3)
        contain.append(div)

        }
    }
    }

    catch (err){
        console.log(err)
    }
}