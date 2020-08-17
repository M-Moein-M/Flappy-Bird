function gameInit() {
    let movementInterval;
    let birdInitialVelocityY;
    let gravityAcceleration;
    let currentBirdVelocityY;
    let gameFrameDiv = document.getElementById('game-frame');

    function initialize() {


        movement();
    }

    function movement() {
        gravityAcceleration = -0.5;
        birdInitialVelocityY = 10; // this means bird is going up at first

        currentBirdVelocityY = birdInitialVelocityY;  // the initial speed along the Y axis
        let movementDelay = 20;

        let birdImage = document.getElementById('bird-img');
        birdImage.style.bottom = (Math.floor(2*gameFrameDiv.offsetHeight / 3)).toString() + 'px';
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
                element.style.right = value.toString()+'px';
                return ;
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
        if (event.code ==='ArrowUp'){
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