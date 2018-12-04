# word-guesser
Word Guesser is a hangman-like game built with Vue with a Google Firebase database. Integrates with WordsAPI to retrieve definitions and syllable counts for hints. 

### Features
- Difficulty system which awards more points per game at higher difficulty levels
- Hint system where players can purchase hints with unused strikes accumulated over several games in a session of play
- Leaderboard that displays running list of highest scoring players
- Player autosave which automatically records player high scores every game.

### Live Demo
Check out the [live demo of the game](http://word-guesser.netlify.com).

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
