class Gun {
    constructor(camera, crosshair, controls) {
        this.camera = camera;
        this.controls = controls;
        this.crosshair = crosshair;
        this.torchlight = new Torchlight(crosshair);

        this.handler = (geometry) => {
            map.scene.add(geometry);
            this.__proto__ = geometry;
            this.geometry = geometry;
            this.geometry.target = crosshair;
            this.camera.add(this.geometry);
            this.add(this.torchlight);

            if(MODE==1)
                this.add(crosshair)

            this.torchlight.position.set(0,-0.5,0);
            this.torchlight.target = this.target;
        };

        this.loadGun();

        this.craftBullet = () => {
            var bullet = new Physijs.SphereMesh(
                new THREE.SphereGeometry(
                    .2,
                    16,
                    16
                ),
                Physijs.createMaterial(
                    new THREE.MeshLambertMaterial({
                        reflectivity: .8,
                        map: THREE.ImageUtils.loadTexture('plywood.jpg')
                    }),
                    .3,
                    .2
                ),
                0.1
            );
    
            var pos = this.localToWorld(new THREE.Vector3());
            bullet.position.x = pos.x;
            bullet.position.y = pos.y+1;
            bullet.position.z = pos.z;
    
            bullet.castShadow = false;
            bullet.receiveShadow = false;
            bullet.setCcdMotionThreshold(0.01);

            // Set the radius of the embedded sphere such that it is smaller than the object
            bullet.setCcdSweptSphereRadius(2);
            return bullet;
        }

        this.craftFlare = () => {
            var bullet = new Physijs.SphereMesh(
                new THREE.SphereGeometry(
                    .2,
                    16,
                    16
                ),
                Physijs.createMaterial(
                    new THREE.MeshLambertMaterial({
                        color: 0xFF0000
                    }),
                    .3,
                    .2
                ),
                0.1
            );
    
            var pos = this.localToWorld(new THREE.Vector3());
            bullet.position.x = pos.x;
            bullet.position.y = pos.y+1;
            bullet.position.z = pos.z;
    
            var light = new THREE.PointLight( 0xff0000, 1, 150, 2);
            bullet.add( light );

            bullet.castShadow = false;
            bullet.receiveShadow = false;
            bullet.setCcdMotionThreshold(0.01);

            // Set the radius of the embedded sphere such that it is smaller than the object
            bullet.setCcdSweptSphereRadius(2);
            return bullet;
        }

        this.shoot = () => {
            var bullet = this.craftBullet();
            map.addObject(bullet);

            var imp_y = 50 * Math.sin((this.controls.getPitchObject().rotation.x + this.rotation.x));
            var imp_x = -50 * Math.sin(this.controls.getObject().rotation.y)*Math.cos((this.controls.getPitchObject().rotation.x + this.rotation.x));
            var imp_z = -50 * Math.cos(this.controls.getObject().rotation.y)*Math.cos((this.controls.getPitchObject().rotation.x + this.rotation.x));
            bullet.addEventListener('collision', function (other_object) {
                try{
                    other_object.dead = true;
                    console.log(other_object);
                }
                catch(err){

                }
            });
            
            bullet.applyCentralImpulse(new THREE.Vector3(imp_x, imp_y, imp_z));

            if(this.physics.ironsights)
                this.physics.applyRotationForce(0.8*this.physics.SPEED_MULTIPLIER/2, 0, 0);
            else
                this.physics.applyRotationForce(1.5*this.physics.SPEED_MULTIPLIER/2, 0, 0);
        }

        this.shootFlare = () => {
            var bullet = this.craftFlare();
            map.addObject(bullet);

            var imp_y = 10 * Math.sin((this.controls.getPitchObject().rotation.x + this.rotation.x));
            var imp_x = -10 * Math.sin(this.controls.getObject().rotation.y)*Math.cos((this.controls.getPitchObject().rotation.x + this.rotation.x));
            var imp_z = -10 * Math.cos(this.controls.getObject().rotation.y)*Math.cos((this.controls.getPitchObject().rotation.x + this.rotation.x));
            
            bullet.applyCentralImpulse(new THREE.Vector3(imp_x, imp_y, imp_z));

            if(this.physics.ironsights)
                this.physics.applyRotationForce(0.8*this.physics.SPEED_MULTIPLIER/2, 0, 0);
            else
                this.physics.applyRotationForce(1.5*this.physics.SPEED_MULTIPLIER/2, 0, 0);
        }

        this.toggleIronsights = () =>{
            this.physics.toggleIronsights();
        }

        this.physics = new GunPhysics(this);
        document.addEventListener('click', (event) => {
            if(event.button == 0)
                this.shoot();
            else if(event.button == 1)
                this.shootFlare();
            else if(event.button == 2)
                this.toggleIronsights();


        }, true);

        console.info("Loading gun finished");
    }

    loadGun() {
        var loader = new THREE.OBJLoader();
        loader.load('resources/flat_pistle.obj', this.handler);
    }
}