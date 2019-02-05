class DefaultMap extends Map {
    constructor() {
        super();
        this.shooting_target;
        this.shooting_target_material;

        this.material_handler = (materials) => {
            materials.preload();
            this.shooting_target_material = materials;
            this.loadTargets();
        }

        this.handler = (geometry) => {
            geometry.scale.set(0.15,0.15,0.15);
            geometry.position.set(0,1,-150);
            geometry.rotation.x=-Math.PI/2;
            var box_container = new Physijs.BoxMesh (
                new THREE.CubeGeometry( 20, 20, 20 ),
                this.shooting_target_material,
                1
            );
            // this.shooting_target = geometry;
            map.scene.add(geometry);
            console.info("Shooting target loaded");
        };

        this.loadTargets();
    }

    loadTargetsMaterial() {
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.load('resources/archery_target.mtl', this.material_handler);
    }
    addShape( shape, extrudeSettings, color, x, y, z, rx, ry, rz, s ) {
        var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
        var mesh = new THREE.Mesh( geometry, 
            new THREE.MeshPhongMaterial( { color: color } ));
        var hitbox = new Physijs.CylinderMesh( 
            new THREE.CylinderGeometry( 41, 41, 10, 32 ), 
            new THREE.MeshBasicMaterial({ wireframe: true, opacity: 0.5 })
            ,1 );
        hitbox.rotation.set(Math.PI/2,0,0);
        hitbox.scale.set(0.1, 0.1, 0.1);
        hitbox.add(mesh);
        hitbox.position.set(0,10,-15);
        mesh.rotation.set( Math.PI/2,0,0 );
        mesh.position.set(-40,4,-40);
        this.scene.add( hitbox );
    }
    loadTargets() {
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
        this.addShape( smileyShape, extrudeSettings, 0xf000f0, 0, 20, -150, 0, 0, Math.PI, 1 );
    }

    createLights() {
        console.info("Creating lights...");
        var light1 = new THREE.DirectionalLight(0xffffff, 1.5);
        light1.position.set(1, 1, 1);

        var light2 = new THREE.DirectionalLight(0xffffff, 0.75);
        light2.position.set(-1, - 0.5, -1);

        return [light1, light2];
    }

    createFloor() {
        console.info("Creating floor...");
        var geometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
        geometry.applyMatrix(new THREE.Matrix4().makeRotationX(- Math.PI / 2));

        for (var i = 0, l = geometry.vertices.length; i < l; i++) {
            var vertex = geometry.vertices[i];
            vertex.x += Math.random() * 20 - 10;
            vertex.y += Math.random() * 2;
            vertex.z += Math.random() * 20 - 10;
        }

        for (var i = 0, l = geometry.faces.length; i < l; i++) {

            var face = geometry.faces[i];
            face.vertexColors[0] = new THREE.Color().setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
            face.vertexColors[1] = new THREE.Color().setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
            face.vertexColors[2] = new THREE.Color().setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);

        }

        var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors });

        var mesh = new Physijs.BoxMesh(geometry, Physijs.createMaterial(material), 0);
        return mesh;
    }

    createObjects() {
        console.info("Creating objects...");

        var geometry = new THREE.BoxGeometry(20, 20, 20);
        var objects = [];

        for (var i = 0, l = geometry.faces.length; i < l; i++) {

            var face = geometry.faces[i];
            face.vertexColors[0] = new THREE.Color().setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
            face.vertexColors[1] = new THREE.Color().setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
            face.vertexColors[2] = new THREE.Color().setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
        }

        for (var i = 0; i < 500; i++) {

            var material = Physijs.createMaterial(new THREE.MeshPhongMaterial({ specular: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors }));

            var mesh = new Physijs.BoxMesh(geometry, material, 0);
            mesh.position.x = Math.floor(Math.random() * 20 - 10) * 20;
            mesh.position.y = Math.floor(Math.random() * 20) * 20 + 10;
            mesh.position.z = Math.floor(Math.random() * 20 - 10) * 20;

            material.color.setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
            mesh.addEventListener('collision', function (other_object) {
                this.material.color.setHex(0xff0000);
            });
            objects.push(mesh);
        }

        return objects;
    }
}