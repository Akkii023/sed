const questions = [
  {
    question: "What is my favorite color?",
    options: ["Blue", "Red", "Green", "Purple"],
    correctAnswer: 0,
    gifts: ["Candle set", "Custom mug", "Photo frame", "Chocolate box"],
  },
  {
    question: "Where did we have our first date?",
    options: ["Restaurant", "Park", "Beach", "Movies"],
    correctAnswer: 2,
    gifts: ["Handwritten letter", "Flower bouquet", "Star map", "Jewelry"],
  },
  {
    question: "What is my dream destination?",
    options: ["Paris", "Maldives", "New York", "Tokyo"],
    correctAnswer: 1,
    gifts: ["Book collection", "Scrapbook", "Cooking class", "Perfume set"],
  },
  {
    question: "Which movie is our favorite?",
    options: ["The Notebook", "Titanic", "La La Land", "Casablanca"],
    correctAnswer: 3,
    gifts: ["Personalized playlist", "Movie night basket", "Subscription service", "Handmade coupon book"],
  },
];

let currentQuestion = 0;
let correctAnswers = 0;
let selectedGiftIndex = -1;

function startQuiz() {
  displayQuestion();
}

function displayQuestion() {
  const questionElement = document.getElementById("question");
  const optionsContainer = document.getElementById("options-container");

  questionElement.textContent = questions[currentQuestion].question;

  optionsContainer.innerHTML = "";
  questions[currentQuestion].options.forEach((option, index) => {
    const button = document.createElement("button");
    button.classList.add("option");
    button.textContent = option;
    button.onclick = function () {
      checkAnswer(this);
    };
    optionsContainer.appendChild(button);
  });
}

function checkAnswer(selectedOption) {
  const selectedIndex = Array.from(selectedOption.parentNode.children).indexOf(
    selectedOption
  );

  if (selectedIndex === questions[currentQuestion].correctAnswer) {
    // Correct answer
    showGiftPopup();
    correctAnswers++;
  } else {
    // Incorrect answer
    showMissedPopup();
  }
}

function showGiftPopup() {
  const giftPopup = document.getElementById("gift-popup");
  const giftList = document.getElementById("gift-list");

  giftList.innerHTML = "";
  questions[currentQuestion].gifts.forEach((gift, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = gift;
    listItem.onclick = function () {
      selectedGiftIndex = index;
    };
    giftList.appendChild(listItem);
  });

  giftPopup.style.display = "block";
}

function showMissedPopup() {
  const missedPopup = document.getElementById("missed-popup");
  const correctAnswerSpan = document.getElementById("correct-answer");
  const missedGiftList = document.getElementById("missed-gift-list");

  correctAnswerSpan.textContent = questions[currentQuestion].options[questions[currentQuestion].correctAnswer];

  missedGiftList.innerHTML = "";
  questions[currentQuestion].gifts.forEach((gift) => {
    const listItem = document.createElement("li");
    listItem.textContent = gift;
    missedGiftList.appendChild(listItem);
  });

  missedPopup.style.display = "block";
}

function selectGift() {
  const giftPopup = document.getElementById("gift-popup");
  const missedPopup = document.getElementById("missed-popup");

  if (selectedGiftIndex !== -1) {
    alert("You selected: " + questions[currentQuestion].gifts[selectedGiftIndex]);
    nextQuestion();
  } else {
    alert("Please select a gift.");
  }

  giftPopup.style.display = "none";
  missedPopup.style.display = "none";
}

function nextQuestion() {
  const missedPopup = document.getElementById("missed-popup");
  missedPopup.style.display = "none";

  currentQuestion++;

  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    showMarriagePopup();
  }
}

function showMarriagePopup() {
  const marriagePopup = document.getElementById("marriage-popup");
  const marriageMessage = document.getElementById("marriage-message");
  const marriageGiftList = document.getElementById("marriage-gift-list");

  marriageMessage.textContent = "I love you, baby!";
  marriageGiftList.innerHTML = "";

  for (let i = 0; i < Math.min(correctAnswers, 3); i++) {
    const listItem = document.createElement("li");
    listItem.textContent = "Gift " + (i + 1);
    marriageGiftList.appendChild(listItem);
  }

  marriagePopup.style.display = "block";
}

function moveNoButton() {
  const noButton = document.getElementById("no-button");
  noButton.style.position = "absolute";
  noButton.style.left = Math.random() * window.innerWidth + "px";
  noButton.style.top = Math.random() * window.innerHeight + "px";
}

function teaseNoButton() {
  moveNoButton();
  alert("Aww, try using the 'No' button!");
}

// Start the quiz when the page loads
startQuiz();