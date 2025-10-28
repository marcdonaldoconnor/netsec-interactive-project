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
        return data[email_name];
    })
    .catch(error => {
        console.log(error);
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

async function buttonPress(){
    load("no 1");
}

async function load(emailName = ""){
    getEmailData(emailName).then(result =>
    {
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
    )
}

function verify() {//this hole functin was written by grok
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

    numCorrect.textContent = "correct: "+correct.length;
    numWrong.textContent = "wrong: "+wrong.length;
    numMissed.textContent = "missed: "+missed.length;

    numCorrect.style.display = 'block';
    numWrong.style.display = 'block';
    numMissed.style.display = 'block';

    document.getElementById("nextQuestionButton").style.display = 'block';
    document.getElementById("explanation").style.display = 'block';
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
            Object.keys(response).forEach(name => {
                iner.push(`<button class ="questionSelectButton" onclick="load(${name})">${name}</button>`);
            });
            document.getElementById("levelSelectPanel").innerHTML = iner.join('');
        })
    .catch(error => {
        console.log(error);
    });
}
