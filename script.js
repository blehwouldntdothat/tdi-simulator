let players = [];
let episode = 1;
let phase = 0;
let phases = ["events","challenge","strategy","elimination"];

function startSim(){
  const size = document.getElementById("castSize").value;
  players = shuffle([...names]).slice(0,size);

  document.getElementById("setup").style.display="none";
  document.getElementById("sim").style.display="block";

  episode = 1;
  phase = 0;
  updateScreen();
}

function nextPhase(){
  phase++;

  if(phase >= phases.length){
    phase = 0;
    episode++;
  }

  updateScreen();
}

function updateScreen(){
  document.getElementById("episodeTitle").innerText =
    "Episode " + episode;

  let text = "";

  if(phases[phase] === "events"){
    text = generateEvent();
  }

  if(phases[phase] === "challenge"){
    let winner = randomPlayer();
    text = winner + " wins immunity!";
  }

  if(phases[phase] === "strategy"){
    text = randomPlayer() + " is being targeted tonight.";
  }

  if(phases[phase] === "elimination"){
    let out = eliminatePlayer();
    text = out + " is eliminated!";
  }

  document.getElementById("logBox").innerText = text;
}

function generateEvent(){
  let e = eventPool[Math.floor(Math.random()*eventPool.length)];
  let p1 = randomPlayer();
  let p2 = randomPlayer();
  return e.replace("%0",p1).replace("%1",p2);
}

function eliminatePlayer(){
  let out = randomPlayer();
  players = players.filter(p => p !== out);
  return out;
}

function randomPlayer(){
  return players[Math.floor(Math.random()*players.length)];
}

function shuffle(a){
  return a.sort(()=>Math.random()-0.5);
}
