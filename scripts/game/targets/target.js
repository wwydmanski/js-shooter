class Target {
    constructor(scene, x,y,z){
        if(Target.TARGET_MESH==null){
            Target.TARGET_MESH = this.loadGeometry();
            Target.HITBOX_GEOMETRY = this.loadHitbox();
        }
        
        Target.HITBOX_WIREFRAME = Physijs.createMaterial(new THREE.MeshBasicMaterial({ wireframe: true, opacity: 0.0 }), 1, 0.1);
        Target.HITBOX_WIREFRAME.transparent = true;
        this.addObject(scene,x,y,z);
    }
    loadGeometry(){
        throw new Error('Trying to use abstract class!');
    }
    addObject(scene,x,y,z){
        throw new Error('Trying to use abstract class!');
    }
}