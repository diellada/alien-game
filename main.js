
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

const startGame = () => {
  document.getElementById("game-start").style.display = "none";
  document.getElementById("game").style.display = "grid";
}

const aliens = [...document.getElementsByClassName("alien")];

const clickedHitButton = () => {
  killAll();
  let randomIndex = Math.floor(Math.random() * (aliens.length));
  alienList[randomIndex].hitTaken();

  if (alienList[randomIndex].hasDied()) {
    aliens[randomIndex].innerHTML = 0;
    aliens[randomIndex].style.backgroundColor = "black";
    aliens[randomIndex].style.backgroundImage = "url('./images/spaceship-crash.gif')";
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
      htmlAlien.style.backgroundImage = "url('./images/spaceship-crash.gif')";
      document.getElementById("game").style.display = "none";
      document.getElementById("game-over").style.display = "flex";
      document.getElementById("restart").addEventListener("click", restartButton);
    })
  }
}

const restartButton = () => {
  location.reload();
}

document.getElementById("start").addEventListener("click", startGame);
document.getElementById("hit-button").addEventListener("click", clickedHitButton);

let alienList = createAlien();