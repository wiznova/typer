const rightHand = "hill hilly him hip hippo holly holy hominy homonym honk honky hook hookup hoop hop hulk hull hum hump hunk hymn ill imply in ink inky inn ion ionium join jollily jolly joy jump jumpily jumpy junk junky kill killjoy kink kinky knoll kook kooky lily limp limply link linkup lion lip lippy loin lollipop look loom loon loony loop lop lull lump lumpily lumpy milk milky mill million mini minimum minion mink mom mommy monk monopoly moon mop mull mum mummy my no nonunion nook noon noun null nun nylon nymph oh ohio ohm oil oily oink omnium on onion only oomph opinion opium phony phylum pi pill pimp pimply pin pinion pink pinky pinup pippin plop ploy plum plump plumply plunk polio polk poll polo poly polyp polyphony pomp pompon pony pool pop poplin poppy pull pulp pump pumpkin pun punk puny pup pupil puppy unholy unhook union unpin up uphill upon yolk you yukon yummy"
const leftHand = "abracadabra accrete affect age as ave avesta axes badge barge bastard cart cascade cave crater crave created crest deface drag dread drear dressed east eaves effect exec far farce fast faster gaff gas gated geez grass grave grease great greatest greece greed qatar race red tea redface retard retract reverberate sat sex starter starve staves stewardess stewart strafe stress swedes terse treat tree tweet vast veer verde vest vexes wage wart waste water waves we weed eater were west wrest zed"

{  // build Keyboard
    let keyboard = document.getElementById("keyboard");
    let row_el;
    let key_el;

    const keyRows = [
        "qwertyuiop".split(''),
        "asdfghjkl".split(''),
        "zxcvbnm".split(''),
    ];

    keyRows.forEach( (keys) => {
        row_el = document.createElement('div');
        row_el.classList.add("keyboardRow");
        keys.forEach((letter) => {
            key_el = document.createElement('div');
            key_el.classList.add("key");
            key_el.innerText = letter.toUpperCase();
            row_el.appendChild(key_el);
        })
        keyboard.appendChild(row_el);
    }
    )
}


{
    // Selectors:
    let keyboard = document.getElementById("keyboard");
    let userText = document.getElementById("user-text");
    let inputText = document.getElementById("text-input");
    let statusText = document.getElementById("status-div");
    let leftHandBtn = document.getElementById("left-hand-btn");
    let rightHandBtn = document.getElementById("right-hand-btn");
    
    // Variables:
    let text;
    let textLength;
    let errors;
    let wpm;
    let timeElapsed;
    let timeStart = 0;


    resetGame();
    
    leftHandBtn.onclick = () => {
        userText.innerText = leftHand;
        resetGame();
    }
    rightHandBtn.onclick = () => {
        userText.innerText = rightHand;
        resetGame();
    }

    document.addEventListener("keydown", function (e){
        let keyCode = e.keyCode;
        let key = e.key;
        
        toggleKey(e.key);
        console.log(keyCode, key, e);
        if(keyCode==27) {
            resetGame();
        } else {
            if (text[0] === key) {
                if (timeStart === 0) 
                    timeStart = Date.now();
                text = updateField(inputText, text.substring(1));
                if(text === ""){
                    updateField(inputText, " ");
                    timeElapsed = (Date.now() - timeStart) / 1000;
                    timeStart = 0;
                    wpm = Math.round(textLength / timeElapsed * 60 / 5);
                    updateField(statusText, `Congrats! errors: ${errors} time: ${timeElapsed} wpm: ${wpm}<br>[ press ESC to restart ]`);
                }
            } else if (key.length === 1) {
                errors++;
                console.log("that's a miss", errors);
            }
        }
    });

    document.addEventListener('keyup', function (e) {
        let keyCode = e.keyCode;
        let key = e.key;
        
        toggleKey(e.key);
    })  

    function toggleKey(k){
        keyboard.childNodes.forEach(
            (row) => {
                row.childNodes.forEach(
                    (key_el) => {
                        if (k.toUpperCase() === key_el.innerText){
                            let idx = key_el.classList.contains('pressed');
                            if (idx === false)
                                key_el.classList.add("pressed");
                            else
                                key_el.classList.remove("pressed");
                        }
                    }
                )
            }
        )
    }

    userText.onchange = () => { 
        text = updateField(inputText, userText.innerHTML)
    }

    function updateField(field, newText) {
        field.innerHTML = newText;
        return newText;
    }

    function resetGame() {
        updateField(statusText, `Hi there! errors: 0 time: 0 wpm: 0<br>[ press ESC to restart ]`);
        text = updateField(inputText, userText.value);
        textLength = text.length;
        errors = 0;
    }
}