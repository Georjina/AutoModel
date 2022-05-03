let arcCurve = new THREE.ArcCurve(xArray[pointIndex["ox"]], zArray[pointIndex["oz"]], arcRadius, 0, -0.5 * Math.PI, true);
let arcCurvePianyi = new THREE.ArcCurve(xArray[pointIndex["ox"]] + offset, zArray[pointIndex["oz"]] - offset, arcRadius, 0, -0.5 * Math.PI, true);
// 第一步 画轮廓线
//???
let lunkuopath = [getPointVector2("a"),
    getPointVector2("b"),
    getPointVector2("c"),
    getPointVector2("d"),
    getPointVector2("e"),
    getPointVector2("f"),
]
let holepath = [
    getPointPianyi2("a"),
    getPointPianyi2("b"),
    getPointPianyi2("c"),
    getPointPianyi2("d"),
    getPointPianyi2("e"),
    getPointPianyi2("f"),
]

//多边形线
function DrawOutline() {
    let lines = [
        new LineObj(getPointVector3("a"), getPointVector3("b")),//1
        new LineObj(getPointVector3("b"), getPointVector3("c")),//2
        new LineObj(getPointVector3("c"), getPointVector3("d")),//3
        new LineObj(getPointVector3("d"), getPointVector3("e")),//4
        new LineObj(getPointVector3("e"), getPointVector3("f")),//5
        new LineObj(getPointVector3("f"), getPointVector3("a")),//6
    ]

    for (let i = 0; i < lines.length; i++) {
        let l = lines[i];
        l.draw();
    }

    //绘制圆角
    // let arcCurve = new THREE.ArcCurve(-arcRadius, arcRadius, arcRadius, 0, -0.5 * Math.PI, true);
    // let arcLine = new LineObj();
    // arcLine.getManyMesh(arcCurve.getPoints(50));
    // arcLine.draw();
}

function DrawLiangLine() {
    for (let liangInfoElement of liangInfo) {
        createRectangleByInfo(liangInfoElement);
    }
    // for (let gebanElement of gebanInfo) {
    //     createRectangleByInfo(gebanElement);
    // }
}

//圆角
function DrawYuanjiao() {
    let arcLine = new LineObj();
    let arcPoints = arcCurve.getPoints(50)
    arcLine.getManyMesh(arcPoints);
    arcLine.draw();

    let lines = [
        new LineObj(getPointVector3("a"), getPointVector3("b")),//1
        new LineObj(getPointVector3("b"), getPointVector3("c")),//2
        new LineObj(getPointVector3("c"), getPointVector3("d")),//3
        new LineObj(getPointVector3("d"), getPointVector3("e1")),//4
        new LineObj(getPointVector3("e2"), getPointVector3("f")),//5
        new LineObj(getPointVector3("f"), getPointVector3("a")),//6
    ]
    for (let i = 0; i < lines.length; i++) {
        let l = lines[i];
        l.draw();
    }
}

//偏移
function DrawPianyi() {
    //DrawYuanjiao();
    let arcLine = new LineObj();
    let arcPoints = arcCurvePianyi.getPoints(50);
    arcLine.getManyMesh(arcPoints);
    // arcLine.draw();

    let lines = [
        new LineObj(getPointPianyi("a"), getPointPianyi("b")),//1
        new LineObj(getPointPianyi("b"), getPointPianyi("c")),//2
        new LineObj(getPointPianyi("c"), getPointPianyi("d")),//3
        // new LineObj(getPointPianyi("d"), getPointPianyi("e1")),//4
        // new LineObj(getPointPianyi("e2"), getPointPianyi("f")),//5
        new LineObj(getPointPianyi("d"), getPointPianyi("e")),//4
        new LineObj(getPointPianyi("e"), getPointPianyi("f")),//5
        new LineObj(getPointPianyi("f"), getPointPianyi("a")),//6
    ]
    for (let i = 0; i < lines.length; i++) {
        let l = lines[i];
        l.draw();
    }
}

//画墙
function Drawwall() {

    let arcCurve1 = arcCurve;
    let arcCurve2 = arcCurvePianyi;
    let arcPointArray = arcCurve1.getPoints(50);

    arcPointArray.push(new THREE.Vector2(xArray[3], zArray[1] - offset));
    arcPointArray.push(...arcCurve2.getPoints(50).reverse());
    arcPointArray.push(new THREE.Vector2(xArray[1] + offset, zArray[3]));
    // createArcWall(arcPointArray, height, 0.5, matArrayC, "墙面");

    let CubeWall = [];
    CubeWall.push(createCubeWallByIndx(wallInfo[0]));//0
    CubeWall.push(createCubeWallByIndx(wallInfo[1]));//1
    CubeWall.push(createCubeWallByIndx(wallInfo[2]));//2
    CubeWall.push(createCubeWallByIndx(wallInfo[3]));//3
    CubeWall.push(createCubeWallByIndx(wallInfo[4]));//4
    CubeWall.push(createCubeWallByIndx(wallInfo[6]));//2
    CubeWall.push(createCubeWallByIndx(wallInfo[7]));//3
    CubeWall.push(createCubeWallByIndx(wallInfo[5]));//5
    walls = CubeWall;
    DrawLiang();
}

function DrawLiang() {
    let liangMeshInfo = getLiangMeshInfo(liangInfo);
    let gebanMeshInfo = getLiangMeshInfo(gebanInfo);

    for (let liangMeshInfoElement of liangMeshInfo) {
        createCubeWallByIndx(liangMeshInfoElement);
    }
    for (let gebanInfoElement of gebanMeshInfo) {
        let gebanWall = createCubeWallByIndx(gebanInfoElement);
        walls.push(gebanWall);
    }
}

