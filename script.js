  document.addEventListener("DOMContentLoaded", () => {
    const mario = document.querySelector(".mario");
    const tunel = document.querySelector(".tunel");
    const scoreCount = document.querySelector(".score");
    const restart = document.querySelector("#restart");
    const highScoreList = document.querySelector(".high-score");

    let jumpInProgress = false;
    let score = 0;
    let passedTunel = false;
    let jumpSound = new Audio('./audio/jump-sound.mp3');
    let gameOverSound = new Audio('./audio/game-over-sound.mp3');
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const highestScore = highScores.length > 0 ? Math.max(...highScores) : 0;
highScoreList.textContent = "High Score: " + highestScore;

    const bgMusic = new Audio('./audio/backgroundsound.mp3');
    bgMusic.loop = true;
    bgMusic.play();

    const jump = () => {
        if (jumpInProgress) {
            return;
        }

        jumpInProgress = true;

        mario.src = "./img/mario-jump.png";

        mario.classList.add("jump");

        setTimeout(() => {
            mario.classList.remove("jump");
            jumpInProgress = false;
            mario.src = "./img/mario-run.gif";
        }, 770);
        jumpSound.play();
    };

    restart.style.display = "none";

    restart.addEventListener("click", () => {
      score = 0;
      passedTunel = false;

      scoreCount.textContent = "Score: " + score;

      mario.src = "./img/mario-run.gif";
      mario.style.width = "120px";
      mario.style.marginLeft = "0";
      mario.style.bottom = "-3%";
      mario.style.animationPlayState = "running";
      
      tunel.style.animation = 'none';
      tunel.offsetHeight;
      tunel.style.animation = null;
      tunel.style.animationPlayState = "running";
      tunel.style.right = "90%";

      if (bgMusic.ended) {
        bgMusic.currentTime = 0;
      }
      bgMusic.play();

      restart.style.display = "none";
    });
    
    function checkCollisions() {
      
      if (tunel.offsetLeft <= mario.offsetLeft + mario.offsetWidth &&
        tunel.offsetLeft + tunel.offsetWidth >= mario.offsetLeft &&
        tunel.offsetTop <= mario.offsetTop + mario.offsetHeight &&
        tunel.offsetTop + tunel.offsetHeight >= mario.offsetTop) {
          
          passedTunel = true;
          tunel.style.animationPlayState = "paused";
          mario.style.animationPlayState = "paused";

          bgMusic.pause();
          gameOverSound.play();
          
          gameOverSound.addEventListener("ended", () => {
            bgMusic.play();
          });

          if (score > highestScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
            highScoreList.textContent = "High Score: " + highScore;
          }

        restart.style.display = "block";

      }
    }

    const loop = setInterval(() => {
      scoreCount.textContent = "Score: " + score;
        const tunelPosition = tunel.offsetLeft;
        const marioPosition = +window
            .getComputedStyle(mario)
            .bottom.replace("px", ""); 

        if (
            tunelPosition <= 69 &&
            tunelPosition > 10 &&
            marioPosition < 70 &&
            !passedTunel
            ) {
            tunel.style.left = "${tunelPosition}%";
            tunel.style.animationPlayState = "paused";

            mario.style.bottom = "${marioPosition}%";
            mario.style.animationPlayState = "paused";

            mario.src = "./img/mario-lost.png";
            mario.style.width = "81px";
            mario.style.marginLeft = "16px";

            checkCollisions();

          } else if (tunelPosition <= 10 && tunelPosition > -20) {
            if (!passedTunel) {
              score++;
              scoreCount.textContent = "Score: " + score;
              passedTunel = true;
            }
          }else {
            passedTunel = false; 
          } 
        }, 10);
    
    if (mario) {
        document.addEventListener("keydown", () => {
            jump();
        });
    } else {
        console.error("Mario not jumping");
    }
  });