function gameInit() {
    let movementInterval;
    let birdInitialVelocityY;
    let gravityAcceleration;
    let currentBirdVelocityY;
    let gameFrameDiv = document.getElementById('game-frame');
    let currentObstacleID = 0; // after creating new obstacle we set the id equal to this number and increase the value by 1
    // 0top for the top obstacle, 0bottom for the bottom obstacle

    const obstacleWidth = 8;

    let createObstacleInterval;
    let moveObstacleInterval;

    let obstacleMoveDelay = 20;

    function initialize() {
        createObstacleInterval = setInterval(createObstacle, 2000);
        moveObstacleInterval = setInterval(moveObstacle, obstacleMoveDelay);

        movement();
    }

    function moveObstacle() {// moves all of the obstacles
        const obstacleSpeed = -3;
        let allObstacles = gameFrameDiv.children;
        for (let obs of allObstacles) {
            if (obs.classList.contains('obstacle')) {
                setElementPosition(obs, 'left', getElementPosition(obs, 'left') + obstacleSpeed);
                removeOutOFGameFrameObstacle(obs);
            }
        }
    }

    function checkForCollision() {
        let birdImage = document.getElementById('bird-img');
        const offset = 50;  // indicates how much we can move out side off the game frame
        if (getElementPosition(birdImage, 'bottom') > gameFrameDiv.offsetHeight + offset ||
            getElementPosition(birdImage, 'bottom') + birdImage.offsetHeight < -offset / 2)
            clearAllIntervals();  // means the game will freeze

        let allObstacles = gameFrameDiv.children;
        for (let obs of allObstacles) {
            if (obs.classList.contains('obstacle')) {
                const obstacleLeft = getElementPosition(obs, 'left');
                const obstacleRight = obstacleLeft + obstacleWidth;
                const birdLeft = getElementPosition(birdImage, 'left');
                const birdRight = birdLeft + birdImage.offsetWidth;
                if (birdLeft < obstacleRight && birdRight > obstacleLeft) { // there's a chance that bird hits the obstacle ( checking for in range x)
                    let obstacleTop;
                    let obstacleBottom;
                    if (obs.id.includes('top')) { // if this is a top obstacle it means that it only has style.top
                        obstacleTop = gameFrameDiv.offsetHeight;
                        obstacleBottom = obstacleTop - document.getElementById(obs.id).offsetHeight;
                    } else if (obs.id.includes('bottom')) {  // if this is a bottom obstacle it means that it only has style.bottom
                        obstacleBottom = 0;
                        obstacleTop = obstacleBottom + document.getElementById(obs.id).offsetHeight;
                    }
                    const birdBottom = getElementPosition(birdImage, 'bottom');
                    const birdTop = birdBottom + birdImage.offsetHeight;
                    if (birdTop > obstacleBottom && birdBottom < obstacleTop)
                        clearAllIntervals();
                }
            }
        }

    }

    function clearAllIntervals() {
        clearInterval(moveObstacleInterval);
        clearInterval(createObstacleInterval);
        clearInterval(movementInterval);
    }

    function removeOutOFGameFrameObstacle(obstacle) {  // removes the obstacle if it reaches the left side of the gameFrame
        if (getElementPosition(obstacle, 'left') < 0)
            obstacle.remove();
    }

    function createObstacle() {  // creates a single obstacle
        currentObstacleID += 1;
        let gameFrameWidth = gameFrameDiv.offsetWidth;

        let newObstacleTop = document.createElement('div');
        let newObstacleBottom = document.createElement('div');

        newObstacleTop.id = currentObstacleID + 'top';
        newObstacleBottom.id = currentObstacleID + 'bottom';

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

            element.classList.add('obstacle');
            element.style.width = obstacleWidth + 'px';  // set the width of obstacle
            setElementPosition(element, 'left', gameFrameWidth);  // send it all the way to the right fo gameFrame
        }

        function setInitialHeight(obstacleTop, obstacleBottom) {
            const obstacleMargin = 200; // indicates the amount of space that FlappyBird can fly through
            const obstacleBottomHeight = Math.floor(Math.random() * (gameFrameDiv.offsetHeight - obstacleMargin)); // a random number between 0 and Height-margin
            obstacleBottom.style.height = obstacleBottomHeight + 'px';
            obstacleTop.style.height = gameFrameDiv.offsetHeight - obstacleMargin - obstacleBottomHeight + 'px';  // set the value of top obstacle, 20 is added so that topObstacle be visible
        }

    }

    function movement() {
        gravityAcceleration = -0.5;
        birdInitialVelocityY = 10; // this means bird is going up at first

        currentBirdVelocityY = birdInitialVelocityY;  // the initial speed along the Y axis
        let movementDelay = 20;

        let birdImage = document.getElementById('bird-img');

        setElementPosition(birdImage, 'bottom', (Math.floor(2 * gameFrameDiv.offsetHeight / 3)))
        setElementPosition(birdImage, 'left', 30);


        movementInterval = setInterval(function () {
            let y = getElementPosition(birdImage, 'bottom') + currentBirdVelocityY;
            currentBirdVelocityY += gravityAcceleration;
            setElementPosition(birdImage, 'bottom', y);
            checkForCollision();
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