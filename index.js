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
      "name": "qAllHackersUnethical",
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
      }]
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
      }]
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
      }]
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
      }]
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
      }]
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
      }]
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
      "correctAnswer": false
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
      }]
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
      }]
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
      "correctAnswer": true
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
      "correctAnswer": true
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
      }]
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
      }]
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
      }]
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
      }]
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
      }]
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
      }]
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
      "correctAnswer": true
    }]
  }, {
    // Question 24: Daily Security Checklist (Re-used rating type for variety)
    "elements": [{
      "type": "rating",
      "name": "qDailySecurityChecklist",
      "score": 1,
      "title": "On a scale of 0 to 4, how many times a day should a typical employee check their daily security checklist?",
      "correctAnswer": 1,
      "rateValues": [ 0, 1, 2, 3, 4 ]
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
      }]
    }]
  }, {
    // Question 26: Strongest Authentication Factor (Re-used rating type for variety)
    "elements": [{
      "type": "rating",
      "name": "qAuthFactors",
      "score": 5,
      "title": "How many authentication factors are considered necessary for a secure system (e.g., 1=Password, 2=Password+Token, etc.)?",
      "correctAnswer": 2,
      "rateValues": [ 0, 1, 2, 3, 4 ]
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
      }]
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
      "correctAnswer": false
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
      }]
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
