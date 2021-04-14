def on_a_pressed():
    global projectile
    projectile = sprites.create_projectile_from_sprite(img("""
            . . . . . . . . 
                    . . . . . . . . 
                    . . . . . . . . 
                    . . . . . . . . 
                    . . . 7 7 . . . 
                    . . . 7 7 . . . 
                    . . . 7 7 . . . 
                    . . . 7 7 . . .
        """),
        ship,
        0,
        -140)
    projectile = sprites.create_projectile_from_sprite(img("""
            . . . . . . . . 
                    . . . . . . . . 
                    . . . . . . . . 
                    . . . . . . . . 
                    . . . 7 7 . . . 
                    . . . 7 7 . . . 
                    . . . 7 7 . . . 
                    . . . 7 7 . . .
        """),
        ship,
        20,
        -140)
    projectile = sprites.create_projectile_from_sprite(img("""
            . . . . . . . . 
                    . . . . . . . . 
                    . . . . . . . . 
                    . . . . . . . . 
                    . . . 7 7 . . . 
                    . . . 7 7 . . . 
                    . . . 7 7 . . . 
                    . . . 7 7 . . .
        """),
        ship,
        -20,
        -140)
    projectile.start_effect(effects.spray, 100)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_overlap(sprite, otherSprite):
    sprite.destroy()
    otherSprite.destroy(effects.spray)
    info.change_score_by(1)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap)

def on_on_overlap2(sprite, otherSprite):
    scene.camera_shake(4, 500)
    otherSprite.destroy(effects.spray)
    sprite.start_effect(effects.spray, 200)
    info.change_life_by(-1)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap2)

projectile: Sprite = None
ship: Sprite = None
asteroids = [sprites.space.space_small_asteroid1,
    sprites.space.space_small_asteroid0,
    sprites.space.space_asteroid0,
    sprites.space.space_asteroid1,
    sprites.space.space_asteroid4,
    sprites.space.space_asteroid3]
ship = sprites.create(sprites.space.space_red_ship, SpriteKind.player)
ship.set_flag(SpriteFlag.STAY_IN_SCREEN, True)
ship.bottom = 120
controller.move_sprite(ship, 100, 100)
info.set_life(3)
effects.star_field.start_screen_effect()

def on_update_interval():
    global projectile
    projectile = sprites.create_projectile_from_side(asteroids[randint(0, len(asteroids) - 1)], 0, 75)
    projectile.set_kind(SpriteKind.enemy)
    projectile.x = randint(10, 150)
game.on_update_interval(500, on_update_interval)
