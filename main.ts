namespace SpriteKind {
    export const normal_bullet = SpriteKind.create()
    export const npc = SpriteKind.create()
    export const tp_sala_lobby = SpriteKind.create()
    export const tp_sala_jefe = SpriteKind.create()
    export const ENEMIE_PROJECTILE = SpriteKind.create()
    export const bullet_poryectile = SpriteKind.create()
}

function cordenadas_sala3() {
    
    posiciones_sala1 = [[randint(3336, 3128), randint(2025, 2378)], [randint(3336, 3128), randint(2025, 2378)], [randint(3336, 3128), randint(2025, 2378)], [randint(3336, 3128), randint(2025, 2378)], [randint(3336, 3128), randint(2025, 2378)]]
}

function cordenadas_sala8() {
    
    posiciones_sala1 = [[randint(3545, 8856), randint(1850, 1177)], [randint(3545, 8856), randint(1850, 1177)], [randint(3545, 8856), randint(1850, 1177)], [randint(3545, 8856), randint(1850, 1177)], [randint(3545, 8856), randint(1850, 1177)], [randint(3545, 8856), randint(1850, 1177)], [randint(3545, 8856), randint(1850, 1177)], [randint(3545, 8856), randint(1850, 1177)], [randint(3545, 8856), randint(1850, 1177)], [randint(3545, 8856), randint(1850, 1177)], [randint(3545, 8856), randint(1850, 1177)]]
}

function mode_attack() {
    //   OPTIMIZACIÓN: Itera sobre TODOS los enemigos para que todos sigan al jugador
    for (let un_enemigo2 of sprites.allOfKind(SpriteKind.bullet_poryectile)) {
        un_enemigo2.follow(mySprite, 10)
    }
    //   OPTIMIZACIÓN: Itera sobre TODOS los enemigos para que todos sigan al jugador
    for (let un_enemigo22 of sprites.allOfKind(SpriteKind.normal_bullet)) {
        un_enemigo22.follow(mySprite, 30)
    }
}

sprites.onOverlap(SpriteKind.Player, SpriteKind.ENEMIE_PROJECTILE, function on_on_overlap(sprite_player: Sprite, sprite_proj: Sprite) {
    //  Destruir el proyectil enemigo inmediatamente
    sprite_proj.destroy()
    //   COMPROBACIÓN DE INVULNERABILIDAD 
    if (dodge_roll == true) {
        
    } else {
        //  Si no es invulnerable, recibe daño
        info.changeLifeBy(-1)
        scene.cameraShake(2, 100)
        music.thump.play()
    }
    
})
//  CONFIGURACIÓN DE ARMAS
//  cooldown: Tiempo de espera entre disparos (en milisegundos). Menos es más rápido.
//  damage: Cuánta vida quita a los enemigos.
//  speed: Velocidad de la bala.
let stats_armas = {
    "pistola" : {
        "damage" : 1,
        "speed" : 200,
        "cooldown" : 500,
    }
    ,
    "shotgun" : {
        "damage" : 3,
        "speed" : 150,
        "cooldown" : 1000,
    }
    ,
    "rifle" : {
        "damage" : 1,
        "speed" : 350,
        "cooldown" : 150,
    }
    ,
    "Misterio" : {
        "damage" : 10,
        "speed" : 100,
        "cooldown" : 2000,
    }
    ,
}

