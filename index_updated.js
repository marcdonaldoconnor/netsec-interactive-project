const json = {
  "title": "Cyber security quiz",
  "showProgressBar": true,
  "showTimer": true,
  "timeLimitPerPage": 30,
  "completedHtmlOnCondition": [{
    "expression": "{totalScore} > 14",
    "html":
      "You got {totalScore} out of {maxScore} points.</br></br>Congratulations! You did great!"
  }, {
    "expression": "{totalScore} > 7",
    "html":
      "You got {totalScore} out of {maxScore} points.</br></br>Well Done! You passed the quiz. "
  }, {
    "expression": "{totalScore} <= 7",
    "html":
      "You got {totalScore} out of {maxScore} points.</br></br><i>In my experience</i>, as Obi-Wan Kenobi said, <i>womp womp</i>. "
  }],
  "pages": [{
    "name": "startPage",
    "elements": [{
      "type": "html",
      "name": "welcomeMsg",
      "html": "<b>Take this quiz to find out how well you know cybersecurity.</b></br></br><i>Don't get hacked.</i></br><img src='https://www.shutterstock.com/image-photo/hacker-spy-man-one-person-260nw-2233718123.jpg' alt='image that might load when a man threatens your computer' width='100%' height='auto'></img>\n"
    }]
  }, {
    "elements": [{
      "type": "radiogroup",
      "name": "CrimeCost",
      "title": "How many billons of dollars are lost each year to cyber crime?",
      "choices": [ 5, 15, 30, 45, 100],
      "correctAnswer": 30,
      "score": 5
    }]
  }, {
    "elements": [{
      "type": "radiogroup",
      "name": "What is social engineering?",
      "score": 3,
      "title": "What is social engineering?",
      "correctAnswer": "grogu",
      "choices": [{
        "value": "mike",
        "text": "When a group of civil engineers have a party."
      }, {
        "value": "grogu",
        "text": "When a malicious actor tries to steal credentials from a user by pretending to be someone else."
      }, {
        "value": "din",
        "text": "When a piece of malware infects multiple computers at the same time."
      }]
    }]
  }, {
    "elements": [{
      "type": "rating",
      "name": "How many kinds of hackers are there?",
      "score": 3,
      "title": "How many kinds of hackers are there?",
      "correctAnswer": 3,
      "rateValues": [ 0, 1, 2, 3, 4 ]
    }]
  }, {
    "elements": [{
      "type": "boolean",
      "name": "qBobaFettSurvival",
      "score": 4,
      "title": "True or false? All hackers are unethical.",
      "labelTrue": "True",
      "labelFalse": "False",
      "correctAnswer": false
    }]
  }, {
    "elements": [{
      "type": "image",
      "name": "falconImage",
      "imageLink": "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/9117/production/_96034173_cryptor3.png"
    }, {
      "type": "radiogroup",
      "name": "qHanSolosShipName",
      "score": 5,
      "startWithNewLine": false,
      "title": "What kind of malware is found in the picture? ",
      "correctAnswer": "blackPearl",
      "choices": [{
        "value": "corfe",
        "text": "A worm."
      }, {
        "value": "blackPearl",
        "text": "Ransomware."
      }, {
        "value": "falcon",
        "text": "A keylogger."
      }]
    }]
  }],
  "firstPageIsStartPage": true
};
// Add a custom `score` property to survey questions
Survey.Serializer.addProperty("question", {
  name: "score:number"
});
const survey = new Survey.Model(json);
survey.onComplete.add((sender, options) => {
    console.log(JSON.stringify(sender.data, null, 3));
});
function calculateMaxScore(questions) {
  var maxScore = 0;
  questions.forEach((question) => {
    if (!!question.score) {
      maxScore += question.score;
    }
  });
  return maxScore;
}
function calculateTotalScore(data) {
  var totalScore = 0;
  Object.keys(data).forEach((qName) => {
    const question = survey.getQuestionByValueName(qName);
    if (question.isAnswerCorrect()) {
      if (!!question.score) {
        totalScore += question.score;
      }
    }
  });
  return totalScore;
}
survey.onCompleting.add((sender) => {
  const totalScore = calculateTotalScore(sender.data);
  const maxScore = calculateMaxScore(sender.getAllQuestions());
  
  // Save the scores in survey results
  sender.setValue("maxScore", maxScore);
  sender.setValue("totalScore", totalScore);
});
survey.render(document.getElementById("surveyElement"));