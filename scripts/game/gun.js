class Gun {
    constructor(camera) {
        this.camera = camera;

        this.handler = (geometry) => {
            map.scene.add(geometry);
            geometry.position.x = 4;
            geometry.position.y = -2;
            geometry.position.z = -4;
            loader_geometry = geometry;

            this.__proto__ = loader_geometry;

            this.geometry = loader_geometry;

            this.camera.add(this.geometry);
        };

        this.loadGun();

        this.physics = new GunPhysics(this);

        console.info("Gun loaded");
    }

    loadGun() {
        var loader = new THREE.OBJLoader();
        loader.load('resources/flat_pistle.obj', this.handler);
    }
}