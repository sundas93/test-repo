const JOKE_API = "https://official-joke-api.appspot.com/random_joke";

const jokesList = document.getElementById("jokesList");
const loadJokeBtn = document.getElementById("loadJoke");
const btn = document.getElementById("loadJoke");
  const img = document.getElementById("jokeImg");

  btn.addEventListener("click", () => {
    img.style.display = "block";  

    setTimeout(() => {
      img.style.display = "none";  
    }, 1000);
  });

async function fetchJokes() {
    let setupArray = [];
    let punchlineArray = [];
    try {
        jokesList.innerHTML = "<li>Loading joke... </li>";

        const response = await fetch(JOKE_API);
        if (!response.ok) {
            throw new Error("Failed to fetch joke");
        }

        const joke = await response.json();

        setupArray.push(joke.setup);
        punchlineArray.push(joke.punchline);

        displayJokes(setupArray, punchlineArray);

    } catch (error) {
        jokesList.innerHTML = "<li>Error loading joke </li>";
        console.error(error);
    }
}

function displayJokes(setups, punchlines) {
    jokesList.innerHTML = "";

    setups.forEach((setup, index) => {
        const li = document.createElement("li");
        li.className = "joke";

        li.innerHTML = `
            <p class="setup">${setup}</p>
            <p class="punchline">${punchlines[index]}</p>
        `;

        jokesList.appendChild(li);
    });
}

loadJokeBtn.addEventListener("click", fetchJokes);

fetchJokes();