function Drawdiban() {
    let arcCurve1 = new THREE.ArcCurve(xArray[pointIndex["ox"]], zArray[pointIndex["oz"]], arcRadius, 0, -0.5 * Math.PI, true);
    let arcPointArray = arcCurve1.getPoints(50);

    // let lines = [
    //     getPointVector2("a"), getPointVector2("b"),//1
    //     getPointVector2("b"), getPointVector2("c"),//2
    //     getPointVector2("c"), getPointVector2("d"),//3
    //     getPointVector2("d"), getPointVector2("e"),//3
    //     // getPointVector2("d"), getPointVector2("e1"),//4
    //     //  ...arcCurve1.getPoints(50),
    //     // getPointVector2("e2"), getPointVector2("f"),//5
    //     getPointVector2("e"), getPointVector2("f"),//5
    //     getPointVector2("f"), getPointVector2("a"),//6
    // ],
    let lines = [
        getPointVector2("a"),
        getPointVector2("b"),
        getPointVector2("c"),
        getPointVector2("d"),
        // getPointVector2("d"), getPointVector2("e1"),//4
        //  ...arcCurve1.getPoints(50),
        // getPointVector2("e2"), getPointVector2("f"),//5
        getPointVector2("e"),
        getPointVector2("f"), getPointVector2("a"),//6
    ]

    createDimian(lines, 0.5, 0.2, dimianMat, "地面");
}

function DrawdibanNo() {
    let arcCurve1 = new THREE.ArcCurve(xArray[pointIndex["ox"]], zArray[pointIndex["oz"]], arcRadius, 0, -0.5 * Math.PI, true);
    let arcPointArray = arcCurve1.getPoints(50);

    // let lines = [
    //     getPointVector2("a"), getPointVector2("b"),//1
    //     getPointVector2("b"), getPointVector2("c"),//2
    //     getPointVector2("c"), getPointVector2("d"),//3
    //     getPointVector2("d"), getPointVector2("e"),//3
    //     // getPointVector2("d"), getPointVector2("e1"),//4
    //     //  ...arcCurve1.getPoints(50),
    //     // getPointVector2("e2"), getPointVector2("f"),//5
    //     getPointVector2("e"), getPointVector2("f"),//5
    //     getPointVector2("f"), getPointVector2("a"),//6
    // ],
    let lines = [
        getPointVector2("a"),
        getPointVector2("b"),
        getPointVector2("c"),
        getPointVector2("d"),
        // getPointVector2("d"), getPointVector2("e1"),//4
        //  ...arcCurve1.getPoints(50),
        // getPointVector2("e2"), getPointVector2("f"),//5
        getPointVector2("e"),
        getPointVector2("f"), getPointVector2("a"),//6
    ]
    createDimianNo(lines, -0.5, 0.2, buerMatC, "地面", 1);
}

//???拉升地面
function lashengdimian(step = 1) {
    let lines = [
        getPointVector2("a"),
        getPointVector2("b"),
        getPointVector2("c"),
        getPointVector2("d"),
        // getPointVector2("d"), getPointVector2("e1"),//4
        //  ...arcCurve1.getPoints(50),
        // getPointVector2("e2"), getPointVector2("f"),//5
        getPointVector2("e"),
        getPointVector2("f"), getPointVector2("a"),//6
    ]
    let s = new THREE.Shape(lines);
    const extrudeSettings = {
        steps: 2,
        depth: 5,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 0,
        bevelOffset: 0,
        bevelSegments: 1
    };
    let eg = new THREE.ExtrudeGeometry(s, extrudeSettings);
    let emesh = new THREE.Mesh(eg, matArrayB);
    emesh.rotation.x -= 0.5 * Math.PI;


    if (step === 1) {
        scene.add(emesh);
    } else if (step === 2) {
        var loader = new THREE.TextureLoader();
        loader.load("../static/img/floor.jpg", function (texture) {
            assignUVs(eg);
            eg.computeBoundingBox();
            var texture = texture;
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(10, 5);
            texture.y = -1;
            var material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});
            material.opacity = 1.0;
            material.transparent = true;
            var mesh = new THREE.Mesh(eg, material);
            mesh.rotateX(-0.5 * Math.PI);
            mesh.position.y += 0.1;
            mesh.receiveShadow = true;
            scene.add(mesh);
        });
    }
}

//绘制门的区域
function DrawDigArea() {
    let lines = [
        new LineObj(new THREE.Vector3(-100, 0, -60), new THREE.Vector3(-100, 36, -60)),//1
        new LineObj(new THREE.Vector3(-100, 36, -60), new THREE.Vector3(-100, 36, -40)),//2
        new LineObj(new THREE.Vector3(-100, 36, -40), new THREE.Vector3(-100, 0, -40)),//3
        new LineObj(new THREE.Vector3(-100, 0, -40), new THREE.Vector3(-100, 0, -60)),//4
    ]

    for (let i = 0; i < lines.length; i++) {
        let l = lines[i];
        l.draw();
    }
}

//挖门和窗
function DigWall() {
    //创建洞口
    let holeonEveryWall = [];
    //D1和D2
    // hole.push(returnWallObjectByIndex(holeInfo[0]));
    // hole.push(returnWallObjectByIndex(holeInfo[1]));
    // //C1和C2
    // hole.push(returnWallObjectByIndex(holeInfo[4]));
    // hole.push(returnWallObjectByIndex(holeInfo[5]));
    //
    // createResultBsp(walls[holeInfo[0].belong], hole[0]);
    // createResultBsp(walls[holeInfo[1].belong], hole[1]);
    // createResultBsp(walls[holeInfo[4].belong], hole[2]);
    // createResultBsp(walls[holeInfo[5].belong], hole[3]);

    for (let wallsKey in walls) {
        holeonEveryWall[wallsKey] = [];
    }
    for (let i = 0; i < holeInfo.length; i++) {
        let mesh = returnWallObjectByIndex(holeInfo[i]);
        holeonEveryWall[holeInfo[i].belong].push(mesh);
        // scene.add(mesh);
    }
    for (let i = 0; i < holeonEveryWall.length; i++) {
        if (holeonEveryWall[i].length > 0) {
            createResultBsp(walls[i], holeonEveryWall[i]);
        }
    }
    // createResultBsp(, );
}

