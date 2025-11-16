// Array containing all quiz questions with their details
// Each question has type, options, correct answer, and explanation
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
        correctAnswer: 2, // Index of correct option
        explanation: "Security experts recommend passwords be at least 12-16 characters long. Longer passwords are exponentially harder to crack through brute force attacks. A 12-character password with mixed characters has trillions of possible combinations, making it significantly more secure than shorter passwords."
    },
    // More questions would be defined here...
    // This is just the first question as an example
];

// Global variables to track quiz state
let currentQuestionIndex = 0; // Which question we're currently on
let userAnswers = []; // Store user's answers for each question
let simulationProgress = { // Track completion status of simulations
    phishing: { completed: false, score: 0 },
    incident: { completed: false, score: 0 }
};

// Function to navigate between different sections of the application
function navigateTo(sectionId) {
    // First, hide all sections by removing 'active' class
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active styling from all navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show the requested section by adding 'active' class
    document.getElementById(sectionId).classList.add('active');
    
    // Highlight the corresponding navigation link
    const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Perform section-specific initialization
    if (sectionId === 'quiz') {
        initializeQuiz(); // Set up quiz if navigating to quiz section
    } else if (sectionId === 'progress') {
        updateProgress(); // Update progress bars if navigating to progress section
    } else if (sectionId === 'learning') {
        markModulesAsViewed(); // Mark modules as read when user visits learning section
    }
    
    // Scroll to top of page for better user experience
    window.scrollTo(0, 0);
}

// Set up event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add click event listeners to all navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor link behavior
            const targetId = link.getAttribute('href').substring(1); // Get section ID from href
            navigateTo(targetId); // Navigate to the target section
        });
    });
    
    // Load any previously saved progress from localStorage
    loadProgress();
});

// Initialize the quiz by resetting state and rendering questions
function initializeQuiz() {
    currentQuestionIndex = 0; // Start from first question
    userAnswers = []; // Clear previous answers
    document.getElementById('quiz-results').classList.add('hidden'); // Hide results
    renderQuiz(); // Display all quiz questions
}

// Render all quiz questions to the page
function renderQuiz() {
    const container = document.getElementById('quiz-container');
    container.innerHTML = ''; // Clear any existing content
    
    // Loop through each question and create HTML for it
    quizQuestions.forEach((question, index) => {
        const questionCard = document.createElement('div');
        questionCard.className = 'question-card';
        questionCard.id = `question-${question.id}`;
        
        let optionsHTML = ''; // Will hold HTML for answer options
        
        // Generate different HTML based on question type
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
            // Text input for short answer questions
            optionsHTML = `<input type="text" class="text-input" id="answer-${question.id}" placeholder="Enter your answer here...">`;
        } else if (question.type === 'long-answer' || question.type === 'case-study') {
            // Textarea for longer, detailed answers
            optionsHTML = `<textarea class="textarea-input" id="answer-${question.id}" placeholder="Enter your detailed answer here..."></textarea>`;
        }
        
        // Build the complete question card HTML
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
        
        // Add the question card to the container
        container.appendChild(questionCard);
    });
}

