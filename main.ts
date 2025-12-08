/**
 * --- Inicialización del Juego ---
 */
function mode_attack () {
    // ⭐️ OPTIMIZACIÓN: Itera sobre TODOS los enemigos para que todos sigan al jugador
    for (let un_enemigo of sprites.allOfKind(SpriteKind.Enemy)) {
        un_enemigo.follow(mySprite, 100)
    }
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.MovingUp))
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingRight)) || characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.MovingRight))) {
        projectile = sprites.createProjectileFromSprite(assets.image`bullet_initial`, mySprite, 200, 0)
    } else if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingLeft)) || characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.MovingLeft))) {
        projectile = sprites.createProjectileFromSprite(assets.image`bullet_initial`, mySprite, -200, 0)
    } else if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingDown)) || characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.MovingDown))) {
        projectile = sprites.createProjectileFromSprite(assets.image`bullet_initial`, mySprite, 0, 200)
    } else if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingUp)) || characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.MovingUp))) {
        projectile = sprites.createProjectileFromSprite(assets.image`bullet_initial`, mySprite, 0, -200)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    characterAnimations.setCharacterAnimationsEnabled(mySprite, false)
    if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingRight))) {
        animation.runImageAnimation(
        mySprite,
        assets.animation`dodge_roll_rigth`,
        80,
        false
        )
        pause(650)
        dodge_roll = false
        characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.FacingRight))
    } else if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingLeft))) {
        animation.runImageAnimation(
        mySprite,
        assets.animation`dodge_roll_left`,
        80,
        false
        )
        pause(650)
        dodge_roll = false
        characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.FacingLeft))
    } else if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingDown))) {
        animation.runImageAnimation(
        mySprite,
        assets.animation`dodge_roll_front`,
        80,
        false
        )
        pause(650)
        dodge_roll = false
        characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.FacingDown))
    } else if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingUp))) {
        animation.runImageAnimation(
        mySprite,
        assets.animation`dodge_roll_back`,
        80,
        false
        )
        pause(650)
        dodge_roll = false
        characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.MovingUp))
    }
    if (!(dodge_roll)) {
        characterAnimations.setCharacterAnimationsEnabled(mySprite, true)
    }
})
// Funciones de released (Optimizadas en la respuesta anterior)
controller.down.onEvent(ControllerButtonEvent.Released, function () {
    characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.FacingDown))
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.MovingLeft))
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.FacingRight))
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.FacingLeft))
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.MovingRight))
})
// ⭐️ NUEVA FUNCIÓN: Genera múltiples enemigos en diferentes posiciones
function spawn_enemis_multiple () {
    let nuevo_enemigo: Sprite;
for (let pos_tile of POSICIONES_ENEMIGOS) {
        nuevo_enemigo = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy)
        nuevo_enemigo.setPosition(pos_tile, 270)
        // Configuración de animaciones para ESTE enemigo (repetir para cada uno)
        characterAnimations.loopFrames(
        nuevo_enemigo,
        assets.animation`myAnim`,
        200,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        nuevo_enemigo,
        assets.animation`myAnim0`,
        200,
        characterAnimations.rule(Predicate.FacingRight)
        )
    }
}
controller.up.onEvent(ControllerButtonEvent.Released, function () {
    characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.FacingUp))
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.MovingDown))
})
let dodge_roll = false
let projectile: Sprite = null
let mySprite: Sprite = null
let POSICIONES_ENEMIGOS: number[] = []
POSICIONES_ENEMIGOS = [
300,
315,
320,
340
]
mySprite = sprites.create(assets.image`myImage`, SpriteKind.Player)
mySprite.setPosition(300, 270)
// Establecer velocidad máxima
// Configuración de animaciones del jugador... (se mantiene igual)
characterAnimations.loopFrames(
mySprite,
assets.animation`run_front_pilot`,
120,
characterAnimations.rule(Predicate.MovingDown)
)
characterAnimations.loopFrames(
mySprite,
assets.animation`run_back_player`,
120,
characterAnimations.rule(Predicate.MovingUp)
)
characterAnimations.loopFrames(
mySprite,
assets.animation`run_right_pilot0`,
120,
characterAnimations.rule(Predicate.MovingRight)
)
characterAnimations.loopFrames(
mySprite,
assets.animation`run_right_pilot`,
120,
characterAnimations.rule(Predicate.MovingLeft)
)
characterAnimations.loopFrames(
mySprite,
assets.animation`still_down`,
220,
characterAnimations.rule(Predicate.FacingDown)
)
characterAnimations.loopFrames(
mySprite,
assets.animation`side_rigth`,
220,
characterAnimations.rule(Predicate.FacingRight)
)
characterAnimations.loopFrames(
mySprite,
assets.animation`side_left`,
220,
characterAnimations.rule(Predicate.FacingLeft)
)
characterAnimations.loopFrames(
mySprite,
assets.animation`back_player`,
300,
characterAnimations.rule(Predicate.FacingUp)
)
// ⭐️ LLAMAR A LA NUEVA FUNCIÓN DE SPAWN
spawn_enemis_multiple()
controller.moveSprite(mySprite)
scene.cameraFollowSprite(mySprite)
tiles.setCurrentTilemap(tilemap`first_dungeon`)
// ⭐️ Opcional: Implementar aquí la lógica de animación por dirección para los enemigos
game.onUpdate(function () {
	
})
game.onUpdateInterval(500, function () {
	
})
