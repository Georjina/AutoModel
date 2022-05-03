let scene, camera, renderer, controls, container;
let equipmentsMesh = [];
let step = 0;
let titleInfo;//提示面板
function init() {
    createWallMaterial();
    initScene();
    initRenderer("scene");
    initCamera();
    initLight();
    initControls();
    initPlane();
    document.addEventListener('resize', onWindowResize, false);

    caizhi();
    // roof();

    // let method = [
    //     DrawOutline,
    //     DrawPianyi,
    //     DrawLiangLine,
    //     DrawdibanNo,
    //     // Drawdiban,
    //     RemoveLine,
    //     Drawwall,
    //     DrawLiang,
    //     DigWall,
    //     CreatDoor,
    //     addEquipment,
    //     RemoveAll
    // ];
    //
    // Drawdiban();
    // Drawwall();
    // DrawLiang();
    // DigWall();
    // CreatDoor();
    addEquipment();
    //
    //
    // document.addEventListener('keypress', function () {
    //     if (step === method.length) {
    //         step = 0;
    //     }
    //     method[step]();
    //     step++;
    // });
    //
    // DrawOutline();
    // DrawLiangLine();
    //  Drawwall();
    //  // DrawYuanjiao();
    //  //DrawPianyi();
    //  Drawdiban();
    //
    //  // DrawDigArea();
    //  DigWall();
    //  CreatDoor();
    //  addEquipment();
    // addModel();
    // doThing();
    function doThing() {
        Drawwall();
        Drawdiban();
        DigWall();
        CreatDoor();
        addEquipment();
    }

    // titleInfo = new THREE.Sprite(new THREE.SpriteMaterial({
    //     map: createCanvasTexture(),
    //     transparent: true,
    //     opacity: 1,
    //     side: THREE.DoubleSide
    // }))
    // titleInfo.scale.set(60, 40, 1)
    // titleInfo.position.copy(new THREE.Vector3());
    // titleInfo.position.y += 50
    // titleInfo.position.x += 20
    // titleInfo.name = 'info'
    // scene.add(titleInfo);
    // titleInfo.visible = errorModelIndex.length ? true : false

    rayBreathing();
    // addDragControl();
    addTrante();

    setTimeout(()=>{
        changeEverthing();
        console.log(123)
    },5000)
}


function initScene() {
    scene = new THREE.Scene();
}

// 初始化相机
function initCamera() {
    camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 10, 100000);
    camera.position.copy(new THREE.Vector3(
        50.56888364552303,
        465.8990676378237,
        -33.3601755564338
    ))
    camera.rotation.copy(new THREE.Vector3(
        -1.5707953268047952,
        4.449411103446543e-9,
        0.004449425784200605,
    ))
}


// 初始化灯光
function initLight() {
    var directionalLight = new THREE.DirectionalLight(0x383838, 0.3); //模拟远处类似太阳的光源
    directionalLight.color.setHSL(0.1, 1, 0.95);
    directionalLight.position.set(500, 200, 0).normalize();
    directionalLight.castShadow = true;
    directionalLight.shadowMapEnabled = true;
    directionalLight.shadowCameraVisible = true;
    scene.add(directionalLight);

    // var ambient = new THREE.AmbientLight(0x545556, 1); //AmbientLight,影响整个场景的光源
    var ambient = new THREE.AmbientLight(0xffffff,0.5); //AmbientLight,影响整个场景的光源
    ambient.position.set(500, 200, 0);
    scene.add(ambient);

    var spotLight = new THREE.SpotLight(0xcfd1d6);
    spotLight.position.set(-200, 500, 0);
    // 设置产生阴影的光源
    spotLight.castShadow = true;
    spotLight.shadowCameraVisible = true;
    scene.add(spotLight);
}

// 初始化渲染器
function initRenderer(id) {
    container = document.getElementById(id);
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0X383838, 1.0);
    renderer.shadowMapEnabled = true;
    container.appendChild(renderer.domElement)
}

// 初始化轨迹球控件
function initControls() {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.5;
    // 视角最小距离
    controls.minDistance = 100;
    // 视角最远距离
    controls.maxDistance = 100000;
    // controls.enableRotate=false;
}

function initPlane() {
    // var axes = new THREE.AxisHelper(500);
    // scene.add(axes);
    const gridLength = 5000;
    let planeGeometry = new THREE.PlaneGeometry(gridLength, gridLength);
    let obj=new THREE.Object3D();

    let plane = new THREE.Mesh(planeGeometry, new THREE.MeshBasicMaterial({color: 0xBDBDBD, depthWrite: true}));

    obj.children=[plane];
    plane.rotation.x = -Math.PI * 0.5;
    plane.receiveShadow = true;
    plane.castShadow = true;
    plane.position.y -= 0.1;
    plane.position.x -= 35;
    scene.add(obj);

    const gridHelper = new THREE.GridHelper(gridLength, 10);
    // gridHelper.position+=37;
    gridHelper.rotation.y+=0.6*Math.PI
    scene.add(gridHelper);
}

// 窗口变动触发的方法
function onWindowResize() {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    TWEEN.update();
}

init();
animate();
