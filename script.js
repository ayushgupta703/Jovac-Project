// Elements
const signupForm = document.getElementById("signupForm");
const signinForm = document.getElementById("signinForm");
const authSection = document.getElementById("authSection");
const mainApp = document.getElementById("mainApp");
const testSection = document.getElementById("testSection");
const resultsSection = document.getElementById("resultsSection");
const notesInput = document.getElementById("notesInput");
const testForm = document.getElementById("testForm");
const scoreDisplay = document.getElementById("score");
const retryBtn = document.getElementById("retryBtn");
const generateBtn = document.getElementById("generateBtn");
const switchToSignup = document.getElementById("switchToSignup");
const switchToSignin = document.getElementById("switchToSignin");

// Navbar Links
const navSignup = document.getElementById("navSignup");
const navSignin = document.getElementById("navSignin");
const navGenerate = document.getElementById("navGenerate");

// Sign Up Logic
document.getElementById("signupBtn").addEventListener("click", () => {
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    if (localStorage.getItem(email)) {
        alert("This email is already registered.");
        return;
    }

    localStorage.setItem(email, password);
    alert("Signup successful! You can now sign in.");
    signinForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
});

// Sign In Logic
document.getElementById("signinBtn").addEventListener("click", () => {
    const email = document.getElementById("signinEmail").value.trim();
    const password = document.getElementById("signinPassword").value.trim();

    const storedPassword = localStorage.getItem(email);

    if (storedPassword === password) {
        alert("Signin successful!");
        authSection.classList.add("hidden");
        mainApp.classList.remove("hidden");
        navGenerate.classList.remove("hidden");
    } else {
        alert("Invalid email or password. Please try again.");
    }
});

// Navbar Navigation
navSignup.addEventListener("click", () => {
    authSection.classList.remove("hidden");
    mainApp.classList.add("hidden");
    signinForm.classList.add("hidden");
    signupForm.classList.remove("hidden");
});

navSignin.addEventListener("click", () => {
    authSection.classList.remove("hidden");
    mainApp.classList.add("hidden");
    signupForm.classList.add("hidden");
    signinForm.classList.remove("hidden");
});

switchToSignup.addEventListener("click", () => {
    authSection.classList.remove("hidden");
    mainApp.classList.add("hidden");
    signinForm.classList.add("hidden");
    signupForm.classList.remove("hidden");
});

switchToSignin.addEventListener("click", () => {
    authSection.classList.remove("hidden");
    mainApp.classList.add("hidden");
    signupForm.classList.add("hidden");
    signinForm.classList.remove("hidden");
});

navGenerate.addEventListener("click", () => {
    authSection.classList.add("hidden");
    mainApp.classList.remove("hidden");
});

// Test Generation Logic
generateBtn.addEventListener("click", () => {
    const notes = notesInput.value.trim();
    if (!notes) {
        alert("Please enter some notes to generate a test.");
        return;
    }

    const sentences = notes.split(/[.!?]\s*/).filter(Boolean);
    testForm.innerHTML = "";

    sentences.forEach((sentence, index) => {
        const words = sentence.split(" ");
        if (words.length > 5) {
            const blankIndex = Math.floor(Math.random() * words.length);
            const answer = words[blankIndex].replace(/[.,!?]/g, ""); // Remove punctuation
            words[blankIndex] = "______";
            const question = document.createElement("div");
            question.innerHTML = `
                <label>Q${index + 1}: ${words.join(" ")}</label><br>
                <input type="text" class="answer-input" data-answer="${answer.toLowerCase()}" required>
            `;
            testForm.appendChild(question);
        }
    });

    testSection.classList.remove("hidden");
    resultsSection.classList.add("hidden");
});

// Submit Test Logic
document.getElementById("submitBtn").addEventListener("click", () => {
    const answers = document.querySelectorAll(".answer-input");
    let score = 0;

    answers.forEach((input) => {
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = input.dataset.answer;

        if (userAnswer === correctAnswer) {
            score++;
        }
    });

    const totalQuestions = answers.length;
    scoreDisplay.textContent = `You scored ${score} out of ${totalQuestions}.`;
    resultsSection.classList.remove("hidden");
    retryBtn.classList.remove("hidden");
    testSection.classList.add("hidden");
});

// Retry Button Logic
retryBtn.addEventListener("click", () => {
    testSection.classList.add("hidden");
    resultsSection.classList.add("hidden");
    notesInput.value = "";
    testForm.innerHTML = "";
    retryBtn.classList.add("hidden");
});
