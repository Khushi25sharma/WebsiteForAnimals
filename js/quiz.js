const questions = [
    {
        id: 'time',
        question: 'How much time can you dedicate to a pet daily?',
        options: [
            { value: '2', text: 'Less than 2 hours' },
            { value: '4', text: '2-4 hours' },
            { value: '6', text: '4-6 hours' },
            { value: '8', text: 'More than 6 hours' }
        ]
    },
    {
        id: 'living',
        question: 'What\'s your living situation?',
        options: [
            { value: 'apartment', text: 'Apartment' },
            { value: 'house', text: 'House with yard' },
            { value: 'condo', text: 'Condo' }
        ]
    },
    {
        id: 'pets',
        question: 'Do you have any other pets?',
        options: [
            { value: 'none', text: 'No pets' },
            { value: 'dog', text: 'Dog(s)' },
            { value: 'cat', text: 'Cat(s)' },
            { value: 'both', text: 'Both dogs and cats' }
        ]
    },
    {
        id: 'activity',
        question: 'What\'s your activity level?',
        options: [
            { value: 'low', text: 'Low - Prefer relaxing activities' },
            { value: 'medium', text: 'Medium - Regular exercise' },
            { value: 'high', text: 'High - Very active lifestyle' }
        ]
    },
    {
        id: 'experience',
        question: 'How much experience do you have with pets?',
        options: [
            { value: 'none', text: 'No experience' },
            { value: 'some', text: 'Some experience' },
            { value: 'experienced', text: 'Very experienced' }
        ]
    }
];

let currentQuestion = 0;
const answers = {};

function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}

function renderQuestion() {
    console.log(`Rendering question ${currentQuestion + 1}`);
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    
    document.getElementById('progressBar').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    
    const optionsHtml = question.options.map(option => `
        <label class="option-card block ${answers[question.id] === option.value ? 'selected' : ''}">
            <input type="radio" name="${question.id}" value="${option.value}" 
                   ${answers[question.id] === option.value ? 'checked' : ''}>
            <span>${option.text}</span>
        </label>
    `).join('');

    const quizContent = document.getElementById('quizContent');
    quizContent.innerHTML = `
        <h3 class="text-xl font-semibold mb-6">${question.question}</h3>
        <div class="space-y-4">
            ${optionsHtml}
        </div>
        <div class="mt-8 flex justify-between">
            ${currentQuestion > 0 ? `
                <button onclick="previousQuestion()" class="bg-gray-500 text-white px-6 py-2 rounded-lg">
                    <i class="fas fa-arrow-left mr-2"></i>Previous
                </button>
            ` : '<div></div>'}
            <button onclick="nextQuestion()" class="bg-blue-500 text-white px-6 py-2 rounded-lg">
                ${currentQuestion === questions.length - 1 ? 'Submit' : 'Next<i class="fas fa-arrow-right ml-2"></i>'}
            </button>
        </div>
    `;

    console.log('Question HTML rendered. Adding event listeners...');
    // Add click handlers for option cards
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', function() {
            console.log('Option card clicked', this);
            const input = this.querySelector('input');
            input.checked = true;
            answers[question.id] = input.value;
            localStorage.setItem('quizAnswers', JSON.stringify(answers));
            console.log('Answer saved:', question.id, '=', input.value);
            
            // Update selected state
            document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            console.log('Option selected style updated.');
        });
    });
    console.log('Event listeners added.');
}

function previousQuestion() {
    console.log('Previous button clicked.');
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
        console.log('Moved to previous question.');
    }
}

function nextQuestion() {
    console.log('Next button clicked.');
    const currentQuestionData = questions[currentQuestion];
    if (!answers[currentQuestionData.id]) {
        alert('Please select an option to continue.');
        console.log('Validation failed: No option selected.');
        return;
    }

    if (currentQuestion === questions.length - 1) {
        console.log('Last question, showing results.');
        showResults();
    } else {
        currentQuestion++;
        console.log('Moving to next question.');
        renderQuestion();
    }
}

function showResults() {
    console.log('Showing results...');
    showLoading();
    
    // Simulate loading time for better UX
    setTimeout(() => {
        console.log('Simulating loading time...');
        const recommendation = determinePetMatch(answers);
        console.log('Determined pet match:', recommendation);
        
        document.getElementById('quizContent').classList.add('hidden');
        const results = document.getElementById('results');
        results.classList.remove('hidden');
        
        results.innerHTML = `
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Your Perfect Match</h2>
            <div class="bg-gray-50 p-6 rounded-lg">
                <h3 class="text-xl font-bold text-gray-800 mb-4">${recommendation.title}</h3>
                <p class="mb-4">${recommendation.description}</p>
                <ul class="list-disc list-inside space-y-2">
                    ${recommendation.reasons.map(reason => `<li>${reason}</li>`).join('')}
                </ul>
            </div>
            <div class="mt-8 flex justify-center space-x-4">
                <a href="adoption.html" class="inline-block bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-bold transition transform hover:scale-105">
                    View Available Pets
                </a>
                <button onclick="restartQuiz()" class="inline-block bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-bold transition transform hover:scale-105">
                    Take Quiz Again
                </button>
            </div>
        `;

        hideLoading();
        console.log('Results displayed.');
    }, 1000);
}

