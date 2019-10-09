//Make an alien class with main features of the aliens - main looks, being hit and points being removed, alive = ?
//functions - damage Function(beginningPoints) : if button clicked - remove points
// queen die function 
// hit
// each alien is inherited from this - make them have different points to start with, different points being removed, give queen special kill, 
//soldier alien: starts with 60, loose 12, dies when queen dies or when points =0
//gaurd alien: starts with 68, loose 10, dies when queen dies or when points =0 
//queen alien: starts with 80, loose 7, dies when points = 0 => everyone dies too=> restart 

//on click - randomly choose an alien to be hit = true, else hit = false
//when start hit point - hit dmaage points = 0 => dead = true

class Alien {
  hitPoints = 10;
  hitDamage = 10;
  dead = false;

  hitTaken = () => {
    if (this.hitDamage >= this.hitPoints) {
      this.hitPoints = 0;
  } else {
      this.hitPoints -= this.hitDamage;
    }
  }

  hasDied = () => {
    if (this.hitPoints <= 0) {
      this.dead = true;
      this.hitDamage = 0;
    }
    return this.dead;
  }

  die = () => {
    this.hitPoints = 0;
    this.dead = true;
    this.hasDied();
  }
}

class SoldierAlien extends Alien {
  hitPoints = 60;
  hitDamage = 12;
}

class GuardAlien extends Alien {
  hitPoints = 68;
  hitDamage = 10;
}

class QueenAlien extends Alien {
  hitPoints = 80;
  hitDamage = 7;
}

const createAlien = () => {
  queens = [];
  soldiers = [];
  guards = [];
  for (let i = 0; i < 14; i++) {
    if (i === 0) {
      queens.push(new QueenAlien());
    } else if ((i > 0) && (i < 9)) {
      soldiers.push(new SoldierAlien());
    } else {
      guards.push(new GuardAlien());
    }
  }
  return [queens,soldiers,guards].flat();
}

const aliens = [...document.getElementsByClassName("alien")];


const clickedHitButton = () => {
  killAll();
  let randomIndex = Math.floor(Math.random() * (aliens.length));
  alienList[randomIndex].hitTaken();

  if (alienList[randomIndex].hasDied()) {
    aliens[randomIndex].innerHTML = 0;
    aliens[randomIndex].style.backgroundColor = "black";
    aliens[randomIndex].style.backgroundImage = "url('./spaceship-crash.gif')";
  } else {
      if (randomIndex === 0) {
        aliens[randomIndex].innerHTML = aliens[randomIndex].innerText - 7; 
      } else if (randomIndex > 8) {
          aliens[randomIndex].innerHTML = aliens[randomIndex].innerText - 10;
      } else {
        aliens[randomIndex].innerHTML = aliens[randomIndex].innerText - 12;
      }
  }
}

const killAll = () => {
  if (alienList[0].hasDied()) {
    alienList.forEach(alien => {
      alien.die();
    });
    aliens.forEach(htmlAlien => {
      htmlAlien.innerHTML = 0;
      htmlAlien.style.backgroundImage = "url('./spaceship-crash.gif')";
      document.getElementById("game").style.display = "none";
      document.getElementById("game-over").style.display = "flex";
      document.getElementById("restart").addEventListener("click", restartButton);
    })
  }
}

const restartButton = () => {
  location.reload();
}

document.getElementById("hit-button").addEventListener("click", clickedHitButton);

let alienList = createAlien();