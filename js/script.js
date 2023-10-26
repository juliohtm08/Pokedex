// Seleciona elementos do DOM para interagir com eles
const pokemonName = document.querySelector(".pokemon_name"); // Elemento para o nome do Pokémon
const pokemnNumber = document.querySelector(".pokemon_number"); // Elemento para o número do Pokémon
const pokemonImage = document.querySelector(".pokemon_image"); // Elemento para a imagem do Pokémon

const form = document.querySelector(".form"); // Elemento do formulário de pesquisa
const input = document.querySelector(".input_search"); // Caixa de texto de pesquisa
const buttonPrev = document.querySelector(".btn-prev"); // Botão para o Pokémon anterior
const buttonNext = document.querySelector(".btn-next"); // Botão para o Pokémon seguinte

let searchPokemon = 1;

// Função para buscar informações de um Pokémon na API
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

// Função para renderizar informações do Pokémon na página
const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading...";

  // Realiza a busca das informações do Pokémon
  const data = await fetchPokemon(pokemon);

  if (data) {
    // Se as informações foram encontradas, exibe os detalhes do Pokémon
    pokemonImage.style.display = "block";
    pokemonName.innerHTML = data.name;
    pokemnNumber.innerHTML = data.id;
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];

    input.value = ""; // Limpa a caixa de texto após a pesquisa
    searchPokemon = data.id; // Atualiza a variável de pesquisa com o ID do Pokémon
  } else {
    // Se nenhuma informação foi encontrada, exibe "Not Found"
    pokemonImage.style.display = "none";
    pokemonName.innerHTML = "Not Found";
    pokemnNumber.innerHTML = "0";
  }
};

// Evento para lidar com a pesquisa de Pokémon quando o formulário é enviado
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Evita que o formulário seja recarregado

  renderPokemon(input.value.toLowerCase());
});

// Evento para buscar o Pokémon anterior
buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

// Evento para buscar o Pokémon seguinte
buttonNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