//创建门和窗
function CreatDoor() {
    //D0
    createDoor_leftByInfo(doorsInfo[0]);
    createDoor_rightByInfo(doorsInfo[1]);
    //D1
    createDoor_leftByInfo(doorsInfo[2]);
    createDoor_rightByInfo(doorsInfo[3]);
    //D2
    createDoor_leftByInfo(doorsInfo[4]);
    createDoor_rightByInfo(doorsInfo[5]);
    //D3
    createDoor_rightByInfo(doorsInfo[6]);
    //D4
    createDoor_rightByInfo(doorsInfo[7]);

    //D5
    createDoor_rightByInfo(doorsInfo[8]);


    // createWindowByInfo(windowsInfo[0]);
    // createWindowByInfo(windowsInfo[1]);
    // createWindowByInfo(windowsInfo[2]);
    // createWindowByInfo(windowsInfo[3]);
}

//添加设备模型
function addEquipment() {

    //M0
    let j = 0;
    for (let i = 0; i < equipmentGroupPosition[j].length; i++) {
        let e = equipmentGroupPosition[j][i];
        if (i < equipmentGroupPosition[j].length / 2) {
            addFbxModelByInfo(equipmentInfo[1], 0, e);
        } else {
            addFbxModelByInfo(equipmentInfo[3], 0, e);
        }
    }

    //M1
    j = 1;
    for (let i = 0; i < equipmentGroupPosition[j].length; i++) {
        let e = equipmentGroupPosition[j][i];
        if (i < equipmentGroupPosition[j].length / 2) {
            addFbxModelByInfo(equipmentInfo[2], 1, e);
        } else {
            addFbxModelByInfo(equipmentInfo[4], 1, e);
        }
    }
    //M2
    j = 2;
    for (let i = 0; i < equipmentGroupPosition[j].length; i++) {
        let e = equipmentGroupPosition[j][i];
        if (i < equipmentGroupPosition[j].length / 2) {
            addFbxModelByInfo(equipmentInfo[5], 0, e);
        } else {
            addFbxModelByInfo(equipmentInfo[6], 0, e);
        }
    }
    //M3
    j = 3;
    for (let i = 0; i < equipmentGroupPosition[j].length; i++) {
        let e = equipmentGroupPosition[j][i];
        if (i < equipmentGroupPosition[j].length / 2) {
            addFbxModelByInfo(equipmentInfo[3], 1, e);
        } else {
            addFbxModelByInfo(equipmentInfo[1], 1, e);
        }
    }
    //M4
    j = 4;
    for (let i = 0; i < equipmentGroupPosition[j].length; i++) {
        let e = equipmentGroupPosition[j][i];
        if (i < equipmentGroupPosition[j].length / 2) {
            addFbxModelByInfo(equipmentInfo[3], 0, e);
        } else {
            addFbxModelByInfo(equipmentInfo[1], 0, e);
        }
    }
    //M5
    addFbxModelByInfo(equipmentInfo[0], 0.5, equipmentGroupPosition[5][0]);
    addFbxModelByInfo(equipmentInfo[0], 0.5, equipmentGroupPosition[5][1]);
    addFbxModelByInfo(equipmentInfo[0], 0, equipmentGroupPosition[5][2]);

    // addFbxModelByInfo(equipmentInfo[7], 0, equipmentGroupPosition[6][0]);
    //温度传感器
    let p = {
        "x": -150.711927179769546,
        "y": 20.46193351949664,
        "z": -144.95028569551505
    }
    //温度传感器
    let e = equipmentInfo[7]
    addFbxModel(e.type, e.modelname, e.size, p.x, p.y, p.z, e.name);
    p = {
        "x": -30.711927179769546,
        "y": 20.46193351949664,
        "z": -144.95028569551505
    }
    addFbxModel(e.type, e.modelname, e.size, p.x, p.y, p.z, e.name);
    //风机
    e = equipmentInfo[8]
    p = {
        "x": -20.25961423399457,
        "y": -24.172836060329104,
        "z": -195.89755600649542
    }
    addFbxModel(e.type, e.modelname, e.size, p.x, p.y, p.z, e.name);
    //空调
    e = equipmentInfo[9]
    p = {
        "x": -20.25961423399457,
        "y": 24.172836060329104,
        "z": -195.89755600649542
    }
    // addFbxModel(e.type,e.modelname, e.size,p.x,p.y,p.z,e.name);
    //烟感
    e = equipmentInfo[10]
    p = {
        "x": 23.22749358193221,
        "y": 40.15238654472409,
        "z": -76.86699163646628
    }
    let s = {
        "x": 0.05,
        "y": 0.05,
        "z": 0.05
    }
    addFbxModel(e.type, e.modelname, s, p.x, p.y, p.z, e.name);
    p = {
        "x": -163.0089747305485,
        "y": 43.426140956996996,
        "z": -73.74981850004687
    }
    addFbxModel(e.type, e.modelname, s, p.x, p.y, p.z, e.name);


    //摄像头1
    e = equipmentInfo[11]
    p = {
        "x": -233.47670733635314,
        "y": 37.65408038725088,
        "z": -144.98900821664375
    }
    s = {
        "x": 50,
        "y": 50,
        "z": 50
    }
    addFbxModel(e.type, e.modelname, s, p.x, p.y, p.z, e.name);
    p = {
        "x": -238.33960901117723,
        "y": 37.78554830454834,
        "z": -3.9216343866301946
    }
    let r = {
        "x": -1.4141721093609165,
        "y": -0.032409257247008307,
        "z": 2.0360198776106087,
    }
    addFbxModel(e.type, e.modelname, s, p.x, p.y, p.z, e.name, r);
    p = {
        "x": 142.28700476546774,
        "y": 39.091383817812854,
        "z": 88.23133966279056
    }
    r = {
        "x": -1.300770416753791,
        "y": -0.11147260583811065,
        "z": 3.1167630399553024,
    }
    addFbxModel(e.type, e.modelname, s, p.x, p.y, p.z, e.name, r);
    p = {
        "x": 4.692451909012396,
        "y": 37.2492219111234,
        "z": 87.4427221092594
    }
    r = {
        "x": -1.6687075139733536,
        "y": -0.27512371124406754,
        "z": 1.5811733788773068,
    }
    addFbxModel(e.type, e.modelname, s, p.x, p.y, p.z, e.name, r);

    //摄像头2
    e = equipmentInfo[12]
    p = {
        "x": 60.52954863301963,
        "y": 40.15976875459982,
        "z": -145.53963785015813
    }
    s = {
        "x": 30,
        "y": 30,
        "z": 30
    }
    r = {
        "x": -1.5707963115561197,
        "y": -1.7418021208692823e-7,
        "z": 1.658062692652161,
    }
    addFbxModel(e.type, e.modelname, s, p.x, p.y, p.z, e.name, r);
}