//  Lenta pero fuerte
//  ¡Metralleta rápida!
//  Lenta, dispara poco, pero DEVASTADORA
//  Variable para controlar el tiempo (para la cadencia)
let tiempo_ultimo_disparo = 0
controller.up.onEvent(ControllerButtonEvent.Pressed, function on_up_pressed() {
    characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.MovingUp))
})
//  Empujoncito final
sprites.onOverlap(SpriteKind.Player, SpriteKind.npc, function on_on_overlap2(sprite_player2: Sprite, otherSprite: Sprite) {
    let SpriteKind2: number;
    
    //  Definimos la distancia de repulsión (ajustable)
    distancia_repulsion2 = 10
    //  Un pequeño empujón es suficiente para romper el solapamiento.
    //  Verificamos si la colisión es con cualquiera de los NPCs
    delta_x = sprite_player2.x - otherSprite.x
    delta_y = sprite_player2.y - otherSprite.y
    if (otherSprite == npc_controles || otherSprite == npc_historia) {
        //   Lógica de Repulsión 
        //  Calcular la diferencia entre las posiciones
        delta_x = sprite_player2.x - otherSprite.x
        SpriteKind2 = sprite_player2.y - otherSprite.y
        //  Repulsión Horizontal (Si la diferencia es significativa)
        if (Math.abs(delta_x) > Math.abs(delta_y)) {
            if (delta_x > 0) {
                //  Jugador a la derecha del NPC, lo empuja más a la derecha
                sprite_player2.x += distancia_repulsion2
            } else {
                sprite_player2.x -= distancia_repulsion2
            }
            
        } else if (delta_y > 0) {
            //  Jugador debajo del NPC, lo empuja hacia abajo
            sprite_player2.y += distancia_repulsion2
        } else {
            sprite_player2.y -= distancia_repulsion2
        }
        
    }
    
    //  ---------------------------
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
        //  --- 2. LA BALITA ---
        //  Parte 1: El aviso
        game.showLongText("" + `
                Hola... no pareces de por aquí.
                ` + `
                Bienvenido a la 'Cripta del Calibre Perdido'.
                ` + "Antes esto era una fragua sagrada, pero 'El Detonador' lo corrompió todo...", DialogLayout.Bottom)
        //  Parte 2: La leyenda
        game.showLongText("" + `
                Ahora, mis hermanos balas se han vuelto locos por la Pólvora Negra.
                ` + "Pero dicen que en el fondo existe el el 'Núcleo de Plomo'...", DialogLayout.Bottom)
        //  Parte 3: El reto
        game.showLongText("" + `
                Si logras llegar y vencer a los Guardianes, el Núcleo te concederá un deseo:
                ` + "¡Cambiar tu pasado!\n" + "¿Tienes el valor (y la munición) para intentarlo? Suerte... la necesitarás. ", DialogLayout.Bottom)
    } else if (otherSprite == npc_tienda) {
        game.showLongText("¡Bienvenido! ¿Qué te llevas hoy?", DialogLayout.Bottom)
        intentar_comprar("shotgun", 50, assets.image`
                shotgun
                `, sprite_player2)
        intentar_comprar("rifle", 120, assets.image`
                rifle
                `, sprite_player2)
        intentar_comprar("Misterio", 9999, assets.image`
                easter_egg
                `, sprite_player2)
        sprite_player2.y += 10
    }
    
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.tp_sala_jefe, function on_on_overlap3(sprite: Sprite, otherSprite2: Sprite) {
    mySprite.setPosition(270, 3000)
    music.stopAllSounds()
    music.setVolume(75)
    music.play(music.stringPlayable("C F D C E C G D ", 120), music.PlaybackMode.LoopingInBackground)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function on_b_pressed() {
    
    //  --- 1. DEFINIR ESTADÍSTICAS (Manual y seguro) ---
    //  Valores por defecto (Pistola)
    let daño = 1
    let velocidad = 200
    let cooldown = 500
    //  Ajustamos según el arma que tengas
    if (arma_actual == "shotgun") {
        daño = 3
        velocidad = 150
        cooldown = 1000
    } else if (arma_actual == "rifle") {
        daño = 1
        velocidad = 350
        cooldown = 150
    } else if (arma_actual == "Misterio") {
        daño = 10
        velocidad = 100
        cooldown = 2000
    }
    
    //  --- 2. CONTROL DE CADENCIA ---
    if (game.runtime() - tiempo_ultimo_disparo < cooldown) {
        return
    }
    
    tiempo_ultimo_disparo = game.runtime()
    //  --- 3. CALCULAR DIRECCIÓN ---
    let vx = 0
    let vy = 0
    if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingRight)) || characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.MovingRight))) {
        vx = velocidad
    } else if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingLeft)) || characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.MovingLeft))) {
        vx = -velocidad
    } else if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingDown)) || characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.MovingDown))) {
        vy = velocidad
    } else if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingUp)) || characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.MovingUp))) {
        vy = -velocidad
    }
    
    //  Si está quieto, dispara a la derecha por defecto
    if (vx == 0 && vy == 0) {
        vx = velocidad
    }
    
    //  --- 4. DISPARAR ---
    projectile = sprites.createProjectileFromSprite(assets.image`bullet_initial`, mySprite, vx, vy)
    //  Guardamos el daño (ahora sí, sin errores raros)
    sprites.setDataNumber(projectile, "damage", daño)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    
    characterAnimations.setCharacterAnimationsEnabled(mySprite, false)
    if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingRight))) {
        dodge_roll = true
        animation.runImageAnimation(mySprite, assets.animation`
                dodge_roll_rigth
                `, 80, false)
        pause(650)
        dodge_roll = false
        characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.FacingRight))
    } else if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingLeft))) {
        dodge_roll = true
        animation.runImageAnimation(mySprite, assets.animation`
                dodge_roll_left
                `, 80, false)
        pause(650)
        dodge_roll = false
        characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.FacingLeft))
    } else if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingDown))) {
        dodge_roll = true
        animation.runImageAnimation(mySprite, assets.animation`
                dodge_roll_front
                `, 80, false)
        pause(650)
        dodge_roll = false
        characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.FacingDown))
    } else if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingUp))) {
        dodge_roll = true
        animation.runImageAnimation(mySprite, assets.animation`
                dodge_roll_back
                `, 80, false)
        pause(650)
        dodge_roll = false
        characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.MovingUp))
    }
    
    if (!dodge_roll) {
        characterAnimations.setCharacterAnimationsEnabled(mySprite, true)
    }
    
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.bullet_poryectile, function on_on_overlap4(sprite_proj22: Sprite, otherSprite42: Sprite) {
    let daño_recibido: number;
    
    //  1. Obtener la barra de vida del enemigo
    enemigo_status = statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSprite42)
    if (enemigo_status) {
        //  ⭐️ NUEVO: LEER EL DAÑO DE LA BALA ⭐️
        //  Leemos el numerito "damage" que guardamos al disparar
        daño_recibido = sprites.readDataNumber(sprite_proj22, "damage")
        //  Si por alguna razón es 0 (ej. olvidaste ponerlo), que haga 1 de daño mínimo
        if (daño_recibido == 0) {
            daño_recibido = 1
        }
        
        //  2. Restar ese daño específico
        enemigo_status.value -= daño_recibido
        //  3. Destruir bala
        sprite_proj22.destroy()
        //  4. Muerte
        if (enemigo_status.value <= 0) {
            info.changeScoreBy(100)
            otherSprite42.destroy(effects.disintegrate)
        }
        
    }
    
})
//  Funciones de released (Optimizadas en la respuesta anterior)
controller.down.onEvent(ControllerButtonEvent.Released, function on_down_released() {
    characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.FacingDown))
})
function cordenadas_sala2() {
    
    posiciones_sala1 = [[randint(2873, 2021), randint(2487, 2137)], [randint(2873, 2021), randint(2487, 2137)], [randint(2873, 2021), randint(2487, 2137)], [randint(2873, 2021), randint(2487, 2137)], [randint(2873, 2021), randint(2487, 2137)], [randint(2873, 2021), randint(2487, 2137)], [randint(2873, 2021), randint(2487, 2137)], [randint(2873, 2021), randint(2487, 2137)], [randint(2873, 2021), randint(2487, 2137)], [randint(2873, 2021), randint(2487, 2137)]]
}

