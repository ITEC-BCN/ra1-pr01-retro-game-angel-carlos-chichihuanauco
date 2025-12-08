namespace SpriteKind {
    export const npc = SpriteKind.create()
    export const bullet_poryectile = SpriteKind.create()
    export const tp_sala = SpriteKind.create()
    export const tp_jefe = SpriteKind.create()
}
// --- Inicialización del Juego ---
function mode_attack () {
    // ⭐️ OPTIMIZACIÓN: Itera sobre TODOS los enemigos para que todos sigan al jugador
    for (let un_enemigo of sprites.allOfKind(SpriteKind.bullet_poryectile)) {
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
// Nota: Asegúrate de que los sprites 'npc_controles' y 'npc_historia' estén definidos.
sprites.onOverlap(SpriteKind.Player, SpriteKind.npc, function (sprite_player, otherSprite) {
    let delta_x: number;
let delta_y: number;
// Definimos la distancia de repulsión (ajustable)
    distancia_repulsion = 10
    // Un pequeño empujón es suficiente para romper el solapamiento.
    // Verificamos si la colisión es con cualquiera de los NPCs
    if (otherSprite == npc_controles || otherSprite == npc_historia) {
        // ⭐️ Lógica de Repulsión ⭐️
        // Calcular la diferencia entre las posiciones
        delta_x = sprite_player.x - otherSprite.x
        delta_y = sprite_player.y - otherSprite.y
        // Repulsión Horizontal (Si la diferencia es significativa)
        if (Math.abs(delta_x) > Math.abs(delta_y)) {
            if (delta_x > 0) {
                // Jugador a la derecha del NPC, lo empuja más a la derecha
                sprite_player.x += distancia_repulsion
            } else {
                sprite_player.x -= distancia_repulsion
            }
        } else if (delta_y > 0) {
            // Jugador debajo del NPC, lo empuja hacia abajo
            sprite_player.y += distancia_repulsion
        } else {
            sprite_player.y -= distancia_repulsion
        }
    }
    // ---------------------------
    if (otherSprite == npc_controles) {
        game.showLongText("" + `
                ¡Alto ahí, recluta!
                ` + `
                Este lugar mastica novatos como tú.
                ` + `
                Si quieres vivir, aprende esto:
                ` + `
                (A): ¡DODGE ROLL! Ruedas y eres intocable por un segundo.
                ` + "(B): ¡FUEGO! Dispara antes de que te disparen a ti.", DialogLayout.Bottom)
    } else if (otherSprite == npc_historia) {
        // --- 2. LA BALITA ---
        // Parte 1: El aviso
        game.showLongText("" + `
                Hola... no pareces de por aquí.
                ` + `
                Bienvenido a la 'Cripta del Calibre Perdido'.
                ` + "Antes esto era una fragua sagrada, pero 'El Detonador' lo corrompió todo...", DialogLayout.Bottom)
        // Parte 2: La leyenda
        game.showLongText("" + `
                Ahora, mis hermanos balas se han vuelto locos por la Pólvora Negra.
                ` + "Pero dicen que en el fondo existe el el 'Núcleo de Plomo'...", DialogLayout.Bottom)
        // Parte 3: El reto
        game.showLongText("" + `
                Si logras llegar y vencer a los Guardianes, el Núcleo te concederá un deseo:
                ` + "¡Cambiar tu pasado!\n" + "¿Tienes el valor (y la munición) para intentarlo? Suerte... la necesitarás. ", DialogLayout.Bottom)
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
    cordenadas_sala1()
    let nuevo_enemigo: Sprite;
let x_coord: number;
let y_coord: number;
for (let pos_tile of posiciones_sala1) {
        nuevo_enemigo = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.bullet_poryectile)
        x_coord = pos_tile[0]
        // El primer elemento es la X
        y_coord = pos_tile[1]
        // El segundo elemento es la Y
        nuevo_enemigo.setPosition(x_coord, y_coord)
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.tp_sala, function (sprite, otherSprite) {
    mySprite.setPosition(2573, 2782)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.tp_jefe, function (sprite, otherSprite) {
    mySprite.setPosition(2573, 2782)
})
controller.up.onEvent(ControllerButtonEvent.Released, function () {
    characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.FacingUp))
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.MovingDown))
})
function cordenadas_sala1 () {
    posiciones_sala1 = [
    [randint(2201, 1544), randint(2601, 2887)],
    [randint(2201, 1544), randint(2601, 2887)],
    [randint(2201, 1544), randint(2601, 2887)],
    [randint(2201, 1544), randint(2601, 2887)]
    ]
}
let posiciones_sala1: number[][] = []
let dodge_roll = false
let projectile: Sprite = null
let npc_historia: Sprite = null
let npc_controles: Sprite = null
let mySprite: Sprite = null
let distancia_repulsion = 0
mySprite = sprites.create(assets.image`myImage`, SpriteKind.Player)
npc_controles = sprites.create(assets.image`cultist_npc`, SpriteKind.npc)
let tp_lobby_sala = sprites.create(img`
    . . . . . 5 . 5 . 5 . . . . . . 
    . . . . . . 5 5 5 . . . . . . . 
    . . . . . 5 5 . 5 5 . . . . . . 
    `, SpriteKind.tp_sala)
let tp_sala_jefe = sprites.create(img`
    . . . . . 5 . 5 . 5 . . . . . . 
    . . . . . . 5 5 5 . . . . . . . 
    . . . . . 5 5 . 5 5 . . . . . . 
    `, SpriteKind.tp_jefe)
npc_historia = sprites.create(assets.image`bullet_npc`, SpriteKind.npc)
let npc_tienda = sprites.create(assets.image`dallas_shoper`, SpriteKind.npc)
mySprite.setPosition(335, 316)
npc_controles.setPosition(390, 270)
tp_lobby_sala.setPosition(330, 360)
tp_sala_jefe.setPosition(0, 0)
npc_historia.setPosition(390, 330)
// Establecer velocidad máxima
// Configuración de animaciones del jugador... (se mantiene igual)
characterAnimations.loopFrames(
npc_controles,
assets.animation`cultistAnimation`,
300,
characterAnimations.rule(Predicate.NotMoving)
)
// Establecer velocidad máxima
// Configuración de animaciones del jugador... (se mantiene igual)
characterAnimations.loopFrames(
npc_historia,
assets.animation`Bullet_NPC_Animation`,
400,
characterAnimations.rule(Predicate.NotMoving)
)
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
