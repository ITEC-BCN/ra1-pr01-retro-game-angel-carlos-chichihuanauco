let mySprite = sprites.create(assets.image`myImage`, SpriteKind.Player)
controller.moveSprite(mySprite)
scene.cameraFollowSprite(mySprite)
tiles.setCurrentTilemap(tilemap`first_dungeon`)
