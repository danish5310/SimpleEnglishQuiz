
const rounds = [
 {emoji:"✏️", answer:"Pencil", choices:["Pencil","Chair","Book"]},
 {emoji:"📘", answer:"Book", choices:["Bag","Book","Pen"]},
 {emoji:"🎒", answer:"Bag", choices:["Ruler","Chair","Bag"]},
 {emoji:"📏", answer:"Ruler", choices:["Pen","Ruler","Pencil"]},
 {emoji:"🖊️", answer:"Pen", choices:["Book","Pen","Bag"]},
 {emoji:"🪑", answer:"Chair", choices:["Chair","Pencil","Ruler"]}
];
let roundIndex = 0, score = 0, answered = false;
const picture = document.getElementById("picture");
const choices = document.getElementById("choices");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("nextButton");

function renderRound(){
 const round = rounds[roundIndex];
 document.getElementById("gameProgress").textContent = `Round ${roundIndex+1} of ${rounds.length}`;
 document.getElementById("gameScore").textContent = `⭐ Score: ${score}`;
 document.getElementById("progressFill").style.width = `${((roundIndex+1)/rounds.length)*100}%`;
 picture.textContent = round.emoji;
 choices.innerHTML = "";
 feedback.textContent = "Pick the correct word!";
 feedback.style.color = "#315bb5";
 round.choices.forEach(word=>{
  const button=document.createElement("button");
  button.type="button"; button.className="choice-button"; button.textContent=word;
  button.addEventListener("click",()=>checkAnswer(button));
  choices.appendChild(button);
 });
 answered=false; nextButton.disabled=true;
 nextButton.textContent=roundIndex===rounds.length-1 ? "See Result ➜" : "Next ➜";
}
function checkAnswer(button){
 if(answered) return;
 answered=true;
 const answer=rounds[roundIndex].answer;
 document.querySelectorAll(".choice-button").forEach(b=>{
  b.disabled=true;
  if(b.textContent===answer) b.classList.add("correct");
 });
 if(button.textContent===answer){
  score++; feedback.textContent="🎉 Correct! Great job!"; feedback.style.color="#218653";
 }else{
  button.classList.add("wrong");
  feedback.textContent=`😊 Good try! The answer is ${answer}.`; feedback.style.color="#b44760";
 }
 document.getElementById("gameScore").textContent=`⭐ Score: ${score}`;
 nextButton.disabled=false;
}
function nextRound(){
 if(!answered) return;
 if(roundIndex<rounds.length-1){roundIndex++;renderRound();return;}
 const stars=score>=5?"⭐⭐⭐":score>=3?"⭐⭐":"⭐";
 document.getElementById("gamePanel").innerHTML=`
 <div class="match-picture">🏆</div><h2>Game Complete!</h2>
 <p style="font-size:2rem">${stars}</p><p>You scored <strong>${score} out of ${rounds.length}</strong>.</p>
 <p>${score>=5?"Wonderful! You are a word-matching superstar!":"Good effort! Play again to practise and earn more stars."}</p>
 <button class="button" id="playAgain">Play Again ↻</button>`;
 document.getElementById("playAgain").addEventListener("click",restartGame);
}
function restartGame(){roundIndex=0;score=0;answered=false;location.reload();}
nextButton.addEventListener("click",nextRound);
document.getElementById("restartButton").addEventListener("click",restartGame);
renderRound();
