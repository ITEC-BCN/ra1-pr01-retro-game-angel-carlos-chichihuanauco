namespace SpriteKind {
    export const normal_bullet = SpriteKind.create()
    export const npc = SpriteKind.create()
    export const tp_sala_lobby = SpriteKind.create()
    export const tp_sala_jefe = SpriteKind.create()
    export const ENEMIE_PROJECTILE = SpriteKind.create()
    export const bullet_poryectile = SpriteKind.create()
    //  Definimos los tipos para el jefe y su explosion
    export const Boss = SpriteKind.create()
    export const ExplosionMortal = SpriteKind.create()
}

function cordenadas_sala3() {
    
    posiciones_sala1 = [[randint(3336, 3128), randint(2025, 2378)], [randint(3336, 3128), randint(2025, 2378)], [randint(3336, 3128), randint(2025, 2378)], [randint(3336, 3128), randint(2025, 2378)], [randint(3336, 3128), randint(2025, 2378)]]
}

function cordenadas_sala8() {
    
    posiciones_sala1 = [[randint(3545, 8856), randint(1850, 1177)], [randint(3545, 8856), randint(1850, 1177)], [randint(3545, 8856), randint(1850, 1177)], [randint(3545, 8856), randint(1850, 1177)], [randint(3545, 8856), randint(1850, 1177)], [randint(3545, 8856), randint(1850, 1177)], [randint(3545, 8856), randint(1850, 1177)], [randint(3545, 8856), randint(1850, 1177)], [randint(3545, 8856), randint(1850, 1177)], [randint(3545, 8856), randint(1850, 1177)], [randint(3545, 8856), randint(1850, 1177)]]
}

function mode_attack() {
    //  Hacemos que los enemigos tipo bullet sigan al jugador
    for (let un_enemigo2 of sprites.allOfKind(SpriteKind.bullet_poryectile)) {
        un_enemigo2.follow(mySprite, 10)
    }
    //  Hacemos que los enemigos normales sigan al jugador
    for (let un_enemigo22 of sprites.allOfKind(SpriteKind.normal_bullet)) {
        un_enemigo22.follow(mySprite, 30)
    }
    //  El jefe persigue al jugador un poco mas rapido
    for (let boss of sprites.allOfKind(SpriteKind.Boss)) {
        boss.follow(mySprite, 40)
    }
}

