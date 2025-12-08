@namespace
class SpriteKind:
    npc = SpriteKind.create()
# --- Inicialización del Juego ---
def mode_attack():
    # ⭐️ OPTIMIZACIÓN: Itera sobre TODOS los enemigos para que todos sigan al jugador
    for un_enemigo in sprites.all_of_kind(SpriteKind.enemy):
        un_enemigo.follow(mySprite, 100)

def on_on_overlap(sprite_player: Sprite, otherSprite: Sprite):
    # Definimos la distancia de repulsión (ajustable)
    distancia_repulsion = 10  # Un pequeño empujón es suficiente para romper el solapamiento.

    # Verificamos si la colisión es con cualquiera de los NPCs
    if otherSprite == npc_controles or otherSprite == npc_historia:
        
        # ⭐️ Lógica de Repulsión ⭐️
        
        # Calcular la diferencia entre las posiciones
        delta_x = sprite_player.x - otherSprite.x
        delta_y = sprite_player.y - otherSprite.y
        
        # Repulsión Horizontal (Si la diferencia es significativa)
        if abs(delta_x) > abs(delta_y):
            if delta_x > 0:
                # Jugador a la derecha del NPC, lo empuja más a la derecha
                sprite_player.x += distancia_repulsion
            else:
                # Jugador a la izquierda del NPC, lo empuja más a la izquierda
                sprite_player.x -= distancia_repulsion
        # Repulsión Vertical (Si la diferencia es significativa o si la horizontal no lo fue)
        else:
            if delta_y > 0:
                # Jugador debajo del NPC, lo empuja hacia abajo
                sprite_player.y += distancia_repulsion
            else:
                # Jugador encima del NPC, lo empuja hacia arriba
                sprite_player.y -= distancia_repulsion
        
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

# Nota: Asegúrate de que los sprites 'npc_controles' y 'npc_historia' estén definidos.
sprites.on_overlap(SpriteKind.player, SpriteKind.npc, on_on_overlap)

def on_up_pressed():
    characterAnimations.set_character_state(mySprite, characterAnimations.rule(Predicate.MOVING_UP))
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_b_pressed():
    global projectile
    if characterAnimations.matches_rule(mySprite, characterAnimations.rule(Predicate.FACING_RIGHT)) or characterAnimations.matches_rule(mySprite, characterAnimations.rule(Predicate.MOVING_RIGHT)):
        projectile = sprites.create_projectile_from_sprite(assets.image("""
                bullet_initial
                """),
            mySprite,
            200,
            0)
    elif characterAnimations.matches_rule(mySprite, characterAnimations.rule(Predicate.FACING_LEFT)) or characterAnimations.matches_rule(mySprite, characterAnimations.rule(Predicate.MOVING_LEFT)):
        projectile = sprites.create_projectile_from_sprite(assets.image("""
                bullet_initial
                """),
            mySprite,
            -200,
            0)
    elif characterAnimations.matches_rule(mySprite, characterAnimations.rule(Predicate.FACING_DOWN)) or characterAnimations.matches_rule(mySprite, characterAnimations.rule(Predicate.MOVING_DOWN)):
        projectile = sprites.create_projectile_from_sprite(assets.image("""
                bullet_initial
                """),
            mySprite,
            0,
            200)
    elif characterAnimations.matches_rule(mySprite, characterAnimations.rule(Predicate.FACING_UP)) or characterAnimations.matches_rule(mySprite, characterAnimations.rule(Predicate.MOVING_UP)):
        projectile = sprites.create_projectile_from_sprite(assets.image("""
                bullet_initial
                """),
            mySprite,
            0,
            -200)
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_a_pressed():
    global dodge_roll
    characterAnimations.set_character_animations_enabled(mySprite, False)
    if characterAnimations.matches_rule(mySprite, characterAnimations.rule(Predicate.FACING_RIGHT)):
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

# Funciones de released (Optimizadas en la respuesta anterior)

def on_down_released():
    characterAnimations.set_character_state(mySprite, characterAnimations.rule(Predicate.FACING_DOWN))
controller.down.on_event(ControllerButtonEvent.RELEASED, on_down_released)

def on_left_pressed():
    characterAnimations.set_character_state(mySprite, characterAnimations.rule(Predicate.MOVING_LEFT))
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_right_released():
    characterAnimations.set_character_state(mySprite, characterAnimations.rule(Predicate.FACING_RIGHT))
controller.right.on_event(ControllerButtonEvent.RELEASED, on_right_released)

def on_left_released():
    characterAnimations.set_character_state(mySprite, characterAnimations.rule(Predicate.FACING_LEFT))
controller.left.on_event(ControllerButtonEvent.RELEASED, on_left_released)

def on_right_pressed():
    characterAnimations.set_character_state(mySprite, characterAnimations.rule(Predicate.MOVING_RIGHT))
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

# ⭐️ NUEVA FUNCIÓN: Genera múltiples enemigos en diferentes posiciones
def spawn_enemis_multiple():
    for pos_tile in POSICIONES_ENEMIGOS:
        nuevo_enemigo = sprites.create(img("""
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                """),
            SpriteKind.enemy)
        nuevo_enemigo.set_position(pos_tile, 270)
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

def on_up_released():
    characterAnimations.set_character_state(mySprite, characterAnimations.rule(Predicate.FACING_UP))
controller.up.on_event(ControllerButtonEvent.RELEASED, on_up_released)

def on_down_pressed():
    characterAnimations.set_character_state(mySprite, characterAnimations.rule(Predicate.MOVING_DOWN))
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

dodge_roll = False
projectile: Sprite = None
npc_historia: Sprite = None
npc_controles: Sprite = None
mySprite: Sprite = None
POSICIONES_ENEMIGOS: List[number] = []
POSICIONES_ENEMIGOS = [300, 315, 320, 340]
mySprite = sprites.create(assets.image("""
    myImage
    """), SpriteKind.player)
npc_controles = sprites.create(assets.image("""
    cultist_npc
    """), SpriteKind.npc)
npc_historia = sprites.create(assets.image("""
    bullet_npc
    """), SpriteKind.npc)
npc_tienda = sprites.create(assets.image("""
    dallas_shoper
    """), SpriteKind.npc)
mySprite.set_position(300, 270)
npc_controles.set_position(390, 270)
npc_historia.set_position(390, 330)
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
# ⭐️ Opcional: Implementar aquí la lógica de animación por dirección para los enemigos

def on_on_update():
    pass
game.on_update(on_on_update)

def on_update_interval():
    pass
game.on_update_interval(500, on_update_interval)
