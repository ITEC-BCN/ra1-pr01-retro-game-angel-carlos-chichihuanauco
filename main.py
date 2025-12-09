@namespace
class SpriteKind:
    normal_bullet = SpriteKind.create()
    npc = SpriteKind.create()
    tp_sala_lobby = SpriteKind.create()
    tp_sala_jefe = SpriteKind.create()
    ENEMIE_PROJECTILE = SpriteKind.create()
    bullet_poryectile = SpriteKind.create()
    # Definimos los tipos para el jefe y su explosion
    Boss = SpriteKind.create()
    FinalBoss = SpriteKind.create()
    ExplosionMortal = SpriteKind.create()

def cordenadas_sala3():
    global posiciones_sala1
    posiciones_sala1 = [[randint(3200, 3260), randint(2100, 2300)],
            [randint(3200, 3260), randint(2100, 2300)],
            [randint(3200, 3260), randint(2100, 2300)],
            [randint(3200, 3260), randint(2100, 2300)],
            [randint(3200, 3260), randint(2100, 2300)]]
def cordenadas_sala8():
    global posiciones_sala1
    posiciones_sala1 = [[randint(3545, 8856), randint(1850, 1177)],
        [randint(3545, 8856), randint(1850, 1177)],
        [randint(3545, 8856), randint(1850, 1177)],
        [randint(3545, 8856), randint(1850, 1177)],
        [randint(3545, 8856), randint(1850, 1177)],
        [randint(3545, 8856), randint(1850, 1177)],
        [randint(3545, 8856), randint(1850, 1177)],
        [randint(3545, 8856), randint(1850, 1177)],
        [randint(3545, 8856), randint(1850, 1177)],
        [randint(3545, 8856), randint(1850, 1177)],
        [randint(3545, 8856), randint(1850, 1177)]]

def mode_attack():
    # Hacemos que los enemigos tipo bullet sigan al jugador
    for un_enemigo2 in sprites.all_of_kind(SpriteKind.bullet_poryectile):
        un_enemigo2.follow(mySprite, 10)
    # Hacemos que los enemigos normales sigan al jugador
    for un_enemigo22 in sprites.all_of_kind(SpriteKind.normal_bullet):
        un_enemigo22.follow(mySprite, 30)
    # El jefe persigue al jugador un poco mas rapido
    for boss in sprites.all_of_kind(SpriteKind.Boss):
        boss.follow(mySprite, 40)

def on_on_overlap(sprite_player, sprite_proj):
    # Destruir el proyectil enemigo inmediatamente
    sprite_proj.destroy()
    # Chequeamos si el jugador esta rodando para evitar daño
    if dodge_roll == True:
        pass
    else:
        # Si no es invulnerable, recibe daño
        info.change_life_by(-1)
        scene.camera_shake(2, 100)
        music.thump.play()
sprites.on_overlap(SpriteKind.player,
    SpriteKind.ENEMIE_PROJECTILE,
    on_on_overlap)

# Configuracion de las armas
stats_armas = {
    "pistola":  { "damage": 1, "speed": 200, "cooldown": 500 },
    "shotgun":  { "damage": 3, "speed": 150, "cooldown": 1000 }, # Lenta pero fuerte
    "rifle":    { "damage": 1, "speed": 350, "cooldown": 150 },  # Metralleta rapida
    "Misterio": { "damage": 10,"speed": 100, "cooldown": 2000 }  # Lenta pero devastadora
}

# Control del tiempo para la cadencia de disparo
tiempo_ultimo_disparo = 0

def on_up_pressed():
    characterAnimations.set_character_state(mySprite, characterAnimations.rule(Predicate.MOVING_UP))
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

