// A simple list of words that will be randomly chosen and scrambled
words = [
  "spell",
  "shoes",
  "joke",
  "wave",
  "words",
  "food",
  "thread",
  "fast",
  "shirt",
  "drive",
  "step",
  "shaft",
  "glass",
  "can",
  "whistle",
  "tree",
  "purpose",
  "tongue",
  "van",
  "record",
];

// A simple function that takes an array of letters and mixes/shuffles their order
// This is ised to generate the shuffled letters at the bottom of the screen
function mix(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// Take the new word and update the state with that word and the shuffled letter for the user to guess
function updateLetters(isNew, word, letters) {
  state.word = [];
  state.letters = [];
  // Vue.nextTick is used to prevent a key-not-found error if the state changes
  // before Vue has a chance to react to the variables being cleared on the lines above
  Vue.nextTick(function () {
    if (isNew) {
      // isNew=1 when user clicked refresh button
      state.goal = word;
      // randomize the display of the letter choices
      state.letters = mix(state.goal.split(""));
    } else {
      // message from another user
      state.word = word;
      // We don't mix the letters because the letters have already been mixed by the user that sent them
      state.letters = letters;
    }
  });
}

state = {
  // The word we are trying to unscramble
  goal: "",
  // An array of letters the represent the guessed word
  word: [],
  // An array of letters that represent the available letters that have not been placed in the word
  letters: [],
  // A function called when the user clicks the 'new word' button in the top right corner
  refresh: function () {
    updateLetters(
      1,
      words[Math.floor(Math.random() * words.length)].toUpperCase()
    );
    sendGuess();
  },
};

new Vue({
  el: "#app",
  data: {
    state,
  },
  mounted: function () {
    // When the page first loads, initialize with a new random word
    updateLetters(
      1,
      words[Math.floor(Math.random() * words.length)].toUpperCase()
    );
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
    // This method is called by the Vue.Draggable components when the user finished dragging a letter
    dragEnd() {
      drag = false;
      sendGuess();
    },
  },
});
