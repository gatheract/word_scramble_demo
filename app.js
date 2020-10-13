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

function mix(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

state = {
  goal: words[0].toUpperCase(),
  word: [],
  letters: mix(words[0].toUpperCase().split("")),
  refresh: function () {
    state.word = [];
    state.letters = [];
    Vue.nextTick(function () {
      state.goal = words[Math.floor(Math.random() * words.length)].toUpperCase();
      state.letters = mix(state.goal.split(""));
    })
    
    sendGuess();
  },
};
new Vue({
  el: "#app",
  data: {
    state,
  },
  computed: {
    status() {
      if (state.goal == state.word.join("")) {
        return "correct";
      } else {
        return "";
      }
    },
  },
  methods: {
    dragEnd() {
      drag = false;
      sendGuess();
    },
  },
});
