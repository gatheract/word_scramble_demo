// This function broadcasts the state from this local client to all other users in the channel
// If 'user' is non-null, the message will only be sent to a specific user
function sendGuess(user) {
    // Configure the packet to be sent
    let data = {
        type: "guess",
        state: {
            goal: state.goal,
            word: state.word,
            letters: state.letters,
        },
    };
    // Broadcast the message to all users in the channel
    gatheract.sendMessage(data, user);
}

// Take a guess from another user and update the state
function updateGuess(newState) {
    state.goal = newState.goal;
    state.word = newState.word;
    state.letters = newState.letters;
}

// Configure GatherAct API
let config = {
    // This should be a unique ID for your app.
    // For development purposes we can set it to anything.
    appId: '<ENTER_UNIQUE_APP_NAME_HERE>',
    events: {
        // The 'connected' event get fired every time a this user connects to the channel
        connected: event => {
            // Send out the state in case a non-host joined before the host
            if (gatheract.isHost) {
                sendGuess();
            }
        },
        // The 'channelInfo' event fires when a user is added or removed from the channel
        // If the event is due to a newUsers, and we are the host, we broadcast the game state.
        channelInfo: event => {
            if (event.newUser && gatheract.isHost) {
                sendGuess(Array(event.newUser.id));
            }
        },
        // The 'appMessage' event fires when we receive a message from another app instance.
        appMessage: (data, from) => {
            // In this app, we only have one message which is sent from 'sendGuess()'
            // The if statement is redundant here as there will only even be one type of appMessage
            // but it makes the code more readable for this demo
            if (data.type === "guess") {
                state.newMessage = data.state;
                // only update state if user is not in the middle of a drag, otherwise we save it for after the drag is complete
                if (!state.drag) {
                    updateGuess(state.newMessage);
                    state.newMessage = "";
                }
            }
        },
    },
};

// Here we initialize the gatheract API. You can see more info by
// inspecting the gatheract global variable in the Javascript console.
gatheract.init(config);