# Logica de empuje al chocar con NPCs
def on_on_overlap2(sprite_player2, otherSprite):
    global distancia_repulsion2, delta_x, delta_y
    # Distancia de empuje
    distancia_repulsion2 = 10
    # Calculamos la diferencia entre posiciones para saber hacia donde empujar
    delta_x = sprite_player2.x - otherSprite.x
    delta_y = sprite_player2.y - otherSprite.y
    if otherSprite == npc_controles or otherSprite == npc_historia:
        # Calculamos direccion de repulsion
        delta_x = sprite_player2.x - otherSprite.x
        if abs(delta_x) > abs(delta_y):
            if delta_x > 0:
                sprite_player2.x += distancia_repulsion2
            else:
                sprite_player2.x -= distancia_repulsion2
        elif delta_y > 0:
            sprite_player2.y += distancia_repulsion2
        else:
            sprite_player2.y -= distancia_repulsion2
    # Dialogos de los NPCs
    if otherSprite == npc_controles:
        game.show_long_text("" + """
                ¡Alto ahí, recluta!
                """ + """
                Este lugar mastica novatos como tú.
                """ + """
                Si quieres vivir, aprende esto:
                """ + """
                (A): ¡DODGE ROLL! Ruedas y eres intocable por un segundo.
                """ + "(B): ¡FUEGO! Dispara antes de que te disparen a ti.",
            DialogLayout.BOTTOM)
    elif otherSprite == npc_historia:
        # Historia del juego
        game.show_long_text("" + """
                Hola... no pareces de por aquí.
                """ + """
                Bienvenido a la 'Cripta del Calibre Perdido'.
                """ + "Antes esto era una fragua sagrada, pero 'El Detonador' lo corrompió todo...",
            DialogLayout.BOTTOM)
        game.show_long_text("" + """
                Ahora, mis hermanos balas se han vuelto locos por la Pólvora Negra.
                """ + "Pero dicen que en el fondo existe el el 'Núcleo de Plomo'...",
            DialogLayout.BOTTOM)
        game.show_long_text("" + """
                Si logras llegar y vencer a los Guardianes, el Núcleo te concederá un deseo:
                """ + "¡Cambiar tu pasado!\n" + "¿Tienes el valor (y la munición) para intentarlo? Suerte... la necesitarás. ",
            DialogLayout.BOTTOM)
    elif otherSprite == npc_tienda:
        game.show_long_text("¡Bienvenido! ¿Qué te llevas hoy?", DialogLayout.BOTTOM)
        # Venta de pociones (usamos imagen generada por codigo)
        poti_img = img("""
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
        """)
        intentar_comprar("Pocion", 20, poti_img, sprite_player2)
        intentar_comprar("shotgun",
            250,
            assets.image("""
                shotgun
                """),
            sprite_player2)
        intentar_comprar("rifle",
            420,
            assets.image("""
                rifle
                """),
            sprite_player2)
        intentar_comprar("Misterio",
            9999,
            assets.image("""
                easter_egg
                """),
            sprite_player2)
        sprite_player2.y += 10
sprites.on_overlap(SpriteKind.player, SpriteKind.npc, on_on_overlap2)

def on_on_overlap3(sprite, otherSprite2):
    mySprite.set_position(270, 3000)
    spawnFinalBoss()
    music.stop_all_sounds()
    music.set_volume(75)
    music.play(music.string_playable("C F D C E C G D ", 120),
        music.PlaybackMode.LOOPING_IN_BACKGROUND)
sprites.on_overlap(SpriteKind.player, SpriteKind.tp_sala_jefe, on_on_overlap3)

def on_a_pressed():
    global dodge_roll
    characterAnimations.set_character_animations_enabled(mySprite, False)
    if characterAnimations.matches_rule(mySprite, characterAnimations.rule(Predicate.FACING_RIGHT)):
        dodge_roll = True
        animation.run_image_animation(mySprite,
            assets.animation("""
                dodge_roll_rigth
                """),
            80,
            False)
        pause(650)
        dodge_roll = False
        characterAnimations.set_character_state(mySprite, characterAnimations.rule(Predicate.FACING_RIGHT))
    elif characterAnimations.matches_rule(mySprite, characterAnimations.rule(Predicate.FACING_LEFT)):
        dodge_roll = True
        animation.run_image_animation(mySprite,
            assets.animation("""
                dodge_roll_left
                """),
            80,
            False)
        pause(650)
        dodge_roll = False
        characterAnimations.set_character_state(mySprite, characterAnimations.rule(Predicate.FACING_LEFT))
    elif characterAnimations.matches_rule(mySprite, characterAnimations.rule(Predicate.FACING_DOWN)):
        dodge_roll = True
        animation.run_image_animation(mySprite,
            assets.animation("""
                dodge_roll_front
                """),
            80,
            False)
        pause(650)
        dodge_roll = False
        characterAnimations.set_character_state(mySprite, characterAnimations.rule(Predicate.FACING_DOWN))
    elif characterAnimations.matches_rule(mySprite, characterAnimations.rule(Predicate.FACING_UP)):
        dodge_roll = True
        animation.run_image_animation(mySprite,
            assets.animation("""
                dodge_roll_back
                """),
            80,
            False)
        pause(650)
        dodge_roll = False
        characterAnimations.set_character_state(mySprite, characterAnimations.rule(Predicate.MOVING_UP))
    if not (dodge_roll):
        characterAnimations.set_character_animations_enabled(mySprite, True)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_overlap4(sprite_proj22, otherSprite42):
    global enemigo_status
    # Obtenemos la barra de vida del enemigo golpeado
    enemigo_status = statusbars.get_status_bar_attached_to(StatusBarKind.health, otherSprite42)
    if enemigo_status:
        # Obtenemos el daño configurado en el proyectil
        daño_recibido = sprites.read_data_number(sprite_proj22, "damage")
        if daño_recibido == 0:
            daño_recibido = 1
        # Aplicamos el daño
        enemigo_status.value -= daño_recibido
        # Destruimos el proyectil
        sprite_proj22.destroy()
        # Si la vida llega a 0, eliminamos al enemigo
        if enemigo_status.value <= 0:
            info.change_score_by(100)
            otherSprite42.destroy(effects.disintegrate)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.bullet_poryectile, on_on_overlap4)

