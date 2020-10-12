function sendGuess(){
    let data = {
        type: 'guess',
        state: {
            word: state.word,
            letters: state.letters
        }
    }
    gatheract.sendAppMessage(data);
}

let config = {
    app_id: 'wordguess',
    events: {
        connected: (event)=> {
            if(gatheract.is_host && user.id != gatheract.user.id){
                sendGuess();
            }
        },
        channel_info: (event) => {
            if(event.new_user && gatheract.is_host && user.id != gatheract.user.id) {
                sendGuess();
            }
        },
        app_message: (event)=> {
            if(event.data.type === 'guess'){
                state.word = event.data.state.word;
                state.letters = event.data.state.letters;
            }
        }
    }
};
document.addEventListener('DOMContentLoaded', async () => {
    gatheract.init(config)
});