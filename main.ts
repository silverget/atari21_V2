namespace SpriteKind {
    export const ralentisseur = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Food, SpriteKind.Player, function (sprite, otherSprite) {
    otherSprite.destroy(effects.spray)
    info.changeLifeBy(1)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . 
        . . . 8 8 . . . 
        . . . 8 8 . . . 
        . . 8 1 1 8 . . 
        . . 8 1 1 8 . . 
        . 8 8 8 8 8 8 . 
        . 2 2 2 2 2 2 . 
        . 2 . 2 2 . 2 . 
        `, ship, 0, -140)
    projectile.startEffect(effects.spray, 100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ralentisseur, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    otherSprite.destroy(effects.spray)
    ship.setVelocity(100, 50)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy(effects.spray)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    otherSprite.destroy(effects.spray)
    sprite.startEffect(effects.spray, 200)
    info.changeLifeBy(-1)
})
let virus: Sprite = null
let extraterrestre: Sprite = null
let asteroidgentil: Sprite = null
let projectile: Sprite = null
let ship: Sprite = null
let asteroids = [
sprites.space.spaceSmallAsteroid1,
sprites.space.spaceSmallAsteroid0,
sprites.space.spaceAsteroid0,
sprites.space.spaceAsteroid1,
sprites.space.spaceAsteroid4,
sprites.space.spaceAsteroid3
]
ship = sprites.create(assets.image`heros`, SpriteKind.Player)
ship.setFlag(SpriteFlag.StayInScreen, true)
ship.bottom = 120
controller.moveSprite(ship, 100, 0)
info.setLife(5)
effects.starField.startScreenEffect()
game.onUpdateInterval(5004, function () {
    asteroidgentil = sprites.createProjectileFromSide(img`
        . . . . . . . . . . . . . . . . 
        . . f f f . . . . . . f f f . . 
        . . f . e e e e e e e e . f . . 
        . . f f . . e e e e . . f f . . 
        . f f . d d . . . . d d . f f . 
        f f . . d 8 . . . . 8 d . . f f 
        f . . . . . . d d . . . . . . f 
        f . . . . . . . . . . . . . . f 
        f . f . . d d d d d d . . f . f 
        f . f f f . . e e . . f f f . f 
        f f f f f e e e e e e f f f f f 
        . . . . f f f f f f f f . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, 0, 75)
    asteroidgentil.setKind(SpriteKind.Food)
    asteroidgentil.x = randint(10, 150)
})
game.onUpdateInterval(18040, function () {
    extraterrestre = sprites.createProjectileFromSide(assets.image`extraterrestre`, 0, 75)
    extraterrestre.setKind(SpriteKind.Enemy)
    extraterrestre.x = randint(10, 150)
})
game.onUpdateInterval(1000, function () {
    projectile = sprites.createProjectileFromSide(asteroids[randint(0, asteroids.length - 1)], 0, 75)
    projectile.setKind(SpriteKind.Enemy)
    projectile.x = randint(10, 150)
})
game.onUpdateInterval(3005, function () {
    virus = sprites.createProjectileFromSide(assets.image`virus2`, 0, 75)
    virus.setKind(SpriteKind.ralentisseur)
    virus.x = randint(10, 150)
})