# Funciones al soltar botones
def on_down_released():
    characterAnimations.set_character_state(mySprite, characterAnimations.rule(Predicate.FACING_DOWN))
controller.down.on_event(ControllerButtonEvent.RELEASED, on_down_released)

def cordenadas_sala2():
    global posiciones_sala1
    posiciones_sala1 = [[randint(2100, 2800), randint(2212, 2412)],
            [randint(2100, 2800), randint(2212, 2412)],
            [randint(2100, 2800), randint(2212, 2412)],
            [randint(2100, 2800), randint(2212, 2412)],
            [randint(2100, 2800), randint(2212, 2412)],
            [randint(2100, 2800), randint(2212, 2412)],
            [randint(2100, 2800), randint(2212, 2412)],
            [randint(2100, 2800), randint(2212, 2412)],
            [randint(2100, 2800), randint(2212, 2412)],
            [randint(2100, 2800), randint(2212, 2412)]]

def on_left_pressed():
    characterAnimations.set_character_state(mySprite, characterAnimations.rule(Predicate.MOVING_LEFT))
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

# Modificamos la funcion de compra para incluir las pociones
def intentar_comprar(nombre_arma: str, precio: number, imagen_arma: Image, sprite_jugador: Sprite):
    global fondo_blanco, arma_visual, compra, arma_actual, arma_hud
    # Crear fondo blanco para resaltar el item
    fondo_blanco = sprites.create(image.create(30, 30), SpriteKind.food)
    fondo_blanco.image.fill(1)
    fondo_blanco.set_position(sprite_jugador.x, sprite_jugador.y - 40)
    # Crear el sprite visual del item
    arma_visual = sprites.create(imagen_arma, SpriteKind.food)
    arma_visual.set_position(sprite_jugador.x, sprite_jugador.y - 40)
    # Preguntar al usuario
    compra = game.ask("" + nombre_arma + " ($" + ("" + str(precio)) + ")", "¿Comprar?")
    # Procesar compra
    if compra:
        if info.score() >= precio:
            # Logica para comprar pocion
            if nombre_arma == "Pocion":
                if info.life() < 15:
                    info.change_score_by(0 - precio)
                    info.change_life_by(1)
                    music.power_up.play()
                    game.splash("¡Salud +1 Corazón! <3")
                else:
                    game.splash("¡Ya estás lleno de vida!")
            else:
                # Logica para comprar armas
                info.change_score_by(0 - precio)
                arma_actual = nombre_arma
                # Actualizamos el HUD del arma
                arma_hud.destroy()
                arma_hud = sprites.create(imagen_arma, SpriteKind.food)
                arma_hud.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
                arma_hud.set_position(20, 105)
                music.ba_ding.play()
                game.splash("¡Comprado! Tienes: " + nombre_arma)
        else:
            music.buzzer.play()
            game.splash("¡No tienes dinero! Necesitas " + ("" + str(precio)))
    # Limpiamos los sprites temporales
    arma_visual.destroy()
    fondo_blanco.destroy()

def on_right_released():
    characterAnimations.set_character_state(mySprite, characterAnimations.rule(Predicate.FACING_RIGHT))
controller.right.on_event(ControllerButtonEvent.RELEASED, on_right_released)

def on_left_released():
    characterAnimations.set_character_state(mySprite, characterAnimations.rule(Predicate.FACING_LEFT))
controller.left.on_event(ControllerButtonEvent.RELEASED, on_left_released)

def on_on_overlap5(sprite_player3, walking_enemy):
    global distancia_repulsion
    if dodge_roll == True:
        return
    info.change_life_by(-1)
    scene.camera_shake(2, 250)
    music.thump.play()
    distancia_repulsion = 5
    if sprite_player3.x > walking_enemy.x:
        sprite_player3.x += distancia_repulsion
    else:
        sprite_player3.x -= distancia_repulsion
    if sprite_player3.y > walking_enemy.y:
        sprite_player3.y += distancia_repulsion
    else:
        sprite_player3.y -= distancia_repulsion
sprites.on_overlap(SpriteKind.player, SpriteKind.normal_bullet, on_on_overlap5)

def on_right_pressed():
    characterAnimations.set_character_state(mySprite, characterAnimations.rule(Predicate.MOVING_RIGHT))
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

