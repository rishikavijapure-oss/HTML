// ==================== VARIABLES ====================
let pythonScore = 0;
let webScore = 0;
let currentQuestion = 0;

const questions = [
  { type: "python", q: "What keyword is used to define a function in Python?", a: "def" },
  { type: "python", q: "Which data type is immutable in Python?", a: "tuple" },
  { type: "python", q: "What is the Python function to print output?", a: "print" },
  { type: "web", q: "What does HTML stand for?", a: "hyper text markup language" },
  { type: "web", q: "What is CSS primarily used for?", a: "styling" },
  { type: "web", q: "Name a popular JavaScript framework?", a: "react" }
];

const jobMatches = {
  python: [
    { name: "TechCorp Solutions", desc: "Build scalable backend systems with Python and Django. Experience in REST APIs and databases required. Work on high-impact projects in a collaborative environment." },
    { name: "DataViz Analytics", desc: "Analyze complex datasets and build machine learning models. Create data visualizations and insights for business intelligence. Work with Python, R, and modern ML frameworks." },
    { name: "CloudSystems Inc", desc: "Manage infrastructure and CI/CD pipelines. Design scalable cloud solutions and improve system reliability. Work with Kubernetes and Docker in production environments." }
  ],
  web: [
    { name: "DesignHub Creative", desc: "Create beautiful and responsive user interfaces using React and Vue. Passionate about user experience and modern design patterns. Join our creative team of talented developers." },
    { name: "WebStudio Inc", desc: "Build complete web applications from frontend to backend. Master modern tech stacks and work with cutting-edge frameworks. Grow your skills in a fast-paced startup environment." },
    { name: "StartupXYZ Ventures", desc: "Full stack development with modern technologies and agile methodologies. Own features from concept to production. Collaborate with product and design teams on innovative solutions." }
  ]
};

// ==================== MODAL FUNCTIONS ====================
function openLoginModal() {
  document.getElementById('loginModal').classList.add('active');
}

function closeLoginModal() {
  document.getElementById('loginModal').classList.remove('active');
  document.getElementById('loginError').classList.remove('show');
}

// ==================== LOGIN ====================
function login() {
  const u = document.getElementById('loginUsername').value.trim();
  const p = document.getElementById('loginPassword').value.trim();

  if (u === "admin" && p === "1234") {
    pythonScore = 0;
    webScore = 0;
    currentQuestion = 0;
    closeLoginModal();
    
    // Hide home sections
    document.querySelectorAll('.navbar, .hero, .features, .how-it-works, .stats, .jobs-showcase, .cta, .footer').forEach(el => {
      el.style.display = 'none';
    });
    
    document.getElementById('quizPage').style.display = 'block';
    showQuestion();
  } else {
    const errorEl = document.getElementById('loginError');
    errorEl.textContent = '❌ Wrong credentials';
    errorEl.classList.add('show');
  }
}

// ==================== QUIZ ====================
function showQuestion() {
  if (currentQuestion >= questions.length) {
    showResults();
    return;
  }

  const q = questions[currentQuestion];
  const progress = (currentQuestion / questions.length) * 100;

  document.getElementById("qNo").textContent = `Question ${currentQuestion + 1} / ${questions.length}`;
  document.getElementById("progressFill").style.width = progress + "%";
  document.getElementById("question").textContent = q.q;
  document.getElementById("categoryTag").textContent = q.type.toUpperCase();
  document.getElementById("answer").value = "";
  document.getElementById("answer").focus();
}

function next() {
  const ans = document.getElementById("answer").value.toLowerCase().trim();

  if (ans === questions[currentQuestion].a) {
    if (questions[currentQuestion].type === "python") {
      pythonScore++;
    } else {
      webScore++;
    }
  }

  currentQuestion++;
  showQuestion();
}

function showResults() {
  const pPer = Math.round((pythonScore / 3) * 100);
  const wPer = Math.round((webScore / 3) * 100);

  document.getElementById('pythonValue').textContent = pPer + "%";
  document.getElementById('webValue').textContent = wPer + "%";

  let emoji, title, subtitle;
  if (pythonScore > webScore) {
    emoji = '🐍';
    title = 'Python Development Expert!';
    subtitle = 'You have strong aptitude for backend development.';
  } else if (webScore > pythonScore) {
    emoji = '🌐';
    title = 'Web Development Master!';
    subtitle = 'You have excellent skills for frontend development.';
  } else {
    emoji = '⚖️';
    title = 'Balanced Developer!';
    subtitle = 'You have equal talent in both areas.';
  }

  document.getElementById('resultEmoji').textContent = emoji;
  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultSubtitle').textContent = subtitle;

  document.getElementById('quizPage').style.display = 'none';
  document.getElementById('resultsPage').style.display = 'block';

  setTimeout(() => {
    showMatches();
  }, 2000);
}

function showMatches() {
  const matchType = pythonScore > webScore ? 'python' : 'web';
  const matches = jobMatches[matchType];

  let title, subtitle;
  if (pythonScore > webScore) {
    title = '🐍 Python Developer Jobs';
    subtitle = 'Top opportunities for Python developers';
  } else if (webScore > pythonScore) {
    title = '🌐 Web Developer Jobs';
    subtitle = 'Top opportunities for web developers';
  } else {
    title = '⚖️ Full Stack Opportunities';
    subtitle = 'Top opportunities for balanced developers';
  }

  document.getElementById('matchesTitle').textContent = title;
  document.getElementById('matchesSubtitle').textContent = subtitle;

  const html = matches.map(job => `
    <div class="match-card">
      <h4>${job.name}</h4>
      <p>${job.desc}</p>
      <button class="btn btn-primary apply-job-btn" onclick="applyJob('${job.name}')">Apply Now</button>
    </div>
  `).join('');

  document.getElementById('matchCards').innerHTML = html;

  document.getElementById('resultsPage').style.display = 'none';
  document.getElementById('matchesPage').style.display = 'block';
}

function applyJob(jobName) {
  alert(`✅ Application Sent!\n\nCompany: ${jobName}\n\nWe'll contact you soon with updates!`);
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  const answerInput = document.getElementById('answer');
  if (answerInput) {
    answerInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        next();
      }
    });
  }
});

// Close modals on background click
document.getElementById('loginModal').addEventListener('click', (e) => {
  if (e.target.id === 'loginModal') closeLoginModal();
});

// Prevent pinch zoom on mobile
document.addEventListener('touchmove', (e) => {
  if (e.touches.length > 1) {
    e.preventDefault();
  }
}, { passive: false });