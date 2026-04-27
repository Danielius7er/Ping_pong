// Canvas and context
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Game objects
const paddle = {
    x: 10,
    y: canvas.height / 2 - 50,
    width: 15,
    height: 100,
    dy: 0,
    maxSpeed: 6
};

const computer = {
    x: canvas.width - 25,
    y: canvas.height / 2 - 50,
    width: 15,
    height: 100,
    dy: 0,
    maxSpeed: 4
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 8,
    dx: 5,
    dy: 5,
    speed: 5,
    maxSpeed: 8
};

let scores = {
    player: 0,
    computer: 0
};

let gameRunning = false;
let mouseY = canvas.height / 2;

// Event listeners
document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('resetBtn').addEventListener('click', resetScore);
document.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseY = e.clientY - rect.top;
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && paddle.y > 0) {
        paddle.dy = -paddle.maxSpeed;
    } else if (e.key === 'ArrowDown' && paddle.y < canvas.height - paddle.height) {
        paddle.dy = paddle.maxSpeed;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        paddle.dy = 0;
    }
});

function startGame() {
    gameRunning = true;
    document.getElementById('startBtn').textContent = 'Game Running...';
    document.getElementById('startBtn').disabled = true;
}

function resetScore() {
    scores.player = 0;
    scores.computer = 0;
    updateScore();
    resetBall();
    gameRunning = false;
    document.getElementById('startBtn').textContent = 'Start Game';
    document.getElementById('startBtn').disabled = false;
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = (Math.random() > 0.5 ? 1 : -1) * 5;
    ball.dy = (Math.random() - 0.5) * 5;
}

function updateScore() {
    document.getElementById('playerScore').textContent = scores.player;
    document.getElementById('computerScore').textContent = scores.computer;
}

function updatePlayerPaddle() {
    // Mouse control
    paddle.y = mouseY - paddle.height / 2;
    
    // Keep paddle within bounds
    if (paddle.y < 0) paddle.y = 0;
    if (paddle.y + paddle.height > canvas.height) {
        paddle.y = canvas.height - paddle.height;
    }
}

function updateComputerPaddle() {
    const computerCenter = computer.y + computer.height / 2;
    const ballCenter = ball.y;
    
    // Add some lag/difficulty
    if (ballCenter < computerCenter - 35) {
        computer.dy = -computer.maxSpeed;
    } else if (ballCenter > computerCenter + 35) {
        computer.dy = computer.maxSpeed;
    } else {
        computer.dy = 0;
    }
    
    computer.y += computer.dy;
    
    // Keep paddle within bounds
    if (computer.y < 0) computer.y = 0;
    if (computer.y + computer.height > canvas.height) {
        computer.y = canvas.height - computer.height;
    }
}

function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
    
    // Wall collision (top and bottom)
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy;
        // Keep ball in bounds
        if (ball.y - ball.radius < 0) ball.y = ball.radius;
        if (ball.y + ball.radius > canvas.height) ball.y = canvas.height - ball.radius;
    }
    
    // Paddle collision
    // Player paddle
    if (ball.x - ball.radius < paddle.x + paddle.width &&
        ball.y > paddle.y &&
        ball.y < paddle.y + paddle.height) {
        
        ball.dx = Math.abs(ball.dx); // Ensure ball moves right
        ball.x = paddle.x + paddle.width + ball.radius;
        
        // Add spin based on where ball hits paddle
        let deltaY = (ball.y - (paddle.y + paddle.height / 2)) / (paddle.height / 2);
        ball.dy += deltaY * 3;
        
        // Increase speed slightly
        if (Math.abs(ball.dx) < ball.maxSpeed) {
            ball.dx *= 1.05;
        }
    }
    
    // Computer paddle
    if (ball.x + ball.radius > computer.x &&
        ball.y > computer.y &&
        ball.y < computer.y + computer.height) {
        
        ball.dx = -Math.abs(ball.dx); // Ensure ball moves left
        ball.x = computer.x - ball.radius;
        
        // Add spin based on where ball hits paddle
        let deltaY = (ball.y - (computer.y + computer.height / 2)) / (computer.height / 2);
        ball.dy += deltaY * 3;
        
        // Increase speed slightly
        if (Math.abs(ball.dx) < ball.maxSpeed) {
            ball.dx *= 1.05;
        }
    }
    
    // Score points
    if (ball.x - ball.radius < 0) {
        scores.computer++;
        updateScore();
        resetBall();
    }
    
    if (ball.x + ball.radius > canvas.width) {
        scores.player++;
        updateScore();
        resetBall();
    }
}

function drawPaddle(p, color) {
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 15;
    ctx.fillRect(p.x, p.y, p.width, p.height);
    ctx.shadowBlur = 0;
}

function drawBall() {
    ctx.fillStyle = '#ff00ff';
    ctx.shadowColor = '#ff00ff';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
}

function drawCenterLine() {
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
    ctx.setLineDash([10, 10]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
}

function draw() {
    // Clear canvas with gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'rgba(10, 0, 30, 0.9)');
    gradient.addColorStop(1, 'rgba(20, 0, 40, 0.9)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw elements
    drawCenterLine();
    drawPaddle(paddle, '#00ff88');
    drawPaddle(computer, '#ff0088');
    drawBall();
}

function update() {
    if (gameRunning) {
        updatePlayerPaddle();
        updateComputerPaddle();
        updateBall();
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start game loop
gameLoop();
updateScore();