# Funcion para generar multiples enemigos
def spawn_enemis_multiple():
    check_current_sala()
    for pos_tile in posiciones_sala1:
        nuevo_enemigo = sprites.create(img("""
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                """),
            SpriteKind.bullet_poryectile)
        x_coord = pos_tile[0]
        y_coord = pos_tile[1]
        nuevo_enemigo.set_position(x_coord, y_coord)
        characterAnimations.loop_frames(nuevo_enemigo,
            assets.animation("""myAnim"""),
            200,
            characterAnimations.rule(Predicate.FACING_LEFT))
        characterAnimations.loop_frames(nuevo_enemigo,
            assets.animation("""myAnim0"""),
            200,
            characterAnimations.rule(Predicate.FACING_RIGHT))
        sb = statusbars.create(20, 4, StatusBarKind.health)
        sb.attach_to_sprite(nuevo_enemigo)
        sb.max = 3
        sb.value = 3
        sb.set_color(7, 2)
    check_current_sala()
    for pos_tile2 in posiciones_sala1:
        nuevo_enemigo = sprites.create(img("""
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                """),
            SpriteKind.normal_bullet)
        x_coord = pos_tile2[0]
        y_coord = pos_tile2[1]
        nuevo_enemigo.set_position(x_coord, y_coord)
        characterAnimations.loop_frames(nuevo_enemigo,
            assets.animation("""bullet"""),
            200,
            characterAnimations.rule(Predicate.FACING_LEFT))
        characterAnimations.loop_frames(nuevo_enemigo,
            assets.animation("""bullet0"""),
            200,
            characterAnimations.rule(Predicate.FACING_RIGHT))
        sb = statusbars.create(20, 4, StatusBarKind.health)
        sb.attach_to_sprite(nuevo_enemigo)
        sb.max = 3
        sb.value = 3
        sb.set_color(7, 2)

# Funcion para spawnear al jefe
def spawnBoss():
    # Usamos el primer frame de la animacion para crear el sprite
    boss_anim_start = assets.animation("bullet_key_right")[0]
    boss = sprites.create(boss_anim_start, SpriteKind.Boss)
    # Posicion aleatoria en la sala
    boss.set_position(3039, 1345)
    
    # Configuramos animaciones de movimiento
    characterAnimations.loop_frames(boss, assets.animation("bullet_key_left"), 200, characterAnimations.rule(Predicate.FACING_LEFT))
    characterAnimations.loop_frames(boss, assets.animation("bullet_key_right"), 200, characterAnimations.rule(Predicate.FACING_RIGHT))
    
    # Barra de vida del jefe
    sb_boss = statusbars.create(20, 4, StatusBarKind.health)
    sb_boss.attach_to_sprite(boss)
    sb_boss.max = 100
    sb_boss.value = 100
    sb_boss.set_color(2, 4)

def spawnFinalBoss():
    global is_boss_spawned
    # 1. Obtener la lista COMPLETA de frames de la animación
    boss_frames = assets.animation("boss_attack")
    
    # 2. Usamos el PRIMER frame para crear el sprite
    boss = sprites.create(boss_frames[0], SpriteKind.FinalBoss)
    
    # 3. Ejecutar la animación en bucle (True) con TODOS los frames ⭐️
    animation.run_image_animation(
        boss,
        boss_frames, # Lista completa de imágenes
        300,         # Velocidad (ajustada a 200ms para un bucle visible)
        True         # Bucle (looping) = True
    )
    
    # Posicionamiento y Status Bar (se mantienen)
    boss.set_position(324, 2229)
    sb_boss = statusbars.create(20, 4, StatusBarKind.health)
    sb_boss.attach_to_sprite(boss)
    sb_boss.max = 250
    sb_boss.value = 250
    sb_boss.set_color(2, 4)
    is_boss_spawned = True

def on_up_released():
    characterAnimations.set_character_state(mySprite, characterAnimations.rule(Predicate.FACING_UP))
controller.up.on_event(ControllerButtonEvent.RELEASED, on_up_released)

def on_down_pressed():
    characterAnimations.set_character_state(mySprite, characterAnimations.rule(Predicate.MOVING_DOWN))
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def cordenadas_sala5():
    global posiciones_sala1
    posiciones_sala1 = [[randint(954, 536), randint(1639, 1465)],
        [randint(954, 536), randint(1639, 1465)],
        [randint(954, 536), randint(1639, 1465)],
        [randint(954, 536), randint(1639, 1465)]]

def on_on_overlap6(sprite_proj2, otherSprite4):
    global enemigo_status
    enemigo_status = statusbars.get_status_bar_attached_to(StatusBarKind.health, otherSprite4)
    if enemigo_status:
        daño_recibido = sprites.read_data_number(sprite_proj2, "damage")
        if daño_recibido == 0:
            daño_recibido = 1
        enemigo_status.value -= daño_recibido
        sprite_proj2.destroy()
        if enemigo_status.value <= 0:
            info.change_score_by(100)
            otherSprite4.destroy(effects.disintegrate)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.normal_bullet, on_on_overlap6)

