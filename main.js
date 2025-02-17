let computerNum = 0;
let chances = 3;
let gameOver = false;
let history = [];

let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chanceArea = document.getElementById("chance-area");
let userGuess = document.getElementById("user-guess");

// 상태 초기화 및 결과 영역 클래스 제거 함수
function resetResultArea() {
  resultArea.textContent = "Enter a number and try to guess!";
  resultArea.classList.remove(
    "result-up",
    "result-down",
    "result-correct",
    "result-gameover"
  );
}

// 남은 시도 횟수와 정답 업데이트 함수
function updateChanceArea() {
  chanceArea.textContent = `Remaining attempts: ${chances} (Answer: ${computerNum})`;
}

// 랜덤 정답 생성 함수
function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
}

// 초기 설정
pickRandomNum();
updateChanceArea();
resetResultArea();

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);

// 포커스 시 입력값 초기화
userInput.addEventListener("focus", function () {
  userInput.value = "";
});

function play() {
  let userValue = Number(userInput.value);

  if (userValue < 1 || userValue > 100) {
    alert("Please enter a number between 1 and 100.");
    return;
  }

  if (history.includes(userValue)) {
    alert(
      "You have already entered this number. Please try a different number."
    );
    return;
  }

  chances--;
  updateChanceArea();
  resultArea.classList.remove(
    "result-up",
    "result-down",
    "result-correct",
    "result-gameover"
  );

  if (userValue < computerNum) {
    resultArea.textContent = "🔼 Up!";
    resultArea.classList.add("result-up");
  } else if (userValue > computerNum) {
    resultArea.textContent = "🔽 Down!";
    resultArea.classList.add("result-down");
  } else {
    resultArea.textContent = "🎉 Bingo!";
    resultArea.classList.add("result-correct");
    gameOver = true;
  }

  history.push(userValue);

  userGuess.textContent = `Your Guesses : ${history.join(", ")}`;

  // 남은 시도가 0이면서 정답을 맞추지 못한 경우
  if (chances < 1 && userValue !== computerNum) {
    gameOver = true;
    resultArea.textContent = "💀 Game Over!";
    resultArea.classList.add("result-gameover");
  }

  // 게임오버 시 버튼 비활성화 처리
  if (gameOver) {
    playButton.disabled = true;
  }
}

function reset() {
  userInput.value = "";
  pickRandomNum();
  chances = 3;
  history = [];
  userGuess.textContent = "Your Guesses: -";
  gameOver = false;
  playButton.disabled = false;
  updateChanceArea();
  resetResultArea();
}
