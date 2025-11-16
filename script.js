const quizQuestions = [
    {
        id: 1,
        type: "multiple-choice",
        question: "What is the recommended minimum length for a strong password?",
        options: [
            "6 characters",
            "8 characters",
            "12-16 characters",
            "20 characters"
        ],
        correctAnswer: 2,
        explanation: "Security experts recommend passwords be at least 12-16 characters long. Longer passwords are exponentially harder to crack through brute force attacks. A 12-character password with mixed characters has trillions of possible combinations, making it significantly more secure than shorter passwords."
    },
    {
        id: 2,
        type: "true-false",
        question: "True or False: It's safe to use the same strong password across multiple important accounts as long as it's complex enough.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "FALSE. Never reuse passwords across different accounts, no matter how strong. If one account is compromised in a data breach, attackers will try that password on other services. This is called 'credential stuffing'. Each account should have a unique password, which is why password managers are so valuable."
    },
    {
        id: 3,
        type: "multiple-choice",
        question: "Which of the following is NOT a common indicator of a phishing email?",
        options: [
            "Generic greeting like 'Dear Customer'",
            "Sense of urgency or threats",
            "Personalized content using your name and account details",
            "Suspicious sender email address"
        ],
        correctAnswer: 2,
        explanation: "Personalized content is NOT typically a sign of phishing - though be aware that sophisticated attackers can sometimes obtain personal information. Common phishing indicators include generic greetings, artificial urgency, threats, spelling errors, and suspicious sender addresses. Always verify unexpected emails by contacting the organization directly through official channels."
    },
    {
        id: 4,
        type: "true-false",
        question: "True or False: Multi-Factor Authentication (MFA) makes it impossible for attackers to access your account even if they have your password.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "FALSE. While MFA significantly increases security (by up to 99.9% according to Microsoft), it's not completely foolproof. Sophisticated attacks like SIM swapping, MFA fatigue attacks, or malware can sometimes bypass MFA. However, MFA remains one of the most effective security measures available and should always be enabled when possible."
    },
    {
        id: 5,
        type: "multiple-choice",
        question: "What does ransomware typically do to a victim's computer?",
        options: [
            "Deletes all files permanently",
            "Encrypts files and demands payment for decryption",
            "Steals passwords and sends them to attackers",
            "Displays unwanted advertisements"
        ],
        correctAnswer: 1,
        explanation: "Ransomware encrypts your files, making them inaccessible, and then demands payment (usually in cryptocurrency) for the decryption key. The 2022 Medibank attack in Australia involved ransomware where attackers stole and encrypted data, demanding a ransom. Prevention is key: regular backups, updated software, and employee training are essential defenses."
    },
    {
        id: 6,
        type: "short-answer",
        question: "What does the acronym 'HTTPS' stand for, and why is it important for website security?",
        correctAnswer: "hypertext transfer protocol secure",
        keywords: ["hypertext", "transfer", "protocol", "secure", "encryption", "encrypted"],
        explanation: "HTTPS stands for 'Hypertext Transfer Protocol Secure'. The 'S' is crucial - it means data transmitted between your browser and the website is encrypted using TLS/SSL. This prevents attackers from intercepting and reading sensitive information like passwords, credit card numbers, or personal data. Always look for the padlock icon in your browser's address bar before entering sensitive information."
    },
    {
        id: 7,
        type: "multiple-choice",
        question: "According to Australian privacy law, when must organizations notify individuals about a data breach?",
        options: [
            "Within 24 hours of discovering the breach",
            "Only if more than 1000 people are affected",
            "When the breach is likely to result in serious harm",
            "Only if specifically requested by the affected individuals"
        ],
        correctAnswer: 2,
        explanation: "Under Australia's Notifiable Data Breaches (NDB) scheme, organizations must notify affected individuals and the Office of the Australian Information Commissioner (OAIC) when a data breach is likely to result in serious harm. This applies to organizations with annual turnover of $3 million or more, credit reporting bodies, health service providers, and others covered by the Privacy Act 1988."
    },
    {
        id: 8,
        type: "true-false",
        question: "True or False: Once you delete a file from your computer's recycle bin, the data is completely erased and cannot be recovered.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "FALSE. Deleting files and emptying the recycle bin only removes the reference to the file, not the actual data. The data remains on the storage device until it's overwritten. This is why data recovery tools can often retrieve 'deleted' files, and why secure data disposal requires special software (like DBAN or BitWiper) or physical destruction of storage devices."
    },
    {
        id: 9,
        type: "short-answer",
        question: "Name two types of multi-factor authentication methods commonly used today.",
        keywords: ["sms", "text", "authenticator", "app", "biometric", "fingerprint", "face", "hardware", "token", "security key", "yubikey"],
        explanation: "Common MFA methods include: 1) SMS/Text message codes, 2) Authenticator apps (like Google Authenticator, Microsoft Authenticator), 3) Biometric authentication (fingerprint, facial recognition), 4) Hardware security keys (like YubiKey), and 5) Email verification codes. Authenticator apps and hardware keys are generally more secure than SMS, which can be intercepted through SIM swapping attacks."
    },
    {
        id: 10,
        type: "multiple-choice",
        question: "What is the 3-2-1 backup rule?",
        options: [
            "3 copies of data, on 2 different media types, with 1 offsite",
            "Backup every 3 days, keep for 2 months, test 1 time per year",
            "3 backup servers, 2 backup administrators, 1 backup policy",
            "Back up 3 times daily, verify 2 times, restore 1 time"
        ],
        correctAnswer: 0,
        explanation: "The 3-2-1 backup rule is a best practice: keep at least 3 copies of your data (the original plus 2 backups), store the backups on 2 different types of media (e.g., external hard drive and cloud storage), and keep 1 copy offsite (e.g., cloud or different physical location). This protects against hardware failure, ransomware, natural disasters, and other threats."
    },
    {
        id: 11,
        type: "long-answer",
        question: "Describe the steps you should take if you suspect you've clicked on a phishing link or entered your credentials on a fake website.",
        keywords: ["password", "change", "report", "disconnect", "scan", "malware", "it", "monitor", "bank", "credit"],
        explanation: "Immediate actions if you've fallen for phishing: 1) DISCONNECT from the internet to prevent further data transmission, 2) CHANGE passwords immediately (from a different, secure device) for the compromised account and any accounts using the same password, 3) ENABLE MFA if not already active, 4) RUN antivirus/anti-malware scans on your device, 5) REPORT the incident to your IT security team immediately, 6) MONITOR your accounts for suspicious activity, 7) If financial information was exposed, contact your bank and consider a credit freeze, 8) REPORT the phishing attempt to relevant authorities (e.g., ACSC's ReportCyber in Australia). Speed is critical - the faster you act, the less damage can occur."
    },
    {
        id: 12,
        type: "multiple-choice",
        question: "What is 'social engineering' in the context of cybersecurity?",
        options: [
            "Using social media to promote cybersecurity awareness",
            "Manipulating people to divulge confidential information or perform actions",
            "Engineering secure social networking platforms",
            "Automated systems that detect social media threats"
        ],
        correctAnswer: 1,
        explanation: "Social engineering is the psychological manipulation of people to trick them into divulging confidential information or performing actions that compromise security. It exploits human psychology rather than technical vulnerabilities. Examples include phishing emails, pretexting phone calls, baiting (leaving infected USB drives), and tailgating (following someone into a secure area). Training and awareness are the best defenses against social engineering."
    },
    {
        id: 13,
        type: "true-false",
        question: "True or False: Antivirus software alone is sufficient protection against all cybersecurity threats.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "FALSE. While antivirus software is important, it's just one layer of defense. A comprehensive security approach includes: regular software updates, strong passwords with MFA, firewalls, email filtering, regular backups, employee training, network segmentation, and more. This is called 'defense in depth' - multiple layers of security so that if one fails, others still protect you. Cybersecurity requires a multi-faceted approach, not a single solution."
    },
    {
        id: 14,
        type: "short-answer",
        question: "What does VPN stand for, and what is its primary security benefit?",
        correctAnswer: "virtual private network",
        keywords: ["virtual", "private", "network", "encrypt", "secure", "connection", "data"],
        explanation: "VPN stands for 'Virtual Private Network'. Its primary security benefit is encrypting your internet connection and masking your IP address. This is especially important when using public Wi-Fi networks (at cafes, airports, hotels), which are often unsecured and vulnerable to eavesdropping. A VPN creates a secure, encrypted tunnel for your data, protecting it from interception. However, choose reputable VPN providers as they can potentially see all your traffic."
    },
    {
        id: 15,
        type: "long-answer",
        question: "What is the principle of 'Least Privilege' in cybersecurity, and why is it important?",
        keywords: ["minimum", "necessary", "access", "permissions", "need", "role", "limit", "reduce", "risk"],
        explanation: "The Principle of Least Privilege means users should only have the minimum level of access (permissions) necessary to perform their job functions - nothing more. For example, a marketing employee shouldn't have access to the finance database. This is important because: 1) It LIMITS DAMAGE if an account is compromised (attackers can only access what that user could), 2) It REDUCES insider threat risks (whether malicious or accidental), 3) It SIMPLIFIES auditing and compliance, 4) It PREVENTS accidental data modification or deletion. Regular access reviews ensure privileges remain appropriate as roles change."
    },
    {
        id: 16,
        type: "case-study",
        question: "CASE STUDY - Australian Cyber Incident:\n\nIn October 2022, Medibank, one of Australia's largest health insurers, suffered a significant data breach affecting approximately 9.7 million current and former customers. The attackers gained access to Medibank's systems and exfiltrated sensitive personal information including names, addresses, dates of birth, Medicare numbers, and sensitive health claims data. The attackers demanded a ransom payment, which Medibank refused. Subsequently, the stolen data was released on the dark web.\n\nBased on this incident and your cybersecurity knowledge, answer the following:\n\na) Identify at least THREE potential security weaknesses that might have allowed attackers to breach Medibank's systems.\n\nb) What immediate actions should Medibank have taken upon discovering the breach?\n\nc) How does this breach relate to Australia's Notifiable Data Breaches (NDB) scheme, and what were Medibank's legal obligations?",
        keywords: ["vulnerability", "patch", "mfa", "multi-factor", "access control", "employee training", "social engineering", "phishing", "notify", "oaic", "customers", "affected", "serious harm", "disconnect", "contain", "investigate", "forensic", "isolation", "network"],
        explanation: "COMPREHENSIVE ANSWER:\n\na) POTENTIAL SECURITY WEAKNESSES:\n- Unpatched vulnerabilities in systems or software that attackers exploited\n- Lack of multi-factor authentication (MFA) allowing attackers to access systems with compromised credentials\n- Insufficient network segmentation, allowing lateral movement once inside\n- Inadequate access controls (failure to apply least privilege principle)\n- Successful phishing or social engineering attack on employees\n- Weak password policies or credential management\n- Lack of continuous monitoring to detect suspicious activity early\n\nb) IMMEDIATE ACTIONS UPON DISCOVERY:\n- ISOLATE affected systems to prevent further data exfiltration\n- ACTIVATE incident response team and procedures\n- PRESERVE forensic evidence for investigation\n- ASSESS the scope and severity of the breach\n- NOTIFY the Office of the Australian Information Commissioner (OAIC) as required by NDB scheme\n- NOTIFY affected individuals as soon as practicable\n- ENGAGE cybersecurity experts and forensic investigators\n- COORDINATE with law enforcement (AFP, ACSC)\n- PREPARE public communications and support resources for affected customers\n\nc) NDB SCHEME OBLIGATIONS:\nUnder Australia's Notifiable Data Breaches scheme (Privacy Act 1988), Medibank was legally required to:\n- ASSESS whether the breach was likely to result in serious harm to individuals (clearly YES - sensitive health data)\n- NOTIFY the OAIC as soon as practicable\n- NOTIFY affected individuals directly, including: description of the breach, kinds of information involved, recommendations for steps individuals should take\n- The notification must be made as soon as practicable after becoming aware that the breach is likely to result in serious harm\n- Failure to comply can result in significant penalties\n\nThe Medibank breach highlighted the critical importance of: proactive security measures, rapid incident response, transparent communication, and the severe consequences of data breaches in healthcare where sensitive personal information is involved. The incident led to increased scrutiny of cybersecurity practices across the Australian healthcare sector and renewed focus on mandatory security standards."
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];
let simulationProgress = {
    phishing: { completed: false, score: 0 },
    incident: { completed: false, score: 0 }
};

function navigateTo(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    document.getElementById(sectionId).classList.add('active');
    
    const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    if (sectionId === 'quiz') {
        initializeQuiz();
    } else if (sectionId === 'progress') {
        updateProgress();
    } else if (sectionId === 'learning') {
        markModulesAsViewed();
    }
    
    window.scrollTo(0, 0);
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            navigateTo(targetId);
        });
    });
    
    loadProgress();
});

function initializeQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    document.getElementById('quiz-results').classList.add('hidden');
    renderQuiz();
}

function renderQuiz() {
    const container = document.getElementById('quiz-container');
    container.innerHTML = '';
    
    quizQuestions.forEach((question, index) => {
        const questionCard = document.createElement('div');
        questionCard.className = 'question-card';
        questionCard.id = `question-${question.id}`;
        
        let optionsHTML = '';
        
        if (question.type === 'multiple-choice' || question.type === 'true-false') {
            optionsHTML = '<div class="options">';
            question.options.forEach((option, optionIndex) => {
                optionsHTML += `
                    <div class="option">
                        <input type="radio" name="question-${question.id}" id="q${question.id}-opt${optionIndex}" value="${optionIndex}">
                        <label for="q${question.id}-opt${optionIndex}">${option}</label>
                    </div>
                `;
            });
            optionsHTML += '</div>';
        } else if (question.type === 'short-answer') {
            optionsHTML = `<input type="text" class="text-input" id="answer-${question.id}" placeholder="Enter your answer here...">`;
        } else if (question.type === 'long-answer' || question.type === 'case-study') {
            optionsHTML = `<textarea class="textarea-input" id="answer-${question.id}" placeholder="Enter your detailed answer here..."></textarea>`;
        }
        
        questionCard.innerHTML = `
            <div class="question-header">
                <span class="question-number">Question ${index + 1}</span>
                <span class="question-type">${question.type.replace('-', ' ').toUpperCase()}</span>
            </div>
            <div class="question-text">${question.question}</div>
            ${optionsHTML}
            <button class="submit-answer-btn" onclick="submitAnswer(${question.id})">Submit Answer</button>
            <div id="feedback-${question.id}"></div>
        `;
        
        container.appendChild(questionCard);
    });
}

