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

// Configure GatherAct API
let config = {
    // This should be a unique ID for your app.
    // For development purposes we can set it to anything.
    appId: '<ENTER_UNIQUE_APP_NAME_HERE>',
    events: {
        // The 'connected' even get fired every time a new user connects to the channel
        // In this demo, we don't need to use this event.
        connected: event => {
        },
        // The 'channelInfo' event fires when a user is added or removed from the channel
        // If the event is due to a newUsers, and we are the host, we broadcast the game state.
        channelInfo: event => {
            if (event.newUser && gatheract.isHost) {
                sendGuess(event.newUser.id);
            }
        },
        // The 'appMessage' event fires when we receive a message from another app instance.
        appMessage: event => {
            // In this app, we only have one message which is sent from 'sendGuess()'
            // The if statement is redundent here as there will only even be one type of appMessage
            // but it makes the code more readable for this demo
            if (event.data.type === "guess") {
                state.goal = event.data.state.goal;
                state.word = event.data.state.word;
                state.letters = event.data.state.letters;
            }
        },
    },
};

// Here we initialize the gatheract API. You can see more info by
// inspecting the gatheract global variable in the Javascript console.
gatheract.init(config);