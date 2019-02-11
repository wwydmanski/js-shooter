class Enemy {
    constructor(){
        Enemy.HITBOX_WIREFRAME = Physijs.createMaterial(new THREE.MeshBasicMaterial({ wireframe: true, opacity: 0.0 }), 1, 0.1);
        Enemy.HITBOX_WIREFRAME.transparent = !debug;

        this.HITBOX_GEOMETRY = null;

        this.move = () => {
            var diff_vec = this.position_diff(player.getPosition()).normalize();
            var new_pos = this.hitbox.position;
            new_pos.x -= diff_vec.x/16;
            new_pos.z -= diff_vec.z/16;

            this.hitbox.position.set(new_pos.x, new_pos.y, new_pos.z);
            this.hitbox.__dirtyPosition = true;
            this.hitbox.setLinearVelocity(new THREE.Vector3(0, 0, 0));
            // this.hitbox.setAngularVelocity(new THREE.Vector3(0, 0, 0));
        }
    }

    loadGeometry(){
        throw new Error('Trying to use abstract class!');
    }

    add(scene, x, y, z){
        var hitbox = new Physijs.CylinderMesh( 
            this.HITBOX_GEOMETRY, 
            Enemy.HITBOX_WIREFRAME
            ,1, 0);

        hitbox.rotation.set(Math.PI/2,0,0);
        hitbox.scale.set(0.1, 0.1, 0.1);
        hitbox.add(this.mesh);
        this.mesh.rotation.set( Math.PI/2,0,0 );
        this.mesh.position.set(-40,4,-40);
        hitbox.position.set(x,y,z);
        scene.add(hitbox);

        // this.__proto__=hitbox;
        this.hitbox = hitbox;
        return this;
    }

    position_diff(vec){
        var res = new THREE.Vector3();
        res.x = this.hitbox.position.x - vec.x;
        res.y = this.hitbox.position.y - vec.y;
        res.z = this.hitbox.position.z - vec.z;

        return res;
    }
}