//添加对设备模型的拖拽
function addDragControl() {
    var transformControls = new THREE.TransformControls(camera, renderer.domElement);
    scene.add(transformControls);
    // let gmesh = new THREE.Group();
    // for (let child of scene.children) {
    //     if (child.type === "Mesh") {
    //         obj.push(child);
    //     }
    // }
    // // obj.push(gmesh)


    let dragControls = new THREE.DragControls(equipmentsMesh, camera, renderer.domElement);

    // 鼠标略过事件
    dragControls.addEventListener('hoveron', function (event) {
        // 让变换控件对象和选中的对象绑定
        transformControls.attach(event.object);
    });
    dragControls.addEventListener('hoveroff', function (event) {
        // 让变换控件对象和选中的对象绑定
        transformControls.detach(event.object);
    });

    dragControls.addEventListener('dragstart', function (event) {
        controls.enabled = false;
    });
    // dragControls.addEventListener('drag', function (event) {
    //     transformControls.attach(event.object);
    // });
    // 拖拽结束
    dragControls.addEventListener('dragend', function (event) {
        controls.enabled = true;
    });

    document.addEventListener("keypress", function (e) {
        if (e.code === "KeyQ") {
            transformControls.setMode("translate");
        }
        if (e.code === "KeyW") {
            transformControls.setMode("rotate");
        }
        if (e.code === "KeyE") {
            transformControls.setMode("scale");
        }
    })
}

function addTrante() {
    var transformControls = new THREE.TransformControls(camera, renderer.domElement);
    scene.add(transformControls);
    container.addEventListener('click', rayMove);

    function rayMove(event) {
        let intersects = getRayObj(event);
        let objs = []//所有异常模型的名称集合

        if (intersects.length > 0) {
            let o = intersects[0].object;
            if (equipmentsMesh.includes(o)) {
                transformControls.attach(o)
            } else {
                transformControls.detach()
            }
        } else {
            transformControls.detach()
        }
    }

    document.addEventListener("keypress", function (e) {
        if (e.code === "KeyQ") {
            transformControls.setMode("translate");
        }
        if (e.code === "KeyW") {
            transformControls.setMode("rotate");
            transformControls.setSize(0.5);
        }
        if (e.code === "KeyE") {
            transformControls.setMode("scale");
        }
        if (e.code === "KeyT") {
            transformControls.setSpace(transformControls.space === 'local' ? 'world' : 'local');
        }
    })
}

function RemoveLine() {
    let line = [];
    for (let child of scene.children) {
        if (child.type === 'Line2') {
            line.push(child);
        }
    }
    for (let lineElement of line) {
        removeMesh(lineElement);
    }
}

function RemoveAll() {
    let obj = [];
    for (let child of scene.children) {
        if (child.type === 'Mesh') {
            obj.push(child);
        }
    }
    for (let b of obj) {
        removeMesh(b);
    }
}

//创建提示面板
function createCanvasTexture(dataContent = "this is a test", ctxName = "tile") {
    //let ctxName = ['title']
    if (dataContent[dataContent.length - 1] == '$') {
        dataContent = dataContent.split('$')[0]
    }
    let tips = document.createElement('canvas');
    tips.width = 500;
    tips.height = 500;
    let tipsTexture = tips.getContext('2d');
    tipsTexture.lineWidth = '8px'
    tipsTexture.strokeStyle = '#696969'
    tipsTexture.fillStyle = 'rgba(0,0,0,0.5)';
    tipsTexture.beginPath();

    //第二种面板样式
    tipsTexture.moveTo(0, 20);
    tipsTexture.moveTo(20, 0);
    tipsTexture.lineTo(256, 0);
    tipsTexture.lineTo(256, 200);
    tipsTexture.lineTo(256, 200);
    tipsTexture.lineTo(0, 200);
    tipsTexture.lineTo(0, 40);
    //------
    //			tipsTexture.moveTo(20, 40);
    //			tipsTexture.lineTo(256, 40)

    tipsTexture.closePath();
    tipsTexture.stroke()
    tipsTexture.fill()

    tipsTexture.font = '50px arial';

    tipsTexture.fillStyle = "#ff0909";

    tipsTexture.fillText(ctxName, 10, 90);

    drawText(dataContent, 20, 150, 150, tipsTexture)
    // drawText(ctxName, 20, 150, 100, tipsTexture)

    let texture1 = new THREE.Texture(tips)

    texture1.needsUpdate = true;
    return texture1

}

