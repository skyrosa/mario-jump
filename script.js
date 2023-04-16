document.addEventListener("DOMContentLoaded", () => {
  const mario = document.querySelector(".mario");
  const tunel = document.querySelector(".tunel");
  const scoreCount = document.querySelector(".score");

  let jumpInProgress = false;
  let score = 0;
  let passedTunel = false;

  const jump = () => {
      if (jumpInProgress) {
          return;
      }

      jumpInProgress = true;

      mario.classList.add("jump");

      setTimeout(() => {
          mario.classList.remove("jump");
          jumpInProgress = false;
      }, 800);
  };

  const loop = setInterval(() => {
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