function submitAnswer(questionId) {
    const question = quizQuestions.find(q => q.id === questionId);
    const feedbackDiv = document.getElementById(`feedback-${questionId}`);
    const submitBtn = event.target;
    
    let userAnswer = null;
    let isCorrect = false;
    let detailedFeedback = '';
    
    if (question.type === 'multiple-choice' || question.type === 'true-false') {
        const selected = document.querySelector(`input[name="question-${questionId}"]:checked`);
        if (!selected) {
            alert('Please select an answer before submitting.');
            return;
        }
        userAnswer = parseInt(selected.value);
        isCorrect = userAnswer === question.correctAnswer;
    } else {
        const answerInput = document.getElementById(`answer-${questionId}`);
        userAnswer = answerInput.value.trim();
        
        if (!userAnswer) {
            alert('Please provide an answer before submitting.');
            return;
        }
        
        if (question.type === 'short-answer') {
            const answerLower = userAnswer.toLowerCase();
            const matchedKeywords = question.keywords.filter(keyword => 
                answerLower.includes(keyword.toLowerCase())
            );
            isCorrect = matchedKeywords.length >= Math.min(2, question.keywords.length * 0.5);
            
            if (!isCorrect && matchedKeywords.length > 0) {
                detailedFeedback = `<p><strong>Your answer included:</strong> ${matchedKeywords.join(', ')}. You're on the right track, but please review the complete explanation below.</p>`;
            }
        } else {
            const answerLower = userAnswer.toLowerCase();
            const matchedKeywords = question.keywords.filter(keyword => 
                answerLower.includes(keyword.toLowerCase())
            );
            const requiredMatches = Math.max(3, Math.ceil(question.keywords.length * 0.3));
            isCorrect = matchedKeywords.length >= requiredMatches;
            
            if (matchedKeywords.length > 0) {
                detailedFeedback = `<p><strong>Key concepts found in your answer:</strong> ${matchedKeywords.join(', ')} (${matchedKeywords.length}/${question.keywords.length} key concepts identified)</p>`;
                
                if (!isCorrect) {
                    detailedFeedback += `<p><em>For a comprehensive answer, try to include more of these concepts: ${question.keywords.slice(0, 5).join(', ')}, etc.</em></p>`;
                }
            } else {
                detailedFeedback = `<p><strong>Your answer needs improvement.</strong> A strong answer should discuss concepts like: ${question.keywords.slice(0, 8).join(', ')}, among others.</p>`;
            }
        }
    }
    
    userAnswers[questionId] = { answer: userAnswer, correct: isCorrect };
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitted';
    
    const inputs = document.querySelectorAll(`#question-${questionId} input, #question-${questionId} textarea`);
    inputs.forEach(input => input.disabled = true);
    
    feedbackDiv.innerHTML = `
        <div class="feedback ${isCorrect ? 'correct' : 'incorrect'}">
            <div class="feedback-header">
                ${isCorrect ? '✅ Correct!' : '❌ Incorrect'}
            </div>
            ${detailedFeedback ? `<div style="margin: 0.75rem 0;">${detailedFeedback}</div>` : ''}
            <div class="feedback-explanation">
                <strong>Explanation:</strong> ${question.explanation}
            </div>
            ${question.type === 'long-answer' || question.type === 'case-study' ? 
                `<p style="margin-top: 0.75rem;"><em>Note: Your written response has been evaluated based on key cybersecurity concepts. Review the explanation above to ensure you've covered all important points.</em></p>` : ''}
        </div>
    `;
    
    feedbackDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    checkQuizCompletion();
}

function checkQuizCompletion() {
    const totalQuestions = quizQuestions.length;
    const answeredQuestions = Object.keys(userAnswers).length;
    
    if (answeredQuestions === totalQuestions) {
        setTimeout(() => {
            showQuizResults();
        }, 1000);
    }
}

function showQuizResults() {
    const container = document.getElementById('quiz-container');
    const resultsDiv = document.getElementById('quiz-results');
    const scoreDisplay = document.getElementById('score-display');
    const answersReview = document.getElementById('answers-review');
    
    container.classList.add('hidden');
    
    const totalQuestions = quizQuestions.length;
    const correctAnswers = Object.values(userAnswers).filter(a => a.correct).length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    let scoreMessage = '';
    if (percentage >= 90) {
        scoreMessage = '🏆 Outstanding! You have excellent cybersecurity knowledge!';
        unlockAchievement('quiz-master');
    } else if (percentage >= 80) {
        scoreMessage = '🌟 Great job! You have a strong understanding of cybersecurity.';
        unlockAchievement('quiz-master');
    } else if (percentage >= 70) {
        scoreMessage = '👍 Good work! Review the explanations to strengthen your knowledge.';
    } else if (percentage >= 60) {
        scoreMessage = '📚 Fair effort. Consider reviewing the learning modules for better understanding.';
    } else {
        scoreMessage = '📖 We recommend reviewing the learning modules and retaking the quiz.';
    }
    
    scoreDisplay.innerHTML = `
        <div class="score-value">${percentage}%</div>
        <div class="score-message">${correctAnswers} out of ${totalQuestions} questions correct</div>
        <div class="score-message">${scoreMessage}</div>
    `;
    
    let reviewHTML = '<h3>Review Your Answers</h3>';
    quizQuestions.forEach((question, index) => {
        const userAnswer = userAnswers[question.id];
        const isCorrect = userAnswer && userAnswer.correct;
        
        reviewHTML += `
            <div class="review-item ${isCorrect ? 'correct' : 'incorrect'}">
                <strong>Question ${index + 1}:</strong> ${question.question.substring(0, 100)}...
                <br>
                <span style="color: ${isCorrect ? 'var(--success)' : 'var(--error)'}">
                    ${isCorrect ? '✅ Correct' : '❌ Incorrect'}
                </span>
            </div>
        `;
    });
    
    answersReview.innerHTML = reviewHTML;
    resultsDiv.classList.remove('hidden');
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
    
    saveProgress('quiz', percentage);
}

function resetQuiz() {
    const container = document.getElementById('quiz-container');
    container.classList.remove('hidden');
    initializeQuiz();
    window.scrollTo(0, 0);
}

function startSimulation(type) {
    const simulationContainer = document.getElementById('simulation-container');
    simulationContainer.classList.remove('hidden');
    simulationContainer.scrollIntoView({ behavior: 'smooth' });
    
    if (type === 'phishing') {
        startPhishingSimulation();
    } else if (type === 'incident') {
        startIncidentSimulation();
    }
}

const phishingEmails = [
    {
        id: 1,
        from: "security@paypa1-secure.com",
        subject: "URGENT: Your PayPal Account Has Been Suspended",
        body: "Dear Valued Customer,\n\nWe have detected unusual activity on your PayPal account. For your security, we have temporarily suspended your account.\n\nTo restore access immediately, please click the link below and verify your identity:\n\nhttp://paypal-verify-account.tk/restore\n\nFailure to verify within 24 hours will result in permanent account closure.\n\nBest regards,\nPayPal Security Team",
        isPhishing: true,
        indicators: [
            "Sender email uses '1' instead of 'l' (paypa1 instead of paypal)",
            "Generic greeting 'Dear Valued Customer' instead of your name",
            "Creates false urgency and fear",
            "Suspicious URL (.tk domain, not paypal.com)",
            "Threatens account closure to pressure immediate action"
        ]
    },
    {
        id: 2,
        from: "it-support@yourcompany.com.au",
        subject: "Monthly IT Security Update",
        body: "Hi Team,\n\nThis is a reminder that our monthly security patches will be applied this Friday at 6 PM AEST. Services may be briefly interrupted for 15-30 minutes.\n\nNo action is required from you. If you experience any issues after the update, please contact IT Support at extension 2400.\n\nThank you for your cooperation.\n\nBest regards,\nIT Support Team",
        isPhishing: false,
        indicators: [
            "Legitimate company email domain",
            "Reasonable content about routine IT maintenance",
            "No suspicious links or requests for credentials",
            "Professional tone without urgency or threats",
            "Provides clear contact information for follow-up"
        ]
    },
    {
        id: 3,
        from: "noreply@bankwest-secure.net",
        subject: "Confirm Your Identity - Action Required",
        body: "Dear Customer,\n\nAs part of our enhanced security measures, we need you to confirm your identity.\n\nPlease download and complete the attached form with your:\n- Full name and date of birth\n- Account number and BSB\n- Recent transaction details\n- Online banking password\n\nAttachment: identity_verification.doc.exe\n\nReturn the completed form within 48 hours to avoid account restrictions.\n\nRegards,\nBankwest Security",
        isPhishing: true,
        indicators: [
            "Requests sensitive information including PASSWORD (banks NEVER ask for passwords)",
            "Suspicious attachment (.exe file disguised as a document)",
            "Domain is .net, not the official bank website",
            "Creates urgency with 48-hour deadline",
            "Asks for excessive personal information via email"
        ]
    },
    {
        id: 4,
        from: "sarah.mitchell@clientcompany.com.au",
        subject: "Re: Project Timeline Discussion",
        body: "Hi,\n\nThanks for sending through the updated project timeline. I've reviewed it with our team and everything looks good.\n\nJust one question - can we move the Phase 2 delivery date forward by one week? Our stakeholders are keen to see the results earlier.\n\nLet me know if that's feasible.\n\nCheers,\nSarah Mitchell\nProject Manager\nClient Company Pty Ltd",
        isPhishing: false,
        indicators: [
            "Legitimate business communication",
            "Contextual reference to ongoing project",
            "Professional company email domain",
            "No requests for sensitive information",
            "No suspicious links or attachments",
            "Natural business conversation tone"
        ]
    },
    {
        id: 5,
        from: "microsoft-security@outlook-verify.com",
        subject: "Microsoft Account Security Alert",
        body: "Microsoft Account Security Alert\n\nWe detected a sign-in attempt from:\nLocation: Russia\nDevice: Unknown Windows PC\nTime: 2:47 AM AEST\n\nIf this was you, please ignore this email.\n\nIf this wasn't you, IMMEDIATELY secure your account:\nhttps://microsoft-verify-secure.com/account/recover\n\nThis link expires in 6 hours.\n\nMicrosoft Account Team",
        isPhishing: true,
        indicators: [
            "Sender domain is not microsoft.com",
            "Creates panic with foreign login attempt",
            "Suspicious URL (not official Microsoft domain)",
            "Very short time pressure (6 hours)",
            "Legitimate security alerts would come from verified Microsoft domains",
            "Professional companies don't use urgent tactics like this"
        ]
    }
];

let currentPhishingIndex = 0;
let phishingScore = 0;

function startPhishingSimulation() {
    currentPhishingIndex = 0;
    phishingScore = 0;
    showPhishingEmail();
}

function showPhishingEmail() {
    const email = phishingEmails[currentPhishingIndex];
    const container = document.getElementById('simulation-container');
    
    const progressDots = phishingEmails.map((_, index) => {
        let dotClass = 'progress-dot';
        if (index < currentPhishingIndex) dotClass += ' completed';
        if (index === currentPhishingIndex) dotClass += ' active';
        return `<div class="${dotClass}"></div>`;
    }).join('');
    
    container.innerHTML = `
        <div class="simulation-screen">
            <div class="simulation-header">
                <h3>🎯 Phishing Detection Simulation</h3>
                <p>Analyze this email and determine if it's legitimate or a phishing attempt.</p>
            </div>
            
            <div class="simulation-progress">${progressDots}</div>
            
            <div class="email-preview">
                <div class="email-header">
                    <div class="email-field"><strong>From:</strong> ${email.from}</div>
                    <div class="email-field"><strong>Subject:</strong> ${email.subject}</div>
                </div>
                <div class="email-body">${email.body.replace(/\n/g, '<br>')}</div>
            </div>
            
            <div class="choice-buttons">
                <button class="choice-btn" onclick="evaluatePhishing(true)">🚨 This is Phishing</button>
                <button class="choice-btn" onclick="evaluatePhishing(false)">✅ This is Legitimate</button>
            </div>
            
            <div id="phishing-feedback"></div>
        </div>
    `;
}

function evaluatePhishing(userSaysPhishing) {
    const email = phishingEmails[currentPhishingIndex];
    const isCorrect = userSaysPhishing === email.isPhishing;
    
    if (isCorrect) {
        phishingScore++;
    }
    
    const feedbackDiv = document.getElementById('phishing-feedback');
    const indicatorsList = email.indicators.map(ind => `<li>${ind}</li>`).join('');
    
    feedbackDiv.innerHTML = `
        <div class="simulation-feedback ${isCorrect ? 'correct' : 'incorrect'}">
            <h4>${isCorrect ? '✅ Correct!' : '❌ Incorrect'}</h4>
            <p><strong>This email is: ${email.isPhishing ? 'PHISHING' : 'LEGITIMATE'}</strong></p>
            
            <h4>${email.isPhishing ? 'Phishing Indicators:' : 'Why This is Legitimate:'}</h4>
            <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
                ${indicatorsList}
            </ul>
            
            <p style="margin-top: 1rem;">
                <strong>Remember:</strong> ${email.isPhishing ? 
                    'Always verify unexpected emails by contacting the organization directly through official channels. Never click suspicious links or download unexpected attachments.' :
                    'Legitimate business emails typically have proper domains, professional tone, and don\'t request sensitive information or create false urgency.'}
            </p>
            
            <button class="btn btn-primary" onclick="nextPhishingEmail()" style="margin-top: 1rem;">
                ${currentPhishingIndex < phishingEmails.length - 1 ? 'Next Email →' : 'View Results'}
            </button>
        </div>
    `;
    
    feedbackDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function nextPhishingEmail() {
    currentPhishingIndex++;
    
    if (currentPhishingIndex < phishingEmails.length) {
        showPhishingEmail();
    } else {
        showPhishingResults();
    }
}

function showPhishingResults() {
    const container = document.getElementById('simulation-container');
    const percentage = Math.round((phishingScore / phishingEmails.length) * 100);
    
    let message = '';
    if (percentage === 100) {
        message = '🏆 Perfect! You have excellent phishing detection skills!';
    } else if (percentage >= 80) {
        message = '🌟 Great work! You can identify most phishing attempts.';
    } else if (percentage >= 60) {
        message = '👍 Good effort! Review the indicators to improve your detection skills.';
    } else {
        message = '📚 Consider reviewing the learning modules on phishing to improve your skills.';
    }
    
    container.innerHTML = `
        <div class="simulation-screen">
            <div class="simulation-header">
                <h3>🎯 Phishing Simulation Complete!</h3>
            </div>
            
            <div style="text-align: center; padding: 2rem;">
                <div class="score-value">${percentage}%</div>
                <div class="score-message">
                    ${phishingScore} out of ${phishingEmails.length} emails correctly identified
                </div>
                <div class="score-message">${message}</div>
                
                <div style="margin-top: 2rem;">
                    <button class="btn btn-primary" onclick="startPhishingSimulation()">Retry Simulation</button>
                    <button class="btn btn-secondary" onclick="navigateTo('simulations')">Back to Simulations</button>
                </div>
            </div>
        </div>
    `;
    
    simulationProgress.phishing = { completed: true, score: percentage };
    saveProgress('simulation-phishing', percentage);
    unlockAchievement('phishing-detector');
    checkAllComplete();
}

const incidentScenario = {
    intro: {
        title: "Data Breach Response Simulation",
        description: `
            <div class="scenario-box">
                <h4>🚨 SCENARIO: Australian Healthcare Data Breach</h4>
                <p><strong>Date:</strong> Monday, 9:00 AM</p>
                <p><strong>Your Role:</strong> IT Security Manager at HealthPlus, a Melbourne-based healthcare provider with 500,000 patient records</p>
                <p><strong>Situation:</strong> Your overnight security monitoring system has triggered multiple high-priority alerts. Initial investigation reveals:</p>
                <ul>
                    <li>Unusual data exfiltration activity detected between 2 AM - 4 AM</li>
                    <li>Approximately 15GB of data transferred to unknown external IP addresses</li>
                    <li>Evidence of ransomware deployment on file servers</li>
                    <li>Patient database accessed with compromised admin credentials</li>
                    <li>Encrypted files with ransom note demanding $500,000 in cryptocurrency</li>
                </ul>
                <p><strong>At Risk:</strong> Patient names, addresses, dates of birth, Medicare numbers, medical history, and diagnoses</p>
                <p>This scenario is based on real incidents like the 2022 Medibank breach. Your decisions will determine the outcome.</p>
            </div>
        `
    },
    stages: [
        {
            question: "IMMEDIATE RESPONSE (First 30 minutes): What are your first actions?",
            description: "Select ALL actions you should take immediately:",
            multiSelect: true,
            options: [
                { text: "Isolate affected systems from the network to prevent further spread", correct: true },
                { text: "Pay the ransom immediately to get files back", correct: false },
                { text: "Activate the incident response team", correct: true },
                { text: "Delete all logs to start fresh", correct: false },
                { text: "Preserve evidence for forensic investigation", correct: true },
                { text: "Notify the CEO and board immediately", correct: true },
                { text: "Post on social media explaining what happened", correct: false },
                { text: "Contact cybersecurity experts and forensic investigators", correct: true }
            ],
            feedback: {
                correct: "✅ Excellent! You've prioritized containment, evidence preservation, and proper escalation. These immediate actions are critical in the first 30 minutes of an incident.",
                incorrect: "⚠️ Review your choices. NEVER pay ransoms (it doesn't guarantee data recovery and funds criminals), preserve evidence (don't delete logs), and avoid public communications before proper assessment."
            }
        },
        {
            question: "LEGAL OBLIGATIONS: Under Australian law, what are your mandatory requirements?",
            description: "Select the MOST CRITICAL legal obligation:",
            multiSelect: false,
            options: [
                { text: "Wait 30 days to assess if the breach is serious before reporting", correct: false },
                { text: "Notify OAIC and affected individuals as soon as practicable if serious harm is likely", correct: true },
                { text: "Only notify individuals if they specifically request information", correct: false },
                { text: "Keep the breach confidential to protect company reputation", correct: false }
            ],
            feedback: {
                correct: "✅ Correct! Under the Notifiable Data Breaches (NDB) scheme, you must notify the OAIC and affected individuals as soon as practicable when a breach is likely to result in serious harm. With Medicare numbers and health data compromised, this clearly meets the threshold.",
                incorrect: "❌ This is a serious legal violation. The NDB scheme requires immediate notification when serious harm is likely. Medical data is highly sensitive - this breach clearly requires notification. Delays or covering up breaches can result in severe penalties and loss of trust."
            }
        },
        {
            question: "COMMUNICATION STRATEGY: How should you communicate with affected patients?",
            description: "What information MUST be included in your notification?",
            multiSelect: true,
            options: [
                { text: "Description of the breach and what happened", correct: true },
                { text: "Types of information that were compromised", correct: true },
                { text: "Names of the attackers and technical details of the exploit", correct: false },
                { text: "Steps individuals should take to protect themselves", correct: true },
                { text: "Contact information for questions and support", correct: true },
                { text: "Blame employees for clicking phishing emails", correct: false },
                { text: "Promise this will never happen again", correct: false }
            ],
            feedback: {
                correct: "✅ Excellent communication approach! Transparency, practical guidance, and support are essential. Under the NDB scheme, you must explain what happened, what data was affected, and what people should do.",
                incorrect: "⚠️ Avoid technical jargon that won't help victims, don't assign blame publicly, and don't make promises you can't guarantee. Focus on clear, helpful information."
            }
        },
        {
            question: "VICTIM SUPPORT: What should you offer to affected patients?",
            description: "Select ALL appropriate support measures:",
            multiSelect: true,
            options: [
                { text: "Free credit monitoring and identity protection services", correct: true },
                { text: "Dedicated hotline for questions and concerns", correct: true },
                { text: "$100 gift card to apologize", correct: false },
                { text: "Guidance on monitoring medical records for fraud", correct: true },
                { text: "Regular updates on the investigation progress", correct: true },
                { text: "Tell them there's nothing to worry about", correct: false }
            ],
            feedback: {
                correct: "✅ Comprehensive victim support! These measures show you take the breach seriously and are committed to helping affected individuals protect themselves.",
                incorrect: "⚠️ Don't minimize the severity or offer token gestures. Provide practical, ongoing support that addresses real risks like identity theft and medical fraud."
            }
        },
        {
            question: "LONG-TERM PREVENTION: What measures will you implement to prevent future incidents?",
            description: "Select ALL critical security improvements:",
            multiSelect: true,
            options: [
                { text: "Implement multi-factor authentication (MFA) on all systems", correct: true },
                { text: "Regular security awareness training for all staff", correct: true },
                { text: "Network segmentation to limit lateral movement", correct: true },
                { text: "Fire the IT department", correct: false },
                { text: "Regular vulnerability scanning and penetration testing", correct: true },
                { text: "Enhanced logging and monitoring with 24/7 SOC", correct: true },
                { text: "Regular backup testing and disaster recovery drills", correct: true },
                { text: "Stop using computers altogether", correct: false }
            ],
            feedback: {
                correct: "✅ Comprehensive security strategy! These measures implement 'defense in depth' - multiple layers of security so if one fails, others protect you. This is exactly the approach needed after an incident.",
                incorrect: "⚠️ Avoid knee-jerk reactions like firing staff or abandoning technology. Focus on systematic improvements: technical controls (MFA, segmentation), processes (monitoring, testing), and people (training)."
            }
        }
    ]
};

let currentIncidentStage = -1;
let incidentAnswers = [];

function startIncidentSimulation() {
    currentIncidentStage = -1;
    incidentAnswers = [];
    showIncidentIntro();
}

function showIncidentIntro() {
    const container = document.getElementById('simulation-container');
    
    container.innerHTML = `
        <div class="simulation-screen">
            <div class="simulation-header">
                <h3>${incidentScenario.intro.title}</h3>
            </div>
            
            ${incidentScenario.intro.description}
            
            <div style="text-align: center; margin-top: 2rem;">
                <button class="btn btn-primary" onclick="nextIncidentStage()">Begin Response →</button>
            </div>
        </div>
    `;
}

function nextIncidentStage() {
    currentIncidentStage++;
    
    if (currentIncidentStage < incidentScenario.stages.length) {
        showIncidentStage();
    } else {
        showIncidentResults();
    }
}

function showIncidentStage() {
    const stage = incidentScenario.stages[currentIncidentStage];
    const container = document.getElementById('simulation-container');
    
    const progressDots = incidentScenario.stages.map((_, index) => {
        let dotClass = 'progress-dot';
        if (index < currentIncidentStage) dotClass += ' completed';
        if (index === currentIncidentStage) dotClass += ' active';
        return `<div class="${dotClass}"></div>`;
    }).join('');
    
    const optionsHTML = stage.options.map((option, index) => {
        const inputType = stage.multiSelect ? 'checkbox' : 'radio';
        return `
            <label class="action-item">
                <input type="${inputType}" name="stage-${currentIncidentStage}" value="${index}">
                <span>${option.text}</span>
            </label>
        `;
    }).join('');
    
    container.innerHTML = `
        <div class="simulation-screen">
            <div class="simulation-header">
                <h3>🚨 Data Breach Response</h3>
                <p>Stage ${currentIncidentStage + 1} of ${incidentScenario.stages.length}</p>
            </div>
            
            <div class="simulation-progress">${progressDots}</div>
            
            <h4>${stage.question}</h4>
            <p>${stage.description}</p>
            
            <div class="action-list">
                ${optionsHTML}
            </div>
            
            <button class="btn btn-primary" onclick="evaluateIncidentStage()" style="margin-top: 1.5rem;">
                Submit Response
            </button>
            
            <div id="incident-feedback"></div>
        </div>
    `;
}

function evaluateIncidentStage() {
    const stage = incidentScenario.stages[currentIncidentStage];
    const selected = Array.from(document.querySelectorAll(`input[name="stage-${currentIncidentStage}"]:checked`))
        .map(input => parseInt(input.value));
    
    if (selected.length === 0) {
        alert('Please make at least one selection before submitting.');
        return;
    }
    
    let isCorrect = false;
    
    if (stage.multiSelect) {
        const correctIndices = stage.options
            .map((opt, idx) => opt.correct ? idx : -1)
            .filter(idx => idx !== -1);
        
        const selectedCorrect = selected.filter(idx => stage.options[idx].correct).length;
        const selectedIncorrect = selected.filter(idx => !stage.options[idx].correct).length;
        
        isCorrect = selectedCorrect >= correctIndices.length * 0.7 && selectedIncorrect === 0;
        
        incidentAnswers.push({
            stage: currentIncidentStage,
            selected,
            correct: isCorrect,
            possibleScore: correctIndices.length,
            actualScore: selectedCorrect - selectedIncorrect
        });
    } else {
        isCorrect = stage.options[selected[0]].correct;
        incidentAnswers.push({
            stage: currentIncidentStage,
            selected: selected[0],
            correct: isCorrect
        });
    }
    
    const feedbackDiv = document.getElementById('incident-feedback');
    
    let detailedFeedback = '';
    if (stage.multiSelect) {
        const correctChoices = stage.options
            .map((opt, idx) => opt.correct ? `<li>✅ ${opt.text}</li>` : '')
            .filter(item => item !== '')
            .join('');
        
        const incorrectChoices = selected
            .filter(idx => !stage.options[idx].correct)
            .map(idx => `<li>❌ ${stage.options[idx].text}</li>`)
            .join('');
        
        if (incorrectChoices) {
            detailedFeedback = `
                <h4 style="margin-top: 1rem;">Correct Actions:</h4>
                <ul style="margin-left: 1.5rem;">${correctChoices}</ul>
                <h4 style="margin-top: 1rem;">You selected these incorrect actions:</h4>
                <ul style="margin-left: 1.5rem;">${incorrectChoices}</ul>
            `;
        }
    }
    
    feedbackDiv.innerHTML = `
        <div class="simulation-feedback ${isCorrect ? 'correct' : 'incorrect'}">
            <h4>${isCorrect ? stage.feedback.correct : stage.feedback.incorrect}</h4>
            ${detailedFeedback}
            <button class="btn btn-primary" onclick="nextIncidentStage()" style="margin-top: 1rem;">
                ${currentIncidentStage < incidentScenario.stages.length - 1 ? 'Continue →' : 'View Results'}
            </button>
        </div>
    `;
    
    feedbackDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    const inputs = document.querySelectorAll(`input[name="stage-${currentIncidentStage}"]`);
    inputs.forEach(input => input.disabled = true);
    
    event.target.disabled = true;
}

function showIncidentResults() {
    const container = document.getElementById('simulation-container');
    
    let totalScore = 0;
    let maxScore = 0;
    
    incidentAnswers.forEach(answer => {
        if (answer.correct) {
            totalScore++;
        }
        maxScore++;
    });
    
    const percentage = Math.round((totalScore / maxScore) * 100);
    
    let message = '';
    if (percentage === 100) {
        message = '🏆 Outstanding! You handled this incident perfectly. You understand the legal, technical, and communication aspects of incident response.';
    } else if (percentage >= 80) {
        message = '🌟 Excellent work! You made strong decisions that would effectively manage this serious incident.';
    } else if (percentage >= 60) {
        message = '👍 Good effort! Review the feedback to understand best practices in incident response, especially around legal obligations and victim support.';
    } else {
        message = '📚 This is a complex scenario. Review the learning modules on incident response and Australian privacy law, then retry the simulation.';
    }
    
    container.innerHTML = `
        <div class="simulation-screen">
            <div class="simulation-header">
                <h3>🚨 Incident Response Simulation Complete!</h3>
            </div>
            
            <div style="text-align: center; padding: 2rem;">
                <div class="score-value">${percentage}%</div>
                <div class="score-message">
                    ${totalScore} out of ${maxScore} stages handled correctly
                </div>
                <div class="score-message">${message}</div>
                
                <div class="callout" style="margin-top: 2rem; text-align: left;">
                    <h4>Key Takeaways from This Simulation:</h4>
                    <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
                        <li><strong>Speed Matters:</strong> Immediate containment and evidence preservation are critical in the first 30 minutes</li>
                        <li><strong>Legal Compliance:</strong> Australia's NDB scheme requires prompt notification when serious harm is likely</li>
                        <li><strong>Never Pay Ransoms:</strong> Payment doesn't guarantee data recovery and funds criminal operations</li>
                        <li><strong>Transparent Communication:</strong> Clear, honest communication with victims builds trust and helps them protect themselves</li>
                        <li><strong>Defense in Depth:</strong> Multiple layers of security (technical, process, people) prevent and mitigate incidents</li>
                        <li><strong>Preparation is Key:</strong> Incident response plans, regular testing, and trained teams make all the difference</li>
                    </ul>
                </div>
                
                <div style="margin-top: 2rem;">
                    <button class="btn btn-primary" onclick="startIncidentSimulation()">Retry Simulation</button>
                    <button class="btn btn-secondary" onclick="navigateTo('simulations')">Back to Simulations</button>
                </div>
            </div>
        </div>
    `;
    
    simulationProgress.incident = { completed: true, score: percentage };
    saveProgress('simulation-incident', percentage);
    unlockAchievement('incident-responder');
    checkAllComplete();
}

function updateProgress() {
    const modulesProgress = localStorage.getItem('modules-viewed') === 'true' ? 100 : 0;
    const quizData = JSON.parse(localStorage.getItem('quiz-score') || '0');
    const quizProgress = quizData > 0 ? 100 : 0;
    
    const phishingComplete = simulationProgress.phishing.completed;
    const incidentComplete = simulationProgress.incident.completed;
    const simulationsComplete = (phishingComplete ? 50 : 0) + (incidentComplete ? 50 : 0);
    
    document.getElementById('modules-progress').style.width = `${modulesProgress}%`;
    document.getElementById('modules-text').textContent = modulesProgress === 100 ? 'Completed' : 'Not started';
    
    document.getElementById('quiz-progress').style.width = `${quizProgress}%`;
    document.getElementById('quiz-text').textContent = quizProgress === 100 ? `Completed (${quizData}%)` : 'Not completed';
    
    document.getElementById('simulations-progress').style.width = `${simulationsComplete}%`;
    const simCount = (phishingComplete ? 1 : 0) + (incidentComplete ? 1 : 0);
    document.getElementById('simulations-text').textContent = `${simCount}/2 completed`;
}

function markModulesAsViewed() {
    localStorage.setItem('modules-viewed', 'true');
}

function saveProgress(type, score) {
    if (type === 'quiz') {
        localStorage.setItem('quiz-score', score);
    } else if (type === 'simulation-phishing') {
        localStorage.setItem('phishing-score', score);
    } else if (type === 'simulation-incident') {
        localStorage.setItem('incident-score', score);
    }
}

function loadProgress() {
    const phishingScore = localStorage.getItem('phishing-score');
    const incidentScore = localStorage.getItem('incident-score');
    
    if (phishingScore) {
        simulationProgress.phishing = { completed: true, score: parseInt(phishingScore) };
        unlockAchievement('phishing-detector');
    }
    
    if (incidentScore) {
        simulationProgress.incident = { completed: true, score: parseInt(incidentScore) };
        unlockAchievement('incident-responder');
    }
    
    const quizScore = localStorage.getItem('quiz-score');
    if (quizScore && parseInt(quizScore) >= 80) {
        unlockAchievement('quiz-master');
    }
    
    checkAllComplete();
}

function unlockAchievement(achievementId) {
    const achievements = document.querySelectorAll('.achievement');
    
    const achievementMap = {
        'quiz-master': 0,
        'phishing-detector': 1,
        'incident-responder': 2,
        'security-champion': 3
    };
    
    const index = achievementMap[achievementId];
    if (index !== undefined && achievements[index]) {
        achievements[index].classList.remove('locked');
        achievements[index].classList.add('unlocked');
        localStorage.setItem(`achievement-${achievementId}`, 'true');
    }
}

function checkAllComplete() {
    const quizComplete = localStorage.getItem('quiz-score');
    const phishingComplete = localStorage.getItem('phishing-score');
    const incidentComplete = localStorage.getItem('incident-score');
    const modulesViewed = localStorage.getItem('modules-viewed');
    
    if (quizComplete && phishingComplete && incidentComplete && modulesViewed) {
        unlockAchievement('security-champion');
    }
}