controller.left.onEvent(ControllerButtonEvent.Pressed, function on_left_pressed() {
    characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.MovingLeft))
})
function intentar_comprar(nombre_arma: string, precio: number, imagen_arma: Image, sprite_jugador: Sprite) {
    
    //  1. Crear Fondo Blanco (Tapete visual)
    fondo_blanco = sprites.create(image.create(30, 30), SpriteKind.Food)
    fondo_blanco.image.fill(1)
    //  Color blanco
    fondo_blanco.setPosition(sprite_jugador.x, sprite_jugador.y - 40)
    //  2. Crear el Arma Visual encima del fondo
    arma_visual = sprites.create(imagen_arma, SpriteKind.Food)
    arma_visual.setPosition(sprite_jugador.x, sprite_jugador.y - 40)
    //  3. Preguntar si quiere comprar
    compra = game.ask("" + nombre_arma + " ($" + ("" + ("" + precio)) + ")", "¿Comprar?")
    //  4. Lógica de compra
    if (compra) {
        if (info.score() >= precio) {
            info.changeScoreBy(0 - precio)
            arma_actual = nombre_arma
            //  --- TRUCO DE LIMPIEZA ---
            //  Si se veían superpuestos, esto fuerza a que solo haya uno
            arma_hud.destroy()
            //  Borramos el viejo
            arma_hud = sprites.create(imagen_arma, SpriteKind.Food)
            //  Creamos el nuevo
            arma_hud.setFlag(SpriteFlag.RelativeToCamera, true)
            arma_hud.setPosition(20, 105)
            //  -------------------------
            music.baDing.play()
            game.splash("¡Comprado! Tienes: " + nombre_arma)
        } else {
            music.buzzer.play()
            game.splash("¡No tienes dinero! Necesitas " + ("" + ("" + precio)))
        }
        
    }
    
    //  5. Limpiar (Borrar sprites visuales)
    arma_visual.destroy()
    fondo_blanco.destroy()
}