//创建提示面板文字
function drawText(t, x, y, w, ctx) {

    let chr = t.split('');

    let temp = "";
    let row = [];

    ctx.font = "18px arial";
    ctx.fillStyle = "#00c0ff";
    ctx.textBaseline = "bottom";

    for (let a = 0; a < chr.length; a++) {
        if (ctx.measureText(temp).width < w) {
            ;
        } else {
            row.push(temp);
            temp = "";
        }
        temp += chr[a];
    }

    row.push(temp);

    for (let b = 0; b < row.length; b++) {
        ctx.fillText(row[b], x, y + (b + 1) * 25);
    }
}

//点击物体切换视角
function rayBreathing() {

    container.addEventListener('mousemove', rayMove);

    // container.addEventListener('click', rayClick);

    function rayMove(event) {
        let intersects = getRayObj(event);
        let objs = []//所有异常模型的名称集合
        for (let i of scene.children) {
            if (i.name === "设备") {
                objs.push(i);
            }
        }
        for (let obj of objs) {
            obj.material.color.r = 0.5879999995231628;
        }
        if (intersects.length > 0) {
            let o = intersects[0].object;
            if (objs.includes(o)) {
                o.material.color.r = 60;
            }
        }
    }

    function rayClick(event) {
        let intersects = getRayObj(event);

        let objs = []//所有异常模型的名称集合
        for (let i of scene.children) {
            if (i.name === "设备") {
                objs.push(i);
            }
        }
        if (intersects.length > 0) {
            if (objs.includes(intersects[0].object)) {
                sensor(intersects[0].object);
            }
        }
    }
}

function sensor(obj) {
    moveCamera(obj, [obj.position.x, obj.position.y + 0.5 * height, obj.position.z - 20], [obj.position.x, obj.position.y + 0.5 * height, obj.position.z])
}

function moveCamera(target, pos, pos2) {

    new TWEEN.Tween(camera.position).to({
        x: pos[0],
        y: pos[1],
        z: pos[2]
    }, 1500)
        .easing(TWEEN.Easing.Linear.None).start().onUpdate(tweenHandler).onComplete(() => {
    })

    function tweenHandler() {
        camera.lookAt(...pos2)
    }
}

//多边形
function duobianxing(step) {
    let linePoint = [
        new THREE.Vector2(-15, -20),
        new THREE.Vector2(20, -20),
        new THREE.Vector2(8, 15),
        new THREE.Vector2(-15, 10),
        new THREE.Vector2(-15, -20),
    ]
    let lines = new LineObj();
    let mesh = lines.getManyMesh(linePoint);

    let point1 = new PointObj(linePoint[0]);
    let point2 = new PointObj(linePoint[1]);
    let point3 = new PointObj(linePoint[2]);
    let point4 = new PointObj(linePoint[3]);
    let line = new LineObj(linePoint[2], linePoint[3], moveColor);

    if (step === 1) {
        point1.draw();
        point2.draw();
        point3.draw();
        point4.draw();
        line.draw();
    } else if (step === 2) {
        createDimianNo(linePoint, 0.5, 0.1, buerMatC)
    }
    lines.draw();
}


function juexing(step) {
    let linePoint = [
        new THREE.Vector2(-15, -20),
        new THREE.Vector2(20, -20),
        new THREE.Vector2(20, 20),
        new THREE.Vector2(-15, 20),
        new THREE.Vector2(-15, -20),
    ]
    let lines = new LineObj();
    let mesh = lines.getManyMesh(linePoint);

    let point1 = new PointObj(new THREE.Vector3(-15, 0, -20));
    let point2 = new PointObj(new THREE.Vector3(20, 0, 20));
    let line = new LineObj(new THREE.Vector3(-15, 0, -20), new THREE.Vector3(20, 0, 20), moveColor);

    if (step === 1) {
        point1.draw();
        point2.draw();
        line.draw();
    } else if (step === 2) {
        createDimianNo(linePoint, 0.5, 0.1, buerMatC)
    }
    lines.draw();
}

function yuanhuone(step) {
    //圆弧???
    let point1 = new PointObj(new THREE.Vector3());
    let arc = new THREE.ArcCurve(0, 0, 20, 0.2 * Math.PI, 0.8 * Math.PI);
    let arcPoints = arc.getPoints(50)
    let p = arcPoints[50];
    arcPoints.push(arcPoints[0]);
    let line = new LineObj(new THREE.Vector3(), new THREE.Vector3(p.x, 0, p.y), moveColor)

    let point2 = new PointObj(new THREE.Vector3(p.x, 0, p.y));
    p = arcPoints[0]
    let point3 = new PointObj(new THREE.Vector3(0.6 * p.x, 0, 0.6 * p.y));
    let line2 = new LineObj(new THREE.Vector3(), new THREE.Vector3(0.6 * p.x, 0, 0.6 * p.y), moveColor)
    let arcLine = new LineObj();
    arcLine.getManyMesh(arcPoints);

    if (step == 1) {
        point1.draw();
        point2.draw();
        point3.draw();
        line.draw();
        line2.draw();
    } else if (step === 2) {
        createDimianNo(arcPoints, 0.5, 0.1, buerMatC)
    }
    arcLine.draw();
}

