class Target {
    constructor(scene, x,y,z){
        Target.HITBOX_WIREFRAME = Physijs.createMaterial(new THREE.MeshBasicMaterial({ wireframe: true, opacity: 0.0 }), 1, 0.1);
        Target.HITBOX_WIREFRAME.transparent = !debug;
    }
    loadGeometry(){
        throw new Error('Trying to use abstract class!');
    }
    addObject(scene,x,y,z){
        throw new Error('Trying to use abstract class!');
    }
}