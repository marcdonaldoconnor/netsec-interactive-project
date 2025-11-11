// loadDict.js must be loaded first so these exist
// <script src="loadDict.js"></script> is already above us in HTML

async function getEmailData(email_name){
    const filename = "emailQuiz.json"
    let data = fetch(filename)
        .then(response => {
            if (!response.ok) {
                throw new Error('File not found or inaccessible.');
            }
            return response.json();
        })
        .then(data => {
        if (!(email_name in data)){
            throw new Error('Email not found');
        }
        return data[email_name];
    })
    .catch(error => {
        console.log(error);
        broken();
    });
    return data
}

function wordClicked(span){
    span.classList.toggle('wordSelected');
}

//this function was also written in grok
function wrapWordsInSpans(text, prefix, separator = " ") {//the three prefixes are: "emailSubject", "emailContent", "emailSender"
    // Split the string into words
    const words = text.split(separator);
    
    // Create spans for each word
    const spans = words.map((wordI, index) => {
        let risk = "";
        let word = wordI
        if (word.startsWith("\\!")){
            risk = "redFlag";
            word = word.slice(2);
        }
        if (word.startsWith("\\?")){
            risk = "yellowFlag";//yellow flag will overide redflag. just incase to avoid problems
            word = word.slice(2);
        }
        return `<span id="${prefix}-${index}" class="span ${prefix} ${risk}" onClick="wordClicked(this)">${word}</span>`;
    });
    
    // Join spans with appropiate seperator
    return spans.join(`<span class="separator ${prefix}">${separator}</span>`);
}

let current_email = "";
async function load(emailName = ""){
    getEmailData(emailName).then(result =>
    {
        current_email = emailName;
        let sender = wrapWordsInSpans(result["sender"],"emailSender", "@");
        let subject = wrapWordsInSpans(result["subject"],"emailSubject");
        let content = wrapWordsInSpans(result["content"],"emailContent");
        document.getElementById('emailContentBox').innerHTML = [sender,subject,content].join("<br>");
        document.getElementById("explanation").textContent = result["explanation"]; 

        document.getElementById("nextQuestionButton").style.display = 'none';
        document.getElementById("explanation").style.display = 'none';
        document.getElementById("correctNumber").style.display = 'none';
        document.getElementById("wrongNumber").style.display = 'none';
        document.getElementById("missedNumber").style.display = 'none';
    }
    ).then(function(){//this is to change style of button pressed
        loadLevelSelect();
    })
}

function verify() {
    // Get all spans with class "span"
    let spans = document.querySelectorAll('.span');
    
    // Initialize arrays to store flagged and selected spans
    
    // Iterate through all spans
    let correct =[]
    let missed = []
    let wrong =[]

    spans.forEach(span => {
        let red = span.classList.contains('redFlag');
        let yel = span.classList.contains('yellowFlag');
        let sel = span.classList.contains('wordSelected');
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

    const numCorrect = document.getElementById("correctNumber");
    const numWrong = document.getElementById("wrongNumber");
    const numMissed = document.getElementById("missedNumber");

    listOfCompleted[current_email] = {
        "correct": correct.length,
        "wrong": wrong.length,
        "missed":missed.length
    }

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

let listOfCompleted = {
}

async function loadLevelSelect(filename="emailQuiz.json"){
    let data = fetch(filename)
        .then(response => {
            if (!response.ok) {
                throw new Error('File not found or inaccessible.');
            }
            return response.json();
        }).then(response => {
            let iner =[];
            let nextIt = false;
            Object.keys(response).forEach(name => {
                if(current_email ==name){
                    iner.push(`<button id="sel-${name}" disabled class ="questionSelectButton selectedQuestion" onclick="load('${name}')">'${name}'</button>`);
                    nextIt = true;
                }else if(name in listOfCompleted){
                    iner.push(`<button id="sel-${name}" disabled class ="questionSelectButton completedQuestion" onclick="load('${name}')">'${name}'</button>`);
                }
                else{
                    iner.push(`<button id="sel-${name}" class ="questionSelectButton" onclick="load('${name}')">'${name}'</button>`);
                    if(nextIt){//to change the next level button.
                    document.getElementById("nextQuestionButton").onclick = function(){
                        load(name)
                    }
                    nextIt = false;
                }
                }
            });
            if(nextIt){//this is for if the last question was the selected one
                document.getElementById("nextQuestionButton").onclick = function(){
                        attemptFinsish();
                    }
            }
                
            document.getElementById("levelSelectPanel").innerHTML = iner.join('');
        })
    .catch(error => {
        console.log(error);
    });
}

async function locateSelectButtons(filename="emailQuiz.json"){
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
async function checkIfDone(filename="emailQuiz.json"){
    return fetch(filename)
    .then(response => {
        if (!response.ok) {
            console.log('File not found or inaccessible.');
            throw new Error('File not found or inaccessible.');
        }
        return response.json();
    }).then(response => {
        unFinished = []
        for (const key in response) {
            if (!(key in listOfCompleted)) {
                unFinished.push(key);
            }
        }
        return unFinished;
    })
}

async function attemptFinsish(){
    const unfinishedList = await checkIfDone();

    if (unfinishedList.length > 0) {
        alert("You must complete all modules");
        load(unfinishedList[0]);
    } else {
        saveDict("stats", listOfCompleted);
        window.open("/summery.html", "_blank");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    load("tutorial");
});

function broken(){
    alert("sorry, someting went wrong")
}