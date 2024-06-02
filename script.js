let url  = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const searchInput  = document.getElementById('search-input');
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const pokeweight = document.getElementById('weight');
const poheight = document.getElementById('height');
const imgContainer = document.getElementById('img-container');
const types = document.getElementById("types")


searchBtn.addEventListener('click' ,resultApiCall);

async function resultApiCall (res) {
    let formattedValue =  searchInput.value.toLowerCase().replace(/[^\sa-zA-Z0-9]/g , '');
    const data = await fetch(`${url}/${formattedValue}`)
    .then((res) => res.json())
    .catch(err => {
        alert("Pokémon not found");
    });
    const {name , height , id ,weight , sprites , base_experience , stats } = data ;
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
    const {front_default , back_shiny_female , front_female , front_shiny_female , back_shiny} = sprites ;
    const img = document.createElement('img')
    img.src = front_default ;
    img.id = 'sprite' ;
    imgContainer.appendChild(img) ;
}   