# Daño al jefe por proyectiles
def on_hit_boss(sprite_proj, boss_sprite):
    status_jefe = statusbars.get_status_bar_attached_to(StatusBarKind.health, boss_sprite)
    if status_jefe:
        daño = sprites.read_data_number(sprite_proj, "damage")
        if daño == 0: daño = 1
        status_jefe.value -= daño
        sprite_proj.destroy()
        if status_jefe.value <= 0:
            info.change_score_by(500)
            boss_sprite.destroy()
sprites.on_overlap(SpriteKind.projectile, SpriteKind.Boss, on_hit_boss)

def on_hit_Finalboss(sprite_proj, boss_sprite):
    status_jefe = statusbars.get_status_bar_attached_to(StatusBarKind.health, boss_sprite)
    if status_jefe:
        daño = sprites.read_data_number(sprite_proj, "damage")
        if daño == 0: daño = 1
        status_jefe.value -= daño
        sprite_proj.destroy()
        if status_jefe.value <= 0:
            info.change_score_by(500)
            boss_sprite.destroy()
sprites.on_overlap(SpriteKind.projectile, SpriteKind.FinalBoss, on_hit_Finalboss)

# El jefe daña al jugador al tocarlo
def on_boss_hit_player(player_sprite, boss_sprite):
    if dodge_roll: return
    info.change_life_by(-2) # El jefe hace mas daño
    scene.camera_shake(4, 500)
    music.thump.play()
    # Rebote simple
    if player_sprite.x < boss_sprite.x:
        player_sprite.x -= 20
    else:
        player_sprite.x += 20
    pause(500)
sprites.on_overlap(SpriteKind.player, SpriteKind.Boss, on_boss_hit_player)

# El jefe final daña al jugador al tocarlo
def on_finalboss_hit_player(player_sprite: Sprite, final_boss_sprite: Sprite):
    global dodge_roll
    # 1. Comprueba la invulnerabilidad
    if dodge_roll:
        return
    # 2. Aplica el daño (Aumentamos el daño por ser el jefe final)
    info.change_life_by(-3) 
    # 3. Efectos
    scene.camera_shake(6, 600) # Más fuerte y largo que el jefe normal
    music.thump.play()
    # 4. Rebote para romper el solapamiento
    if player_sprite.x < final_boss_sprite.x:
        player_sprite.x -= 30 # Rebote más fuerte
    else:
        player_sprite.x += 30
    
    # 5. Pausa/Inmunidad temporal post-hit
    # Esto evita el daño instantáneo repetido por estar encima del jefe
    pause(500)

# 6. Registrar el evento de colisión para el jefe final
sprites.on_overlap(SpriteKind.player, SpriteKind.FinalBoss, on_finalboss_hit_player)

# Evento al destruir al jefe (explosion)
def on_boss_destroyed(boss_sprite):
    # Usamos el primer cuadro de la animacion de muerte para crear la explosion
    anim_kill = assets.animation("bullet_key_kill")
    explosion = sprites.create(anim_kill[0], SpriteKind.ExplosionMortal)
    explosion.set_position(boss_sprite.x, boss_sprite.y)
    
    # Ejecutamos la animacion de muerte
    animation.run_image_animation(explosion, anim_kill, 200, False)
    explosion.lifespan = 1000
    music.big_crash.play()
sprites.on_destroyed(SpriteKind.Boss, on_boss_destroyed)

# Evento al destruir al Jefe Final
def on_final_boss_destroyed(boss_sprite: Sprite):
    # Duración de la animación de muerte (200ms por frame * 5 frames = 1000ms)
    DURACION_ANIMACION = 1000
    # 1. Obtenemos la animación de muerte del jefe final
    anim_kill_final = assets.animation("boss_kill")
    # 2. Creamos el sprite de explosión (usando el primer frame de la animación)
    explosion = sprites.create(anim_kill_final[0], SpriteKind.ExplosionMortal)
    explosion.set_position(boss_sprite.x, boss_sprite.y)
    # 3. Ejecutamos la animación completa
    animation.run_image_animation(explosion, anim_kill_final, 200, False)
    explosion.lifespan = DURACION_ANIMACION
    music.big_crash.play() 
    pause(DURACION_ANIMACION)
    # 4. Mostrar el mensaje después de que la animación termine
    game.splash("¡Jefe Final Derrotado!")
    game.over(True, effects.smiles)
    game.reset()
sprites.on_destroyed(SpriteKind.FinalBoss, on_final_boss_destroyed)

# La explosion daña al jugador si lo toca
def on_explosion_hit_player(player_sprite, explosion_sprite):
    # Reduce la vida a 1 si te alcanza
    if info.life() > 1:
        info.set_life(1)
        scene.camera_shake(4, 500)
        music.zapped.play()
        game.splash("¡LA EXPLOSIÓN TE DEJÓ DÉBIL! >_<")
