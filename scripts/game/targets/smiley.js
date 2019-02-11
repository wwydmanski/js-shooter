class Smiley extends Enemy{
    constructor(){
        super();
        if(Smiley.TARGET_MESH==null){
            Smiley.TARGET_MESH = this.loadGeometry();
            Smiley.HITBOX_GEOMETRY = this.loadHitbox();
        }
        this.mesh = Smiley.TARGET_MESH.clone();
        this.HITBOX_GEOMETRY = Smiley.HITBOX_GEOMETRY;
    }

    _generateGeometry( shape, extrudeSettings, color) {
        var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
        var mesh = new THREE.Mesh( geometry, 
            new THREE.MeshPhongMaterial( { color: color } ));
        
        mesh.castShadow=true;
        mesh.receiveShadow=true;

        for (var i = 0, l = geometry.vertices.length; i < l; i++) {
            var vertex = geometry.vertices[i];
            vertex.x += Math.random() * 2 - 1;
            vertex.y += Math.random() * 2 - 1;
            vertex.z += Math.random() * 2 - 1;
        }

        console.info("Smiley loading finished");
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

        return this._generateGeometry( smileyShape, extrudeSettings, 0xf000f0);
    }

    loadHitbox() {
        return new THREE.CylinderGeometry( 41, 41, 10, 32 );
    }
}