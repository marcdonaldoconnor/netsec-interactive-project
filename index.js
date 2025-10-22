// Add a custom 'score' property and a new 'feedback' property to survey questions.
Survey.Serializer.addProperty("question", {
  name: "score:number"
});
Survey.Serializer.addProperty("question", {
  name: "feedback:string"
});

const json = {
  "title": "Cyber security quiz",
  "showProgressBar": true,
  "showTimer": true,
  "timeLimitPerPage": 30,
  
  // The 'completedHtml' now uses placeholders for the final score message and the feedback HTML.
  "completedHtml": "<h3>Your Cyber Security Quiz Results</h3>{scoreMessage}</br></br><hr><h2>Questions for Review</h2>{feedbackHtml}",

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
      "score": 5,
      "feedback": "The cost of cyber crime is massive, and while exact figures vary, it is in the tens of billions annually, projected to reach trillions within a few years."
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
      }],
      "feedback": "Social engineering is the psychological manipulation of people into performing actions or divulging confidential information, often through impersonation."
    }]
  }, {
    "elements": [{
      "type": "rating",
      "name": "How many kinds of hackers are there?",
      "score": 3,
      "title": "How many kinds of hackers are there?",
      "correctAnswer": 3,
      "rateValues": [ 0, 1, 2, 3, 4 ],
      "feedback": "There are primarily three types: **White Hat** (ethical), **Black Hat** (malicious), and **Grey Hat** (falls between the two)."
    }]
  }, {
    "elements": [{
      "type": "boolean",
      "name": "qAllHackersUnethical",
      "score": 4,
      "title": "True or false? All hackers are unethical.",
      "labelTrue": "True",
      "labelFalse": "False",
      "correctAnswer": false,
      "feedback": "False. **White Hat** hackers are ethical security professionals who use their skills to protect systems. The term 'hacker' simply refers to an individual with advanced knowledge of computer systems."
    }]
  }, {
    "elements": [{
      "type": "image",
      "name": "falconImage",
      "imageLink": "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/9117/production/_96034173_cryptor3.png"
    }, {
      "type": "radiogroup",
      "name": "qMalwareInPicture",
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
      }],
      "feedback": "The picture shows a message demanding money to release encrypted files, which is the definition of **Ransomware**."
    }]
  },
  
  
  
  // --- New Pages with 20 Cybersecurity Questions ---

  
  
  {
    // Question 7: Multi-factor authentication
    "elements": [{
      "type": "radiogroup",
      "name": "qMFAmeaning",
      "score": 4,
      "title": "What does MFA stand for in cybersecurity?",
      "correctAnswer": "B",
      "choices": [{
        "value": "A",
        "text": "Main Frame Access"
      }, {
        "value": "B",
        "text": "Multi-Factor Authentication"
      }, {
        "value": "C",
        "text": "Malicious File Analyzer"
      }],
      "feedback": "MFA stands for **Multi-Factor Authentication**. It requires at least two pieces of evidence—like a password and a temporary code—to verify a user's identity."
    }]
  }, {
    // Question 8: Phishing definition
    "elements": [{
      "type": "radiogroup",
      "name": "qPhishingDefinition",
      "score": 3,
      "title": "What is 'phishing'?",
      "correctAnswer": "A",
      "choices": [{
        "value": "A",
        "text": "Sending fraudulent emails to trick individuals into revealing sensitive information."
      }, {
        "value": "B",
        "text": "A type of firewall."
      }, {
        "value": "C",
        "text": "Software that monitors keystrokes."
      }],
      "feedback": "**Phishing** is a form of social engineering where attackers use fraudulent communication (usually email) to lure users into revealing sensitive data."
    }]
  }, {
    // Question 9: Best password practice
    "elements": [{
      "type": "radiogroup",
      "name": "qBestPassword",
      "score": 5,
      "title": "Which is the BEST practice for creating a secure password?",
      "correctAnswer": "C",
      "choices": [{
        "value": "A",
        "text": "Using a combination of a pet's name and birth year."
      }, {
        "value": "B",
        "text": "Writing it down on a sticky note near your computer."
      }, {
        "value": "C",
        "text": "Using a unique, long passphrase that combines upper/lower case letters, numbers, and symbols."
      }],
      "feedback": "The best passwords are long, unique, and use a combination of character types. A **passphrase** is often more secure and easier to remember than a complex, short password."
    }]
  }, {
    // Question 10: Firewall purpose
    "elements": [{
      "type": "radiogroup",
      "name": "qFirewallPurpose",
      "score": 3,
      "title": "The primary purpose of a 'firewall' is to:",
      "correctAnswer": "B",
      "choices": [{
        "value": "A",
        "text": "Encrypt all data on your computer."
      }, {
        "value": "B",
        "text": "Monitor and control incoming and outgoing network traffic."
      }, {
        "value": "C",
        "text": "Scan for and remove viruses."
      }],
      "feedback": "A **firewall** acts as a security guard for your network, permitting or blocking traffic based on a set of predetermined security rules."
    }]
  }, {
    // Question 11: VPN function
    "elements": [{
      "type": "radiogroup",
      "name": "qVPNfunction",
      "score": 4,
      "title": "What does a VPN (Virtual Private Network) primarily do?",
      "correctAnswer": "A",
      "choices": [{
        "value": "A",
        "text": "Encrypts your internet connection and hides your IP address."
      }, {
        "value": "B",
        "text": "Increases your internet speed."
      }, {
        "value": "C",
        "text": "Protects against physical theft of your device."
      }],
      "feedback": "A **VPN** creates a secure, encrypted tunnel over the public internet, masking your IP address and protecting your data from snooping, especially on public Wi-Fi."
    }]
  }, {
    // Question 12: Updating software
    "elements": [{
      "type": "boolean",
      "name": "qSoftwareUpdates",
      "score": 2,
      "title": "True or false? Ignoring software updates won't compromise my security.",
      "labelTrue": "True",
      "labelFalse": "False",
      "correctAnswer": false,
      "feedback": "False. Software updates often include **security patches** that fix newly discovered vulnerabilities. Ignoring them leaves you open to attacks."
    }]
  }, {
    // Question 13: Zero-day exploit
    "elements": [{
      "type": "radiogroup",
      "name": "qZeroDayExploit",
      "score": 5,
      "title": "What is a 'zero-day' exploit?",
      "correctAnswer": "C",
      "choices": [{
        "value": "A",
        "text": "An attack that lasts exactly 24 hours."
      }, {
        "value": "B",
        "text": "A type of attack that only affects new computers."
      }, {
        "value": "C",
        "text": "A vulnerability that is exploited before the developer has a chance to fix it."
      }],
      "feedback": "A **Zero-Day** is a previously unknown software vulnerability that hackers can exploit before the software vendor becomes aware of it and develops a patch."
    }]
  }, {
    // Question 14: What is a Botnet?
    "elements": [{
      "type": "radiogroup",
      "name": "qBotnet",
      "score": 3,
      "title": "A 'Botnet' is a network of:",
      "correctAnswer": "B",
      "choices": [{
        "value": "A",
        "text": "Security analysts working together."
      }, {
        "value": "B",
        "text": "Compromised computers controlled remotely by an attacker."
      }, {
        "value": "C",
        "text": "Automated chat programs."
      }],
      "feedback": "A **Botnet** is a collection of internet-connected devices, each running one or more bots, typically used to perform large-scale automated tasks like DDoS attacks."
    }]
  }, {
    // Question 15: Data backup guarantee
    "elements": [{
      "type": "boolean",
      "name": "qBackupGuarantee",
      "score": 4,
      "title": "True or false? Having a recent, offline backup is the best defense against data loss from ransomware.",
      "labelTrue": "True",
      "labelFalse": "False",
      "correctAnswer": true,
      "feedback": "True. If your files are locked by ransomware, an **offline, verified backup** allows you to wipe your system and restore your data without paying the ransom. This follows the 3-2-1 backup rule."
    }]
  }, {
    // Question 16: Shoulder surfing risk
    "elements": [{
      "type": "boolean",
      "name": "qShoulderSurfing",
      "score": 2,
      "title": "True or false? 'Shoulder surfing' is a physical security risk.",
      "labelTrue": "True",
      "labelFalse": "False",
      "correctAnswer": true,
      "feedback": "True. **Shoulder surfing** is observing a person's computer screen or keyboard to get sensitive information, which is a physical (not digital) threat."
    }]
  }, {
    // Question 17: Keylogger function
    "elements": [{
      "type": "radiogroup",
      "name": "qKeyloggerFunction",
      "score": 4,
      "title": "What is a 'keylogger' designed to record?",
      "correctAnswer": "A",
      "choices": [{
        "value": "A",
        "text": "The keys pressed on a keyboard."
      }, {
        "value": "B",
        "text": "The temperature of the CPU."
      }, {
        "value": "C",
        "text": "The movement of the mouse."
      }],
      "feedback": "A **keylogger** is malicious software (or sometimes hardware) that records every keystroke made by a user, allowing attackers to capture passwords and other sensitive information."
    }]
  }, {
    // Question 18: IoT security risk
    "elements": [{
      "type": "radiogroup",
      "name": "qIoTSecurity",
      "score": 3,
      "title": "Why are Internet of Things (IoT) devices often a cybersecurity risk?",
      "correctAnswer": "B",
      "choices": [{
        "value": "A",
        "text": "They only connect to 5G networks."
      }, {
        "value": "B",
        "text": "They often have weak default passwords and infrequent security updates."
      }, {
        "value": "C",
        "text": "They use too much bandwidth."
      }],
      "feedback": "Many **IoT devices** are mass-produced with weak, factory-default passwords and receive little to no security updates over their lifespan, making them easy targets for hackers."
    }]
  }, {
    // Question 19: Spear Phishing
    "elements": [{
      "type": "radiogroup",
      "name": "qSpearPhishing",
      "score": 5,
      "title": "A targeted phishing attempt aimed at a specific individual or organization is known as:",
      "correctAnswer": "A",
      "choices": [{
        "value": "A",
        "text": "Spear Phishing"
      }, {
        "value": "B",
        "text": "Watering Hole Attack"
      }, {
        "value": "C",
        "text": "Baiting"
      }],
      "feedback": "**Spear Phishing** is highly personalized phishing, targeting a specific person or small group with information unique to them to increase the likelihood of success."
    }]
  }, {
    // Question 20: Principle of Least Privilege
    "elements": [{
      "type": "radiogroup",
      "name": "qLeastPrivilege",
      "score": 4,
      "title": "The security principle that states users should only be granted the minimum necessary access to perform their job is called:",
      "correctAnswer": "C",
      "choices": [{
        "value": "A",
        "text": "Principle of Zero Trust"
      }, {
        "value": "B",
        "text": "Principle of Separation of Duties"
      }, {
        "value": "C",
        "text": "Principle of Least Privilege (PoLP)"
      }],
      "feedback": "The **Principle of Least Privilege (PoLP)** minimizes the harm a compromised account can cause by limiting what it can access or do on a network."
    }]
  }, {
    // Question 21: DDoS Attack
    "elements": [{
      "type": "radiogroup",
      "name": "qDDoS",
      "score": 3,
      "title": "A DDoS attack attempts to:",
      "correctAnswer": "A",
      "choices": [{
        "value": "A",
        "text": "Overwhelm a server with excessive traffic to disrupt service."
      }, {
        "value": "B",
        "text": "Encrypt files and demand a ransom."
      }, {
        "value": "C",
        "text": "Steal a single, highly sensitive piece of data."
      }],
      "feedback": "A **Distributed Denial of Service (DDoS)** attack floods a target's server with junk traffic from multiple sources, making it unavailable to legitimate users."
    }]
  }, {
    // Question 22: Brute Force Attack
    "elements": [{
      "type": "radiogroup",
      "name": "qBruteForce",
      "score": 4,
      "title": "What is a 'Brute Force' attack?",
      "correctAnswer": "B",
      "choices": [{
        "value": "A",
        "text": "An attack that relies on physical strength."
      }, {
        "value": "B",
        "text": "Trying many combinations of passwords or passphrases until the correct one is found."
      }, {
        "value": "C",
        "text": "A targeted attack using malware."
      }],
      "feedback": "A **Brute Force** attack is a methodical way of guessing passwords, typically automated, by systematically checking all possible character combinations. This is why multi-factor authentication is critical."
    }]
  }, {
    // Question 23: HTTPS security
    "elements": [{
      "type": "boolean",
      "name": "qHTTPS",
      "score": 2,
      "title": "True or false? HTTPS indicates that the connection to a website is encrypted and secure.",
      "labelTrue": "True",
      "labelFalse": "False",
      "correctAnswer": true,
      "feedback": "True. The 'S' in **HTTPS** stands for 'Secure' and means the communication channel between your browser and the website is protected by SSL/TLS encryption."
    }]
  }, {
    // Question 24: Daily Security Checklist (Re-used rating type for variety)
    "elements": [{
      "type": "rating",
      "name": "qDailySecurityChecklist",
      "score": 1,
      "title": "On a scale of 0 to 4, how many times a day should a typical employee check their daily security checklist?",
      "correctAnswer": 1,
      "rateValues": [ 0, 1, 2, 3, 4 ],
      "feedback": "A full security checklist is usually performed **once** at the start of the day or before performing sensitive operations, not multiple times a day."
    }]
  }, {
    // Question 25: PII definition
    "elements": [{
      "type": "radiogroup",
      "name": "qPII",
      "score": 3,
      "title": "What does PII stand for in the context of data security?",
      "correctAnswer": "C",
      "choices": [{
        "value": "A",
        "text": "Public Internet Information"
      }, {
        "value": "B",
        "text": "Protocol for Internet Identity"
      }, {
        "value": "C",
        "text": "Personally Identifiable Information"
      }],
      "feedback": "**PII** (Personally Identifiable Information) is any data that can be used to identify a specific individual (e.g., name, address, social security number) and must be protected."
    }]
  }, {
    // Question 26: Strongest Authentication Factor (Re-used rating type for variety)
    "elements": [{
      "type": "rating",
      "name": "qAuthFactors",
      "score": 5,
      "title": "How many authentication factors are considered necessary for a secure system (e.g., 1=Password, 2=Password+Token, etc.)?",
      "correctAnswer": 2,
      "rateValues": [ 0, 1, 2, 3, 4 ],
      "feedback": "**Two** factors (MFA) are considered the minimum standard for a secure system, combining 'something you know' (password) with 'something you have' (token/phone) or 'something you are' (biometrics)."
    }]
  }, {
    // Question 27: Air-gapped definition
    "elements": [{
      "type": "radiogroup",
      "name": "qAirGapped",
      "score": 4,
      "title": "What does it mean for a computer to be 'air-gapped'?",
      "correctAnswer": "B",
      "choices": [{
        "value": "A",
        "text": "It has an internet connection that is too slow to use."
      }, {
        "value": "B",
        "text": "It is completely isolated from all networks, including the internet."
      }, {
        "value": "C",
        "text": "It is a cloud-based server."
      }],
      "feedback": "An **air-gapped** system is physically and logically isolated from unsecured networks, offering maximum security for the most sensitive data."
    }]
  }, {
    // Question 28: Social Engineering Prevention
    "elements": [{
      "type": "boolean",
      "name": "qSocialEngineeringPrevention",
      "score": 2,
      "title": "True or false? The most effective defense against social engineering is technical software.",
      "labelTrue": "True",
      "labelFalse": "False",
      "correctAnswer": false,
      "feedback": "False. Since social engineering targets human psychology, the most effective defense is continuous **security awareness training and user education**."
    }]
  }, {
    // Question 29: Cross-site Scripting (XSS)
    "elements": [{
      "type": "radiogroup",
      "name": "qXSS",
      "score": 5,
      "title": "Which of these is a common web application vulnerability where malicious scripts are injected into trusted websites?",
      "correctAnswer": "A",
      "choices": [{
        "value": "A",
        "text": "Cross-Site Scripting (XSS)"
      }, {
        "value": "B",
        "text": "Denial of Service (DoS)"
      }, {
        "value": "C",
        "text": "SQL Injection"
      }],
      "feedback": "**Cross-Site Scripting (XSS)** is a code injection attack that allows an attacker to execute malicious JavaScript in a victim's browser."
    }]
  }, {
    // Question 30: Best practice for suspicious link
    "elements": [{
      "type": "radiogroup",
      "name": "qSuspiciousLinkAction",
      "score": 3,
      "title": "If you receive an email with a suspicious link, what is the best course of action?",
      "correctAnswer": "C",
      "choices": [{
        "value": "A",
        "text": "Click it quickly to see what it is before your antivirus catches it."
      }, {
        "value": "B",
        "text": "Forward it to all your contacts as a warning."
      }, {
        "value": "C",
        "text": "Report it to your IT department (if applicable) and delete it."
      }],
      "feedback": "Never click on suspicious links. The best and safest action is to **report it to your security team** so they can investigate and block the threat, then delete the email."
    }]
  }],
  "firstPageIsStartPage": true
};

