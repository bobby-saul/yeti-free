# Yeti Free

A browser game built on Phaser.io that resembles SkiFree except instead of the skiers, you play as the monster (yeti).

## Game Play

Catch and eat skiers by moving around the mountain slopes to gain points and keep your health up. Avoid harmful objects to lose health. See how many points you can rack up!

## Developer Notes

For developing run ```npm i``` to install the proper node packages. The scripts to build in the development mode is ```npm run dev``` and to watch is ```npm run watch```. To build in production mode run ```npm run prod```. This project is currently using the latest long term support version of node (14.15.4).

This project contains the index.html file to load the js built by webpack from the source javascript located in js/src/index.js and placed in js/dist/index.js. The webpack build uses the babel loader for more browser support.

### Colors

- white #F4F4F2
- light grey #E8E8E8
- grey #BBBFCA
- dark grey #495464
- black #000000
- green #17B890
- dark green #107F63
- brown #725E54
- light blue #B8CFF5

### ToDo

For Beta
- [x] add yeti
- [x] add yeti movement
- [x] add background
- [x] camera follow yeti
- [x] add obstacles
    - [x] trees
    - [x] rocks
    - [x] ice
    - [x] snowman
    - [x] place randomly on map
- [x] add skiers
    - [x] make sprite
    - [x] add object
    - [x] move randomly
    - [x] avoid objects
- [ ] add health bar
- [ ] add score
- [ ] add eating animation
- [ ] add slip/trip animation

For 1.0.0
- [ ] fine tuning game play
- [ ] refactor code
- [ ] add sounds
    - [ ] sound effects (roar, scream, chewing)
    - [ ] background music
- [ ] add menu
- [ ] add high score
