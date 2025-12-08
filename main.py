@namespace
class SpriteKind:
    normal_bullet = SpriteKind.create()
    npc = SpriteKind.create()
    tp_sala_lobby = SpriteKind.create()
    tp_sala_jefe = SpriteKind.create()
    ENEMIE_PROJECTILE = SpriteKind.create()
    bullet_poryectile = SpriteKind.create()
def cordenadas_sala3():
    global posiciones_sala1
    posiciones_sala1 = [[randint(3336, 3128), randint(2025, 2378)],
        [randint(3336, 3128), randint(2025, 2378)],
        [randint(3336, 3128), randint(2025, 2378)],
        [randint(3336, 3128), randint(2025, 2378)],
        [randint(3336, 3128), randint(2025, 2378)]]
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
    #  OPTIMIZACIÓN: Itera sobre TODOS los enemigos para que todos sigan al jugador
    for un_enemigo2 in sprites.all_of_kind(SpriteKind.bullet_poryectile):
        un_enemigo2.follow(mySprite, 10)
    #  OPTIMIZACIÓN: Itera sobre TODOS los enemigos para que todos sigan al jugador
    for un_enemigo22 in sprites.all_of_kind(SpriteKind.normal_bullet):
        un_enemigo22.follow(mySprite, 30)

def on_on_overlap(sprite_player, sprite_proj):
    # Destruir el proyectil enemigo inmediatamente
    sprite_proj.destroy()
    #  COMPROBACIÓN DE INVULNERABILIDAD 
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

# CONFIGURACIÓN DE ARMAS
# cooldown: Tiempo de espera entre disparos (en milisegundos). Menos es más rápido.
# damage: Cuánta vida quita a los enemigos.
# speed: Velocidad de la bala.
stats_armas = {
    "pistola":  { "damage": 1, "speed": 200, "cooldown": 500 },
    "shotgun":  { "damage": 3, "speed": 150, "cooldown": 1000 }, # Lenta pero fuerte
    "rifle":    { "damage": 1, "speed": 350, "cooldown": 150 },  # ¡Metralleta rápida!
    "Misterio": { "damage": 10,"speed": 100, "cooldown": 2000 }  # Lenta, dispara poco, pero DEVASTADORA
}

# Variable para controlar el tiempo (para la cadencia)
tiempo_ultimo_disparo = 0


def on_up_pressed():
    characterAnimations.set_character_state(mySprite, characterAnimations.rule(Predicate.MOVING_UP))
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

# Empujoncito final

