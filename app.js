// A simple list of words that will be randomly chosen and scrambled
words = [
  "spell", "shoes", "joke", "wave", "words",
  "food", "thread", "fast", "shirt", "drive",
  "step", "shaft", "glass", "gather", "whistle",
  "tree", "purpose", "tongue", "act", "record"
];

// Take the new word and update the state with that word and the shuffled letter for the user to guess
function updateLetters(word) {
  state.word = [];
  state.letters = [];
  // Vue.nextTick is used to prevent a key-not-found error if the state changes
  // before Vue has a chance to react to the variables being cleared on the lines above
  Vue.nextTick(function () {
    state.goal = word;
    // randomize the display of the letter choices
    state.letters = word.split("").sort(() => Math.random() - 0.5);
  });
}

state = {
  // The word we are trying to unscramble
  goal: "",
  // An array of letters the represent the guessed word
  word: [],
  // An array of letters that represent the available letters that have not been placed in the word
  letters: [],
  // is the user currently dragging a letter
  drag: false,
  // The most recent message waiting to be updated into the board
  newMessage: null,
  // A function called when the user clicks the 'new word' button in the top right corner
  refresh: function () {
    // Pick a random word to update the game with
    updateLetters(words[Math.floor(Math.random() * words.length)].toUpperCase());
    Vue.nextTick(function () {
      // We send the guess inside a nextTick to ensure the new data is valid before sending it out
      sendGuess();
    })
  },
};

// Initialize Vue
new Vue({
  el: "#app",
  data: {
    state,
  },
  mounted: function () {
    // When the page first loads, initialize with a new random word
    updateLetters(words[Math.floor(Math.random() * words.length)].toUpperCase());
  },
  computed: {
    // this method is called vy VUE to set a class in the main app that sets the 
    // background color to green of the guessed word matches the goal
    status() {
      if (state.goal == state.word.join("")) {
        return "correct";
      } else {
        return "";
      }
    },
  },
  methods: {
    // This method is called by the Vue.Draggable components when the user starts dragging a letter
    dragStart() {
      state.drag = true;
    },
    // This method is called by the Vue.Draggable components when the user finishes dragging a letter
    dragEnd() {
      state.drag = false;
      // If someone sent an update we have to take that update and ignore the last user drag
      if (state.newMessage) {
        updateGuess(state.newMessage)
        state.newMessage = null;
      } else {
        // After the drag finished (even if nothing changed) we broadcast the new state
        sendGuess();
      }
    },
  },
});