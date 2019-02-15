class Torchlight extends THREE.SpotLight{
    constructor(crosshair){
        super(0xffffff, 1, 100, Math.PI/5, 0.3);
        this.target = crosshair;
        this.position.set(0,-1,0);
        this.castShadow=true;

        if(debug){
            var helper = new THREE.CameraHelper( this.shadow.camera );
            map.scene.add( helper );
        }
    }
}