sprites.on_overlap(SpriteKind.player, SpriteKind.ExplosionMortal, on_explosion_hit_player)

def check_current_sala():
    global current_sala
    if current_sala == 1:
        cordenadas_sala1()
    elif current_sala == 2:
        cordenadas_sala2()
    elif current_sala == 3:
        cordenadas_sala3()
    elif current_sala == 4:
        cordenadas_sala4()
    elif current_sala == 5:
        cordenadas_sala5()
    elif current_sala == 6:
        cordenadas_sala6()
    elif current_sala == 7:
        cordenadas_sala7()
    elif current_sala == 8:
        cordenadas_sala8()
        spawnBoss()
    
    

def check_lives_enemys():
    global current_sala
    if len(sprites.all_of_kind(SpriteKind.bullet_poryectile)) == 0  and len(sprites.all_of_kind(SpriteKind.normal_bullet)) == 0:
        current_sala +=1
        game.splash("Sala limpiada")
        spawn_enemis_multiple()

def on_on_overlap7(sprite2, otherSprite3):
    mySprite.set_position(2573, 2782)
    music.stop_all_sounds()
    music.set_volume(75)
    music.play(music.string_playable("F E D A B A E E ", 120),
        music.PlaybackMode.LOOPING_IN_BACKGROUND)
sprites.on_overlap(SpriteKind.player, SpriteKind.tp_sala_lobby, on_on_overlap7)

def cordenadas_sala4():
    global posiciones_sala1
    posiciones_sala1 = [[randint(1780, 1980), randint(1250, 1775)],
            [randint(1780, 1980), randint(1250, 1775)],
            [randint(1780, 1980), randint(1250, 1775)],
            [randint(1780, 1980), randint(1250, 1775)],
            [randint(1780, 1980), randint(1250, 1775)],
            [randint(1780, 1980), randint(1250, 1775)],
            [randint(1780, 1980), randint(1250, 1775)],
            [randint(1780, 1980), randint(1250, 1775)],
            [randint(1780, 1980), randint(1250, 1775)],
            [randint(1780, 1980), randint(1250, 1775)],
            [randint(1780, 1980), randint(1250, 1775)]]
def cordenadas_sala6():
    global posiciones_sala1
    posiciones_sala1 = [[randint(2714, 2200), randint(1847, 1609)],
        [randint(2714, 2200), randint(1847, 1609)],
        [randint(2714, 2200), randint(1847, 1609)],
        [randint(2714, 2200), randint(1847, 1609)],
        [randint(2714, 2200), randint(1847, 1609)],
        [randint(2714, 2200), randint(1847, 1609)]]
def cordenadas_sala1():
    global posiciones_sala1
    posiciones_sala1 = [[randint(2190, 1550), randint(2610, 2880)],
        [randint(2190, 1550), randint(2610, 2880)],
        [randint(2190, 1550), randint(2610, 2880)],
        [randint(2190, 1550), randint(2610, 2880)],
        [randint(2190, 1550), randint(2610, 2880)],
        [randint(2190, 1550), randint(2610, 2880)],
        [randint(2190, 1550), randint(2610, 2880)]]


def cordenadas_sala7():
    global posiciones_sala1
    posiciones_sala1 = [[randint(2714, 2200), randint(1450, 1177)],
        [randint(2714, 2200), randint(1450, 1177)],
        [randint(2714, 2200), randint(1450, 1177)],
        [randint(2714, 2200), randint(1450, 1177)],
        [randint(2714, 2200), randint(1450, 1177)],
        [randint(2714, 2200), randint(1450, 1177)]]
distancia_repulsion = 0
compra = False
arma_visual: Sprite = None
fondo_blanco: Sprite = None
enemigo_status: StatusBarSprite = None
projectile: Sprite = None
delta_y = 0
delta_x = 0
dodge_roll = False
posiciones_sala1: List[List[number]] = []
npc_tienda: Sprite = None
npc_historia: Sprite = None
npc_controles: Sprite = None
mySprite: Sprite = None
arma_actual = ""
arma_hud: Sprite = None
distancia_repulsion2 = 0
info.set_score(0)
info.set_life(15)
current_sala = 1
# Dinero inicial
# Creamos el HUD (Ahora está fuera de la clase)
arma_hud = sprites.create(assets.image("""
    gun
    """), SpriteKind.food)
arma_hud.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
arma_hud.set_position(20, 105)
# Variable de estado
arma_actual = "pistola"
@namespace
class SpriteKind22:
    npc2 = SpriteKind.create()
    tp_sala = SpriteKind.create()
    tp_jefe = SpriteKind.create()
    tp_sala_lobby2 = SpriteKind.create()
    tp_sala_jefe2 = SpriteKind.create()
mySprite = sprites.create(assets.image("""
    myImage
    """), SpriteKind.player)
npc_controles = sprites.create(assets.image("""
    cultist_npc
    """), SpriteKind.npc)
