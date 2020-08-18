function gameInit() {
    let movementInterval;
    let birdInitialVelocityY;
    let gravityAcceleration;
    let currentBirdVelocityY;
    let gameFrameDiv = document.getElementById('game-frame');

    function initialize() {
        createObstacle(); // creates a single obstacle
        // moveObstacle; // moves all of the obstacles
        movement();
    }

    function createObstacle() {

        let gameFrameWidth = gameFrameDiv.offsetWidth;

        let newObstacleTop = document.createElement('div');
        let newObstacleBottom = document.createElement('div');

        setInitialAttributes(newObstacleTop);
        setInitialAttributes(newObstacleBottom);

        setElementPosition(newObstacleTop, 'top', 0);
        setElementPosition(newObstacleBottom, 'bottom', 0);

        setInitialHeight(newObstacleTop, newObstacleBottom);

        let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        newObstacleTop.style.backgroundColor = randomColor;
        newObstacleBottom.style.backgroundColor = randomColor;

        gameFrameDiv.appendChild(newObstacleTop);
        gameFrameDiv.appendChild(newObstacleBottom);

        function setInitialAttributes(element) {
            const obstacleWidth = 8;

            element.classList.add('obstacle');
            element.style.width = obstacleWidth + 'px';  // set the width of obstacle
            setElementPosition(element, 'left', gameFrameWidth);  // send it all the way to the right fo gameFrame
        }

        function setInitialHeight(obstacleTop, obstacleBottom) {
            const obstacleMargin = 200; // indicates the amount of space that FlappyBird can fly through
            const obstacleBottomHeight = Math.floor(Math.random() * (gameFrameDiv.offsetHeight - 200)) + 100; // a random number between 100 and gameFrameHeight-200
            obstacleBottom.style.height = obstacleBottomHeight + 'px';
            obstacleTop.style.height = gameFrameDiv.offsetHeight - obstacleMargin - obstacleBottomHeight + 60 + 'px';  // set the value of top obstacle, 20 is added so that topObstacle be visible
        }


    }

    function movement() {
        gravityAcceleration = -0.5;
        birdInitialVelocityY = 10; // this means bird is going up at first

        currentBirdVelocityY = birdInitialVelocityY;  // the initial speed along the Y axis
        let movementDelay = 20;

        let birdImage = document.getElementById('bird-img');
        birdImage.style.bottom = (Math.floor(2 * gameFrameDiv.offsetHeight / 3)).toString() + 'px';
        console.log('bottom:' + getElementPosition(birdImage, 'bottom'));

        movementInterval = setInterval(function () {
            let y = getElementPosition(birdImage, 'bottom') + currentBirdVelocityY;
            currentBirdVelocityY += gravityAcceleration;
            setElementPosition(birdImage, 'bottom', y);
        }, movementDelay);

    }

    function setElementPosition(element, attribute, value) { // value is raw number format
        switch (attribute) {
            case 'top':
                element.style.top = value.toString() + 'px';
                return;
            case 'bottom':
                element.style.bottom = value.toString() + 'px';
                return;
            case 'left':
                element.style.left = value.toString() + 'px';
                return;
            case 'right':
                element.style.right = value.toString() + 'px';
                return;
        }
    }

    function getElementPosition(element, attribute) {
        switch (attribute) {
            case 'top':
                return Number(element.style.top.replace('px', ''));
            case 'bottom':
                return Number(element.style.bottom.replace('px', ''));
            case 'left':
                return Number(element.style.left.replace('px', ''));
            case 'right':
                return Number(element.style.right.replace('px', ''));
        }
    }

    window.addEventListener('keydown', function (event) {
        if (event.code === 'ArrowUp') {
            currentBirdVelocityY = birdInitialVelocityY;
        }
    })

    document.getElementById('start-game-btn').addEventListener('click', function () {
        this.classList.add('hide');
        document.getElementById('bird-img').classList.remove('hide');
        initialize();
    });

}

window.addEventListener('load', gameInit);