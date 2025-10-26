// --- Quizify Client-Side Router V4 (Screenshot Match) ---

// 1. Define the HTML Templates for Each Page (View)
const views = {
    // 🏠 Page 1: Home Page (Screenshot Match)
    'home': () => `
        <div class="card home-container">
            <div class="home-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2L1 21h22L12 2z" fill="#A7F3F0" stroke="none"/>
                    <path d="M12 10v6"/>
                    <circle cx="12" cy="18" r="1"/>
                </svg>
            </div>
            <h1 class="title-gradient">Welcome to Quizify</h1>
            <p>Play. Compete. Win.</p>
            <p class="subtext">Host and join live quizzes with real-time leaderboards</p>
            
            <div class="button-group">
                <a href="/join" class="btn btn-home-turq nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle></svg>
                    Join Quiz
                </a>
                <a href="/host" class="btn btn-home-lav nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5l4 4L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                    Host Quiz
                </a>
            </div>

            <div class="bottom-info-card">
                <div style="font-size: 24px; color: var(--accent-lavender); margin-bottom: 5px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <p style="font-size: 0.95rem;">Join thousands of players worldwide in real-time quiz competitions</p>
            </div>
            <p class="footer-text">Made with ❤️ by Team Quizify © 2025</p>
        </div>
    `,

    // 🧑‍🏫 Page 2: Host Quiz Page (Screenshot Match)
    'host': () => `
        <div class="host-dashboard">
            <div class="card">
                <h2 class="title-gradient" style="text-align: left;">Host a Quiz</h2>
                <p class="host-header-text">Create questions and start your live quiz</p>
                <h3 style="margin-bottom: 1.5rem;">Add New Question</h3>
                
                <form onsubmit="return false;">
                    <div class="form-group">
                        <label for="question">Question Text</label>
                        <textarea id="question" rows="2" placeholder="Enter your question..."></textarea>
                    </div>

                    <h4 style="font-size: 1.1rem; font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem; color: var(--text-dark);">Options</h4>
                    <div class="options-group">
                        <label class="option-label"><input type="radio" name="correct-answer" checked>Option 1</label>
                        <label class="option-label"><input type="radio" name="correct-answer">Option 2</label>
                        <label class="option-label"><input type="radio" name="correct-answer">Option 3</label>
                        <label class="option-label"><input type="radio" name="correct-answer">Option 4</label>
                        <p style="font-size: 0.85rem; color: var(--text-light); margin-top: 0.5rem; margin-bottom: 0;">Select the correct answer</p>
                    </div>

                    <div class="form-group">
                        <label for="time-limit">Time Limit (seconds)</label>
                        <div class="time-limit-field">
                            <span style="font-size: 1.2em;">🕒</span>
                            <select id="time-limit">
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30" selected>30</option>
                            </select>
                        </div>
                    </div>
                    
                    <button type="button" class="btn btn-join-vibrant btn-block">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        Add Question
                    </button>
                </form>
            </div>

            <div class="card">
                <h3 style="margin-bottom: 1.5rem;">Questions (0)</h3>
                <div class="questions-list-card">
                    No questions added yet
                </div>
                <a href="/quiz" class="btn btn-home-lav nav-link" style="margin-top: 1.5rem; visibility: hidden;">Start Quiz</a>
            </div>
        </div>
    `,

    // 🎯 Page 3: Join Quiz Page (Screenshot Match)
    'join': () => `
        <div class="card join-card">
            <h1 class="title-gradient">Join a Quiz Now!</h1>
            <p style="margin-bottom: 2rem;">Enter the code or scan the QR to join</p>
            
            <div class="qr-container">
                <div class="qr-code-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><line x1="21" y1="14" x2="14" y2="21"></line><line x1="14" y1="14" x2="21" y2="21"></line>
                    </svg>
                </div>
                <p style="font-size: 0.95rem; margin-top: 1rem; margin-bottom: 0;">Scan to Join Instantly</p>
            </div>

            <div class="separator">OR</div>

            <form onsubmit="return false;">
                <div class="form-group">
                    <input type="text" id="quiz-code" placeholder="Enter Quiz Code" class="input-like-btn">
                </div>
                <a href="/quiz" class="btn btn-join-vibrant btn-block nav-link">Join Now &rarr;</a>
            </form>
            
            <a href="/home" class="nav-link" style="display: block; margin-top: 1.5rem; font-size: 0.9rem; color: var(--text-light);">Back to Home</a>
        </div>
    `,

    // 💡 Page 4: Live Quiz Page (Original Layout)
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

    // 🏆 Page 5: Leaderboard Page (Original Layout)
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
                <li class="player-rank">
                    <span class="rank">4</span>
                    <span class="name">Maria</span>
                    <span class="score">850 pts</span>
                </li>
                <li class="player-rank">
                    <span class="rank">5</span>
                    <span class="name">David</span>
                    <span class="score">720 pts</span>
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
