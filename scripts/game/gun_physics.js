class GunPhysics {
    constructor(gun) {
        this.gunVelocity = new THREE.Vector3();
        this.movementVelocity = new THREE.Vector3();

        this.rotationVelocity = new THREE.Vector3();

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

        this.handleMouseRotation = (movX, movY) => {
            if (movX != 0 && !this.gunMaxOffset.x.includes(this.position.x))
                this.gunVelocity.x += speedAddition * movX * 0.01;
            if (movY != 0 && !this.gunMaxOffset.y.includes(this.position.y))
                this.gunVelocity.y += speedAddition * movY * 0.01;
            this.update();
        }

        this.handleHUDMovement = (velX, velY, velZ) => {
            this.movementVelocity.x = velX;
            this.movementVelocity.y = velY;
            this.movementVelocity.z = velZ;

            if (velY != 0 && !this.gunMaxOffset.y.includes(this.position.y))
                this.gunVelocity.y -= speedAddition * velY * 0.1;

            this.update();
        }
    }

    update() {
        this._updateVelocity();
        this._applyVelocity();
        
        this.gun.position.x = this.position.x;
        this.gun.position.y = this.position.y;
        this.gun.position.z = this.position.z;

        this.gun.rotation.x = this.rotation.x - this.movementVelocity.z*0.13;
        this.gun.rotation.y = this.rotation.y;
        this.gun.rotation.z = this.rotation.z + this.movementVelocity.x*0.13;
    }

    applyRotationForce(forceX, forceY, forceZ) {
        this.rotationVelocity.x += forceX;
        this.rotationVelocity.y += forceY;
        this.rotationVelocity.z += forceZ;

        this.update()
    }

    _applyVelocity() {
        this.position.x = Math.min(Math.max(4 - this.gunVelocity.x, this.gunMaxOffset.x[0]), this.gunMaxOffset.x[1]);
        this.position.y = Math.min(Math.max(-2 + this.gunVelocity.y, this.gunMaxOffset.y[0]), this.gunMaxOffset.y[1]);

        this.rotation.x += this.rotationVelocity.x * 0.115;
        this.rotation.z += this.rotationVelocity.z * 0.115;

        this.rotation.x = Math.max(Math.min(this.rotation.x, 3.14/2), 0);
    }

    _updateVelocity() {
        this.rotationVelocity.x -= this.rotationVelocity.x * 0.08 + 0.02;
        this.rotationVelocity.z -= this.rotationVelocity.z * 0.08

        this.gunVelocity.x -= this.gunVelocity.x * 0.08;
        this.gunVelocity.y -= this.gunVelocity.y * 0.08;
    }
}