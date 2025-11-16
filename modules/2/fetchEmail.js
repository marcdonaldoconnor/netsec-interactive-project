// loadDict.js must be loaded first so these exist
// <script src="loadDict.js"></script> is already above us in HTML

//loads a specifc email dict from the json
async function getEmailData(email_name){
    const filename = "emailQuiz.json"//this never changes
    let data = fetch(filename)
        .then(response => {
            if (!response.ok) {//check file exists
                throw new Error('File not found or inaccessible.');
            }
            return response.json();//turn to json
        })
        .then(data => {
        if (!(email_name in data)){//check if email exists
            throw new Error('Email not found');
        }
        return data[email_name];//the specific email inside the json structure
    })
    .catch(error => {
        console.log(error);
        broken();
    });
    return data
}


//this func toggles the span between selected and not selecected
//it littierly will be attatched to the span with the span itself as the parameter.
function wordClicked(span){
    span.classList.toggle('wordSelected');
}

//this function gets a section of the email (email subject, content or sender)  and seperates each word, wraps that word in html spans then returns it so that it can be added to inner html
function wrapWordsInSpans(text, prefix, separator = " ") {//the three prefixes are: "emailSubject", "emailContent", "emailSender"
    //split the string into words
    const words = text.split(separator);//seperator will be a space or "@"
    
    //create spans for each word
    const spans = words.map((wordI, index) => {
        let risk = "";//red, yellow, none
        let word = wordI
        if (word.startsWith("\\!")){
            risk = "redFlag";
            word = word.slice(2);
        }
        if (word.startsWith("\\?")){
            risk = "yellowFlag";//yellow flag will overide redflag. just incase to avoid problems
            word = word.slice(2);
        }
        return `<span id="${prefix}-${index}" class="span ${prefix} ${risk}" onClick="wordClicked(this)">${word}</span>`;//this is inner html so it can be added into the html
    });
    
    // Join spans with appropiate seperator
    return spans.join(`<span class="separator ${prefix}">${separator}</span>`);//the prefix corisponds to a class in the css so that the subject and sender have diffirent css to content but still behave the same
}

let current_email = "";//keeps track of which level the user is on

//load specifc question/email into the play area
async function load(emailName = ""){
    getEmailData(emailName).then(result =>
    {
        current_email = emailName;//keep track
        //wrap all three section in spans then add them to the inner html
        let sender = wrapWordsInSpans(result["sender"],"emailSender", "@");
        let subject = wrapWordsInSpans(result["subject"],"emailSubject");
        let content = wrapWordsInSpans(result["content"],"emailContent");
        document.getElementById('emailContentBox').innerHTML = [sender,subject,content].join("<br>");
        //fill the explonation box (it will start hidden)
        document.getElementById("explanation").textContent = result["explanation"]; 


        //hide the information in the panel below the play area
        document.getElementById("nextQuestionButton").style.display = 'none';
        document.getElementById("explanation").style.display = 'none';
        document.getElementById("correctNumber").style.display = 'none';
        document.getElementById("wrongNumber").style.display = 'none';
        document.getElementById("missedNumber").style.display = 'none';
    }
    ).then(function(){//this is to change style of button pressed
        loadLevelSelect();//this has to be loaded constantly because its resets the styles.
    })
}

//this is bassically the "submit" or "check answer" button.
function verify() {
    // Get all spans with class "span"
    let spans = document.querySelectorAll('.span');
    
    // Initialize arrays to store flagged and selected spans
    let correct =[]
    let missed = []
    let wrong =[]
    // Iterate through all spans
    spans.forEach(span => {
        let red = span.classList.contains('redFlag');
        let yel = span.classList.contains('yellowFlag');
        let sel = span.classList.contains('wordSelected');
        //check which words where missed, caught, or wrong compared to the ones that where selected
        if (sel){
            if(red||yel){
                correct.push(span);
            }else{
                wrong.push(span);
            }
        }if (red){
            if(!sel){
                missed.push(span);
    }}});


    //update wrong, right, missed styles aswell as remove selected css
    correct.forEach(span => {
        span.classList.remove("wordSelected");
        span.classList.add("correct");
    });
    wrong.forEach(span => {
        span.classList.remove("wordSelected");
        span.classList.add("wrong");
    });
    missed.forEach(span => {
        span.classList.add("missed");
    });

    //count the amount of each stat
    const numCorrect = document.getElementById("correctNumber");
    const numWrong = document.getElementById("wrongNumber");
    const numMissed = document.getElementById("missedNumber");
    listOfCompleted[current_email] = {
        "correct": correct.length,
        "wrong": wrong.length,
        "missed":missed.length
    }
    //saves results to users local storage
    updateDict("stats", listOfCompleted);



    //loads imediate results and makes all of the information apear
    numCorrect.textContent = "correct: "+correct.length;
    numWrong.textContent = "wrong: "+wrong.length;
    numMissed.textContent = "missed: "+missed.length;

    numCorrect.style.display = 'block';
    numWrong.style.display = 'block';
    numMissed.style.display = 'block';

    document.getElementById("nextQuestionButton").style.display = 'block';
    document.getElementById("explanation").style.display = 'block';
    document.getElementById(`sel-${current_email}`).classList.add("completedQuestion");

}

