class GunPhysics {
    constructor(gun) {
        this.gun = gun;

        this.position = new THREE.Vector3();
        this.position.x = 4;
        this.position.y = -2;
        this.position.z = -4;

        this.rotation = new THREE.Vector3();
        this.rotation.x = 0;
        this.rotation.y = 0;
        this.rotation.z = 0;

        // this.update();
    }

    update(){
        this.gun.position = this.position;
        this.gun.rotation = this.rotation;
    }
}