controller.right.onEvent(ControllerButtonEvent.Released, function on_right_released() {
    characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.FacingRight))
})
controller.left.onEvent(ControllerButtonEvent.Released, function on_left_released() {
    characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.FacingLeft))
})
//  2. Registrar el evento de colisión para el daño por contacto
sprites.onOverlap(SpriteKind.Player, SpriteKind.normal_bullet, function on_on_overlap5(sprite_player3: Sprite, walking_enemy: Sprite) {
    
    //  ⭐️ COMPROBACIÓN DE INVULNERABILIDAD ⭐️
    if (dodge_roll == true) {
        return
    }
    
    //  Si es invulnerable, salimos sin daño
    //  Si no es invulnerable, recibe daño
    info.changeLifeBy(-1)
    scene.cameraShake(2, 250)
    //  Agregamos una sacudida un poco más fuerte para el contacto
    music.thump.play()
    //  OPCIONAL: Repulsión para romper el solapamiento inmediatamente
    //  Puedes reutilizar la lógica de repulsión de los NPCs o simplificarla:
    distancia_repulsion = 5
    if (sprite_player3.x > walking_enemy.x) {
        sprite_player3.x += distancia_repulsion
    } else {
        sprite_player3.x -= distancia_repulsion
    }
    
    if (sprite_player3.y > walking_enemy.y) {
        sprite_player3.y += distancia_repulsion
    } else {
        sprite_player3.y -= distancia_repulsion
    }
    
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function on_right_pressed() {
    characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.MovingRight))
})
//  ⭐️ NUEVA FUNCIÓN: Genera múltiples enemigos en diferentes posiciones
function spawn_enemis_multiple() {
    let nuevo_enemigo: Sprite;
    let x_coord: number;
    let y_coord: number;
    let sb: StatusBarSprite;
    cordenadas_sala1()
    for (let pos_tile of posiciones_sala1) {
        nuevo_enemigo = sprites.create(img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                `, SpriteKind.bullet_poryectile)
        x_coord = pos_tile[0]
        //  El primer elemento es la X
        y_coord = pos_tile[1]
        //  El segundo elemento es la Y
        nuevo_enemigo.setPosition(x_coord, y_coord)
        //  Configuración de animaciones para ESTE enemigo (repetir para cada uno)
        characterAnimations.loopFrames(nuevo_enemigo, assets.animation`
                myAnim
                `, 200, characterAnimations.rule(Predicate.FacingLeft))
        characterAnimations.loopFrames(nuevo_enemigo, assets.animation`
                myAnim0
                `, 200, characterAnimations.rule(Predicate.FacingRight))
        sb = statusbars.create(20, 4, StatusBarKind.Health)
        sb.attachToSprite(nuevo_enemigo)
        sb.max = 3
        //  Ejemplo de vida inicial
        sb.value = 3
        sb.setColor(7, 2)
    }
    cordenadas_sala1()
    for (let pos_tile2 of posiciones_sala1) {
        nuevo_enemigo = sprites.create(img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                `, SpriteKind.normal_bullet)
        x_coord = pos_tile2[0]
        //  El primer elemento es la X
        y_coord = pos_tile2[1]
        //  El segundo elemento es la Y
        nuevo_enemigo.setPosition(x_coord, y_coord)
        //  Configuración de animaciones para ESTE enemigo (repetir para cada uno)
        characterAnimations.loopFrames(nuevo_enemigo, assets.animation`
                bullet
                `, 200, characterAnimations.rule(Predicate.FacingLeft))
        characterAnimations.loopFrames(nuevo_enemigo, assets.animation`
                bullet0
                `, 200, characterAnimations.rule(Predicate.FacingRight))
        sb = statusbars.create(20, 4, StatusBarKind.Health)
        sb.attachToSprite(nuevo_enemigo)
        sb.max = 3
        //  Ejemplo de vida inicial
        sb.value = 3
        sb.setColor(7, 2)
    }
}

