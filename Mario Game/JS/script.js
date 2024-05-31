const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelectorAll('.clouds, .clouds1');
const telaInicial = document.getElementById('tela-inicial');
const telaFinal = document.getElementById('tela-final');
const botaoJogar = document.getElementById('botaoJogar');
const botaoRecomecar = document.getElementById('botaoRecomecar');
const gameBoard = document.querySelector('.game-board');
const scoreElement = document.getElementById('score');
const finalScoreElement = document.getElementById('final-score');
let jogoAtivo = false;
let loop = null;
let score = 0;

// Função de pulo
const jump = () => {
  if (!jogoAtivo) return; 
  mario.classList.add('jump');
  const pulo = document.getElementById('pulo');
  pulo.volume = 0.1;
  pulo.play();

  setTimeout(() => {
    mario.classList.remove('jump');
  }, 500);
}

// Loop do jogo
const gameLoop = () => {
  loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      pipe.style.animation = 'none';
      pipe.style.left = `${pipePosition}px`;

      mario.style.animation = 'none';
      mario.style.bottom = `${marioPosition}px`;

      mario.src = './Images/game-over.png';
      mario.style.width = '75px';
      mario.style.marginLeft = '50px';

      clearInterval(loop);
      jogoAtivo = false;
      mostrarTelaFinal();
    }
  }, 10);
}

const mostrarTelaFinal = () => {
  finalScoreElement.textContent = `Score: ${score}`;
  telaFinal.style.display = 'flex';
}

const resetGame = () => {
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    mario.src = './Images/mario.gif';
    mario.style.width = '150px';
    mario.style.marginLeft = '0';
    mario.style.bottom = '0';
    pipe.style.animation = 'pipe-animation 1.5s infinite linear';
    pipe.style.left = '';
    clouds.forEach(cloud => {
      cloud.style.animation = '';
      cloud.classList.remove('iniciar'); 
    });
    telaFinal.style.display = 'none';
    telaInicial.style.display = 'flex';
    jogoAtivo = true; 
    jump(); 
    gameLoop(); 
  }
  

document.addEventListener('keydown', (event) => {
  if (event.key === 'w' || event.key === 'W' || event.key === ' ' || event.key === 'ArrowUp') {
    jump();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  pipe.classList.add('pipe-parado');
  clouds.forEach(cloud => cloud.classList.add('clouds-parado'));

  botaoJogar.addEventListener('click', () => {
    const som = document.getElementById('theme-mario');
    som.loop = true;
    som.volume = 0.3;
    som.play();

    const intervalo = setInterval(() => {
      if (!jogoAtivo) {
        const gameover = document.getElementById('game-over');
        clearInterval(intervalo);
        som.loop = false;
        som.pause(); 
        gameover.volume = 0.3;
        gameover.play();
      }
    }, 100); 
  });

  botaoJogar.addEventListener('click', () => {
    telaInicial.style.display = 'none';
    gameBoard.style.display = 'block';
    jogoAtivo = true;
    pipe.classList.remove('pipe-parado');
    pipe.classList.add('iniciar');
    clouds.forEach(cloud => {
      cloud.classList.remove('clouds-parado');
      cloud.classList.add('iniciar');
    });
    gameLoop();

    const som = document.getElementById('theme-mario');
    som.loop = true;
    som.volume = 0.3;
    som.play();
  });
// eu estava tendo problema pra recomeçar, por isso, coloquei algo para ATUALIZAR A PÁGINA, que aí volta ao normal
//o problema que tava tendo era que ficava tudo bugado, mas isso resolveu, amém
  botaoRecomecar.addEventListener('click', () => {
    window.location.reload(); // isso recarrega a página
  });
  
  setInterval(() => {
    if (jogoAtivo) {
      atualizarScore();
    }
  }, 2000);
});

const atualizarScore = () => {
  score += 10;
  scoreElement.textContent = `Score: ${score}`;
}


// Só Deus sabe como esse código tá funcionando
