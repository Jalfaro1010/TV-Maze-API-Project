const contain = document.querySelector(`.container`);
const body = document.querySelector(`body`)

const baseURL = `https://api.tvmaze.com/`;
const search = `search/shows?q=`;
const idsearch = `shows/`
const form = document.querySelector(`form`)

// Show Search
form.addEventListener(`submit` , () => {
    event.preventDefault();
    const show = form.elements.movie.value
    getShow(show)
    // cardClick()

})
async function getShow(val) {
    try {
    searchURL = baseURL + search + val
    let response = await axios.get(searchURL)
    Data = response.data
    contain.innerHTML = ""

    for (set in Data) {
        
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
        img.id = (Data[set].show[`id`])
        console.log(img.id)

        div.append(img)
        div.append(h3)
        contain.append(div)
        div.addEventListener(`click`, () => {
            console.log(`clicked it`);
            infoCard(img)
        })

        }
    }
    }

    catch (err){
        console.log(err)
    }
}

const cardHolder = document.createElement(`div`)
// info card function
async function infoCard (pic) {
    try {
    const baseIMDBlink = `https://www.imdb.com/title/`
    const imgID = pic.id
    const info =  await axios.get(baseURL + idsearch + imgID)
    const dataInfo = info.data

    const generes = dataInfo.genres
    
    // Creating elements for the infomation
    const started = document.createElement(`p`)
    const ended = document.createElement(`p`)
    const rating = document.createElement(`p`)
    const generesUL = document.createElement(`ul`)
    const imdb = document.createElement(`a`)
    const status = document.createElement(`p`)
    
    // Adding classes to the varibles
    cardHolder.classList.add(`Info-Card`)
    started.classList.add(`started`)
    ended.classList.add(`ended`)
    rating.classList.add(`rating`)
    generesUL.classList.add(`generes`)
    imdb.classList.add(`imdb`)
    status.classList.add(`status`)

    // Adding the div to the page
    body.append(cardHolder)

    // Clearing the divs pervious html
    cardHolder.innerHTML = ""
    
    // Setting the text to the desired value
    status.innerText = dataInfo[`status`]
    started.innerText = dataInfo[`premiered`]
    ended.innerText = dataInfo[`ended`]
    rating.innerText = dataInfo[`rating`].average
    imdb.href = baseIMDBlink + dataInfo[`externals`].imdb

    

    // creating list items for the genere list
    for (genere of generes) {
        const genereli = document.createElement(`li`)
        genereli.innerHTML = genere
        generesUL.append(genereli)
    }

    // Appending the elements to the div
    cardHolder.append(started)
    cardHolder.append(ended)
    cardHolder.append(status)
    cardHolder.append(rating)

    rating.insertAdjacentHTML(`afterend`, `${dataInfo['summary']}`);
    document.querySelector(`.Info-Card p:nth-child(4)`).classList.add(`summary`);

    cardHolder.append(generesUL)
    cardHolder.append(imdb)
    }
    catch(err) {
        console.log(err)
    }
}