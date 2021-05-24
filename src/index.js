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

const CountDogs = 5;
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
    this.load.image('buttonPlay', './assets/btn.png');
    this.load.image('char', './assets/char.png');
    this.load.image('logo', './assets/logo.png');

    for (let i = 0; i < CountDogs; i++) {
        this.load.image('dog' + i, './assets/doggy.png');
    }
    // ------------------------------
    for (let i = 0; i < circleAnimation.length; i++) {
        this.load.image(circleAnimation[i], `./assets/${circleAnimation[i]}.png`);
    }
    // ------------------------------
    this.load.image('dogText', './assets/doggy.png')
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

    for (let i = 0; i < CountDogs; i++) {
        let dog = this.add.image(positionsDogs[i].x, positionsDogs[i].y, 'dog' + i)
            .setInteractive()
            .on('pointerdown', function(pointer) {
                // this.setTint(0xff0000);
                animationAround(positionsDogs[i].x, positionsDogs[i].y);

                counterClick += 1;
                if (counterClick === CountDogs) {
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

    // var style = { font: "65px Arial", fill: "#fff", align: "center" };
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
    const startBlackout = this.add.rectangle((1075 / 2), (767 / 2), 1075, 767, 0x000000, 0.9); // изменить размер окна на const
    startBlackout.setDepth(1);
    startBlackout.setInteractive()

    const style = { font: "Bold 65px Arial", fill: "#fff", align: "left" };
    const text = this.add.text((1075 / 2), (767 / 2), "5 Hidden dogs \nCan you spot them?", style); // изменить размер окна на const
    text.setOrigin(.5, .5);
    text.setDepth(1);

    // buttonPlay
    // scene.input.setTopOnly(true)
    // startBlackout.on('pointerdown', function(pointer, localX, localY, event) {})
    const dogT = this.add.image(800, 320, 'dogText')
    dogT.setDepth(1);
    dogT.setFlipX(true);


    const buttonPlay = this.add.image((1075 / 2), (767 / 1.2), 'buttonPlay'); // изменить позиционирование на const
    buttonPlay.setInteractive()
    buttonPlay.setDepth(1);
    buttonPlay.on('pointerdown', function(pointer) {
        window.open('https://www.g5e.com/', '_blank');
    })


    const styleTextBtn = {
        font: "Bold 45px Arial",
        fill: "#FCF2ACFF",
        align: "center",
        shadow: {
            offsetX: 2,
            offsetY: 1,
            color: '#000',
            blur: 3,
            stroke: true,
            fill: true
        },
    };
    const textButton = this.add.text((1075 / 2), (767 / 1.2), "Play Now", styleTextBtn); // изменить размер окна на const
    textButton.setOrigin(.5, .5);
    textButton.setDepth(1);
    // var camera = scene.cameras.main


    // console.log(camera.zoom);
    let timeline = this.tweens.timeline()
    timeline.add({
        targets: [startBlackout, text, dogT, buttonPlay, textButton],
        alpha: 0,
        // ease: 'Power1',
        // duration: 3000,
        offset: 3000
    });
    timeline.play();

    // -----------------------------------------------------------------------------

    const curtain = () => {
        // const char = this.add.image((1075 / 4), (767 / 2), 'char');
        const char = this.add.image(-50, 767, 'char');

        char.setOrigin(0, 1);
        const logo = this.add.image((1075 / 2), (767 / 5), 'logo');

        // char.height = 200;
        // char.setSize(200, 200)
        // char.displayWidth = 200
        char.setScale(.8)


        char.setDepth(1);
        logo.setDepth(1);
        char.alpha = 0
        logo.alpha = 0

        timeline = this.tweens.timeline()
        timeline.add({
            targets: [startBlackout, char, logo],
            alpha: 1,
            // ease: 'Power1',
            // duration: 2000,
            // offset: 3000
        });
        timeline.play();
        console.log('curtain')

    };



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