// Handle when user submits an answer to a question
function submitAnswer(questionId) {
    const question = quizQuestions.find(q => q.id === questionId);
    const feedbackDiv = document.getElementById(`feedback-${questionId}`);
    const submitBtn = event.target; // The button that was clicked
    
    let userAnswer = null;
    let isCorrect = false;
    let detailedFeedback = '';
    
    // Process answer based on question type
    if (question.type === 'multiple-choice' || question.type === 'true-false') {
        // For multiple choice, get the selected radio button
        const selected = document.querySelector(`input[name="question-${questionId}"]:checked`);
        if (!selected) {
            alert('Please select an answer before submitting.');
            return; // Exit if no answer selected
        }
        userAnswer = parseInt(selected.value);
        isCorrect = userAnswer === question.correctAnswer;
    } else {
        // For text-based answers, get the input value
        const answerInput = document.getElementById(`answer-${questionId}`);
        userAnswer = answerInput.value.trim();
        
        if (!userAnswer) {
            alert('Please provide an answer before submitting.');
            return; // Exit if answer is empty
        }
        
        // For short answers, check if they included enough keywords
        if (question.type === 'short-answer') {
            const answerLower = userAnswer.toLowerCase();
            const matchedKeywords = question.keywords.filter(keyword => 
                answerLower.includes(keyword.toLowerCase())
            );
            // Consider correct if they match at least 2 keywords or 50% of keywords
            isCorrect = matchedKeywords.length >= Math.min(2, question.keywords.length * 0.5);
            
            // Provide feedback on what they got right
            if (!isCorrect && matchedKeywords.length > 0) {
                detailedFeedback = `<p><strong>Your answer included:</strong> ${matchedKeywords.join(', ')}. You're on the right track, but please review the complete explanation below.</p>`;
            }
        } else {
            // For long answers, require more keyword matches
            const answerLower = userAnswer.toLowerCase();
            const matchedKeywords = question.keywords.filter(keyword => 
                answerLower.includes(keyword.toLowerCase())
            );
            // Require at least 3 matches or 30% of keywords
            const requiredMatches = Math.max(3, Math.ceil(question.keywords.length * 0.3));
            isCorrect = matchedKeywords.length >= requiredMatches;
            
            // Provide detailed feedback on keyword matches
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
    
    // Store the user's answer and whether it was correct
    userAnswers[questionId] = { answer: userAnswer, correct: isCorrect };
    
    // Disable the submit button to prevent resubmission
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitted';
    
    // Disable all inputs for this question so answer can't be changed
    const inputs = document.querySelectorAll(`#question-${questionId} input, #question-${questionId} textarea`);
    inputs.forEach(input => input.disabled = true);
    
    // Display feedback to the user
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
    
    // Smoothly scroll to show the feedback
    feedbackDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Check if all questions have been answered
    checkQuizCompletion();
}

// Check if the user has answered all questions in the quiz
function checkQuizCompletion() {
    const totalQuestions = quizQuestions.length;
    const answeredQuestions = Object.keys(userAnswers).length;
    
    // If all questions answered, show results after a brief delay
    if (answeredQuestions === totalQuestions) {
        setTimeout(() => {
            showQuizResults();
        }, 1000);
    }
}

// Display the final quiz results to the user
function showQuizResults() {
    const container = document.getElementById('quiz-container');
    const resultsDiv = document.getElementById('quiz-results');
    const scoreDisplay = document.getElementById('score-display');
    const answersReview = document.getElementById('answers-review');
    
    // Hide the quiz questions and show results
    container.classList.add('hidden');
    
    // Calculate score and percentage
    const totalQuestions = quizQuestions.length;
    const correctAnswers = Object.values(userAnswers).filter(a => a.correct).length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Determine appropriate message based on score
    let scoreMessage = '';
    if (percentage >= 90) {
        scoreMessage = '🏆 Outstanding! You have excellent cybersecurity knowledge!';
        unlockAchievement('quiz-master'); // Unlock achievement for high score
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
    
    // Display the score and message
    scoreDisplay.innerHTML = `
        <div class="score-value">${percentage}%</div>
        <div class="score-message">${correctAnswers} out of ${totalQuestions} questions correct</div>
        <div class="score-message">${scoreMessage}</div>
    `;
    
    // Create review section showing all questions and whether user was correct
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
    resultsDiv.classList.remove('hidden'); // Show results section
    resultsDiv.scrollIntoView({ behavior: 'smooth' }); // Scroll to results
    
    // Save the quiz score to track progress
    saveProgress('quiz', percentage);
}

// Reset the quiz to start over
function resetQuiz() {
    const container = document.getElementById('quiz-container');
    container.classList.remove('hidden'); // Show questions again
    initializeQuiz(); // Reinitialize quiz state
    window.scrollTo(0, 0); // Scroll to top
}

// Start a specific simulation based on type
function startSimulation(type) {
    const simulationContainer = document.getElementById('simulation-container');
    simulationContainer.classList.remove('hidden'); // Show simulation container
    simulationContainer.scrollIntoView({ behavior: 'smooth' }); // Scroll to it
    
    // Start the appropriate simulation based on type
    if (type === 'phishing') {
        startPhishingSimulation();
    } else if (type === 'incident') {
        startIncidentSimulation();
    }
}

// Array of emails for phishing simulation - mix of legitimate and phishing emails
const phishingEmails = [
    {
        id: 1,
        from: "security@paypa1-secure.com",
        subject: "URGENT: Your PayPal Account Has Been Suspended",
        body: "Dear Valued Customer,\n\nWe have detected unusual activity on your PayPal account. For your security, we have temporarily suspended your account.\n\nTo restore access immediately, please click the link below and verify your identity:\n\nhttp://paypal-verify-account.tk/restore\n\nFailure to verify within 24 hours will result in permanent account closure.\n\nBest regards,\nPayPal Security Team",
        isPhishing: true, // This is a phishing email
        indicators: [ // List of clues that this is phishing
            "Sender email uses '1' instead of 'l' (paypa1 instead of paypal)",
            "Generic greeting 'Dear Valued Customer' instead of your name",
            "Creates false urgency and fear",
            "Suspicious URL (.tk domain, not paypal.com)",
            "Threatens account closure to pressure immediate action"
        ]
    },
    // More email examples would be here...
];

// Track current position in phishing simulation and user's score
let currentPhishingIndex = 0;
let phishingScore = 0;

// Initialize and start the phishing simulation
function startPhishingSimulation() {
    currentPhishingIndex = 0; // Start from first email
    phishingScore = 0; // Reset score
    showPhishingEmail(); // Display first email
}

// Display the current phishing email for analysis
function showPhishingEmail() {
    const email = phishingEmails[currentPhishingIndex];
    const container = document.getElementById('simulation-container');
    
    // Create progress dots to show user's position in simulation
    const progressDots = phishingEmails.map((_, index) => {
        let dotClass = 'progress-dot';
        if (index < currentPhishingIndex) dotClass += ' completed'; // Completed emails
        if (index === currentPhishingIndex) dotClass += ' active'; // Current email
        return `<div class="${dotClass}"></div>`;
    }).join('');
    
    // Build the simulation screen HTML
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

// Evaluate user's decision about whether email is phishing
function evaluatePhishing(userSaysPhishing) {
    const email = phishingEmails[currentPhishingIndex];
    const isCorrect = userSaysPhishing === email.isPhishing; // Check if user is correct
    
    if (isCorrect) {
        phishingScore++; // Increment score for correct identification
    }
    
    const feedbackDiv = document.getElementById('phishing-feedback');
    const indicatorsList = email.indicators.map(ind => `<li>${ind}</li>`).join('');
    
    // Display feedback with explanation
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
    
    // Scroll to show the feedback
    feedbackDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Advance to next email or show final results
function nextPhishingEmail() {
    currentPhishingIndex++;
    
    if (currentPhishingIndex < phishingEmails.length) {
        showPhishingEmail(); // Show next email
    } else {
        showPhishingResults(); // Show final results when done
    }
}

// Display final results of phishing simulation
function showPhishingResults() {
    const container = document.getElementById('simulation-container');
    const percentage = Math.round((phishingScore / phishingEmails.length) * 100);
    
    // Determine appropriate message based on performance
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
    
    // Display results screen
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
    
    // Save progress and unlock achievement
    simulationProgress.phishing = { completed: true, score: percentage };
    saveProgress('simulation-phishing', percentage);
    unlockAchievement('phishing-detector');
    checkAllComplete(); // Check if all content is complete
}

// Data structure defining the incident response simulation scenario
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
        // Stages would be defined here with questions and options...
    ]
};

// Track current stage in incident simulation and user's answers
let currentIncidentStage = -1; // Start at -1 for intro screen
let incidentAnswers = [];

// Initialize and start the incident response simulation
function startIncidentSimulation() {
    currentIncidentStage = -1; // Reset to intro
    incidentAnswers = []; // Clear previous answers
    showIncidentIntro(); // Show introduction screen
}

// Display the introduction screen for incident simulation
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

// Advance to the next stage of the incident simulation
function nextIncidentStage() {
    currentIncidentStage++;
    
    if (currentIncidentStage < incidentScenario.stages.length) {
        showIncidentStage(); // Show next stage
    } else {
        showIncidentResults(); // Show results when all stages complete
    }
}

// Display the current stage of the incident simulation
function showIncidentStage() {
    const stage = incidentScenario.stages[currentIncidentStage];
    const container = document.getElementById('simulation-container');
    
    // Create progress dots to show user's position
    const progressDots = incidentScenario.stages.map((_, index) => {
        let dotClass = 'progress-dot';
        if (index < currentIncidentStage) dotClass += ' completed';
        if (index === currentIncidentStage) dotClass += ' active';
        return `<div class="${dotClass}"></div>`;
    }).join('');
    
    // Create HTML for the action options
    const optionsHTML = stage.options.map((option, index) => {
        const inputType = stage.multiSelect ? 'checkbox' : 'radio';
        return `
            <label class="action-item">
                <input type="${inputType}" name="stage-${currentIncidentStage}" value="${index}">
                <span>${option.text}</span>
            </label>
        `;
    }).join('');
    
    // Build the stage screen
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

// Evaluate user's choices in the current incident stage
function evaluateIncidentStage() {
    const stage = incidentScenario.stages[currentIncidentStage];
    // Get all selected options
    const selected = Array.from(document.querySelectorAll(`input[name="stage-${currentIncidentStage}"]:checked`))
        .map(input => parseInt(input.value));
    
    if (selected.length === 0) {
        alert('Please make at least one selection before submitting.');
        return;
    }
    
    let isCorrect = false;
    
    // Evaluate based on whether it's multi-select or single-select
    if (stage.multiSelect) {
        // For multi-select, find all correct options
        const correctIndices = stage.options
            .map((opt, idx) => opt.correct ? idx : -1)
            .filter(idx => idx !== -1);
        
        // Count correct and incorrect selections
        const selectedCorrect = selected.filter(idx => stage.options[idx].correct).length;
        const selectedIncorrect = selected.filter(idx => !stage.options[idx].correct).length;
        
        // Consider correct if they get most right and none wrong
        isCorrect = selectedCorrect >= correctIndices.length * 0.7 && selectedIncorrect === 0;
        
        // Store answer with detailed scoring
        incidentAnswers.push({
            stage: currentIncidentStage,
            selected,
            correct: isCorrect,
            possibleScore: correctIndices.length,
            actualScore: selectedCorrect - selectedIncorrect
        });
    } else {
        // For single-select, just check if selected option is correct
        isCorrect = stage.options[selected[0]].correct;
        incidentAnswers.push({
            stage: currentIncidentStage,
            selected: selected[0],
            correct: isCorrect
        });
    }
    
    const feedbackDiv = document.getElementById('incident-feedback');
    
    // Generate detailed feedback for multi-select questions
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
    
    // Display feedback
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
    
    // Disable inputs to prevent changes
    const inputs = document.querySelectorAll(`input[name="stage-${currentIncidentStage}"]`);
    inputs.forEach(input => input.disabled = true);
    
    event.target.disabled = true; // Disable submit button
}

// Display final results of incident simulation
function showIncidentResults() {
    const container = document.getElementById('simulation-container');
    
    // Calculate score
    let totalScore = 0;
    let maxScore = 0;
    
    incidentAnswers.forEach(answer => {
        if (answer.correct) {
            totalScore++;
        }
        maxScore++;
    });
    
    const percentage = Math.round((totalScore / maxScore) * 100);
    
    // Determine appropriate message
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
    
    // Display results
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
    
    // Save progress and unlock achievement
    simulationProgress.incident = { completed: true, score: percentage };
    saveProgress('simulation-incident', percentage);
    unlockAchievement('incident-responder');
    checkAllComplete();
}

// Update progress bars on the progress page
function updateProgress() {
    // Get completion status from localStorage
    const modulesProgress = localStorage.getItem('modules-viewed') === 'true' ? 100 : 0;
    const quizData = JSON.parse(localStorage.getItem('quiz-score') || '0');
    const quizProgress = quizData > 0 ? 100 : 0;
    
    // Calculate simulation progress
    const phishingComplete = simulationProgress.phishing.completed;
    const incidentComplete = simulationProgress.incident.completed;
    const simulationsComplete = (phishingComplete ? 50 : 0) + (incidentComplete ? 50 : 0);
    
    // Update progress bars and text
    document.getElementById('modules-progress').style.width = `${modulesProgress}%`;
    document.getElementById('modules-text').textContent = modulesProgress === 100 ? 'Completed' : 'Not started';
    
    document.getElementById('quiz-progress').style.width = `${quizProgress}%`;
    document.getElementById('quiz-text').textContent = quizProgress === 100 ? `Completed (${quizData}%)` : 'Not completed';
    
    document.getElementById('simulations-progress').style.width = `${simulationsComplete}%`;
    const simCount = (phishingComplete ? 1 : 0) + (incidentComplete ? 1 : 0);
    document.getElementById('simulations-text').textContent = `${simCount}/2 completed`;
}

// Mark learning modules as viewed when user visits that section
function markModulesAsViewed() {
    localStorage.setItem('modules-viewed', 'true');
}

// Save user progress to localStorage
function saveProgress(type, score) {
    if (type === 'quiz') {
        localStorage.setItem('quiz-score', score);
    } else if (type === 'simulation-phishing') {
        localStorage.setItem('phishing-score', score);
    } else if (type === 'simulation-incident') {
        localStorage.setItem('incident-score', score);
    }
}

// Load previously saved progress from localStorage
function loadProgress() {
    const phishingScore = localStorage.getItem('phishing-score');
    const incidentScore = localStorage.getItem('incident-score');
    
    // Restore simulation progress if previously saved
    if (phishingScore) {
        simulationProgress.phishing = { completed: true, score: parseInt(phishingScore) };
        unlockAchievement('phishing-detector');
    }
    
    if (incidentScore) {
        simulationProgress.incident = { completed: true, score: parseInt(incidentScore) };
        unlockAchievement('incident-responder');
    }
    
    // Unlock quiz achievement if previously earned
    const quizScore = localStorage.getItem('quiz-score');
    if (quizScore && parseInt(quizScore) >= 80) {
        unlockAchievement('quiz-master');
    }
    
    checkAllComplete(); // Check if all content completed
}

// Unlock an achievement by updating its visual state
function unlockAchievement(achievementId) {
    const achievements = document.querySelectorAll('.achievement');
    
    // Map achievement IDs to their index in the achievements grid
    const achievementMap = {
        'quiz-master': 0,
        'phishing-detector': 1,
        'incident-responder': 2,
        'security-champion': 3
    };
    
    const index = achievementMap[achievementId];
    if (index !== undefined && achievements[index]) {
        // Update visual state and save to localStorage
        achievements[index].classList.remove('locked');
        achievements[index].classList.add('unlocked');
        localStorage.setItem(`achievement-${achievementId}`, 'true');
    }
}

// Check if user has completed all content to unlock final achievement
function checkAllComplete() {
    const quizComplete = localStorage.getItem('quiz-score');
    const phishingComplete = localStorage.getItem('phishing-score');
    const incidentComplete = localStorage.getItem('incident-score');
    const modulesViewed = localStorage.getItem('modules-viewed');
    
    // If all components completed, unlock security champion achievement
    if (quizComplete && phishingComplete && incidentComplete && modulesViewed) {
        unlockAchievement('security-champion');
    }
}