let listOfCompleted = {//keeps track of what questions have been completed
}


//loads the level select bar and each leve select button with the needed function
async function loadLevelSelect(filename="emailQuiz.json"){
    //unfortunately most of these functions all reload all of the json which cuase alot of delay and makes it all async, you get what you get though.
    let data = fetch(filename)
        .then(response => {
            if (!response.ok) {
                throw new Error('File not found or inaccessible.');
            }
            return response.json();
        }).then(response => {
            let iner =[];
            let nextIt = false;//to keep track of what is next for the next questions button
            Object.keys(response).forEach(name => {//iterate through each email question
                if(current_email ==name){//current email is this one
                    iner.push(`<button id="sel-${name}" disabled class ="questionSelectButton selectedQuestion" onclick="load('${name}')">'${name}'</button>`);
                    nextIt = true;//next email is the "next email"
                }else if(name in listOfCompleted){//deactivate the button and set css
                    iner.push(`<button id="sel-${name}" disabled class ="questionSelectButton completedQuestion" onclick="load('${name}')">'${name}'</button>`);
                }
                else{//activate button with cool css
                    iner.push(`<button id="sel-${name}" class ="questionSelectButton" onclick="load('${name}')">'${name}'</button>`);
                    if(nextIt){//to change the next level button.
                        //sets the next questin button to this question
                        document.getElementById("nextQuestionButton").onclick = function(){
                            load(name)
                        }
                        nextIt = false;
                    }
                }
            });
            if(nextIt){//this is for if the last question was the selected one
                document.getElementById("nextQuestionButton").onclick = function(){
                        attemptFinish();//finish the quiz
                    }
            }
                
            document.getElementById("levelSelectPanel").innerHTML = iner.join('');
        })
    .catch(error => {
        console.log(error);
    });
}

async function locateSelectButtons(filename="emailQuiz.json"){//completly redundant. will DESTROY later
    let data = fetch(filename)
        .then(response => {
            if (!response.ok) {
                throw new Error('File not found or inaccessible.');
            }
            return response.json();
        }).then(response => {
            let elem =[];
            Object.keys(response).forEach(name => {
                elem.push(document.getElementById("sel"+name));
                if (elem[-1]=null){
                    elem.pop();
                }
            });
            return elem;
        })
    .catch(error => {
        console.log(error);
    });
}
let unFinished = [];
async function checkIfDone(filename="emailQuiz.json"){//checks if all questions have been completed
    return fetch(filename)
    .then(response => {//get json
        if (!response.ok) {
            console.log('File not found or inaccessible.');
            throw new Error('File not found or inaccessible.');
        }
        return response.json();
    }).then(response => {//check if anything is uncompleted
        unFinished = []
        for (const key in response) {
            if (!(key in listOfCompleted)) {
                unFinished.push(key);
            }
        }
        return unFinished;
    })
}

async function attemptFinish(){//attempts to finish the game
    const unfinishedList = await checkIfDone();

    if (unfinishedList.length > 0) {//is there any unfinished question
        alert("You must answer all questions before continuing!");
        load(unfinishedList[0]);
    } else {
        saveDict("stats", listOfCompleted);//if all questions are finished then save
        window.open("/netsec-interactive-project/modules/2/summary.html", "_blank");//open summery page
    }
}

document.addEventListener("DOMContentLoaded", function() {//when site opens
    listOfCompleted = loadDict("stats")//update from last session what the ussers progress was
    load("tutorial");//load the first level( hopefully it s toutorial)
});

function broken(){//this is just to use if any errors happen
    alert("sorry, someting went wrong")
}
