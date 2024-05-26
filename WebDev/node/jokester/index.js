const jokes = require("give-me-a-joke");
let colors = require("colors");
jokes.getRandomDadJoke(function (joke) {
    console.log(joke.rainbow);
}
);