// --- Custom Functions for Score and Feedback ---

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
    if (question && question.isAnswerCorrect()) {
      if (!!question.score) {
        totalScore += question.score;
      }
    }
  });
  return totalScore;
}

// FUNCTION: Generates the HTML list of incorrect answers and their feedback
function getWrongAnswersHtml(survey) {
  let html = '';

  // Filter out non-answered and non-scoreable questions (like the start page)
  const answeredQuestions = survey.getAllQuestions().filter(q => 
    q.score && q.getType() !== 'html' && q.value !== undefined
  );

  answeredQuestions.forEach((question) => {
    // Check if the question is NOT correct
    if (!question.isAnswerCorrect()) {
      const feedback = question.feedback || "No specific feedback available. Review the concept covered in the question title.";
      const questionTitle = question.title || question.name;

      // Construct the display value for different types
      let displayValue;
      let correctAnswer;

      if (question.getType() === 'boolean') {
          displayValue = question.value ? question.labelTrue : question.labelFalse;
          correctAnswer = question.correctAnswer ? question.labelTrue : question.labelFalse;
      } else if (question.getType() === 'radiogroup') {
          // Find the choice text based on the stored value
          const choice = question.choices.find(c => c.value === question.value);
          displayValue = choice ? choice.text : question.displayValue;

          // Find the correct choice text based on the stored correct answer
          const correctChoice = question.choices.find(c => c.value === question.correctAnswer);
          correctAnswer = correctChoice ? correctChoice.text : question.correctAnswer;

      } else { // For rating questions
          displayValue = question.displayValue;
          correctAnswer = question.correctAnswer;
      }

      html += `
        <div style="border: 2px solid #CC0000; padding: 15px; margin-bottom: 20px; background-color: #FEE; border-radius: 5px;">
          <h4 style="color: #CC0000; margin-top: 0;">❌ ${questionTitle}</h4>
          <p><strong>Your Answer:</strong> ${displayValue}</p>
          <p><strong>Correct Answer:</strong> ${correctAnswer}</p>
          <p><strong>Feedback:</strong> ${feedback}</p>
        </div>
      `;
    }
  });

  if (html === '') {
    return "<h3>Perfect Score! You answered all questions correctly. 🎉</h3><p>Keep up the great work in practicing cyber hygiene!</p>";
  }

  return html;
}

