class ScoreBoard {
    constructor(scene) {
        this.scene = scene;
        this.scoreText = this.scene.add.text(0, 0, 'Score: 0', {
            fontSize: '12px',
            fill: '#000',
            align: 'right',
        });
    }
    
    update() {
        var x = this.scene.yeti.body.x + (window.innerWidth * window.devicePixelRatio / 2) - this.scoreText.width;
        var y = this.scene.yeti.body.y - (window.innerHeight * window.devicePixelRatio / 2) + this.scoreText.height;
        this.scoreText.setText('Score: ' + this.scene.yeti.score);
        this.scoreText.x = x;
        this.scoreText.y = y;
    }
}

export default ScoreBoard;