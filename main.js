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
    this.hitPoints  = this.hitPoints - this.hitDamage;
    console.log(`${this} hit damage: ${this.hitDamage}, hit points: ${this.hitPoints}.`)
  }

  hasDied = () => {
    if (this.hitPoints <= 0) {
      this.dead = true;
      this.hitDamage = 0;
    }
    return this.dead;
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
  const alienList = createAlien();
  let randomIndex = Math.floor(Math.random() * (aliens.length));

  if (alienList[randomIndex].hasDied()) {
    aliens[randomIndex].innerHTML = 0;
    aliens[randomIndex].style.display = "black";
  } else {
      if (randomIndex === 0) {
        aliens[randomIndex].innerHTML = aliens[randomIndex].innerText - 7; 
      } else if (randomIndex > 8) {
          aliens[randomIndex].innerHTML = aliens[randomIndex].innerText - 10;
      } else {
        aliens[randomIndex].innerHTML = aliens[randomIndex].innerText - 12;
      }
      alienList[randomIndex].hitTaken();
  }
  // return alienList[randomIndex].hitTaken();
}

// const killAll = () => {
// // if aliens.dead is true for queen alien = kill all aliens
// }

document.getElementById("hit-button").addEventListener("click", clickedHitButton);
