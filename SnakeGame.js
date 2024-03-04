
    document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("gameBoard");
    const startButton = document.getElementById("startButton");
    const stopButton = document.getElementById("stopButton");
    const scoreElement = document.getElementById("score");

    let snake = [{ x: 10, y: 10 }];
    let food = { x: 5, y: 5 };
    let direction = "right";
    let score = 0;
    let gameInterval;

    function updateScore() {
        scoreElement.textContent = score;
    }

    function draw() {
        gameBoard.innerHTML = "";

        snake.forEach(segment => {
            const snakeSegment = document.createElement("div");
            snakeSegment.classList.add("snake");
            snakeSegment.style.left = segment.x * 20 + "px";
            snakeSegment.style.top = segment.y * 20 + "px";
            gameBoard.appendChild(snakeSegment);
        });

        const foodElement = document.createElement("div");
        foodElement.classList.add("food");
        foodElement.style.left = food.x * 20 + "px";
        foodElement.style.top = food.y * 20 + "px";
        gameBoard.appendChild(foodElement);
    }

    function moveSnake() {
        const head = { ...snake[0] };

        switch (direction) {
            case "up":
                head.y--;
                break;
            case "down":
                head.y++;
                break;
            case "left":
                head.x--;
                break;
            case "right":
                head.x++;
                break;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score++;
            updateScore();
            generateFood();
        } else {
            snake.pop();
        }
    }

    function generateFood() {
        food = {
            x: Math.floor(Math.random() * 15),
            y: Math.floor(Math.random() * 15)
        };
    }

    function gameOver() {
        clearInterval(gameInterval);
        alert("Game Over! Your score: " + score);
        snake = [{ x: 10, y: 10 }];
        direction = "right";
        score = 0;
        updateScore();
        draw();
    }

    startButton.addEventListener("click", () => {
        if (!gameInterval) {
            gameInterval = setInterval(() => {
                moveSnake();
                draw();
                if (checkCollision()) {
                    gameOver();
                }
            }, 200);
        }
    });

    stopButton.addEventListener("click", () => {
        clearInterval(gameInterval);
        gameInterval = null;
    });

    function checkCollision() {
        const head = snake[0];
        return (
            head.x < 0 ||
            head.x >= 15 ||
            head.y < 0 ||
            head.y >= 15 ||
            snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
        );
    }

    document.addEventListener("keydown", event => {
        switch (event.key) {
            case "ArrowUp":
                if (direction !== "down") direction = "up";
                break;
            case "ArrowDown":
                if (direction !== "up") direction = "down";
                break;
            case "ArrowLeft":
                if (direction !== "right") direction = "left";
                break;
            case "ArrowRight":
                if (direction !== "left") direction = "right";
                break;
        }
    });

    updateScore();
    draw();
});

    
