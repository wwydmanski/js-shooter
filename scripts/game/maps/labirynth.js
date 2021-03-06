class Labirynth extends Map {
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
            vertex.x += Math.random() * 4 - 2;
            vertex.y += Math.random() * 2;
            vertex.z += Math.random() * 4 - 2;
        }

        var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors });

        var mesh = new Physijs.BoxMesh(geometry, Physijs.createMaterial(material), 0);
        return mesh;
    }

    createObjects(){
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
            objects.push(mesh);
        }

        return objects;
    }
}