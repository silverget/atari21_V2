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
controller.moveSprite(ship, 100, 100)
info.setLife(5)
effects.starField.startScreenEffect()
game.onUpdateInterval(1900, function () {
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
    virus.setKind(SpriteKind.Enemy)
    virus.x = randint(10, 150)
})
