class Environment {
    constructor(camera, controls, map) {
        
        this.map = map;
        this.camera = camera;
        this.controls = controls;
        this.map.addObject(controls.getObject());
        
        this.ray = new THREE.Raycaster();
        this.ray.ray.direction.set(0, -1, 0);
        
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        window.onresize = this.onWindowResize;
        
        document.body.appendChild(this.renderer.domElement);
        console.info("Environment created");
    }

    onWindowResize() {
        env.camera.aspect = window.innerWidth / window.innerHeight;
        env.camera.updateProjectionMatrix();

        env.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(env.animate);

        controls.isOnObject(false);

        env.ray.ray.origin.copy(controls.getObject().position);
        env.ray.ray.origin.y -= 10;

        var intersections = env.ray.intersectObjects(map.objects);

        if (intersections.length > 0) {

            var distance = intersections[0].distance;

            if (distance > 0 && distance < 10) {

                controls.isOnObject(true);
            }
        }

        controls.update(Date.now() - time);

        env.renderer.render(map.scene, env.camera);

        time = Date.now();
    }
}