sprites.onOverlap(SpriteKind.Player, SpriteKind.ENEMIE_PROJECTILE, function on_on_overlap(sprite_player: Sprite, sprite_proj: Sprite) {
    //  Destruir el proyectil enemigo inmediatamente
    sprite_proj.destroy()
    //  Chequeamos si el jugador esta rodando para evitar daño
    if (dodge_roll == true) {
        
    } else {
        //  Si no es invulnerable, recibe daño
        info.changeLifeBy(-1)
        scene.cameraShake(2, 100)
        music.thump.play()
    }
    
})
//  Configuracion de las armas
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
//  Metralleta rapida
//  Lenta pero devastadora
//  Control del tiempo para la cadencia de disparo
let tiempo_ultimo_disparo = 0
controller.up.onEvent(ControllerButtonEvent.Pressed, function on_up_pressed() {
    characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.MovingUp))
})
//  Logica de empuje al chocar con NPCs
sprites.onOverlap(SpriteKind.Player, SpriteKind.npc, function on_on_overlap2(sprite_player2: Sprite, otherSprite: Sprite) {
    let poti_img: Image;
    
    //  Distancia de empuje
    distancia_repulsion2 = 10
    //  Calculamos la diferencia entre posiciones para saber hacia donde empujar
    delta_x = sprite_player2.x - otherSprite.x
    delta_y = sprite_player2.y - otherSprite.y
    if (otherSprite == npc_controles || otherSprite == npc_historia) {
        //  Calculamos direccion de repulsion
        delta_x = sprite_player2.x - otherSprite.x
        if (Math.abs(delta_x) > Math.abs(delta_y)) {
            if (delta_x > 0) {
                sprite_player2.x += distancia_repulsion2
            } else {
                sprite_player2.x -= distancia_repulsion2
            }
            
        } else if (delta_y > 0) {
            sprite_player2.y += distancia_repulsion2
        } else {
            sprite_player2.y -= distancia_repulsion2
        }
        
    }
    
    //  Dialogos de los NPCs
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
        //  Historia del juego
        game.showLongText("" + `
                Hola... no pareces de por aquí.
                ` + `
                Bienvenido a la 'Cripta del Calibre Perdido'.
                ` + "Antes esto era una fragua sagrada, pero 'El Detonador' lo corrompió todo...", DialogLayout.Bottom)
        game.showLongText("" + `
                Ahora, mis hermanos balas se han vuelto locos por la Pólvora Negra.
                ` + "Pero dicen que en el fondo existe el el 'Núcleo de Plomo'...", DialogLayout.Bottom)
        game.showLongText("" + `
                Si logras llegar y vencer a los Guardianes, el Núcleo te concederá un deseo:
                ` + "¡Cambiar tu pasado!\n" + "¿Tienes el valor (y la munición) para intentarlo? Suerte... la necesitarás. ", DialogLayout.Bottom)
    } else if (otherSprite == npc_tienda) {
        game.showLongText("¡Bienvenido! ¿Qué te llevas hoy?", DialogLayout.Bottom)
        //  Venta de pociones (usamos imagen generada por codigo)
        poti_img = img`
            . . . . . . . . . . . . . . . .
            . . . . . . . 2 2 . . . . . . .
            . . . . . . 2 4 4 2 . . . . . .
            . . . . . . 2 4 4 2 . . . . . .
            . . . . . . 2 4 4 2 . . . . . .
            . . . . . 2 2 4 4 2 2 . . . . .
            . . . . 2 4 4 4 4 4 4 2 . . . .
            . . . . 2 4 4 4 4 4 4 2 . . . .
            . . . . 2 4 4 4 4 4 4 2 . . . .
            . . . . 2 4 4 4 4 4 4 2 . . . .
            . . . . . 2 2 2 2 2 2 . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `
        intentar_comprar("Pocion", 20, poti_img, sprite_player2)
        intentar_comprar("shotgun", 250, assets.image`
                shotgun
                `, sprite_player2)
        intentar_comprar("rifle", 420, assets.image`
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
    
    //  Obtenemos la barra de vida del enemigo golpeado
    enemigo_status = statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSprite42)
    if (enemigo_status) {
        //  Obtenemos el daño configurado en el proyectil
        daño_recibido = sprites.readDataNumber(sprite_proj22, "damage")
        if (daño_recibido == 0) {
            daño_recibido = 1
        }
        
        //  Aplicamos el daño
        enemigo_status.value -= daño_recibido
        //  Destruimos el proyectil
        sprite_proj22.destroy()
        //  Si la vida llega a 0, eliminamos al enemigo
        if (enemigo_status.value <= 0) {
            info.changeScoreBy(100)
            otherSprite42.destroy(effects.disintegrate)
        }
        
    }
    
})
//  Funciones al soltar botones
controller.down.onEvent(ControllerButtonEvent.Released, function on_down_released() {
    characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.FacingDown))
})
function cordenadas_sala2() {
    
    posiciones_sala1 = [[randint(2873, 2021), randint(2487, 2137)], [randint(2873, 2021), randint(2487, 2137)], [randint(2873, 2021), randint(2487, 2137)], [randint(2873, 2021), randint(2487, 2137)], [randint(2873, 2021), randint(2487, 2137)], [randint(2873, 2021), randint(2487, 2137)], [randint(2873, 2021), randint(2487, 2137)], [randint(2873, 2021), randint(2487, 2137)], [randint(2873, 2021), randint(2487, 2137)], [randint(2873, 2021), randint(2487, 2137)]]
}

controller.left.onEvent(ControllerButtonEvent.Pressed, function on_left_pressed() {
    characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.MovingLeft))
})
//  Modificamos la funcion de compra para incluir las pociones
function intentar_comprar(nombre_arma: string, precio: number, imagen_arma: Image, sprite_jugador: Sprite) {
    
    //  Crear fondo blanco para resaltar el item
    fondo_blanco = sprites.create(image.create(30, 30), SpriteKind.Food)
    fondo_blanco.image.fill(1)
    fondo_blanco.setPosition(sprite_jugador.x, sprite_jugador.y - 40)
    //  Crear el sprite visual del item
    arma_visual = sprites.create(imagen_arma, SpriteKind.Food)
    arma_visual.setPosition(sprite_jugador.x, sprite_jugador.y - 40)
    //  Preguntar al usuario
    compra = game.ask("" + nombre_arma + " ($" + ("" + ("" + precio)) + ")", "¿Comprar?")
    //  Procesar compra
    if (compra) {
        if (info.score() >= precio) {
            //  Logica para comprar pocion
            if (nombre_arma == "Pocion") {
                if (info.life() < 15) {
                    info.changeScoreBy(0 - precio)
                    info.changeLifeBy(1)
                    music.powerUp.play()
                    game.splash("¡Salud +1 Corazón! <3")
                } else {
                    game.splash("¡Ya estás lleno de vida!")
                }
                
            } else {
                //  Logica para comprar armas
                info.changeScoreBy(0 - precio)
                arma_actual = nombre_arma
                //  Actualizamos el HUD del arma
                arma_hud.destroy()
                arma_hud = sprites.create(imagen_arma, SpriteKind.Food)
                arma_hud.setFlag(SpriteFlag.RelativeToCamera, true)
                arma_hud.setPosition(20, 105)
                music.baDing.play()
                game.splash("¡Comprado! Tienes: " + nombre_arma)
            }
            
        } else {
            music.buzzer.play()
            game.splash("¡No tienes dinero! Necesitas " + ("" + ("" + precio)))
        }
        
    }
    
    //  Limpiamos los sprites temporales
    arma_visual.destroy()
    fondo_blanco.destroy()
}

controller.right.onEvent(ControllerButtonEvent.Released, function on_right_released() {
    characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.FacingRight))
})
controller.left.onEvent(ControllerButtonEvent.Released, function on_left_released() {
    characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.FacingLeft))
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.normal_bullet, function on_on_overlap5(sprite_player3: Sprite, walking_enemy: Sprite) {
    
    if (dodge_roll == true) {
        return
    }
    
    info.changeLifeBy(-1)
    scene.cameraShake(2, 250)
    music.thump.play()
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
//  Funcion para generar multiples enemigos
function spawn_enemis_multiple() {
    let nuevo_enemigo: Sprite;
    let x_coord: number;
    let y_coord: number;
    let sb: StatusBarSprite;
    check_current_sala()
    for (let pos_tile of posiciones_sala1) {
        nuevo_enemigo = sprites.create(img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                `, SpriteKind.bullet_poryectile)
        x_coord = pos_tile[0]
        y_coord = pos_tile[1]
        nuevo_enemigo.setPosition(x_coord, y_coord)
        characterAnimations.loopFrames(nuevo_enemigo, assets.animation`myAnim`, 200, characterAnimations.rule(Predicate.FacingLeft))
        characterAnimations.loopFrames(nuevo_enemigo, assets.animation`myAnim0`, 200, characterAnimations.rule(Predicate.FacingRight))
        sb = statusbars.create(20, 4, StatusBarKind.Health)
        sb.attachToSprite(nuevo_enemigo)
        sb.max = 3
        sb.value = 3
        sb.setColor(7, 2)
    }
    check_current_sala()
    for (let pos_tile2 of posiciones_sala1) {
        nuevo_enemigo = sprites.create(img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                `, SpriteKind.normal_bullet)
        x_coord = pos_tile2[0]
        y_coord = pos_tile2[1]
        nuevo_enemigo.setPosition(x_coord, y_coord)
        characterAnimations.loopFrames(nuevo_enemigo, assets.animation`bullet`, 200, characterAnimations.rule(Predicate.FacingLeft))
        characterAnimations.loopFrames(nuevo_enemigo, assets.animation`bullet0`, 200, characterAnimations.rule(Predicate.FacingRight))
        sb = statusbars.create(20, 4, StatusBarKind.Health)
        sb.attachToSprite(nuevo_enemigo)
        sb.max = 3
        sb.value = 3
        sb.setColor(7, 2)
    }
}

//  Funcion para spawnear al jefe
function spawnBoss() {
    //  Usamos el primer frame de la animacion para crear el sprite
    let boss_anim_start = assets.animation`bullet_key_right`[0]
    let boss = sprites.create(boss_anim_start, SpriteKind.Boss)
    //  Posicion aleatoria en la sala
    boss.setPosition(3123, 1200)
    //  Configuramos animaciones de movimiento
    characterAnimations.loopFrames(boss, assets.animation`bullet_key_left`, 200, characterAnimations.rule(Predicate.FacingLeft))
    characterAnimations.loopFrames(boss, assets.animation`bullet_key_right`, 200, characterAnimations.rule(Predicate.FacingRight))
    //  Barra de vida del jefe
    let sb_boss = statusbars.create(20, 4, StatusBarKind.Health)
    sb_boss.attachToSprite(boss)
    sb_boss.max = 100
    sb_boss.value = 100
    sb_boss.setColor(2, 4)
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
        daño_recibido = sprites.readDataNumber(sprite_proj2, "damage")
        if (daño_recibido == 0) {
            daño_recibido = 1
        }
        
        enemigo_status.value -= daño_recibido
        sprite_proj2.destroy()
        if (enemigo_status.value <= 0) {
            info.changeScoreBy(100)
            otherSprite4.destroy(effects.disintegrate)
        }
        
    }
    
})
//  Daño al jefe por proyectiles
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Boss, function on_hit_boss(sprite_proj: Sprite, boss_sprite: Sprite) {
    let daño: number;
    let status_jefe = statusbars.getStatusBarAttachedTo(StatusBarKind.Health, boss_sprite)
    if (status_jefe) {
        daño = sprites.readDataNumber(sprite_proj, "damage")
        if (daño == 0) {
            daño = 1
        }
        
        status_jefe.value -= daño
        sprite_proj.destroy()
        if (status_jefe.value <= 0) {
            info.changeScoreBy(500)
            boss_sprite.destroy()
        }
        
    }
    
})
//  El jefe daña al jugador al tocarlo
sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss, function on_boss_hit_player(player_sprite: Sprite, boss_sprite: Sprite) {
    if (dodge_roll) {
        return
    }
    
    info.changeLifeBy(-2)
    //  El jefe hace mas daño
    scene.cameraShake(4, 500)
    music.thump.play()
    //  Rebote simple
    if (player_sprite.x < boss_sprite.x) {
        player_sprite.x -= 20
    } else {
        player_sprite.x += 20
    }
    
    pause(500)
})
//  Evento al destruir al jefe (explosion)
sprites.onDestroyed(SpriteKind.Boss, function on_boss_destroyed(boss_sprite: Sprite) {
    //  Usamos el primer cuadro de la animacion de muerte para crear la explosion
    let anim_kill = assets.animation`bullet_key_kill`
    let explosion = sprites.create(anim_kill[0], SpriteKind.ExplosionMortal)
    explosion.setPosition(boss_sprite.x, boss_sprite.y)
    //  Ejecutamos la animacion de muerte
    animation.runImageAnimation(explosion, anim_kill, 200, false)
    explosion.lifespan = 1000
    music.bigCrash.play()
})
//  La explosion daña al jugador si lo toca
sprites.onOverlap(SpriteKind.Player, SpriteKind.ExplosionMortal, function on_explosion_hit_player(player_sprite: Sprite, explosion_sprite: Sprite) {
    //  Reduce la vida a 1 si te alcanza
    if (info.life() > 1) {
        info.setLife(1)
        scene.cameraShake(4, 500)
        music.zapped.play()
        game.splash("¡LA EXPLOSIÓN TE DEJÓ DÉBIL! >_<")
    }
    
})
function check_current_sala() {
    
    if (current_sala == 1) {
        cordenadas_sala1()
    } else if (current_sala == 2) {
        cordenadas_sala2()
    } else if (current_sala == 3) {
        cordenadas_sala3()
    } else if (current_sala == 4) {
        cordenadas_sala4()
    } else if (current_sala == 5) {
        cordenadas_sala5()
    } else if (current_sala == 6) {
        cordenadas_sala6()
    } else if (current_sala == 7) {
        cordenadas_sala7()
    } else if (current_sala == 8) {
        cordenadas_sala8()
    }
    
}

function check_lives_enemys() {
    
    if (sprites.allOfKind(SpriteKind.bullet_poryectile).length == 0 && sprites.allOfKind(SpriteKind.normal_bullet).length == 0) {
        current_sala += 1
        spawn_enemis_multiple()
    }
    
}

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
let current_sala = 1
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
//  Spawneamos los enemigos
spawn_enemis_multiple()
spawnBoss()
//  Spawneamos al jefe
controller.moveSprite(mySprite)
scene.cameraFollowSprite(mySprite)
tiles.setCurrentTilemap(tilemap`
    first_dungeon
    `)
music.setVolume(75)
music.play(music.stringPlayable("E B C5 A B G A F ", 120), music.PlaybackMode.LoopingInBackground)
game.onUpdate(function on_on_update() {
    let daño: number;
    let velocidad: number;
    let cooldown: number;
    let vx: number;
    let vy: number;
    
    check_lives_enemys()
    mode_attack()
    //  Logica del rifle automatico
    if (controller.B.isPressed()) {
        //  Valores por defecto
        daño = 1
        velocidad = 200
        cooldown = 500
        //  Stats
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
        
        if (game.runtime() - tiempo_ultimo_disparo < cooldown) {
            return
        }
        
        tiempo_ultimo_disparo = game.runtime()
        vx = 0
        vy = 0
        if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingRight)) || characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.MovingRight))) {
            vx = velocidad
        } else if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingLeft)) || characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.MovingLeft))) {
            vx = -velocidad
        } else if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingDown)) || characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.MovingDown))) {
            vy = velocidad
        } else if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingUp)) || characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.MovingUp))) {
            vy = -velocidad
        }
        
        if (vx == 0 && vy == 0) {
            vx = velocidad
        }
        
        projectile = sprites.createProjectileFromSprite(assets.image`bullet_initial`, mySprite, vx, vy)
        sprites.setDataNumber(projectile, "damage", daño)
    }
    
})
//  --- Inicialización del Juego ---
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