tp_lobby_sala = sprites.create(img("""
        . . . . . 5 . 5 . 5 . . . . . .
        . . . . . . 5 5 5 . . . . . . .
        . . . . . 5 5 . 5 5 . . . . . .
        """),
    SpriteKind.tp_sala_lobby)
tp_sala_jefe22 = sprites.create(img("""
        . . . . . 5 . 5 . 5 . . . . . .
        . . . . . . 5 5 5 . . . . . . .
        . . . . . 5 5 . 5 5 . . . . . .
        """),
    SpriteKind.tp_sala_jefe)
npc_historia = sprites.create(assets.image("""
    bullet_npc
    """), SpriteKind.npc)
npc_tienda = sprites.create(assets.image("""
    dallas_shoper
    """), SpriteKind.npc)
is_boss_spawned = False
mySprite.set_position(335, 316)
npc_controles.set_position(390, 270)
tp_lobby_sala.set_position(330, 360)
tp_sala_jefe22.set_position(3135, 311)
npc_historia.set_position(390, 330)
npc_tienda.set_position(115, 1520)
# Establecer velocidad máxima
# Configuración de animaciones del jugador... (se mantiene igual)
characterAnimations.loop_frames(npc_tienda,
    assets.animation("""
        dallas_animation
        """),
    400,
    characterAnimations.rule(Predicate.NOT_MOVING))
# Establecer velocidad máxima
# Configuración de animaciones del jugador... (se mantiene igual)
characterAnimations.loop_frames(npc_controles,
    assets.animation("""
        cultistAnimation
        """),
    300,
    characterAnimations.rule(Predicate.NOT_MOVING))
# Establecer velocidad máxima
# Configuración de animaciones del jugador... (se mantiene igual)
characterAnimations.loop_frames(npc_historia,
    assets.animation("""
        Bullet_NPC_Animation
        """),
    400,
    characterAnimations.rule(Predicate.NOT_MOVING))
# Establecer velocidad máxima
# Configuración de animaciones del jugador... (se mantiene igual)
characterAnimations.loop_frames(mySprite,
    assets.animation("""
        run_front_pilot
        """),
    120,
    characterAnimations.rule(Predicate.MOVING_DOWN))
characterAnimations.loop_frames(mySprite,
    assets.animation("""
        run_back_player
        """),
    120,
    characterAnimations.rule(Predicate.MOVING_UP))
characterAnimations.loop_frames(mySprite,
    assets.animation("""
        run_right_pilot0
        """),
    120,
    characterAnimations.rule(Predicate.MOVING_RIGHT))
characterAnimations.loop_frames(mySprite,
    assets.animation("""
        run_right_pilot
        """),
    120,
    characterAnimations.rule(Predicate.MOVING_LEFT))
characterAnimations.loop_frames(mySprite,
    assets.animation("""
        still_down
        """),
    220,
    characterAnimations.rule(Predicate.FACING_DOWN))
characterAnimations.loop_frames(mySprite,
    assets.animation("""
        side_rigth
        """),
    220,
    characterAnimations.rule(Predicate.FACING_RIGHT))
characterAnimations.loop_frames(mySprite,
    assets.animation("""
        side_left
        """),
    220,
    characterAnimations.rule(Predicate.FACING_LEFT))
characterAnimations.loop_frames(mySprite,
    assets.animation("""
        back_player
        """),
    300,
    characterAnimations.rule(Predicate.FACING_UP))
# Spawneamos los enemigos
spawn_enemis_multiple()
# Spawneamos al jefe
controller.move_sprite(mySprite)
scene.camera_follow_sprite(mySprite)
tiles.set_current_tilemap(tilemap("""
    first_dungeon
    """))
music.set_volume(75)
music.play(music.string_playable("E B C5 A B G A F ", 120),
    music.PlaybackMode.LOOPING_IN_BACKGROUND)

