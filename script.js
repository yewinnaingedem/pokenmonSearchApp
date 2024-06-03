let url  = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const searchInput  = document.getElementById('search-input');
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const pokeweight = document.getElementById('weight');
const poheight = document.getElementById('height');
const imgContainer = document.getElementById('img-container');
const types = document.getElementById("types")

// resultApiCall
searchBtn.addEventListener('click' ,resultApiCall );
// () => {
    // let formattedValue =  searchInput.value.toLowerCase().replace(/[^\sa-zA-Z0-9]/g , ''); 
    // let resultValue ;
    // if (/^[a-zA-Z]+$/.test(formattedValue)) {
    //     resultValue = formattedValue ;
    // }else {
    //     resultValue = formattedValue.split(" ");
    // }
    // console.log(resultValue);
    // }


async function resultApiCall () {
    let formattedValue =  searchInput.value.toLowerCase().replace(/[^\sa-zA-Z0-9]/g , '');
    const data = await fetch(`${url}/${formattedValue}`)
    .then((res) => res.json())
    .catch(err => {
        alert("Pokémon not found");
    });
    const {name , height , id ,weight , sprites ,types , base_experience , stats } = data ;
    pokemonName.textContent = name ;
    pokemonId.textContent = id ;
    poheight.textContent = height ;
    pokeweight.textContent = weight ;
    console.log(data);
    stats.forEach((el)=> {
        const {base_stat , stat } = el ;
        const {name , url} = stat ;
        document.getElementById(`${name}`).innerText  = base_stat ;
        
    });
    const {front_default} = sprites ;
    if(document.getElementById('sprite')) {
        document.getElementById('img-container').removeChild(document.getElementById('sprite')) ;
    }
    const img = document.createElement('img')
    img.src = front_default ;
    img.id = 'sprite' ;
    imgContainer.appendChild(img) ;
    let nameContainer = ""
    types.forEach(el => {
        const {slot , type} = el ;
        const {name , url } = type ;
        nameContainer += `<button class="btn btn-primary">${name.toUpperCase()}</button>` ;
    });
    document.getElementById('types').innerHTML  = nameContainer ;
}   