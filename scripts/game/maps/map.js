class Map {
    constructor() {
        this.scene = new Physijs.Scene({ fixedTimeStep: 1 / 250 });;
        this.scene.setGravity(new THREE.Vector3(0, -50, 0));

        this.scene.fog = new THREE.Fog(0x000000, 0, 750);

        this.barrier = this.createBarrier();
        this.barrier.forEach(obj => this.scene.add(obj));

        this.floor = this.createFloor();
        this.scene.add(this.floor);

        this.lights = this.createLights();
        this.lights.forEach(light => {
            this.scene.add(light);
        });

        this.objects = this.createObjects();
        this.objects.forEach(obj => this.scene.add(obj));

        this.enemies = this.createEnemies();
        this.moveEnemies = () => {
            this.enemies.forEach(obj => obj.move());
        }
        console.info("Map creating finished");
    }

    createLights() {
        throw new Error("Abstract method!");
    }

    createBarrier()
    {
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

    createEnemies() {
        throw new Error("Abstract method!");
    }
}