class GunPhysics {
    constructor(gun) {
        this.gun = gun;
        this.sighted = false;

        this.gunVelocity = new THREE.Vector3();
        this.movementVelocity = new THREE.Vector3();

        this.rotationVelocity = new THREE.Vector3();

        this.position = new THREE.Vector3();
        this.position.x = 4;
        this.position.y = -2;
        this.position.z = -4;

        this.center = new THREE.Vector3();
        this.center.x = 4;
        this.center.y = -2;
        this.center.z = -4;

        this.alternative_center = new THREE.Vector3();
        this.alternative_center.x = 0;
        this.alternative_center.y = -1;
        this.alternative_center.z = -3;

        this.rotation = new THREE.Vector3();
        this.rotation.x = 0;
        this.rotation.y = 0;
        this.rotation.z = 0;

        this.handleMouseRotation = (movX, movY) => {
            if (movX != 0) {
                if (this.sighted)
                    this.gunVelocity.x += speedAddition * movX * 5e-4;
                else
                    this.gunVelocity.x += speedAddition * movX * 1e-3;
            }
            if (movY != 0) {
                if (this.sighted)
                    this.gunVelocity.y -= speedAddition * movY * 5e-4;
                else
                    this.gunVelocity.y -= speedAddition * movY * 1e-3;
            }
            this.update();
        }

        this.handleHUDMovement = (velX, velY, velZ) => {
            this.movementVelocity.x = velX;
            this.movementVelocity.y = velY;
            this.movementVelocity.z = velZ;

            if (velY != 0)
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

        this.gun.rotation.x = this.rotation.x - this.movementVelocity.z * 0.13;
        this.gun.rotation.y = this.rotation.y;
        this.gun.rotation.z = this.rotation.z + this.movementVelocity.x * 0.13;
    }

    applyRotationForce(forceX, forceY, forceZ) {
        this.rotationVelocity.x += forceX;
        this.rotationVelocity.y += forceY;
        this.rotationVelocity.z += forceZ;

        this.update()
    }

    _applyVelocity() {
        this.position.x += this.gunVelocity.x * 0.2
        this.position.y += this.gunVelocity.y * 0.2
        this.position.z += this.gunVelocity.z * 0.2

        this.rotation.x += this.rotationVelocity.x * 0.115;
        this.rotation.z += this.rotationVelocity.z * 0.115;

        this.rotation.x = Math.max(Math.min(this.rotation.x, Math.PI/2), 0);
    }

    _updateVelocity() {
        this.gunVelocity.x += (this.center.x - this.position.x) * 0.02;
        this.gunVelocity.y += (this.center.y - this.position.y) * 0.02;
        this.gunVelocity.z += (this.center.z - this.position.z) * 0.02;

        this.rotationVelocity.x -= this.rotationVelocity.x * 0.08 + 0.02;
        this.rotationVelocity.z -= this.rotationVelocity.z * 0.08

        this.gunVelocity.x -= this.gunVelocity.x * 0.08;
        this.gunVelocity.y -= this.gunVelocity.y * 0.08;
        this.gunVelocity.z -= this.gunVelocity.z * 0.08;

    }

    switchIronsight() {
        this.center = [this.alternative_center, this.alternative_center = this.center][0];

        this.sighted = !this.sighted;
    }
}