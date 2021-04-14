@namespace
class SpriteKind:
    ralentisseur = SpriteKind.create()

def on_a_pressed():
    global projectile
    projectile = sprites.create_projectile_from_sprite(img("""
            . . . . . . . . 
                    . . . 8 8 . . . 
                    . . . 8 8 . . . 
                    . . 8 1 1 8 . . 
                    . . 8 1 1 8 . . 
                    . 8 8 8 8 8 8 . 
                    . 2 2 2 2 2 2 . 
                    . 2 . 2 2 . 2 .
        """),
        ship,
        0,
        -140)
    projectile.start_effect(effects.spray, 100)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_overlap(sprite, otherSprite):
    scene.camera_shake(4, 500)
    otherSprite.destroy(effects.spray)
    ship.set_velocity(100, 50)
sprites.on_overlap(SpriteKind.player, SpriteKind.ralentisseur, on_on_overlap)

def on_on_overlap2(sprite, otherSprite):
    sprite.destroy()
    otherSprite.destroy(effects.spray)
    info.change_score_by(1)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap2)

def on_on_overlap3(sprite, otherSprite):
    scene.camera_shake(4, 500)
    otherSprite.destroy(effects.spray)
    sprite.start_effect(effects.spray, 200)
    info.change_life_by(-1)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap3)

virus: Sprite = None
extraterrestre: Sprite = None
projectile: Sprite = None
ship: Sprite = None
asteroids = [sprites.space.space_small_asteroid1,
    sprites.space.space_small_asteroid0,
    sprites.space.space_asteroid0,
    sprites.space.space_asteroid1,
    sprites.space.space_asteroid4,
    sprites.space.space_asteroid3]
ship = sprites.create(assets.image("""
    heros
"""), SpriteKind.player)
ship.set_flag(SpriteFlag.STAY_IN_SCREEN, True)
ship.bottom = 120
controller.move_sprite(ship, 100, 0)
info.set_life(5)
effects.star_field.start_screen_effect()

def on_update_interval():
    global extraterrestre
    extraterrestre = sprites.create_projectile_from_side(assets.image("""
        extraterrestre
    """), 0, 75)
    extraterrestre.set_kind(SpriteKind.enemy)
    extraterrestre.x = randint(10, 150)
game.on_update_interval(18040, on_update_interval)

def on_update_interval2():
    global projectile
    projectile = sprites.create_projectile_from_side(asteroids[randint(0, len(asteroids) - 1)], 0, 75)
    projectile.set_kind(SpriteKind.enemy)
    projectile.x = randint(10, 150)
game.on_update_interval(1000, on_update_interval2)

def on_update_interval3():
    global virus
    virus = sprites.create_projectile_from_side(assets.image("""
        virus2
    """), 0, 75)
    virus.set_kind(SpriteKind.ralentisseur)
    virus.set_velocity(50, 50)
game.on_update_interval(3005, on_update_interval3)
