

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
      "Your path flows through realms where magic stirs and legends breathe.",
    media: [
      "assets/media/gilded1.jpg",
      "assets/media/gilded2.jpg",
      "assets/media/gilded3.jpg",
      "assets/media/gilded4.jpg",
      "assets/media/gilded5.jpg",
      "assets/media/gilded6.jpg"
    ]
  },

  
  starbound: {
    title: "The Starbound Mind",
    message:
      "You are drawn to futures shaped by curiosity and discovery.",
    media: [
      "assets/media/starbound1.jpg",
      "assets/media/starbound2.jpg",
      "assets/media/starbound3.jpg",
      "assets/media/starbound4.jpg",
      "assets/media/starbound5.jpg",
      "assets/media/starbound6.jpg"
    ]
  },

  veiled: {
    title: "The Veiled Truth",
    message:
      "Your path winds through secrets and puzzles waiting to be unraveled.",
    media: [
      "assets/media/veiled1.jpg",
      "assets/media/veiled2.jpg",
      "assets/media/veiled3.jpg",
      "assets/media/veiled4.jpg",
      "assets/media/veiled5.jpg",
      "assets/media/veiled6.jpg"
    ]
  },

  tethered: {
    title: "The Tethered Heart",
    message:
      "Love, connection, and emotion chart your course.",
    media: [
      "assets/media/tethered1.jpg",
      "assets/media/tethered2.jpg",
      "assets/media/tethered3.jpg",
      "assets/media/tethered4.jpg",
      "assets/media/tethered5.jpg",
      "assets/media/tethered6.jpg"
    ]
  },

  whispering: {
    title: "The Whispering Dark",
    message:
      "You are drawn to the shadows and the thrill of the unknown.",
    media: [
      "Horror Media 1",
      "Horror Media 2",
      "Horror Media 3",
      "Horror Media 4",
      "Horror Media 5",
      "Horror Media 6"
    ]
  },

  roaming: {
    title: "The Roaming Flame",
    message:
      "Your path blazes with daring and motion. Adventure calls.",
    media: [
      "Adventure Media 1",
      "Adventure Media 2",
      "Adventure Media 3",
      "Adventure Media 4",
      "Adventure Media 5",
      "Adventure Media 6"
    ]
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

  const slots = document.querySelectorAll(".media-slot");
  const mediaItems = results[finalPath].media;

  slots.forEach((slot, index) => {
  slot.innerHTML = `
    <img src="${mediaItems[index]}" alt="Recommended Media">
  `;
});

  showScreen("result-screen");
}


// START
showQuestion();
