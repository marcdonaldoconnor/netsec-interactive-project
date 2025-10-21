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

//this function was also written in grok
function wrapWordsInSpans(text, className = 'emailWord') {
    // Split the string into words
    const words = text.split(/\s+/);
    
    // Create spans for each word
    const spans = words.map((word, index) => {
        return `<span id="word-${index}" class="${className}">${word}</span>`;
    });
    
    // Join spans with a space
    return spans.join(' ');
}

async function buttonPress(){
    result1 = getEmailData("no 1").then(result1 =>
    {result2 = wrapWordsInSpans(result1["content"]);
    document.getElementById('emailContent').innerHTML = result2;})
}