function determinePetMatch(answers) {
    console.log('Calculating pet match with answers:', answers);
    const timeValue = parseInt(answers.time);
    let score = 0;
    
    // Calculate score based on answers
    if (timeValue <= 2) score += 2; // Cat preference
    else if (timeValue >= 6) score += 1; // Dog preference
    
    if (answers.living === 'apartment' || answers.living === 'condo') score += 2; // Cat preference
    else if (answers.living === 'house') score += 1; // Dog preference
    
    if (answers.pets === 'cat') score += 2; // Cat preference
    else if (answers.pets === 'dog') score += 1; // Dog preference
    else if (answers.pets === 'both') score += 0.5; // Neutral
    
    if (answers.activity === 'low') score += 2; // Cat preference
    else if (answers.activity === 'high') score += 1; // Dog preference
    
    if (answers.experience === 'none') score += 1; // Cat preference (easier for beginners)
    else if (answers.experience === 'experienced') score += 0.5; // Slight dog preference
    
    // Determine pet type based on score
    const petType = score >= 5 ? 'cat' : 'dog';
    console.log('Calculated score:', score, 'Pet type:', petType);

    return petType === 'cat' ? {
        title: 'A Cat Would Be Perfect For You!',
        description: 'Based on your lifestyle and preferences, a cat would be an excellent companion for you.',
        reasons: [
            'Cats are more independent and require less daily attention',
            'They adapt well to apartment living',
            'They\'re great for people with busy schedules',
            'Cats are perfect for both active and relaxed lifestyles'
        ]
    } : {
        title: 'A Dog Would Be Perfect For You!',
        description: 'Based on your lifestyle and preferences, a dog would be an excellent companion for you.',
        reasons: [
            'Dogs are great for active lifestyles',
            'They provide excellent companionship',
            'They\'re perfect for families and social households',
            'Dogs can help you stay active and maintain a routine'
        ]
    };
}

function restartQuiz() {
    console.log('Restarting quiz...');
    currentQuestion = 0;
    Object.keys(answers).forEach(key => delete answers[key]);
    localStorage.removeItem('quizAnswers');
    document.getElementById('results').classList.add('hidden');
    document.getElementById('quizContent').classList.remove('hidden');
    renderQuestion();
    console.log('Quiz restarted.');
}

// Make functions available globally
window.previousQuestion = previousQuestion;
window.nextQuestion = nextQuestion;
window.restartQuiz = restartQuiz;

// Initialize the quiz when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    // Load saved answers if they exist
    const savedAnswers = localStorage.getItem('quizAnswers');

    if (savedAnswers) {
        try {
            const parsedAnswers = JSON.parse(savedAnswers);
            const answeredQuestions = Object.keys(parsedAnswers);

            if (answeredQuestions.length > 0) {
                const resume = confirm('It looks like you have a saved quiz in progress. Would you like to resume?');

                if (resume) {
                    Object.assign(answers, parsedAnswers);
                    console.log('Resumed quiz with answers:', answers);
                    const lastQuestionId = answeredQuestions[answeredQuestions.length - 1];
                    currentQuestion = questions.findIndex(q => q.id === lastQuestionId);
                    if (currentQuestion === -1) currentQuestion = 0; // Fallback in case of issue
                    console.log('Resuming from question:', currentQuestion + 1);
                } else {
                    console.log('User chose not to resume. Starting fresh.');
                    localStorage.removeItem('quizAnswers');
                    currentQuestion = 0;
                }
            } else {
                 // Saved data exists but is empty, start fresh.
                 console.log('Saved data is empty. Starting fresh.');
                 localStorage.removeItem('quizAnswers');
                 currentQuestion = 0;
            }
        } catch (e) {
            console.error('Error loading saved answers, starting fresh:', e);
            localStorage.removeItem('quizAnswers'); // Clear invalid saved data
            currentQuestion = 0;
        }
    } else {
        console.log('No saved answers found. Starting fresh.');
        currentQuestion = 0;
    }

    try {
        console.log('Calling renderQuestion for initial display...');
        renderQuestion();
        console.log('Initial question rendering complete.');
        hideLoading(); // Ensure loading spinner is hidden after initial render
        console.log('Loading spinner hidden.');
    } catch (e) {
        console.error('Error rendering initial question:', e);
        hideLoading(); // Also hide loading spinner on error
    }
});

// Add a global error handler for debugging
window.onerror = function(message, source, lineno, colno, error) {
    console.error('Global error caught:', { message, source, lineno, colno, error });
    return true; // Prevent default error handling
};

console.log('quiz.js script loaded'); 