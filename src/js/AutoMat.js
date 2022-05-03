
let matArrayA=[],matArrayB=[],matArrayC=[];
let buerMatA;
let buerMatB;
let buerMatC;
function createWallMaterial() {
    matArrayA.push(new THREE.MeshLambertMaterial({color: 0xafc0ca}));  //前  0xafc0ca :灰色
    matArrayA.push(new THREE.MeshLambertMaterial({color: 0xafc0ca}));  //后
    matArrayA.push(new THREE.MeshLambertMaterial({color: 0xd6e4ec}));  //上  0xd6e4ec： 偏白色
    matArrayA.push(new THREE.MeshLambertMaterial({color: 0xd6e4ec}));  //下
    matArrayA.push(new THREE.MeshLambertMaterial({color: 0xafc0ca}));  //左    0xafc0ca :灰色
    matArrayA.push(new THREE.MeshLambertMaterial({color: 0xafc0ca}));  //右

    matArrayB.push(new THREE.MeshLambertMaterial({color: 0xb5b5b2}));  //右  0xafc0ca :灰色
    matArrayB.push(new THREE.MeshLambertMaterial({color: 0xb5b5b2}));  //左  0x9cb2d1：淡紫
    matArrayB.push(new THREE.MeshLambertMaterial({color: 0xacacac}));  //上  0xd6e4ec： 偏白色
    matArrayB.push(new THREE.MeshLambertMaterial({color: 0xacacac}));  //下
    matArrayB.push(new THREE.MeshLambertMaterial({color: 0xb5b5b2}));  //内   0xafc0ca :灰色
    matArrayB.push(new THREE.MeshLambertMaterial({color: 0xb5b5b2}));  //外

    matArrayC.push(new THREE.MeshLambertMaterial({color: 0xd6e4ec}));  //shape颜色  白色
    matArrayC.push(new THREE.MeshLambertMaterial({color: 0x626262}));  //挤压边的颜色  0x9cb2d1：淡紫

    dimianMat = new THREE.MeshLambertMaterial({color: 0x383838, side: THREE.DoubleSide});//浅灰色

    buerMatA = new THREE.MeshBasicMaterial({color: 0xf77583, side: THREE.DoubleSide,transparent:true,opacity:0.7});//浅灰色
    buerMatB = new THREE.MeshBasicMaterial({color: 0xaeddff, side: THREE.DoubleSide,transparent:true,opacity:0.7});//浅灰色
    buerMatC = new THREE.MeshBasicMaterial({color: 0xaeddff, side: THREE.DoubleSide,transparent:true,opacity:0.7});//浅灰色

}


