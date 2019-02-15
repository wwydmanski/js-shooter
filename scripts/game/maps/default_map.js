class DefaultMap extends Map {
    constructor() {
        super();
    }

    createLights() {
        console.info("Creating lights...");
        var light1 = new THREE.DirectionalLight(0xffffff, 0.1);
        light1.position.set(1, 1, 1);

        var light2 = new THREE.DirectionalLight(0xffffff, 0.1);
        light2.position.set(-1, - 0.5, -1);

        return [light1, light2];
    }

    createEnemies() {
        var smiley1 = new Smiley().add(this.scene, 0,5.5,-15);
        var smiley2 = new Smiley(2).add(this.scene, 0,5.5,-25);

        return [smiley1, smiley2];
    }

    createBarrier()
    {
        console.info("Creating barrier...");

        var geometry = new THREE.BoxGeometry(420, 100, 20);
        var objects = [];

        for (var i = 0, l = geometry.faces.length; i < l; i++)
        {

            var face = geometry.faces[i];
            face.vertexColors[0] = new THREE.Color().setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
            face.vertexColors[1] = new THREE.Color().setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
            face.vertexColors[2] = new THREE.Color().setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
        }

        for (var i = 0; i < 4; i++)
        {

            var material = Physijs.createMaterial(new THREE.MeshPhongMaterial({ specular: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors }));

            var mesh = new Physijs.BoxMesh(geometry, material, 0);

            material.color.setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);

            mesh.receiveShadow = true;
            
            mesh.position.y = 10;

            objects.push(mesh);
        }

        objects[0].position.z =  220;
        objects[1].position.z = -220;
        objects[2].rotation.y = Math.PI / 2;
        objects[3].rotation.y = Math.PI / 2;
        objects[2].position.x =  220;
        objects[3].position.x = -220;


        return objects;
    }

    createFloor() {
        console.info("Creating floor...");
        var geometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
        geometry.applyMatrix(new THREE.Matrix4().makeRotationX(- Math.PI / 2));

        for (var i = 0, l = geometry.vertices.length; i < l; i++) {
            var vertex = geometry.vertices[i];
            vertex.x += Math.random() * 20 - 10;
            // vertex.y += Math.random() * 2;
            vertex.z += Math.random() * 20 - 10;
        }

        for (var i = 0, l = geometry.faces.length; i < l; i++) {

            var face = geometry.faces[i];
            face.vertexColors[0] = new THREE.Color().setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
            face.vertexColors[1] = new THREE.Color().setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
            face.vertexColors[2] = new THREE.Color().setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);

        }

        var material = new THREE.MeshPhongMaterial({ vertexColors: THREE.VertexColors });

        var mesh = new Physijs.BoxMesh(geometry, Physijs.createMaterial(material, 1, 0), 0);
        mesh.receiveShadow=true;
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
            mesh.castShadow=true;
            mesh.receiveShadow=true;
            objects.push(mesh);
        }

        return objects;
    }
}