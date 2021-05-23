import Phaser, { Game } from 'phaser';
var config = {
    type: Phaser.AUTO,
    width: 1075, // add CONST width and height
    height: 767,
    // physics: {
    //     default: 'arcade',
    //     arcade: {
    //         gravity: { y: 100 }
    //     }
    // },
    // physics: {
    //     default: 'matter',
    //     matter: {
    //         debug: true
    //     }
    // },
    scene: {
        preload: preload,
        create: create
    }
};

const game = new Phaser.Game(config);

const countDogs = 5;
let counterClick = 0;
const positionsDogs = [
    { x: 50, y: 210, scale: .8, flipX: true },
    { x: 140, y: 600 },
    {
        x: 700,
        y: 370,
        scale: .6,
        flipX: true
    },
    { x: 550, y: 500 },
    { x: 1000, y: 500, scale: .7 }
];
const circleAnimation = [
    'circle_1',
    'circle_2',
    'circle_3',
    'circle_4',
    'circle_5',
    'circle_6',
    'circle_7',
    'circle_8'
]

function preload() {

    this.load.image('background', './assets/back_five_dogs.jpg');

    for (let i = 0; i < countDogs; i++) {
        this.load.image('dog' + i, './assets/doggy.png');
    }
    // ------------------------------
    for (let i = 0; i < circleAnimation.length; i++) {
        this.load.image(circleAnimation[i], `./assets/${circleAnimation[i]}.png`);
    }
    // ------------------------------
}

function create() {
    this.add.image(537, 383, 'background');
    // ------------------------------------------------------------

    this.anims.create({
        key: 'circle_around',
        frames: [
            { key: 'circle_1' },
            { key: 'circle_2' },
            { key: 'circle_3' },
            { key: 'circle_4' },
            { key: 'circle_5' },
            { key: 'circle_6' },
            { key: 'circle_7' },
            { key: 'circle_8', duration: 40 }
        ],
        frameRate: 20,
        repeat: 0
    });
    const animationAround = (x, y) => {
        this.add.sprite(x, y, 'circle_1').play('circle_around');
    }

    for (let i = 0; i < countDogs; i++) {
        let dog = this.add.image(positionsDogs[i].x, positionsDogs[i].y, 'dog' + i)
            .setInteractive()
            .on('pointerdown', function(pointer) {
                this.setTint(0xff0000);
                counterClick += 1;
                animationAround(positionsDogs[i].x, positionsDogs[i].y)
                if (counterClick == countDogs) {
                    curtain()
                }
            })
        let scaleImg = positionsDogs[i].scale;
        let flipXImg = positionsDogs[i].flipX;
        if (scaleImg) dog.setScale(scaleImg);
        if (flipXImg) dog.setFlipX(flipXImg);
    }
    // ------------------------------------------------------------

    // var t = this.add.rectangle((1075 / 2), (767 / 2), 1075, 767, 0x000000);
    // t.alpha = 0.5;

    // var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
    // var text = this.add.text((1075 / 2), (767 / 2), "- phaser -\nwith a sprinkle of\npixi dust", style);
    // text.anchor.set(0.5);
    // text.alpha = 0;
    // this.tweens.add({
    //     targets: t,
    //     alpha: 0,
    //     duration: 0,
    //     offset: 4000,

    //     ease: 'Power2'
    // }, this);
    // this.add.tween(text).to({ alpha: 0 }, 2000, "Linear", true);

    // ------------------------------------------------------------
    const startBlackout = this.add.rectangle((1075 / 2), (767 / 2), 1075, 767, 0x000000, 0.9);
    // startBlackout.setDepth(1);
    startBlackout.setInteractive()
        // scene.input.setTopOnly(true)
        // startBlackout.on('pointerdown', function(pointer, localX, localY, event) {})

    var timeline = this.tweens.timeline()
    timeline.add({
        targets: startBlackout,
        alpha: 0,
        // ease: 'Power1',
        // duration: 3000,
        offset: 3000
    });
    timeline.play();

    var curtain = () => {
        var timeline = this.tweens.timeline()
        timeline.add({
            targets: startBlackout,
            alpha: 1,
            // ease: 'Power1',
            // duration: 2000,
            // offset: 3000
        });
        timeline.play();
        console.log('curtain')

    };

    // ------------------------------------------------------------
    // const startBlackout = this.add.rectangle((1075 / 2), (767 / 2), 1075, 767, 0x000000, 0.9);
    // const timeline = this.tweens.timeline()
    // timeline.add({
    //     targets: startBlackout,
    //     alpha: 0.1,
    //     // ease: 'Power1',
    //     duration: 13000,
    //     offset: 3000
    // });
    // timeline.play();




    // ------------------------------------------------------------

    // this.add.sprite(50, 210, 'circle_1')
    //     .play('circle_around');
    // for (let i = 0; i < circleAnimation.length; i++) {
    //     for (let j = 0; j < positionsDogs.length; j++) {

    //     }
    //     this.add.image(positionsDogs[i].x, positionsDogs[i].y, circleAnimation[i]);
    // }


    // dog2.on('pointerdown', function(pointer) {
    //     console.log('dog')

    //     this.setTint(0xff0000);

    // });


    // var particles = this.add.particles('red');

    // var emitter = particles.createEmitter({
    //     speed: 100,
    //     scale: { start: 1, end: 0 },
    //     blendMode: 'ADD'
    // });

    // var logo = this.physics.add.image(400, 100, 'logo');

    // logo.setVelocity(100, 200);
    // logo.setBounce(1, 1);
    // logo.setCollideWorldBounds(true);

    // emitter.startFollow(logo);
}