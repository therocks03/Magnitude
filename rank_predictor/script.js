// State management
let currentExam = "JEE Mains";

// UI Elements
const viewExamSelection = document.getElementById('view-exam-selection');
const viewPredictorForm = document.getElementById('view-predictor-form');
const viewResults = document.getElementById('view-results');
const titleExam = document.getElementById('selected-exam-title');

// Switch to form view
function selectExam(examName) {
    currentExam = examName;
    titleExam.textContent = `${examName} Predictor`;
    
    // Animate transition
    viewExamSelection.classList.remove('active-view');
    setTimeout(() => {
        viewExamSelection.classList.add('hidden');
        viewPredictorForm.classList.remove('hidden');
        // small delay to let display:block apply before triggering opacity animation
        setTimeout(() => {
            viewPredictorForm.classList.add('active-view');
        }, 10);
    }, 300);
}

// Switch back to exam selection
function goBack() {
    viewPredictorForm.classList.remove('active-view');
    setTimeout(() => {
        viewPredictorForm.classList.add('hidden');
        viewExamSelection.classList.remove('hidden');
        setTimeout(() => {
            viewExamSelection.classList.add('active-view');
        }, 10);
    }, 300);
}

// Reset from results to exam selection
function resetForm() {
    document.getElementById('prediction-form').reset();
    viewResults.classList.remove('active-view');
    setTimeout(() => {
        viewResults.classList.add('hidden');
        viewExamSelection.classList.remove('hidden');
        setTimeout(() => {
            viewExamSelection.classList.add('active-view');
        }, 10);
    }, 300);
}

// Handle Form Submission
function handlePredictList(e) {
    e.preventDefault();
    
    const rank = document.getElementById('rank').value;
    const category = document.getElementById('category').value;
    
    // Display inputs on result screen
    document.getElementById('display-rank').textContent = rank;
    document.getElementById('display-category').textContent = category;
    
    // Switch Views
    viewPredictorForm.classList.remove('active-view');
    setTimeout(() => {
        viewPredictorForm.classList.add('hidden');
        viewResults.classList.remove('hidden');
        
        // Hide list, show spinner
        document.getElementById('results-list').classList.add('hidden');
        document.getElementById('loading-spinner').classList.remove('hidden');
        
        setTimeout(() => {
            viewResults.classList.add('active-view');
            // Simulate API logic
            simulateBackendPrediction(currentExam, rank, category);
        }, 10);
    }, 300);
}

// Real data prediction logic
function simulateBackendPrediction(exam, rank, category) {
    setTimeout(() => {
        document.getElementById('loading-spinner').classList.add('hidden');
        const resultsList = document.getElementById('results-list');
        resultsList.innerHTML = '';
        
        const gender = document.getElementById('gender').value;
        const state = document.getElementById('state').value;
        const queryRank = parseInt(rank);
        
        // Filter the actual data
        let filtered = [];
        if (exam === 'NEET') {
            if (typeof NEET_DATA !== 'undefined') {
                filtered = NEET_DATA.filter(col => {
                    if (col.category !== category) return false;
                    // For NEET we have 'Female-Only' and 'Gender-Neutral'
                    if (col.gender === 'Female-Only' && gender === 'Gender-Neutral') return false;
                    if (queryRank > col.closing_rank) return false;
                    return true;
                });
                filtered.sort((a,b) => a.closing_rank - b.closing_rank);
            }
        } else {
            // JoSAA logic
            if (typeof JOSAA_DATA !== 'undefined') {
                filtered = JOSAA_DATA.filter(col => {
                    const isIIT = col.institute.startsWith("IIT");
                    if (exam === 'JEE Advanced' && !isIIT) return false;
                    if (exam === 'JEE Mains' && isIIT) return false;
                    if (col.category !== category) return false;
                    if (col.gender !== gender) return false;
                    if (queryRank > col.closing_rank) return false;
                    return true;
                });
                filtered.sort((a,b) => a.closing_rank - b.closing_rank);
            }
        }
        
        // Show Top 50 results to prevent browser lag if there are too many matches
        const renderList = filtered.slice(0, 50);

        if(renderList.length === 0) {
            resultsList.innerHTML = `<div class="result-card" style="grid-column: 1 / -1; text-align: center;">No colleges found matching your exact criteria within this rank!</div>`;
        }
        
        renderList.forEach(college => {
            const card = document.createElement('div');
            card.className = 'result-card';
            const collegeName = college.institute || college.name;
            const branchName = college.branch;
            const cutoffVal = college.closing_rank || college.cutoff;
            card.innerHTML = `
                <div class="college-name">${collegeName}</div>
                <div class="college-branch">${branchName}</div>
                <div class="college-meta">
                    <div class="meta-item">
                        <span class="meta-label">Closing Rank</span>
                        <span class="meta-value">${cutoffVal}</span>
                    </div>
                    <div class="meta-item">
                        <span class="chance-badge">High Chance</span>
                    </div>
                </div>
            `;
            resultsList.appendChild(card);
        });
        
        resultsList.classList.remove('hidden');
        // trigger reflow
        void resultsList.offsetWidth;
        resultsList.style.animation = 'fadeIn 0.5s forwards ease-out';
        
    }, 1500); // reduced delay for faster real feel
}
