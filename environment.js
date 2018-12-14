class Environment {
    constructor(camera, controls) {
        this.camera = camera;
        this.controls = controls;

        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0xffffff, 0, 750);

        this.lights = this.createLights();
        this.lights.forEach(light => {
            this.scene.add(light);
        });

        this.ray = new THREE.Raycaster();
        this.ray.ray.direction.set(0, -1, 0);

        this.floor = this.createFloor();
        this.scene.add(this.floor);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    createLights() {
        var light1 = new THREE.DirectionalLight(0xffffff, 1.5);
        light1.position.set(1, 1, 1);

        var light2 = new THREE.DirectionalLight(0xffffff, 0.75);
        light2.position.set(-1, - 0.5, -1);

        return [light1, light2];
    }

    createFloor() {
        geometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
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

        material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors });

        mesh = new THREE.Mesh(geometry, material);
        return mesh;
    }

    addObject(object){
        this.scene.add(object);
    }
}