def on_on_update():
    global tiempo_ultimo_disparo, projectile
    check_lives_enemys()
    mode_attack()
    
    # Logica del rifle automatico
    if controller.B.is_pressed():
        # Valores por defecto
        daño = 1
        velocidad = 200
        cooldown = 500
        # Stats
        if arma_actual == "shotgun":
            daño = 3
            velocidad = 150
            cooldown = 1000
        elif arma_actual == "rifle":
            daño = 1
            velocidad = 350
            cooldown = 150
        elif arma_actual == "Misterio":
            daño = 10
            velocidad = 100
            cooldown = 2000
            
        if game.runtime() - tiempo_ultimo_disparo < cooldown:
            return
        
        tiempo_ultimo_disparo = game.runtime()
        vx = 0
        vy = 0
        if characterAnimations.matches_rule(mySprite, characterAnimations.rule(Predicate.FACING_RIGHT)) or characterAnimations.matches_rule(mySprite, characterAnimations.rule(Predicate.MOVING_RIGHT)):
            vx = velocidad
        elif characterAnimations.matches_rule(mySprite, characterAnimations.rule(Predicate.FACING_LEFT)) or characterAnimations.matches_rule(mySprite, characterAnimations.rule(Predicate.MOVING_LEFT)):
            vx = -velocidad
        elif characterAnimations.matches_rule(mySprite, characterAnimations.rule(Predicate.FACING_DOWN)) or characterAnimations.matches_rule(mySprite, characterAnimations.rule(Predicate.MOVING_DOWN)):
            vy = velocidad
        elif characterAnimations.matches_rule(mySprite, characterAnimations.rule(Predicate.FACING_UP)) or characterAnimations.matches_rule(mySprite, characterAnimations.rule(Predicate.MOVING_UP)):
            vy = -velocidad
        if vx == 0 and vy == 0:
            vx = velocidad
        projectile = sprites.create_projectile_from_sprite(assets.image("""bullet_initial"""), mySprite, vx, vy)
        sprites.set_data_number(projectile, "damage", daño)
game.on_update(on_on_update)

def boss_circle_attack():
    global is_boss_spawned

    # ⭐️ CHEQUEO DE ESTADO: Ahora es doblemente seguro ⭐️
    if is_boss_spawned == False:
        return
        
    jefes_finales = sprites.all_of_kind(SpriteKind.FinalBoss)
    
    if not jefes_finales:
        # Esto debería ser imposible si is_boss_spawned es True, 
        # pero es una buena verificación de seguridad.
        is_boss_spawned = False 
        return
        
    boss_sprite = jefes_finales[0]
    
    # ... (Resto de la lógica de disparo circular se mantiene) ...
    NUM_BALAS = 12
    VELOCIDAD = 50
    angulo_incremento = 360 / NUM_BALAS
    
    for i in range(NUM_BALAS):
        angulo_actual = i * angulo_incremento
        radians = angulo_actual * (Math.PI / 180)
        
        proj_boss = sprites.create_projectile_from_sprite(
            assets.image("""bullet_boos"""),
            boss_sprite,
            Math.cos(radians) * VELOCIDAD,
            Math.sin(radians) * VELOCIDAD
        )
        proj_boss.set_kind(SpriteKind.ENEMIE_PROJECTILE)
        sprites.set_data_number(proj_boss, "damage", 1)

# Registrar el ataque (Se ejecuta siempre, pero solo dispara si is_boss_spawned es True)
game.on_update_interval(3000, boss_circle_attack)

# --- Inicialización del Juego ---
# Usamos game.on_update_interval para controlar la cadencia de disparo (ej. cada 1.5 segundos)

def on_update_interval():
    # El bucle de persecución en mode_attack ya garantiza que los enemigos se están moviendo.
    for un_enemigo in sprites.all_of_kind(SpriteKind.bullet_poryectile):
        # 1. Creamos una variable LOCAL para el proyectil, pero la inicializamos dentro del bloque.
        velocidad_proyectil = 100
        vx_enemigo = un_enemigo.vx
        vy_enemigo = un_enemigo.vy
        proj_a_lanzar = None
        # Determinar la dirección principal (Horizontal vs. Vertical)
        if abs(vx_enemigo) > abs(vy_enemigo):
            # Movimiento dominante es HORIZONTAL
            if vx_enemigo > 0:
                # Dispara a la DERECHA
                proj_a_lanzar = sprites.create_projectile_from_sprite(assets.image("""
                        bullet_initial
                        """),
                    un_enemigo,
                    velocidad_proyectil,
                    0)
            elif vx_enemigo < 0:
                # Dispara a la IZQUIERDA
                proj_a_lanzar = sprites.create_projectile_from_sprite(assets.image("""
                        bullet_initial
                        """),
                    un_enemigo,
                    0 - velocidad_proyectil,
                    0)
        elif abs(vy_enemigo) > 0:
            # Movimiento dominante es VERTICAL
            if vy_enemigo > 0:
                # Dispara ABAJO
                proj_a_lanzar = sprites.create_projectile_from_sprite(assets.image("""
                        bullet_initial
                        """),
                    un_enemigo,
                    0,
                    velocidad_proyectil)
            else:
                # vy_enemigo < 0
                # Dispara ARRIBA
                proj_a_lanzar = sprites.create_projectile_from_sprite(assets.image("""
                        bullet_initial
                        """),
                    un_enemigo,
                    0,
                    0 - velocidad_proyectil)
        # 2. Si se asignó un valor (es decir, el proyectil existe), se le da el SpriteKind.
        if proj_a_lanzar:
            # Esto es un atajo para if proj_a_lanzar != None:
            proj_a_lanzar.set_kind(SpriteKind.ENEMIE_PROJECTILE)
game.on_update_interval(1500, on_update_interval)