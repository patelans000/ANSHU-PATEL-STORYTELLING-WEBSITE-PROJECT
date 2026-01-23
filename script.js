

// SEPERATING MY SCREENS (to be similar to figma wireframes)
const screens = document. querySelectorAll(".screen");

function showScreen(id) {
    screens.forEach(screen => screen.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

document.getElementById("start-btn").onclick = () =>
  showScreen("oracle-screen");

document.querySelector(".magic-ball").onclick = () =>
  showScreen("quiz-screen");

document.getElementById("restart-btn").onclick = () =>
  location.reload();

// QUIZ STATE
let currentQuestion = 0;

const scores = {
  gilded: 0,
  starbound: 0,
  veiled: 0,
  tethered: 0,
  whispering: 0,
  roaming: 0
};

// TIE BREAKER
const firstHit = {};

// RESULTS
const results = {
  gilded: {
    title: "The Gilded Realm",
    message:
      "Your path flows through realms where magic stirs and legends breathe. You are drawn to wonders beyond the ordinary, where heroes rise and the impossible feels close."
  },
  starbound: {
    title: "The Starbound Mind",
    message:
      "You are drawn to questions without borders. Futures shaped by curiosity, risk, and discovery call to you."
  },
  veiled: {
    title: "The Veiled Truth",
    message:
      "Your path winds through secrets and puzzles waiting to be unraveled. Every detail matters, and truth hides beneath perception."
  },
  tethered: {
    title: "The Tethered Heart",
    message:
      "Love, connection, and emotion chart your course. Bonds endure, and intimacy lingers long after the tale ends."
  },
  whispering: {
    title: "The Whispering Dark",
    message:
      "You are drawn to the shadows and the thrill of the unknown. Stories that unsettle and linger call to you."
  },
  roaming: {
    title: "The Roaming Flame",
    message:
      "Your path blazes with daring and motion. Adventure calls, and you chase glory wherever it leads."
  }
};

// QUESTIONS

const questions = [
  {
    text:
      "You step into my chamber at dusk. What do you seek from the stories yet to come?",
    answers: [
      { text: "To walk where rules bend and wonders breathe", effects: { gilded: 2 } },
      { text: "To glimpse what tomorrow may become", effects: { starbound: 2 } },
      { text: "To uncover what hides beneath the surface", effects: { veiled: 2 } },
      { text: "To feel something stir deeply within you", effects: { tethered: 2 } },
      { text: "To feel your pulse quicken in the dark", effects: { whispering: 2 } },
      { text: "To chase excitement where danger waits", effects: { roaming: 2 } }
    ]
  },
  {
    text: "A door appears before you. Where does it open?",
    answers: [
      { text: "A land shaped by legend and old magic", effects: { gilded: 2, tethered: 1 } },
      { text: "A place built by minds reaching too far", effects: { starbound: 2, veiled: 1 } },
      { text: "A quiet place where something feels wrong", effects: { veiled: 2, whispering: 1 } },
      { text: "Somewhere shaped by bonds between people", effects: { tethered: 2 } },
      { text: "Somewhere no one should linger after nightfall", effects: { whispering: 2 } },
      { text: "Somewhere wild, untamed, and full of peril", effects: { roaming: 2 } }
    ]
  },
  {
    text: "Someone walks beside you on this journey. Who are they?",
    answers: [
      { text: "A hero bound by fate", effects: { gilded: 2 } },
      { text: "A thinker who questions everything", effects: { starbound: 2 } },
      { text: "A watcher who notices what others miss", effects: { veiled: 2 } },
      { text: "A soul shaped by love and longing", effects: { tethered: 2 } },
      { text: "Someone carrying terrible secrets", effects: { whispering: 2, veiled: 1 } },
      { text: "A daring comrade ready to face any danger", effects: { roaming: 2 } }
    ]
  },
  {
    text: "Every tale must fracture. What kind of trial draws you in?",
    answers: [
      { text: "The fate of worlds hangs in balance", effects: { gilded: 2, starbound: 1 } },
      { text: "A question with no easy answer", effects: { starbound: 2, veiled: 1 } },
      { text: "A truth that refuses to stay buried", effects: { veiled: 2 } },
      { text: "A bond tested by circumstance", effects: { tethered: 2 } },
      { text: "A presence that should not exist", effects: { whispering: 2 } },
      { text: "A challenge that tests courage and cunning", effects: { roaming: 2 } }
    ]
  },
  {
    text: "When the tale ends, what do you wish lingers?",
    answers: [
      { text: "Awe at something greater than yourself", effects: { gilded: 2 } },
      { text: "A mind buzzing with possibilities", effects: { starbound: 2 } },
      { text: "Satisfaction from pieces falling into place", effects: { veiled: 2 } },
      { text: "A warmth you carry with you", effects: { tethered: 2 } },
      { text: "Unease that follows you into the night", effects: { whispering: 2 } },
      { text: "The thrill of daring deeds", effects: { roaming: 2 } }
    ]
  },
  {
    text: "One thread of fate remains. Which do you pull?",
    answers: [
      { text: "The ancient and untamed", effects: { gilded: 2 } },
      { text: "The unknown and untested", effects: { starbound: 2 } },
      { text: "The hidden and unresolved", effects: { veiled: 2 } },
      { text: "The fragile and precious", effects: { tethered: 2 } },
      { text: "The forbidden and forgotten", effects: { whispering: 2 } },
      { text: "The path through danger and glory", effects: { roaming: 2 } }
    ]
  }
];

// QUIZ LOGIC

const questionText = document.getElementById("question-text");
const buttons = document.querySelectorAll(".answer-btn");

function showQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = q.text;

  buttons.forEach((btn, i) => {
    btn.textContent = q.answers[i].text;
    btn.onclick = () => selectAnswer(q.answers[i].effects);
  });
}

function selectAnswer(effects) {
  for (let key in effects) {
    scores[key] += effects[key];
    if (!(key in firstHit)) {
      firstHit[key] = currentQuestion;
    }
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const maxScore = Math.max(...Object.values(scores));
  const tied = Object.keys(scores).filter(k => scores[k] === maxScore);
  const finalPath = tied.reduce((a, b) =>
    firstHit[a] < firstHit[b] ? a : b
  );

  document.getElementById("result-title").textContent =
    results[finalPath].title;

  document.getElementById("result-message").textContent =
    results[finalPath].message;

  showScreen("result-screen");
}

// START
showQuestion();