function yuanhutwo(step) {
    //圆弧2???
    let arc = new THREE.ArcCurve(0, -10, 15, 0.8 * Math.PI, 0.1 * Math.PI);
    let arcPoints = arc.getPoints(50)

    for (let arcPoint of arcPoints) {
        arcPoint.x += 8;
    }
    arcPoints.push(arcPoints[0])
    let p1 = arcPoints[50];
    let point1 = new PointObj(new THREE.Vector3(p1.x, 0.1, p1.y));
    let p2 = arcPoints[0];
    let point2 = new PointObj(new THREE.Vector3(p2.x, 0.1, p2.y));
    let line1 = new LineObj(new THREE.Vector3(p1.x, 0, p1.y), new THREE.Vector3(p2.x, 0, p2.y), moveColor);
    let centerPoint = arcPoints[25];
    let p3x = 20;
    let p3y = (p2.y - p1.y) / (p2.x - p1.x) * (p3x - centerPoint.x) + centerPoint.y;
    let p3 = arcPoints[10];
    let point3 = new PointObj(new THREE.Vector3(p3.x, 0.1, p3.y));
    let line2 = new LineObj(new THREE.Vector3(0.5 * (p1.x + p2.x), 0, 0.5 * (p1.y + p2.y)), new THREE.Vector3(centerPoint.x, 0, centerPoint.y), moveColor);
    let line3 = new LineObj(p3, new THREE.Vector3(centerPoint.x, 0, centerPoint.y), moveColor);
    let arcLine = new LineObj();
    arcLine.getManyMesh(arcPoints);

    if (step == 1) {
        point1.draw();
        point2.draw();
        point3.draw();

        line1.draw();
        // line2.draw();

    } else if (step === 2) {
        createDimianNo(arcPoints, 0.5, 0.1, buerMatC)
    }
    arcLine.draw();
}

function yuan(step) {
    let c = new THREE.ArcCurve(0, 0, 20, 0, 2 * Math.PI);
    let cPoints = c.getPoints(50)
    let cLine = new LineObj();
    cLine.getManyMesh(cPoints);

    let point1 = new PointObj(new THREE.Vector3());
    let point2 = new PointObj(new THREE.Vector3(20 * Math.cos(0.6 * Math.PI), 0, 20 * Math.sin(0.6 * Math.PI)));
    let line = new LineObj(new THREE.Vector3(), new THREE.Vector3(20 * Math.cos(0.6 * Math.PI), 0, 20 * Math.sin(0.6 * Math.PI)), moveColor);

    if (step === 1) {
        point1.draw();
        point2.draw();
        line.draw();
    } else if (step === 2) {
        createDimianNo(cPoints, 0.5, 0.1, buerMatC)
    }
    cLine.draw();
}

function quxianone(step) {

    let linePoint = [
        new THREE.Vector2(-10, 0),
        new THREE.Vector2(-5, 15),
        new THREE.Vector2(20, 15),
        new THREE.Vector2(10, 0)
    ];
    let b1 = new THREE.CubicBezierCurve(
        new THREE.Vector2(-10, 0),
        new THREE.Vector2(-5, 15),
        new THREE.Vector2(20, 15),
        new THREE.Vector2(10, 0));
    let b1Points = b1.getPoints(50)
    b1Points.push(b1Points[0])
    let b1Line = new LineObj();
    b1Line.getManyMesh(b1Points);
    let line = new LineObj();
    line.getManyMesh(linePoint, moveColor);

    if (step === 1) {
        for (let linePointElement of linePoint) {
            let p = new PointObj(linePointElement);
            p.draw()
        }
        line.draw();
    } else if (step === 2) {
        createDimianNo(b1Points, 0.5, 0.1, buerMatC)
    }
    b1Line.draw();
}

function quxiantwo(step) {

    let linePoint = [
        new THREE.Vector2(-10, 0),
        new THREE.Vector2(-5, 15),
        new THREE.Vector2(20, 0),
    ];
    let b1 = new THREE.QuadraticBezierCurve(
        new THREE.Vector2(-10, 0),
        new THREE.Vector2(-5, 15),
        new THREE.Vector2(20, 0),)
    let b1Points = b1.getPoints(50)
    let b1Line = new LineObj();
    b1Points.push(b1Points[0])
    b1Line.getManyMesh(b1Points);
    let line = new LineObj();
    line.getManyMesh(linePoint, moveColor);

    if (step === 1) {
        for (let linePointElement of linePoint) {
            let p = new PointObj(linePointElement);
            p.draw()
        }
        line.draw();
    } else if (step === 2) {
        createDimianNo(b1Points, 0.5, 0.1, buerMatC)
    }
    b1Line.draw();
}

