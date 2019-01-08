class Map {
    constructor() {
        this.scene = new Physijs.Scene({ fixedTimeStep: 1 / 120 });;
        this.scene.setGravity(new THREE.Vector3(0, -50, 0));

        this.scene.fog = new THREE.Fog(0xffffff, 0, 750);

        this.floor = this.createFloor();
        this.scene.add(this.floor);

        this.lights = this.createLights();
        this.lights.forEach(light => {
            this.scene.add(light);
        });

        this.objects = this.createObjects();
        this.objects.forEach(obj => this.scene.add(obj));
        console.info("Map creating finished");
    }

    createLights() {
        throw new Error("Abstract method!");
    }

    createFloor() {
        throw new Error("Abstract method!");
    }

    createObjects(){
        throw new Error("Abstract method!");
    }

    addObject(obj){
        this.scene.add(obj);
    }
}