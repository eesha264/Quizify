// --- Quizify Client-Side Router ---

// 1. Define the HTML Templates for Each Page (View)
const views = {
    // 🏠 Page 1: Home Page
    'home': () => `
        <div class="card home-container">
            <div class="home-illustration">
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-lavender);">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
            </div>
            <h1>Welcome to Quizify – Play. Compete. Win.</h1>
            <p>Host and join live quizzes with real-time leaderboards.</p>
            
            <div class="button-group">
                <a href="/join" class="btn btn-primary nav-link">Join Quiz</a>
                <a href="/host" class="btn btn-secondary nav-link">Host Quiz</a>
            </div>
        </div>
    `,

    // 🧑‍🏫 Page 2: Host Quiz Page
    'host': () => `
        <div class="host-dashboard">
            <div class="card">
                <h2>Create Your Quiz</h2>
                <form onsubmit="return false;">
                    <div class="form-group">
                        <label for="question">Question Text</label>
                        <textarea id="question" rows="3" placeholder="e.g., What is the capital of Japan?"></textarea>
                    </div>

                    <label>Answer Options (Select correct one)</label>
                    <div class="question-options">
                        <div class="form-group option-group">
                            <input type="radio" name="correct-answer" id="opt1-radio" checked>
                            <input type="text" id="opt1" placeholder="Option 1">
                        </div>
                        <div class="form-group option-group">
                            <input type="radio" name="correct-answer" id="opt2-radio">
                            <input type="text" id="opt2" placeholder="Option 2">
                        </div>
                        <div class="form-group option-group">
                            <input type="radio" name="correct-answer" id="opt3-radio">
                            <input type="text" id="opt3" placeholder="Option 3">
                        </div>
                        <div class="form-group option-group">
                            <input type="radio" name="correct-answer" id="opt4-radio">
                            <input type="text" id="opt4" placeholder="Option 4">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="time-limit">Time Limit (seconds)</label>
                        <select id="time-limit">
                            <option value="10">10 seconds</option>
                            <option value="20" selected>20 seconds</option>
                            <option value="30">30 seconds</option>
                        </select>
                    </div>
                    
                    <button type="button" class="btn btn-primary btn-block">Add Question</button>
                </form>
            </div>

            <div class="card">
                <h2>Your Questions</h2>
                <ul class="question-list">
                    <li class="question-item"><strong>Example Question 1 (20s)</strong><p>Correct: Option 3</p></li>
                    <li class="question-item"><strong>Example Question 2 (30s)</strong><p>Correct: Option 1</p></li>
                </ul>
                <a href="/quiz" class="btn btn-secondary btn-block nav-link" style="margin-top: 1.5rem;">Start Quiz (View)</a>
            </div>
        </div>
    `,

    // 🎯 Page 3: Join Quiz Page
    'join': () => `
        <div class="card">
            <h2>Join a Quiz Now!</h2>
            
            <div class="qr-code-placeholder">
                [ QR Code Placeholder ]
            </div>
            <p>Scan to Join</p>

            <form onsubmit="return false;">
                <div class="form-group">
                    <label for="quiz-code" style="text-align: center;">Or Enter Code</label>
                    <input type="text" id="quiz-code" placeholder="Enter 6-digit code" style="text-align: center; font-size: 1.2rem; letter-spacing: 3px;">
                </div>
                <a href="/quiz" class="btn btn-primary btn-block nav-link">Join Now</a>
            </form>
        </div>
    `,

    // 💡 Page 4: Live Quiz Page
    'quiz': () => `
        <div class="card quiz-card">
            <div class="timer-container">
                <div class="timer-circle" style="animation: none;"></div>
                <span id="timer-text">15</span>
            </div>

            <h2>What is the capital of France?</h2>
            
            <div class="answer-options">
                <button class="answer-btn">A. Berlin</button>
                <button class="answer-btn">B. Madrid</button>
                <button class="answer-btn">C. Paris</button>
                <button class="answer-btn">D. Rome</button>
            </div>

            <p class="waiting-message" style="display: none; margin-top: 1.5rem;">Waiting for next question...</p>
            <a href="/leaderboard" class="btn btn-secondary nav-link" style="margin-top: 1.5rem;">End Quiz (Go to Leaderboard)</a>
        </div>
    `,

    // 🏆 Page 5: Leaderboard Page
    'leaderboard': () => `
        <div class="card">
            <h2>Live Leaderboard 🏆</h2>
            
            <ol class="leaderboard-list">
                <li class="player-rank rank-1">
                    <span class="rank">🥇</span>
                    <span class="name">Sophie</span>
                    <span class="score">1250 pts</span>
                </li>
                <li class="player-rank rank-2">
                    <span class="rank">🥈</span>
                    <span class="name">Alex</span>
                    <span class="score">1100 pts</span>
                </li>
                <li class="player-rank rank-3">
                    <span class="rank">🥉</span>
                    <span class="name">Ben</span>
                    <span class="score">980 pts</span>
                </li>
            </ol>

            <a href="/home" class="btn btn-primary btn-block nav-link">Play Again</a>
        </div>
    `
};

// 2. Router Logic
const root = document.getElementById('app-content');

// Helper function to render a view
function render(viewName) {
    const viewFunction = views[viewName] || views['home'];
    root.innerHTML = viewFunction();
    // Scroll to top on navigation for better UX
    window.scrollTo(0, 0);
    // Re-attach event listeners for navigation links
    attachNavListeners(); 
}

// Function to handle navigation
function navigate(path) {
    const viewName = path === '/' || path === '/home' ? 'home' : path.substring(1);
    
    // Use History API to change the URL without a full page reload
    history.pushState({ view: viewName }, '', path);
    
    render(viewName);
}

// Function to attach click listeners to all internal links
function attachNavListeners() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent the default full page load
            e.preventDefault();
            // Get the path from the href attribute
            const path = this.getAttribute('href');
            navigate(path);
        });
    });
}

// 3. Initial Load and History Listener

// Handle browser back/forward buttons
window.addEventListener('popstate', (e) => {
    // Determine the current path and render the corresponding view
    const path = window.location.pathname;
    const viewName = path === '/' || path === '/home' ? 'home' : path.substring(1);
    render(viewName);
});

// Initial load: determine which page to show based on the URL
document.addEventListener('DOMContentLoaded', () => {
    // Start by navigating to the current path (defaulting to /home)
    const initialPath = window.location.pathname;
    navigate(initialPath);
});

// Note: The 'nav-link' class must be added to all internal <a> tags for the router to intercept the click.
// This is already done in the templates above.