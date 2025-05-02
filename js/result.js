// This file handles displaying the results of the challenges

// DOM Elements
const resultModal = document.getElementById('result-modal');
const scoreDisplay = document.getElementById('score-display');
const challengeResults = document.getElementById('challenge-results');
const closeBtn = document.querySelector('.close-btn');

// Check score when checkout button is clicked
checkoutBtn.addEventListener('click', showResults);

// Close modal when close button is clicked
closeBtn.addEventListener('click', () => {
    resultModal.style.display = 'none';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (e) => {
    if (e.target === resultModal) {
        resultModal.style.display = 'none';
    }
});

// Show results modal with challenge completion status
function showResults() {
    // Calculate score
    const score = calculateScore();
    
    // Update score display
    scoreDisplay.textContent = `${score.scorePercentage}% (${score.completedCount}/${score.totalChallenges})`;
    
    // Update challenge results
    displayChallengeResults(score.challenges);
    
    // Show modal
    resultModal.style.display = 'block';
}

// Display challenge completion status
function displayChallengeResults(challenges) {
    challengeResults.innerHTML = '';
    
    challenges.forEach(challenge => {
        const challengeItem = document.createElement('div');
        challengeItem.className = `challenge-item ${challenge.completed ? 'challenge-passed' : 'challenge-failed'}`;
        
        challengeItem.innerHTML = `
            <h3>Challenge ${challenge.id}: ${challenge.name}</h3>
            <p>${challenge.description}</p>
            <p class="status"><strong>Status:</strong> ${challenge.completed ? 'Completed' : 'Not Completed'}</p>
        `;
        
        challengeResults.appendChild(challengeItem);
    });
}

// Add keyboard shortcut to show results (Ctrl+Alt+R)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.altKey && e.key === 'r') {
        e.preventDefault();
        showResults();
    }
});

// You can also check your progress at any time by opening the developer console and typing:
// showResults();