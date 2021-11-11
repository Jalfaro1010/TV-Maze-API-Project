const contain = document.querySelector(`.container`);
const body = document.querySelector(`body`)

// NETWORKS
const ABC = {}
const NBC = {}
const FOX = {}
const CBS = {}

// Streaming
const NETFLIX = {}
const PRIME = {}
const HULU = {}
const YOUTUBE = {}

const baseURL = `https://api.tvmaze.com/`;
const search = `search/shows?q=`;
const idsearch = `shows/`
const form = document.querySelector(`form`)

catogrizeShows()
// Show Search
form.addEventListener(`submit` , () => {
    event.preventDefault();
    const show = form.elements.movie.value
    getShow(show)

})

// Function for sorting shows by rating
function sortObjectEntries(obj){
    Object.entries(obj).sort((a,b) => b[1]-a[1])
    return  Object.entries(obj).sort((a,b)=>b[1]-a[1]).map(el=>el[0])
}

// Function for getting show for search
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

// Takes all the shows and put in there ID in the catogrey list that they fit

async function catogrizeShows() {
    try {
        const showPageSearchBase = `https://api.tvmaze.com/shows?page=`
        
        let count = `0`
        while (count < 235) {
        count++ 
        const Info = await axios.get(showPageSearchBase + count)
        const Intel = Info.data

        
        for (show in Intel) {
            // Putting shows in network list
            if (Intel[show].network != null) {
                if (Intel[show].network[`name`] == `ABC`) {
                    ABC[Intel[show].id] = Intel[show].rating[`average`]
                }
                else if (Intel[show].network[`name`] == `NBC`) {
                    NBC[Intel[show].id] = Intel[show].rating[`average`]
                }
                else if (Intel[show].network[`name`] == `FOX`) {
                    FOX[Intel[show].id] = Intel[show].rating[`average`]
                }
                else if (Intel[show].network[`name`] == `CBS`) {
                    CBS[Intel[show].id] = Intel[show].rating[`average`]
                }
            }
            // Putting shows streaming list
            if (Intel[show].webChannel != null) {
                if (Intel[show].webChannel[`name`] == `Netflix`) {
                    NETFLIX[Intel[show].id] = Intel[show].rating[`average`]
                }
                else if (Intel[show].webChannel[`name`] == `Prime`) {
                    PRIME[Intel[show].id] = Intel[show].rating[`average`]
                }
                else if (Intel[show].webChannel[`name`] == `Hulu`) {
                    HULU[Intel[show].id] = Intel[show].rating[`average`]
                }
                else if (Intel[show].webChannel[`name`] == `YouTube`) {
                    YOUTUBE[Intel[show].id] = Intel[show].rating[`average`]
                }
            }
        }
    }
    sortedABC = sortObjectEntries(ABC)
    sortedNBC = sortObjectEntries(NBC)
    sortedFOX = sortObjectEntries(FOX)
    sortedCBS = sortObjectEntries(CBS)
    sortedNetflix = sortObjectEntries(NETFLIX)
    sortedPrime = sortObjectEntries(PRIME)
    sortedHulu = sortObjectEntries(HULU)
    sortedYouTube = sortObjectEntries(YOUTUBE)

    console.log(sortedABC)
    


}
    catch (err) {
        console.log(err)
    }
}