// --- SurveyJS Initialization and Event Handling ---

const survey = new Survey.Model(json);

survey.onCompleting.add((sender) => {
  const totalScore = calculateTotalScore(sender.data);
  const maxScore = calculateMaxScore(sender.getAllQuestions());
  
  // Calculate and set the scores in survey results
  sender.setValue("maxScore", maxScore);
  sender.setValue("totalScore", totalScore);

  // Determine the score message based on performance
  let scoreMessage = `You got ${totalScore} out of ${maxScore} points.</br></br>`;
  const percentage = totalScore / maxScore;
  if (percentage > 0.7) {
    scoreMessage += "<strong>Congratulations! You did great and passed the quiz!</strong>";
  } else if (percentage > 0.3) {
    scoreMessage += "<strong>Well Done! You passed the quiz. Keep studying to improve!</strong>";
  } else {
    scoreMessage += "<i>In my experience</i>, as Obi-Wan Kenobi said, <i>womp womp</i>. You've got some concepts to review!";
  }
  sender.setValue("scoreMessage", scoreMessage);

  // Calculate and set the detailed wrong answers feedback HTML
  const feedbackHtml = getWrongAnswersHtml(sender);
  sender.setValue("feedbackHtml", feedbackHtml);
});

survey.onComplete.add((sender, options) => {
    // Optional: Log the results to the console.
    console.log(JSON.stringify(sender.data, null, 3));
});

// THIS LINE IS CRITICAL FOR RENDERING:
// It tells SurveyJS to render the quiz inside the HTML element with the ID 'surveyElement'.
survey.render(document.getElementById("surveyElement"));
