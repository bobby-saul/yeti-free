const width = 50;
const height = 10;
const heightOffset = 42;
const widthOffset = 24;

class HealthBar {
    constructor(scene) {
        this.scene = scene;
        // Outline
        this.outline = this.scene.add.graphics();
        this.outline.lineStyle(1, 0x495464, 1.0);
        this.outline.strokeRect(0, 0, width, height);
        // Bar
        this.bar = this.scene.add.graphics();
        this.bar.fillStyle(0x17B890, 1.0);
        this.bar.fillRect(0, 0, width, height);
    }
    
    update() {
        var x = this.scene.yeti.body.x + (window.innerWidth / 2) - width - widthOffset;
        var y = this.scene.yeti.body.y - (window.innerHeight / 2) + height + heightOffset;
        // OutLine
        this.outline.x = x;
        this.outline.y = y;
        // Bar
        this.bar.clear();
        if (this.scene.yeti.health > 666) {
            this.bar.fillStyle(0x17B890, 1.0);
        } else if (this.scene.yeti.health > 333) {
            this.bar.fillStyle(0xFA7921, 1.0);
        } else {
            this.bar.fillStyle(0xAD2F45, 1.0);
        }
        this.bar.fillRect(0, 0, width, height);
        this.bar.x = x;
        this.bar.y = y;
        this.bar.scaleX = this.scene.yeti.health / 1000;
    }
}

export default HealthBar;
