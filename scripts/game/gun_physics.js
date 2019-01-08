class GunPhysics {
    constructor(gun) {
        this.gunVelocity = new THREE.Vector3();
        this.gunMaxOffset = new THREE.Vector3();
        this.gunMaxOffset.x = [2, 6];
        this.gunMaxOffset.y = [-4, 0];

        this.gun = gun;

        this.position = new THREE.Vector3();
        this.position.x = 4;
        this.position.y = -2;
        this.position.z = -4;

        this.rotation = new THREE.Vector3();
        this.rotation.x = 0;
        this.rotation.y = 0;
        this.rotation.z = 0;

        this.decaySpeed = () => {
            this.gunVelocity.x -= speedDecay * Math.sign(this.gunVelocity.x);
            this.gunVelocity.y -= speedDecay * Math.sign(this.gunVelocity.y);
            if (Math.abs(this.gunVelocity.x) <= speedDecay)
                this.gunVelocity.x = 0;
            if (Math.abs(this.gunVelocity.y) <= speedDecay)
                this.gunVelocity.y = 0;
        }

        this.handleMouseRotation = (movX, movY) => {
            if (movX != 0 && !this.gunMaxOffset.x.includes(this.position.x))
                this.gunVelocity.x += speedAddition * movX * 0.01;
            if (movY != 0 && !this.gunMaxOffset.y.includes(this.position.y))
                this.gunVelocity.y += speedAddition * movY * 0.01;
            this.update();
        }

        this.handleHUDMovement = (velX, velY, velZ) => {
            this.position.x = Math.min(Math.max(4 - this.gunVelocity.x, this.gunMaxOffset.x[0]), this.gunMaxOffset.x[1]);
            this.position.y = Math.min(Math.max(-2 + this.gunVelocity.y, this.gunMaxOffset.y[0]), this.gunMaxOffset.y[1]);

            if (velY != 0 && !this.gunMaxOffset.y.includes(this.position.y))
                this.gunVelocity.y -= speedAddition * velY * 0.1;

            this.rotation.x = -velZ * 0.115;
            this.rotation.z = velX * 0.115;
            this.decaySpeed();
            this.update();
        }

    }

    update() {
        this.gun.position.x = this.position.x;
        this.gun.position.y = this.position.y;
        this.gun.position.z = this.position.z;

        this.gun.rotation.x = this.rotation.x;
        this.gun.rotation.y = this.rotation.y;
        this.gun.rotation.z = this.rotation.z;
    }


}