function yuanjiao(step) {
    let yuanjiao = [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(Math.sqrt(3) * 10, -10),
        new THREE.Vector2(Math.sqrt(3) * 10, 10),
        new THREE.Vector2(0, 0),
    ]
    let yuanjiaoArc = new THREE.ArcCurve(20 / 3 * Math.sqrt(3), 0, 10 / Math.sqrt(3), 0, 4 / 3 * Math.PI, true);
    let yuanjiaoArcPoints = yuanjiaoArc.getPoints(50);
    let yuanjiaoFinal = [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(5 * Math.sqrt(3), -5),
        ...yuanjiaoArcPoints.reverse(),
        new THREE.Vector2(10 * Math.sqrt(3), 0),
        new THREE.Vector2(Math.sqrt(3) * 10, 10),
        new THREE.Vector2(0, 0),
    ]

    for (let yuanjiaoPoint of yuanjiao) {
        yuanjiaoPoint.y -= 5
        yuanjiaoPoint.x += 6
    }
    for (let yuanjiaoPoint of yuanjiaoFinal) {
        yuanjiaoPoint.y -= 5
        yuanjiaoPoint.x += 6
    }
    for (let yuanjiaoPoint of yuanjiaoArcPoints) {
        yuanjiaoPoint.y -= 5
        yuanjiaoPoint.x += 6
    }

    let point = new PointObj(yuanjiao[1]);
    let line1 = new LineObj(yuanjiao[0], yuanjiao[1], moveColor);
    let line2 = new LineObj(yuanjiao[1], yuanjiao[2], moveColor);

    let yuanjiaoLine = new LineObj();
    if (step === 1) {
        yuanjiaoLine.getManyMesh(yuanjiao);
        yuanjiaoLine.draw();
        createDimianNo(yuanjiao, 0.5, 0.0, buerMatC);
    } else if (step === 2) {
        yuanjiaoLine.getManyMesh(yuanjiao);
        yuanjiaoLine.draw();
        yuanjiaoLine.getManyMesh(yuanjiaoArcPoints, new THREE.Color(255, 255, 133));
        yuanjiaoLine.draw();
        point.draw()
        createDimianNo(yuanjiao, 0.5, 0.0, buerMatC);


        // line1.draw();
        // line2.draw();
    } else if (step === 3) {
        let yuanjiaoLine = new LineObj();
        yuanjiaoLine.getManyMesh(yuanjiaoFinal);
        yuanjiaoLine.draw();
        createDimianNo(yuanjiaoFinal, 0.5, 0.0, buerMatC);

    }
}

function daojiao(step) {
    let daojiao = [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(Math.sqrt(3) * 10, -10),
        new THREE.Vector2(Math.sqrt(3) * 10, 10),
        new THREE.Vector2(0, 0),
    ]
    let daojiaoPoints = [
        new THREE.Vector2(5 * Math.sqrt(3), -5),
        new THREE.Vector2(10 * Math.sqrt(3), 0),
    ]
    let daojiaoFinal = [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(5 * Math.sqrt(3), -5),
        new THREE.Vector2(10 * Math.sqrt(3), 0),
        new THREE.Vector2(Math.sqrt(3) * 10, 10),
        new THREE.Vector2(0, 0),
    ]

    for (let yuanjiaoPoint of daojiaoPoints) {
        yuanjiaoPoint.y -= 15
        yuanjiaoPoint.x += 15
    }
    for (let yuanjiaoPoint of daojiao) {
        yuanjiaoPoint.y -= 15
        yuanjiaoPoint.x += 15
    }
    for (let yuanjiaoPoint of daojiaoFinal) {
        yuanjiaoPoint.y -= 15
        yuanjiaoPoint.x += 15
    }
    let point = new PointObj(daojiao[1]);
    let daojiaoLine = new LineObj();
    if (step === 1) {
        daojiaoLine.getManyMesh(daojiao);
        daojiaoLine.draw();
    } else if (step === 2) {
        daojiaoLine.getManyMesh(daojiao);
        daojiaoLine.draw();
        daojiaoLine.getManyMesh(daojiaoPoints, new THREE.Color(255, 255, 133));
        daojiaoLine.draw();
        point.draw();
    } else {
        daojiaoLine.getManyMesh(daojiaoFinal);
        daojiaoLine.draw();
    }


}

