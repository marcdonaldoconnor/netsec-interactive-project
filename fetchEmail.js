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
function wrapWordsInSpans(text, prefix, seperator = " ") {//the three prefixes are: "emailSubject", "emailContent", "emailSender"
    // Split the string into words
    const words = text.split(seperator);
    
    // Create spans for each word
    const spans = words.map((word, index) => {
        return `<span id="${prefix}-${index}" class="span ${prefix}" onClick="wordClicked(this)">${word}</span>`;
    });
    
    // Join spans with a space
    return spans.join(seperator);
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