controller.up.onEvent(ControllerButtonEvent.Released, function on_up_released() {
    characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.FacingUp))
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function on_down_pressed() {
    characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.MovingDown))
})
function cordenadas_sala5() {
    
    posiciones_sala1 = [[randint(954, 536), randint(1639, 1465)], [randint(954, 536), randint(1639, 1465)], [randint(954, 536), randint(1639, 1465)], [randint(954, 536), randint(1639, 1465)]]
}

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.normal_bullet, function on_on_overlap6(sprite_proj2: Sprite, otherSprite4: Sprite) {
    let daño_recibido: number;
    
    enemigo_status = statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSprite4)
    if (enemigo_status) {
        //  ⭐️ LEER DAÑO ⭐️
        daño_recibido = sprites.readDataNumber(sprite_proj2, "damage")
        if (daño_recibido == 0) {
            daño_recibido = 1
        }
        
        //  Restar el daño real
        enemigo_status.value -= daño_recibido
        sprite_proj2.destroy()
        if (enemigo_status.value <= 0) {
            info.changeScoreBy(100)
            otherSprite4.destroy(effects.disintegrate)
        }
        
    }
    
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.tp_sala_lobby, function on_on_overlap7(sprite2: Sprite, otherSprite3: Sprite) {
    mySprite.setPosition(2573, 2782)
    music.stopAllSounds()
    music.setVolume(75)
    music.play(music.stringPlayable("F E D A B A E E ", 120), music.PlaybackMode.LoopingInBackground)
})
function cordenadas_sala4() {
    
    posiciones_sala1 = [[randint(2055, 1703), randint(1850, 1177)], [randint(2055, 1703), randint(1850, 1177)], [randint(2055, 1703), randint(1850, 1177)], [randint(2055, 1703), randint(1850, 1177)], [randint(2055, 1703), randint(1850, 1177)], [randint(2055, 1703), randint(1850, 1177)], [randint(2055, 1703), randint(1850, 1177)], [randint(2055, 1703), randint(1850, 1177)], [randint(2055, 1703), randint(1850, 1177)], [randint(2055, 1703), randint(1850, 1177)], [randint(2055, 1703), randint(1850, 1177)]]
}

function cordenadas_sala6() {
    
    posiciones_sala1 = [[randint(2714, 2200), randint(1847, 1609)], [randint(2714, 2200), randint(1847, 1609)], [randint(2714, 2200), randint(1847, 1609)], [randint(2714, 2200), randint(1847, 1609)], [randint(2714, 2200), randint(1847, 1609)], [randint(2714, 2200), randint(1847, 1609)]]
}

function cordenadas_sala1() {
    
    posiciones_sala1 = [[randint(2201, 1544), randint(2601, 2887)], [randint(2201, 1544), randint(2601, 2887)], [randint(2201, 1544), randint(2601, 2887)], [randint(2201, 1544), randint(2601, 2887)], [randint(2201, 1544), randint(2601, 2887)], [randint(2201, 1544), randint(2601, 2887)], [randint(2201, 1544), randint(2601, 2887)]]
}