def on_on_overlap2(sprite_player2, otherSprite):
    global distancia_repulsion2, delta_x, delta_y
    # Definimos la distancia de repulsión (ajustable)
    distancia_repulsion2 = 10
    # Un pequeño empujón es suficiente para romper el solapamiento.
    # Verificamos si la colisión es con cualquiera de los NPCs
    delta_x = sprite_player2.x - otherSprite.x
    delta_y = sprite_player2.y - otherSprite.y
    if otherSprite == npc_controles or otherSprite == npc_historia:
        #  Lógica de Repulsión 
        # Calcular la diferencia entre las posiciones
        delta_x = sprite_player2.x - otherSprite.x
        SpriteKind2 = sprite_player2.y - otherSprite.y
        # Repulsión Horizontal (Si la diferencia es significativa)
        if abs(delta_x) > abs(delta_y):
            if delta_x > 0:
                # Jugador a la derecha del NPC, lo empuja más a la derecha
                sprite_player2.x += distancia_repulsion2
            else:
                sprite_player2.x -= distancia_repulsion2
        elif delta_y > 0:
            # Jugador debajo del NPC, lo empuja hacia abajo
            sprite_player2.y += distancia_repulsion2
        else:
            sprite_player2.y -= distancia_repulsion2
    # ---------------------------
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
        # --- 2. LA BALITA ---
        # Parte 1: El aviso
        game.show_long_text("" + """
                Hola... no pareces de por aquí.
                """ + """
                Bienvenido a la 'Cripta del Calibre Perdido'.
                """ + "Antes esto era una fragua sagrada, pero 'El Detonador' lo corrompió todo...",
            DialogLayout.BOTTOM)
        # Parte 2: La leyenda
        game.show_long_text("" + """
                Ahora, mis hermanos balas se han vuelto locos por la Pólvora Negra.
                """ + "Pero dicen que en el fondo existe el el 'Núcleo de Plomo'...",
            DialogLayout.BOTTOM)
        # Parte 3: El reto
        game.show_long_text("" + """
                Si logras llegar y vencer a los Guardianes, el Núcleo te concederá un deseo:
                """ + "¡Cambiar tu pasado!\n" + "¿Tienes el valor (y la munición) para intentarlo? Suerte... la necesitarás. ",
            DialogLayout.BOTTOM)
    elif otherSprite == npc_tienda:
        game.show_long_text("¡Bienvenido! ¿Qué te llevas hoy?", DialogLayout.BOTTOM)
        intentar_comprar("shotgun",
            50,
            assets.image("""
                shotgun
                """),
            sprite_player2)
        intentar_comprar("rifle",
            120,
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
    music.stop_all_sounds()
    music.set_volume(75)
    music.play(music.string_playable("C F D C E C G D ", 120),
        music.PlaybackMode.LOOPING_IN_BACKGROUND)
sprites.on_overlap(SpriteKind.player, SpriteKind.tp_sala_jefe, on_on_overlap3)

def on_b_pressed():
    global projectile, tiempo_ultimo_disparo
    
    # --- 1. DEFINIR ESTADÍSTICAS (Manual y seguro) ---
    # Valores por defecto (Pistola)
    daño = 1
    velocidad = 200
    cooldown = 500
    
    # Ajustamos según el arma que tengas
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
        
    # --- 2. CONTROL DE CADENCIA ---
    if game.runtime() - tiempo_ultimo_disparo < cooldown:
        return
    
    tiempo_ultimo_disparo = game.runtime()
    
    # --- 3. CALCULAR DIRECCIÓN ---
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
        
    # Si está quieto, dispara a la derecha por defecto
    if vx == 0 and vy == 0:
        vx = velocidad

    # --- 4. DISPARAR ---
    projectile = sprites.create_projectile_from_sprite(assets.image("""bullet_initial"""), mySprite, vx, vy)
    
    # Guardamos el daño (ahora sí, sin errores raros)
    sprites.set_data_number(projectile, "damage", daño)

controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

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
    
    # 1. Obtener la barra de vida del enemigo
    enemigo_status = statusbars.get_status_bar_attached_to(StatusBarKind.health, otherSprite42)
    
    if enemigo_status:
        # ⭐️ NUEVO: LEER EL DAÑO DE LA BALA ⭐️
        # Leemos el numerito "damage" que guardamos al disparar
        daño_recibido = sprites.read_data_number(sprite_proj22, "damage")
        
        # Si por alguna razón es 0 (ej. olvidaste ponerlo), que haga 1 de daño mínimo
        if daño_recibido == 0:
            daño_recibido = 1
            
        # 2. Restar ese daño específico
        enemigo_status.value -= daño_recibido
        
        # 3. Destruir bala
        sprite_proj22.destroy()
        
        # 4. Muerte
        if enemigo_status.value <= 0:
            info.change_score_by(100)
            otherSprite42.destroy(effects.disintegrate)

sprites.on_overlap(SpriteKind.projectile, SpriteKind.bullet_poryectile, on_on_overlap4)

# Funciones de released (Optimizadas en la respuesta anterior)

def on_down_released():
    characterAnimations.set_character_state(mySprite, characterAnimations.rule(Predicate.FACING_DOWN))
controller.down.on_event(ControllerButtonEvent.RELEASED, on_down_released)

def cordenadas_sala2():
    global posiciones_sala1
    posiciones_sala1 = [[randint(2873, 2021), randint(2487, 2137)],
        [randint(2873, 2021), randint(2487, 2137)],
        [randint(2873, 2021), randint(2487, 2137)],
        [randint(2873, 2021), randint(2487, 2137)],
        [randint(2873, 2021), randint(2487, 2137)],
        [randint(2873, 2021), randint(2487, 2137)],
        [randint(2873, 2021), randint(2487, 2137)],
        [randint(2873, 2021), randint(2487, 2137)],
        [randint(2873, 2021), randint(2487, 2137)],
        [randint(2873, 2021), randint(2487, 2137)]]

def on_left_pressed():
    characterAnimations.set_character_state(mySprite, characterAnimations.rule(Predicate.MOVING_LEFT))
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def intentar_comprar(nombre_arma: str, precio: number, imagen_arma: Image, sprite_jugador: Sprite):
    global fondo_blanco, arma_visual, compra, arma_actual, arma_hud
    # 1. Crear Fondo Blanco (Tapete visual)
    fondo_blanco = sprites.create(image.create(30, 30), SpriteKind.food)
    fondo_blanco.image.fill(1)
    # Color blanco
    fondo_blanco.set_position(sprite_jugador.x, sprite_jugador.y - 40)
    # 2. Crear el Arma Visual encima del fondo
    arma_visual = sprites.create(imagen_arma, SpriteKind.food)
    arma_visual.set_position(sprite_jugador.x, sprite_jugador.y - 40)
    # 3. Preguntar si quiere comprar
    compra = game.ask("" + nombre_arma + " ($" + ("" + str(precio)) + ")",
        "¿Comprar?")
    # 4. Lógica de compra
    if compra:
        if info.score() >= precio:
            info.change_score_by(0 - precio)
            arma_actual = nombre_arma
            # --- TRUCO DE LIMPIEZA ---
            # Si se veían superpuestos, esto fuerza a que solo haya uno
            arma_hud.destroy()
            # Borramos el viejo
            arma_hud = sprites.create(imagen_arma, SpriteKind.food)
            # Creamos el nuevo
            arma_hud.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
            arma_hud.set_position(20, 105)
            # -------------------------
            music.ba_ding.play()
            game.splash("¡Comprado! Tienes: " + nombre_arma)
        else:
            music.buzzer.play()
            game.splash("¡No tienes dinero! Necesitas " + ("" + str(precio)))
    # 5. Limpiar (Borrar sprites visuales)
    arma_visual.destroy()
    fondo_blanco.destroy()

def on_right_released():
    characterAnimations.set_character_state(mySprite, characterAnimations.rule(Predicate.FACING_RIGHT))
controller.right.on_event(ControllerButtonEvent.RELEASED, on_right_released)

def on_left_released():
    characterAnimations.set_character_state(mySprite, characterAnimations.rule(Predicate.FACING_LEFT))
controller.left.on_event(ControllerButtonEvent.RELEASED, on_left_released)

# 2. Registrar el evento de colisión para el daño por contacto

def on_on_overlap5(sprite_player3, walking_enemy):
    global distancia_repulsion
    # ⭐️ COMPROBACIÓN DE INVULNERABILIDAD ⭐️
    if dodge_roll == True:
        return
    # Si es invulnerable, salimos sin daño
    # Si no es invulnerable, recibe daño
    info.change_life_by(-1)
    scene.camera_shake(2, 250)
    # Agregamos una sacudida un poco más fuerte para el contacto
    music.thump.play()
    # OPCIONAL: Repulsión para romper el solapamiento inmediatamente
    # Puedes reutilizar la lógica de repulsión de los NPCs o simplificarla:
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

# ⭐️ NUEVA FUNCIÓN: Genera múltiples enemigos en diferentes posiciones
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
        # El primer elemento es la X
        y_coord = pos_tile[1]
        # El segundo elemento es la Y
        nuevo_enemigo.set_position(x_coord, y_coord)
        # Configuración de animaciones para ESTE enemigo (repetir para cada uno)
        characterAnimations.loop_frames(nuevo_enemigo,
            assets.animation("""
                myAnim
                """),
            200,
            characterAnimations.rule(Predicate.FACING_LEFT))
        characterAnimations.loop_frames(nuevo_enemigo,
            assets.animation("""
                myAnim0
                """),
            200,
            characterAnimations.rule(Predicate.FACING_RIGHT))
        sb = statusbars.create(20, 4, StatusBarKind.health)
        sb.attach_to_sprite(nuevo_enemigo)
        sb.max = 3
        # Ejemplo de vida inicial
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
        # El primer elemento es la X
        y_coord = pos_tile2[1]
        # El segundo elemento es la Y
        nuevo_enemigo.set_position(x_coord, y_coord)
        # Configuración de animaciones para ESTE enemigo (repetir para cada uno)
        characterAnimations.loop_frames(nuevo_enemigo,
            assets.animation("""
                bullet
                """),
            200,
            characterAnimations.rule(Predicate.FACING_LEFT))
        characterAnimations.loop_frames(nuevo_enemigo,
            assets.animation("""
                bullet0
                """),
            200,
            characterAnimations.rule(Predicate.FACING_RIGHT))
        sb = statusbars.create(20, 4, StatusBarKind.health)
        sb.attach_to_sprite(nuevo_enemigo)
        sb.max = 3
        # Ejemplo de vida inicial
        sb.value = 3
        sb.set_color(7, 2)

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
        # ⭐️ LEER DAÑO ⭐️
        daño_recibido = sprites.read_data_number(sprite_proj2, "damage")
        if daño_recibido == 0:
            daño_recibido = 1
            
        # Restar el daño real
        enemigo_status.value -= daño_recibido
        
        sprite_proj2.destroy()
        
        if enemigo_status.value <= 0:
            info.change_score_by(100)
            otherSprite4.destroy(effects.disintegrate)

sprites.on_overlap(SpriteKind.projectile, SpriteKind.normal_bullet, on_on_overlap6)

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

def check_lives_enemys():
    global current_sala
    if len(sprites.all_of_kind(SpriteKind.bullet_poryectile)) == 0  and len(sprites.all_of_kind(SpriteKind.normal_bullet)) == 0:
        current_sala +=1
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
    posiciones_sala1 = [[randint(2055, 1703), randint(1850, 1177)],
        [randint(2055, 1703), randint(1850, 1177)],
        [randint(2055, 1703), randint(1850, 1177)],
        [randint(2055, 1703), randint(1850, 1177)],
        [randint(2055, 1703), randint(1850, 1177)],
        [randint(2055, 1703), randint(1850, 1177)],
        [randint(2055, 1703), randint(1850, 1177)],
        [randint(2055, 1703), randint(1850, 1177)],
        [randint(2055, 1703), randint(1850, 1177)],
        [randint(2055, 1703), randint(1850, 1177)],
        [randint(2055, 1703), randint(1850, 1177)]]
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
    posiciones_sala1 = [[randint(2201, 1544), randint(2601, 2887)],
        [randint(2201, 1544), randint(2601, 2887)],
        [randint(2201, 1544), randint(2601, 2887)],
        [randint(2201, 1544), randint(2601, 2887)],
        [randint(2201, 1544), randint(2601, 2887)],
        [randint(2201, 1544), randint(2601, 2887)],
        [randint(2201, 1544), randint(2601, 2887)]]
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
# ⭐️ LLAMAR A LA NUEVA FUNCIÓN DE SPAWN
spawn_enemis_multiple()
controller.move_sprite(mySprite)
scene.camera_follow_sprite(mySprite)
tiles.set_current_tilemap(tilemap("""
    first_dungeon
    """))
music.set_volume(75)
music.play(music.string_playable("E B C5 A B G A F ", 120),
    music.PlaybackMode.LOOPING_IN_BACKGROUND)
# ⭐️ Opcional: Implementar aquí la lógica de animación por dirección para los enemigos

def on_on_update():
    check_lives_enemys()
    mode_attack()
game.on_update(on_on_update)

# --- Inicialización del Juego ---
# --- RECUERDA ELIMINAR ESTA LÍNEA DE LAS GLOBALES: enemigo_status: StatusBarSprite = None ---
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
