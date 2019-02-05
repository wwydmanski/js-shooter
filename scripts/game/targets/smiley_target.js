class SmileyTarget extends Target{
    _generateGeometry( shape, extrudeSettings, color, x, y, z, rx, ry, rz, s ) {
        var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
        var mesh = new THREE.Mesh( geometry, 
            new THREE.MeshPhongMaterial( { color: color } ));
        
        console.info("SmileyTarget loading finished");
        return mesh;
    }

    loadGeometry() {
        var smileyShape = new THREE.Shape();
        smileyShape.moveTo( 80, 40 );
        smileyShape.absarc( 40, 40, 40, 0, Math.PI * 2, false );
        var smileyEye1Path = new THREE.Path();
        smileyEye1Path.moveTo( 35, 20 );
        smileyEye1Path.absellipse( 25, 20, 10, 10, 0, Math.PI * 2, true );
        smileyShape.holes.push( smileyEye1Path );
        var smileyEye2Path = new THREE.Path();
        smileyEye2Path.moveTo( 65, 20 );
        smileyEye2Path.absarc( 55, 20, 10, 0, Math.PI * 2, true );
        smileyShape.holes.push( smileyEye2Path );
        var smileyMouthPath = new THREE.Path();
        smileyMouthPath.moveTo( 20, 40 );
        smileyMouthPath.quadraticCurveTo( 40, 60, 60, 40 );
        smileyMouthPath.bezierCurveTo( 70, 45, 70, 50, 60, 60 );
        smileyMouthPath.quadraticCurveTo( 40, 80, 20, 60 );
        smileyMouthPath.quadraticCurveTo( 5, 50, 20, 40 );
        smileyShape.holes.push( smileyMouthPath );
        var extrudeSettings = { depth: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
        return this._generateGeometry( smileyShape, extrudeSettings, 0xf000f0, 0, 20, -150, 0, 0, Math.PI, 1 );
    }

    loadHitbox() {
        return new THREE.CylinderGeometry( 41, 41, 10, 32 );
    }

    addObject(scene, x, y, z){
        var mesh = Target.TARGET_MESH.clone();

        var hitbox = new Physijs.CylinderMesh( 
            Target.HITBOX_GEOMETRY, 
            Target.HITBOX_WIREFRAME
            ,1, 0.1);

        hitbox.rotation.set(Math.PI/2,0,0);
        hitbox.scale.set(0.1, 0.1, 0.1);
        hitbox.add(mesh);
        mesh.rotation.set( Math.PI/2,0,0 );
        mesh.position.set(-40,4,-40);
        hitbox.position.set(x,y,z);
        scene.add(hitbox);

        this.__proto__=hitbox;
    }
}