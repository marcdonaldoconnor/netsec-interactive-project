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
        if (word.startsWith("\!")){
            risk = "redFlag";
            word = word.slice(2);
        }
        if (word.startsWith("\?")){
            risk = "yellowFlag";//yellow flag will overide redflag. just incase to avoid problems
            word = word.slice(2);
        }
        return `<span id="${prefix}-${index}" class="span ${prefix} ${risk}" onClick="wordClicked(this)">${word}</span>`;
    });
    
    // Join spans with appropiate seperator
    return spans.join(`<span class="separator ${prefix}">${separator}</span>`);
}

async function buttonPress(){
    getEmailData("no 1").then(result =>
    {
        let sender = wrapWordsInSpans(result["sender"],"emailSender", "@");
        let subject = wrapWordsInSpans(result["subject"],"emailSubject");
        let content = wrapWordsInSpans(result["content"],"emailContent");
        document.getElementById('emailContentBox').innerHTML = [sender,subject,content].join("<br>");
    }
    )
}

function verify() {//this hole functin was written by grok
    // Get all spans with class "span"
    let spans = document.querySelectorAll('.span');
    
    // Initialize arrays to store flagged and selected spans
    let flaggedSpans = [];
    let selectedSpans = [];
    
    // Iterate through all spans
    spans.forEach(span => {
        // Check if span has redFlag or yellowFlag class
        if (span.classList.contains('redFlag') || span.classList.contains('yellowFlag')) {
            flaggedSpans.push(span.id);
        }
        // Check if span has wordSelected class
        if (span.classList.contains('wordSelected')) {
            selectedSpans.push(span.id);
        }
    });
    
    // Verify if selected spans match flagged spans
    let correct = selectedSpans.length === flaggedSpans.length &&
                 selectedSpans.every(id => flaggedSpans.includes(id)) &&
                 flaggedSpans.every(id => selectedSpans.includes(id));
    
    // Return or display result
    if (correct) {
        console.log("All flagged words correctly selected!");
        return true;
    } else {
        console.log("Selection is incorrect. Selected:", selectedSpans, "Flagged:", flaggedSpans);
        return false;
    }
}