function cordenadas_sala7() {
    
    posiciones_sala1 = [[randint(2714, 2200), randint(1450, 1177)], [randint(2714, 2200), randint(1450, 1177)], [randint(2714, 2200), randint(1450, 1177)], [randint(2714, 2200), randint(1450, 1177)], [randint(2714, 2200), randint(1450, 1177)], [randint(2714, 2200), randint(1450, 1177)]]
}

let distancia_repulsion = 0
let compra = false
let arma_visual : Sprite = null
let fondo_blanco : Sprite = null
let enemigo_status : StatusBarSprite = null
let projectile : Sprite = null
let delta_y = 0
let delta_x = 0
let dodge_roll = false
let posiciones_sala1 : number[][] = []
let npc_tienda : Sprite = null
let npc_historia : Sprite = null
let npc_controles : Sprite = null
let mySprite : Sprite = null
let arma_actual = ""
let arma_hud : Sprite = null
let distancia_repulsion2 = 0
info.setScore(0)
info.setLife(15)
//  Dinero inicial
//  Creamos el HUD (Ahora está fuera de la clase)
arma_hud = sprites.create(assets.image`
    gun
    `, SpriteKind.Food)
arma_hud.setFlag(SpriteFlag.RelativeToCamera, true)
arma_hud.setPosition(20, 105)
//  Variable de estado
arma_actual = "pistola"
namespace SpriteKind22 {
    export const npc2 = SpriteKind.create()
    export const tp_sala = SpriteKind.create()
    export const tp_jefe = SpriteKind.create()
    export const tp_sala_lobby2 = SpriteKind.create()
    export const tp_sala_jefe2 = SpriteKind.create()
}

mySprite = sprites.create(assets.image`
    myImage
    `, SpriteKind.Player)
npc_controles = sprites.create(assets.image`
    cultist_npc
    `, SpriteKind.npc)
let tp_lobby_sala = sprites.create(img`
        . . . . . 5 . 5 . 5 . . . . . .
        . . . . . . 5 5 5 . . . . . . .
        . . . . . 5 5 . 5 5 . . . . . .
        `, SpriteKind.tp_sala_lobby)
let tp_sala_jefe22 = sprites.create(img`
        . . . . . 5 . 5 . 5 . . . . . .
        . . . . . . 5 5 5 . . . . . . .
        . . . . . 5 5 . 5 5 . . . . . .
        `, SpriteKind.tp_sala_jefe)
npc_historia = sprites.create(assets.image`
    bullet_npc
    `, SpriteKind.npc)
npc_tienda = sprites.create(assets.image`
    dallas_shoper
    `, SpriteKind.npc)
mySprite.setPosition(335, 316)
npc_controles.setPosition(390, 270)
tp_lobby_sala.setPosition(330, 360)
tp_sala_jefe22.setPosition(3135, 311)
npc_historia.setPosition(390, 330)
npc_tienda.setPosition(115, 1520)
//  Establecer velocidad máxima
//  Configuración de animaciones del jugador... (se mantiene igual)
characterAnimations.loopFrames(npc_tienda, assets.animation`
        dallas_animation
        `, 400, characterAnimations.rule(Predicate.NotMoving))
//  Establecer velocidad máxima
//  Configuración de animaciones del jugador... (se mantiene igual)
characterAnimations.loopFrames(npc_controles, assets.animation`
        cultistAnimation
        `, 300, characterAnimations.rule(Predicate.NotMoving))
//  Establecer velocidad máxima
//  Configuración de animaciones del jugador... (se mantiene igual)
characterAnimations.loopFrames(npc_historia, assets.animation`
        Bullet_NPC_Animation
        `, 400, characterAnimations.rule(Predicate.NotMoving))
//  Establecer velocidad máxima
//  Configuración de animaciones del jugador... (se mantiene igual)
characterAnimations.loopFrames(mySprite, assets.animation`
        run_front_pilot
        `, 120, characterAnimations.rule(Predicate.MovingDown))
characterAnimations.loopFrames(mySprite, assets.animation`
        run_back_player
        `, 120, characterAnimations.rule(Predicate.MovingUp))