//布尔运算
function bueryunshuan(step) {
    let offsetx = 35;
    let offsety = 45;
    let offsetz = 0;


    //矩形1
    let pointPoiston1 = [
        new THREE.Vector2(),
        new THREE.Vector2(-20, 0),
        new THREE.Vector2(-20, -50),
        new THREE.Vector2(0, -50),
        new THREE.Vector2(),
    ]
    //矩形1
    let pointPoiston2 = [
        new THREE.Vector2(-15, -20),
        new THREE.Vector2(20, -20),
        new THREE.Vector2(20, 40),
        new THREE.Vector2(-15, 40),
        new THREE.Vector2(-15, -20),
    ]
    //矩形3
    let pointPoiston3 = [
        new THREE.Vector2(15, 10),
        new THREE.Vector2(45, 10),
        new THREE.Vector2(35, 40),
        new THREE.Vector2(-15, 40),
        new THREE.Vector2(15, 10),
    ]
    pointPoiston1 = changePosition(pointPoiston1, offsetx, offsety, offsetz);
    pointPoiston2 = changePosition(pointPoiston2, offsetx, offsety, offsetz);
    pointPoiston3 = changePosition(pointPoiston3, offsetx, offsety, offsetz);

    let lo = new LineObj();
    let line1 = lo.getManyMesh(pointPoiston1);
    let line2 = lo.getManyMesh(pointPoiston2);
    let line3 = lo.getManyMesh(pointPoiston3);

    let point1 = new PointObj();
    let point2 = new PointObj();
    let point3 = new PointObj();
    point1.getManyMesh(pointPoiston1);
    point2.getManyMesh(pointPoiston2);
    point3.getManyMesh(pointPoiston3);

    let res1 = [
        new THREE.Vector2(-15, 0),
        new THREE.Vector2(-20, 0),
        new THREE.Vector2(-20, -50),
        new THREE.Vector2(0, -50),
        new THREE.Vector2(0, -20),
        new THREE.Vector2(20, -20),
        new THREE.Vector2(20, 40),
        new THREE.Vector2(-15, 40),
        new THREE.Vector2(-15, 0),
    ]
    res1 = changePosition(res1, offsetx, offsety, offsetz);


    let resPoint1 = new PointObj();
    resPoint1.getManyMesh(res1);
    let resLine1 = lo.getManyMesh(res1);
    let res2 = [
        new THREE.Vector2(-15, 0),
        new THREE.Vector2(-20, 0),
        new THREE.Vector2(-20, -50),
        new THREE.Vector2(0, -50),
        new THREE.Vector2(0, -20),
        new THREE.Vector2(20, -20),
        new THREE.Vector2(20, 10),
        new THREE.Vector2(45, 10),
        new THREE.Vector2(35, 40),
        new THREE.Vector2(-15, 40),
        new THREE.Vector2(-15, 0),
    ];
    res2 = changePosition(res2, offsetx, offsety, offsetz);

    let resPoint2 = new PointObj();
    resPoint2.getManyMesh(res2);
    let resLine2 = lo.getManyMesh(res2);
    let resShape = new THREE.Shape(res2);

    let cic = new THREE.ArcCurve(35, 40, 10, 0, 2 * Math.PI);
    let cp = cic.getPoints(150);
    let cline = lo.getManyMesh(cp);
    let ciclep = new THREE.Path(cp);
    resShape.holes = [ciclep];
    let resG = new THREE.ShapeGeometry(resShape);
    let resMesh3 = new THREE.Mesh(resG, buerMatC);
    resMesh3.rotation.x = 0.5 * Math.PI;

    //buerjiao
    let Curve1 = new THREE.ArcCurve(35, 40, 10, 0, 2 * Math.PI);
    let Curve2 = new THREE.ArcCurve(30, 35, 15, 0, 2 * Math.PI);
    let Curve1points = Curve1.getPoints(200);
    let Curve2points = Curve2.getPoints(200);
    let Curve1line = lo.getManyMesh(Curve1points);
    let Curve2line = lo.getManyMesh(Curve2points);
    let pointjiao = [];

    for (let i = 0; i < Curve1points.length; i++) {
        for (let j = 0; j < Curve2points.length; j++) {
            if (juli(Curve1points[i], Curve2points[j]) < 0.2) {
                pointjiao.push([i, j]);
            }
        }
    }
    let Curvejiaopoint = [
        ...Curve2points.slice(6, 44),
        ...Curve1points.slice(57, 193),
    ];
    let Curvejiaoline = lo.getManyMesh(Curvejiaopoint);


    console.log(pointjiao);
    if (step === 1) {
        lo.draw(line1);
        lo.draw(line2);
        point1.drawMany();
        point2.drawMany();
        createDimianNo(pointPoiston1, 0.5, 0.01, buerMatA)
        createDimianNo(pointPoiston2, 0.5, 0.02, buerMatB)
    } else if (step === 2) {
        // resPoint1.drawMany();
        createDimianNo(res1, 0.5, 0.02, buerMatC)
        lo.draw(resLine1);
    } else if (step === 3) {
        // resPoint1.drawMany();
        // lo.draw(resLine1);
        // lo.draw(line3);
        // point3.drawMany();
        // createDimianNo(res1,0.5,0.001,buerMatA)
        // createDimianNo(pointPoiston3,0.5,0.002,buerMatB)

        lo.draw(Curve1line);
        lo.draw(Curve2line);

        createDimianNo(Curve1points, 0.5, 0.001, buerMatA)
        createDimianNo(Curve2points, 0.5, 0.002, buerMatB)
    } else if (step === 4) {
        // resPoint2.drawMany();
        lo.draw(Curvejiaoline);
        // lo.draw(resLine2);
        createDimianNo(Curvejiaopoint, 0.5, 0.002, buerMatC)
    } else if (step === 5) {
        resPoint2.drawMany()
        lo.draw(cline);
        lo.draw(resLine2);

        createDimianNo(res2, 0.5, 0, buerMatA)
        createDimianNo(cp, 0.5, 0.1, buerMatB)
    } else if (step === 6) {
        lo.draw(resLine2);
        lo.draw(cline);
        lo.draw(resMesh3);
    }
}

function juli(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

//二维图元
function drawText() {

    //多边形
    // duobianxing(1);
    // duobianxing(2);
    //矩形
    // juexing(1);
    // juexing(2);

    //圆弧1???
    // yuanhuone(1);
    // yuanhuone(2);

    // 圆弧2???
    // yuanhutwo(1);
    // yuanhutwo(2);

    //圆???
    // yuan(1);
    // yuan(2);

    //贝塞尔曲线???
    // quxianone(1);
    // quxianone(2);
    //贝塞尔曲线???
    // quxiantwo(1);
    // quxiantwo(2);


    //圆角???
    // yuanjiao(1);
    // yuanjiao(2);
    // yuanjiao(3);

    //倒角???
    // daojiao(1);
    // daojiao(2);
    // daojiao(3);

    // bueryunshuan
    // bueryunshuan(1);
    // bueryunshuan(2);
    // bueryunshuan(3);
    // bueryunshuan(4);
    // bueryunshuan(5);
    // bueryunshuan(6);
}

function changePosition(arr, x, y, z) {
    for (let arrElement of arr) {
        arrElement.x += x;
        arrElement.y += y;
        arrElement.z += z;
    }
    return arr;
}

//???
function drawplane() {

    let shape = new THREE.Shape(lunkuopath);
    const smileyEye1Path = new THREE.Path();
    smileyEye1Path.setFromPoints(holepath)
    shape.holes.push(smileyEye1Path);

    let sg = new THREE.ShapeGeometry(shape);

    // let m = new THREE.MeshLambertMaterial({color: 0xfffff, side: THREE.DoubleSide});
    const mesh = new THREE.Mesh(sg, buerMatC);
    mesh.rotation.x = 0.5 * Math.PI;
    mesh.position.y += 0.1
    scene.add(mesh);
}
function changeEverthing(){
    for (const child of scene.children) {
        if(child.type!=="LineSegments"){
            child.position.x+=66;
            child.position.z+=59;
        }
    }
}