characterAnimations.loopFrames(mySprite, assets.animation`
        run_right_pilot0
        `, 120, characterAnimations.rule(Predicate.MovingRight))
characterAnimations.loopFrames(mySprite, assets.animation`
        run_right_pilot
        `, 120, characterAnimations.rule(Predicate.MovingLeft))
characterAnimations.loopFrames(mySprite, assets.animation`
        still_down
        `, 220, characterAnimations.rule(Predicate.FacingDown))
characterAnimations.loopFrames(mySprite, assets.animation`
        side_rigth
        `, 220, characterAnimations.rule(Predicate.FacingRight))
characterAnimations.loopFrames(mySprite, assets.animation`
        side_left
        `, 220, characterAnimations.rule(Predicate.FacingLeft))
characterAnimations.loopFrames(mySprite, assets.animation`
        back_player
        `, 300, characterAnimations.rule(Predicate.FacingUp))
//  ⭐️ LLAMAR A LA NUEVA FUNCIÓN DE SPAWN
spawn_enemis_multiple()
controller.moveSprite(mySprite)
scene.cameraFollowSprite(mySprite)
tiles.setCurrentTilemap(tilemap`
    first_dungeon
    `)
music.setVolume(75)
music.play(music.stringPlayable("E B C5 A B G A F ", 120), music.PlaybackMode.LoopingInBackground)
//  ⭐️ Opcional: Implementar aquí la lógica de animación por dirección para los enemigos
game.onUpdate(function on_on_update() {
    mode_attack()
})
//  --- Inicialización del Juego ---
//  --- RECUERDA ELIMINAR ESTA LÍNEA DE LAS GLOBALES: enemigo_status: StatusBarSprite = None ---
//  Usamos game.on_update_interval para controlar la cadencia de disparo (ej. cada 1.5 segundos)
game.onUpdateInterval(1500, function on_update_interval() {
    let velocidad_proyectil: number;
    let vx_enemigo: number;
    let vy_enemigo: number;
    let proj_a_lanzar: Sprite;
    //  El bucle de persecución en mode_attack ya garantiza que los enemigos se están moviendo.
    for (let un_enemigo of sprites.allOfKind(SpriteKind.bullet_poryectile)) {
        //  1. Creamos una variable LOCAL para el proyectil, pero la inicializamos dentro del bloque.
        velocidad_proyectil = 100
        vx_enemigo = un_enemigo.vx
        vy_enemigo = un_enemigo.vy
        proj_a_lanzar = null
        //  Determinar la dirección principal (Horizontal vs. Vertical)
        if (Math.abs(vx_enemigo) > Math.abs(vy_enemigo)) {
            //  Movimiento dominante es HORIZONTAL
            if (vx_enemigo > 0) {
                //  Dispara a la DERECHA
                proj_a_lanzar = sprites.createProjectileFromSprite(assets.image`
                        bullet_initial
                        `, un_enemigo, velocidad_proyectil, 0)
            } else if (vx_enemigo < 0) {
                //  Dispara a la IZQUIERDA
                proj_a_lanzar = sprites.createProjectileFromSprite(assets.image`
                        bullet_initial
                        `, un_enemigo, 0 - velocidad_proyectil, 0)
            }
            
        } else if (Math.abs(vy_enemigo) > 0) {
            //  Movimiento dominante es VERTICAL
            if (vy_enemigo > 0) {
                //  Dispara ABAJO
                proj_a_lanzar = sprites.createProjectileFromSprite(assets.image`
                        bullet_initial
                        `, un_enemigo, 0, velocidad_proyectil)
            } else {
                //  vy_enemigo < 0
                //  Dispara ARRIBA
                proj_a_lanzar = sprites.createProjectileFromSprite(assets.image`
                        bullet_initial
                        `, un_enemigo, 0, 0 - velocidad_proyectil)
            }
            
        }
        
        //  2. Si se asignó un valor (es decir, el proyectil existe), se le da el SpriteKind.
        if (proj_a_lanzar) {
            //  Esto es un atajo para if proj_a_lanzar != None:
            proj_a_lanzar.setKind(SpriteKind.ENEMIE_PROJECTILE)
        }
        
    }
})
