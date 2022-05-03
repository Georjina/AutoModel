//墙的宽度和高度
let offset = 5;
let height = 45;
//圆角半径
let arcRadius = 20;
let walls = [];
//图形三条线的位置
let xArray = [-250, 0, 350];
let yArray = [0];
let zArray = [-150, 0, 100];
//与圆角回合的位置
xArray.push(xArray[1] - arcRadius);
zArray.push(zArray[1] + arcRadius);

//点的坐标索引
let pointIndex = {
    "ax": 0, "ay": 0, "az": 0,
    "bx": 2, "by": 0, "bz": 0,
    "cx": 2, "cy": 0, "cz": 2,
    "dx": 1, "dy": 0, "dz": 2,
    "ex": 1, "ey": 0, "ez": 1,
    "fx": 0, "fy": 0, "fz": 1,
    "e1x": 1, "e1y": 0, "e1z": 3,
    "e2x": 3, "e2y": 0, "e2z": 1,
    "ox": 3, "oy": 0, "oz": 3
};

//墙面信息
//width, height, depth, angle, material, x, y, z, name
let wallInfo = [
    //W0
    {
        "width": xArray[2] - xArray[0],
        "height": height,
        "depth": offset,
        "angle": 0,
        "material": matArrayB,
        "x": 0.5 * (xArray[2] + xArray[0]),
        "y": 0.5 * height,
        "z": zArray[0] + 0.5 * offset,
        "name": "墙面"
    },
    //W1
    {
        "width": zArray[2] - zArray[0],
        "height": height,
        "depth": offset,
        "angle": 0.5,
        "material": matArrayB,
        "x": xArray[2] - 0.5 * offset,
        "y": 0.5 * height,
        "z": 0.5 * (zArray[2] + zArray[0]),
        "name": "墙面"
    },
    //W2
    {
        "width": xArray[2] - xArray[1],
        "height": height,
        "depth": offset,
        "angle": 1,
        "material": matArrayB,
        "x": 0.5 * (xArray[1] + xArray[2]),
        "y": 0.5 * height,
        "z": zArray[2] - 0.5 * offset,
        "name": "墙面"
    },
    //W3圆角
    {
        "width": zArray[2] - zArray[3],
        "height": height,
        "depth": offset,
        "angle": 0.5,
        "material": matArrayB,
        "x": xArray[1] + 0.5 * offset,
        "y": 0.5 * height,
        "z": 0.5 * (zArray[2] + zArray[3]),
        "name": "墙面"
    },
    //W4圆角
    {
        "width": xArray[3] - xArray[0],
        "height": height,
        "depth": offset,
        "angle": 0,
        "material": matArrayB,
        "x": 0.5 * (xArray[0] + xArray[3]),
        "y": 0.5 * height,
        "z": zArray[1] - 0.5 * offset,
        "name": "墙面"
    },
    //W5
    {
        "width": zArray[1] - zArray[0],
        "height": height,
        "depth": offset,
        "angle": 0.5,
        "material": matArrayB,
        "x": xArray[0] + 0.5 * offset,
        "y": 0.5 * height,
        "z": 0.5 * (zArray[1] + zArray[0]),
        "name": "墙面"
    },
    //W3直角
    {
        "width": zArray[2] - zArray[1],
        "height": height,
        "depth": offset,
        "angle": 0.5,
        "material": matArrayB,
        "x": xArray[1] + 0.5 * offset,
        "y": 0.5 * height,
        "z": 0.5 * (zArray[2] + zArray[1]) - 1 * offset,
        "name": "墙面"
    },
    //W4直角
    {
        "width": xArray[1] - xArray[0],
        "height": height,
        "depth": offset,
        "angle": 0,
        "material": matArrayB,
        "x": 0.5 * (xArray[0] + xArray[1]) + 1 * offset,
        "y": 0.5 * height,
        "z": zArray[1] - 0.5 * offset,
        "name": "墙面"
    }
]
//隔板的信息
let guodaoOffset = 40;
let gebanInfo = [
    //G0
    {
        "width": offset,
        "height": zArray[2] - zArray[0],
        "x": 0.7 * xArray[1] + 0.3 * xArray[2] + guodaoOffset,
        "y": 0,
        "z": 0.5 * (zArray[0] + zArray[2]),
        "name": "隔板"
    },
    //G1
    {
        "width": offset,
        "height": zArray[2] - zArray[0],
        "x": 0.3 * xArray[1] + 0.7 * xArray[2] - guodaoOffset,
        "y": 0,
        "z": 0.5 * (zArray[0] + zArray[2]),
        "name": "隔板"
    }
]
let gebanlessInfo = [
    //G2
    {
        "width": xArray[2] - gebanInfo[1].x-5,
        "height": offset,
        "x": 0.5 * (xArray[2] + gebanInfo[1].x),
        "y": 0,
        "z": 0.3 * zArray[2] + 0.6 * zArray[0],
        "name": "隔板"
    },
    //G3
    {
        "width": xArray[2] - gebanInfo[1].x-5,
        "height": offset,
        "x": 0.5 * (xArray[2] + gebanInfo[1].x),
        "y": 0,
        "z": 0.3 * zArray[0] + 0.6 * zArray[2],
        "name": "隔板"
    },
]
gebanInfo.push(...gebanlessInfo);
//孔洞信息
let holeInfo = [
    //D0在W5
    //holeInfo[0]
    {
        "width": (zArray[1] - zArray[0]) * 0.3,
        "height": 0.6 * height,
        "depth": offset,
        "angle": 0.5,
        "material": matArrayA,
        "x": xArray[0] + 0.5 * offset,
        "y": 0.6 * 0.5 * height,
        "z": 0.5 * (zArray[1] + zArray[0]),
        "name": "门",
        "belong": 5
    },
    //D1在W2
    //holeInfo[1]
    {
        "width": (gebanInfo[0].x - xArray[1]) * 0.3,
        "height": 0.6 * height,
        "depth": offset,
        "angle": 0,
        "material": matArrayA,
        "x": 0.5 * (xArray[1] + gebanInfo[0].x),
        "y": 0.5 * height * 0.6,
        "z": zArray[2] - 0.5 * offset,
        "name": "门",
        "belong": 2
    },
    //D2在W2
    //holeInfo[2]
    {
        "width": (xArray[2] - gebanInfo[1].x) * 0.3,
        "height": 0.6 * height,
        "depth": offset,
        "angle": 0,
        "material": matArrayA,
        "x": 0.5 * (xArray[2] + gebanInfo[1].x),
        "y": 0.5 * height * 0.6,
        "z": zArray[2] - 0.5 * offset,
        "name": "门",
        "belong": 2
    },
    //D3在W6
    //holeInfo[3]
    {
        "width": offset,
        "height": 0.8 * height,
        "depth": 0.2 * (gebanInfo[2].z - zArray[0]),
        "angle": 0,
        "material": matArrayA,
        "x": gebanInfo[0].x,
        "y": 0.5 * height * 0.8,
        "z": 0.5 * (gebanInfo[2].z + zArray[0]),
        "name": "门",
        "belong": 6
    },
    //D4在W7
    //holeInfo[3]
    {
        "width": offset,
        "height": 0.8 * height,
        "depth": 0.2 * (gebanInfo[2].z - zArray[0]),
        "angle": 0,
        "material": matArrayA,
        "x": gebanInfo[1].x,
        "y": 0.5 * height * 0.8,
        "z": 0.5 * (gebanInfo[2].z + zArray[0]),
        "name": "门",
        "belong": 7
    },
    //D5在W7
    //holeInfo[3]
    {
        "width": offset,
        "height": 0.8 * height,
        "depth": 0.2 * (gebanInfo[2].z - zArray[0]),
        "angle": 0,
        "material": matArrayA,
        "x": gebanInfo[1].x,
        "y": 0.5 * height * 0.8,
        "z": 0.5 * (gebanInfo[2].z + gebanInfo[3].z),
        "name": "门",
        "belong": 7
    },
    // //C2在W3圆角
    // //holeInfo[2]
    // {
    //     "width": (zArray[2] - zArray[3]) * 0.2,
    //     "height": 0.4 * height,
    //     "depth": offset,
    //     "angle": 0.5,
    //     "material": matArrayA,
    //     "x": xArray[1] + 0.5 * offset,
    //     "y": height * 0.5,
    //     "z": 0.5 * (zArray[2] + zArray[3]),
    //     "name": "墙面",
    //     "belong": 3
    // },
    // //C3在W4圆角
    // //holeInfo[3]
    // {
    //     "width": (xArray[3] - xArray[0]) * 0.2,
    //     "height": 0.4 * height,
    //     "depth": offset,
    //     "angle": 0,
    //     "material": matArrayA,
    //     "x": 0.5 * (xArray[0] + xArray[3]),
    //     "y": height * 0.5,
    //     "z": zArray[1] - 0.5 * offset,
    //     "name": "墙面",
    //     "belong": 4
    // },
    //C2在W3直角
    //holeInfo[4]
    {
        "width": (zArray[2] - zArray[1]) * 0.2,
        "height": 0.4 * height,
        "depth": offset,
        "angle": 0.5,
        "material": matArrayA,
        "x": xArray[1] + 0.5 * offset,
        "y": height * 0.5,
        "z": 0.5 * (zArray[2] + zArray[1]),
        "name": "墙面",
        "belong": 3
    },
    //C3在W4直角
    //holeInfo[5]
    {
        "width": (xArray[1] - xArray[0]) * 0.2,
        "height": 0.4 * height,
        "depth": offset,
        "angle": 0,
        "material": matArrayA,
        "x": 0.5 * (xArray[0] + xArray[1]),
        "y": height * 0.5,
        "z": zArray[1] - 0.5 * offset,
        "name": "墙面",
        "belong": 4
    },
]
//门的信息
let doorsInfo = [
    //D0左门
    {
        "width": holeInfo[0].width * 0.5,
        "height": holeInfo[0].height,
        "depth": offset * 0.2,
        "angle": 0.5,
        "x": holeInfo[0].x,
        "y": holeInfo[0].y,
        "z": holeInfo[0].z - holeInfo[0].width * 0.25,
        "name": "门",
        "belong": 5
    },
    //D0右门
    {
        "width": holeInfo[0].width * 0.5,
        "height": holeInfo[0].height,
        "depth": offset * 0.2,
        "angle": 0.5,
        "x": holeInfo[0].x,
        "y": holeInfo[0].y,
        "z": holeInfo[0].z + holeInfo[0].width * 0.25,
        "name": "门",
        "belong": 5
    },
    //D1左门
    {
        "width": holeInfo[1].width * 0.5,
        "height": holeInfo[1].height,
        "depth": offset * 0.2,
        "angle": 0,
        "x": holeInfo[1].x - holeInfo[1].width * 0.25,
        "y": holeInfo[1].y,
        "z": holeInfo[1].z,
        "name": "门",
        "belong": 5
    },
    //D1右门
    {
        "width": holeInfo[1].width * 0.5,
        "height": holeInfo[1].height,
        "depth": offset * 0.2,
        "angle": 0,
        "x": holeInfo[1].x + holeInfo[1].width * 0.25,
        "y": holeInfo[1].y,
        "z": holeInfo[1].z,
        "name": "门",
        "belong": 5
    },
    //D2左门
    {
        "width": holeInfo[2].width * 0.5,
        "height": holeInfo[2].height,
        "depth": offset * 0.2,
        "angle": 0,
        "x": holeInfo[2].x - holeInfo[2].width * 0.25,
        "y": holeInfo[2].y,
        "z": holeInfo[2].z,
        "name": "门",
        "belong": 5
    },
    //D2右门
    {
        "width": holeInfo[2].width * 0.5,
        "height": holeInfo[2].height,
        "depth": offset * 0.2,
        "angle": 0,
        "x": holeInfo[2].x + holeInfo[2].width * 0.25,
        "y": holeInfo[2].y,
        "z": holeInfo[2].z,
        "name": "门",
        "belong": 5
    },
    //D3右门
    {
        "width": holeInfo[3].depth,
        "height": holeInfo[3].height,
        "depth": holeInfo[3].width * 0.2,
        "angle": 0.5,
        "x": holeInfo[3].x,
        "y": holeInfo[3].y,
        "z": holeInfo[3].z,
        "name": "门",
        "belong": 5
    }, //D4右门
    {
        "width": holeInfo[4].depth,
        "height": holeInfo[4].height,
        "depth": holeInfo[4].width * 0.2,
        "angle": 0.5,
        "x": holeInfo[4].x,
        "y": holeInfo[4].y,
        "z": holeInfo[4].z,
        "name": "门",
        "belong": 5
    },
    //D5右门
    {
        "width": holeInfo[5].depth,
        "height": holeInfo[5].height,
        "depth": holeInfo[5].width * 0.2,
        "angle": 0.5,
        "x": holeInfo[5].x,
        "y": holeInfo[5].y,
        "z": holeInfo[5].z,
        "name": "门",
        "belong": 5
    },
];

//加载模型的尺寸比例
let sizeScale = 1;
let equipmentSize = {
    "x": 15,
    "y": 10,
    "z": 15
}
//设备模型信息
let equipmentInfo = [
    //0
    {
        "type": "power",
        "modelname": "bianyaqi",
        "size": {"x": 25, "y": 25, "z": 20},
        "x": 10,
        "y": 0,
        "z": 20,
        "name": "设备",
    },
    //1
    {
        "type": "power",
        "modelname": "chuxiangui02",
        "size": equipmentSize,
        "x": 10,
        "y": 0,
        "z": 30,
        "name": "设备",
    },
    //2
    {
        "type": "power",
        "modelname": "chuxiangui03",
        "size": equipmentSize,
        "x": 10,
        "y": 0,
        "z": 38,
        "name": "设备",
    },
    //3
    {
        "type": "power",
        "modelname": "chuxiangui04",
        "size": equipmentSize,
        "x": 10,
        "y": 23,
        "z": 50,
        "name": "设备",
    },
    //4
    {
        "type": "power",
        "modelname": "dianrongbuchanggui",
        "size": equipmentSize,
        "x": 10,
        "y": 0,
        "z": 60,
        "name": "设备",
    },
    //5
    {
        "type": "power",
        "modelname": "jinxiangui",
        "size": equipmentSize,
        "x": 10,
        "y": 0,
        "z": 70,
        "name": "设备",
    },
    //6
    {
        "type": "power",
        "modelname": "muliangui",
        "size": equipmentSize,
        "x": 10,
        "y": 0,
        "z": 80,
        "name": "设备",
    },
    //7
    {
        "type": "device",
        "modelname": "wenduchuanganqi",
        "size": equipmentSize,
        "x": -200,
        "y": 100,
        "z": 0,
        "name": "传感器",
    }, //8
    {
        "type": "equipment",
        "modelname": "fengji",
        "size": equipmentSize,
        "x": -200,
        "y": 100,
        "z": 0,
        "name": "风机",
    },//9
    {
        "type": "equipment",
        "modelname": "kongtiao",
        "size": equipmentSize,
        "x": -200,
        "y": 100,
        "z": 0,
        "name": "空调",
    },//10
    {
        "type": "equipment",
        "modelname": "yangan",
        "size": equipmentSize,
        "x": -200,
        "y": 100,
        "z": 0,
        "name": "烟感",
    },//11
    {
        "type": "shexiangtou",
        "modelname": "shexiangtou0001",
        "size": equipmentSize,
        "x": -200,
        "y": 100,
        "z": 0,
        "name": "摄像头1",
    },//12
    {
        "type": "shexiangtou",
        "modelname": "shexiangtou0002",
        "size": equipmentSize,
        "x": -200,
        "y": 100,
        "z": 0,
        "name": "摄像头2",
    },//13
    {
        "type": "shexiangtou",
        "modelname": "shexiangtou0003",
        "size": equipmentSize,
        "x": -200,
        "y": 100,
        "z": 0,
        "name": "摄像头3",
    }
]
//设备组摆放间隔
let space = 14;
//模型组的信息
let centerPosition = [
    //M0
    {"x": 0.9 * xArray[0] + 0.1 * gebanInfo[0].x, "y": 0, "z": 0.7 * zArray[0] + 0.3 * zArray[1]},
    //M1
    {"x": 0.9 * xArray[0] + 0.1 * gebanInfo[0].x + 0.5 * space, "y": 0, "z": 0.3 * zArray[0] + 0.7 * zArray[1]},
    //M2
    {"x": 0.6 * xArray[0] + 0.4 * gebanInfo[0].x, "y": 0, "z": 0.7 * zArray[0] + 0.3 * zArray[1]},
    //M3
    {"x": 0.6 * xArray[0] + 0.4 * gebanInfo[0].x + 0.5 * space, "y": 0, "z": 0.3 * zArray[0] + 0.7 * zArray[1]},
    //M4
    {"x": 0.9 * xArray[1] + 0.1 * gebanInfo[0].x + 0.5 * space, "y": 0, "z": 0.9 * zArray[1] + 0.1 * zArray[2]},
]
let equipmentGroupPosition = [
    //M0
    [
        {"x": centerPosition[0].x, "y": 0, "z": centerPosition[0].z},
        {"x": centerPosition[0].x + space, "y": 0, "z": centerPosition[0].z},
        {"x": centerPosition[0].x + 2 * space, "y": 0, "z": centerPosition[0].z},
        {"x": centerPosition[0].x + 3 * space, "y": 0, "z": centerPosition[0].z},
        {"x": centerPosition[0].x + 4 * space, "y": 0, "z": centerPosition[0].z},
        {"x": centerPosition[0].x + 5 * space, "y": 0, "z": centerPosition[0].z},
        {"x": centerPosition[0].x + 6 * space, "y": 0, "z": centerPosition[0].z},

    ],
    //M1
    [
        {"x": centerPosition[1].x, "y": 0, "z": centerPosition[1].z},
        {"x": centerPosition[1].x + space, "y": 0, "z": centerPosition[1].z},
        {"x": centerPosition[1].x + 2 * space, "y": 0, "z": centerPosition[1].z},
        {"x": centerPosition[1].x + 3 * space, "y": 0, "z": centerPosition[1].z},
        {"x": centerPosition[1].x + 4 * space, "y": 0, "z": centerPosition[1].z},
        {"x": centerPosition[1].x + 5 * space, "y": 0, "z": centerPosition[1].z},
        {"x": centerPosition[1].x + 6 * space, "y": 0, "z": centerPosition[1].z},
    ],
    //M2
    [
        {"x": centerPosition[2].x, "y": 0, "z": centerPosition[2].z},
        {"x": centerPosition[2].x + space, "y": 0, "z": centerPosition[2].z},
        {"x": centerPosition[2].x + 2 * space, "y": 0, "z": centerPosition[2].z},
        {"x": centerPosition[2].x + 3 * space, "y": 0, "z": centerPosition[2].z},
        {"x": centerPosition[2].x + 4 * space, "y": 0, "z": centerPosition[2].z},
        {"x": centerPosition[2].x + 5 * space, "y": 0, "z": centerPosition[2].z},
        {"x": centerPosition[2].x + 6 * space, "y": 0, "z": centerPosition[2].z},
    ],
    //M3
    [
        {"x": centerPosition[3].x, "y": 0, "z": centerPosition[3].z},
        {"x": centerPosition[3].x + space, "y": 0, "z": centerPosition[3].z},
        {"x": centerPosition[3].x + 2 * space, "y": 0, "z": centerPosition[3].z},
        {"x": centerPosition[3].x + 3 * space, "y": 0, "z": centerPosition[3].z},
        {"x": centerPosition[3].x + 4 * space, "y": 0, "z": centerPosition[3].z},
        {"x": centerPosition[3].x + 5 * space, "y": 0, "z": centerPosition[3].z},
        {"x": centerPosition[3].x + 6 * space, "y": 0, "z": centerPosition[3].z},
        {"x": centerPosition[3].x + 7 * space, "y": 0, "z": centerPosition[3].z},
        {"x": centerPosition[3].x + 8 * space, "y": 0, "z": centerPosition[3].z},
        {"x": centerPosition[3].x + 9 * space, "y": 0, "z": centerPosition[3].z},
    ],
    //M4
    [
        {"x": centerPosition[4].x, "y": 0, "z": centerPosition[4].z},
        {"x": centerPosition[4].x + space, "y": 0, "z": centerPosition[4].z},
        {"x": centerPosition[4].x + 2 * space, "y": 0, "z": centerPosition[4].z},
        {"x": centerPosition[4].x + 3 * space, "y": 0, "z": centerPosition[4].z},
        {"x": centerPosition[4].x + 4 * space, "y": 0, "z": centerPosition[4].z},
        {"x": centerPosition[4].x + 5 * space, "y": 0, "z": centerPosition[4].z},
        // {"x": centerPosition[4].x + 6* space, "y": 0, "z": centerPosition[4].z},
        // {"x": centerPosition[4].x + 7* space, "y": 0, "z": centerPosition[4].z},
        // {"x": centerPosition[4].x + 8* space, "y": 0, "z": centerPosition[4].z},
        // {"x": centerPosition[4].x + 9* space, "y": 0, "z": centerPosition[4].z},
    ],
    //M5变压器
    [
        {"x": 0.9 * gebanInfo[0].x + 0.1 * xArray[0], "y": 0, "z": 0.75 * zArray[0] + 0.25 * zArray[1]},

        {"x": 0.9 * gebanInfo[0].x + 0.1 * xArray[0], "y": 0, "z": 0.25 * zArray[0] + 0.75 * zArray[1]},

        {"x": 0.8 * gebanInfo[1].x + 0.2 * xArray[2], "y": 0, "z": 0.5 * gebanInfo[2].z + 0.5 * gebanInfo[3].z},
    ],
    //M6温度传感器
    [
        {"x": 0.5 * gebanInfo[0].x + 0.5 * xArray[0], "y": 0.5*height, "z": zArray[0]+offset+1},
    ]
]


//梁的长款
let liangWeight = 10;
let liangHeight = 10;
let linagWeightOffset = 0.5 * (liangWeight + offset);
let linagHeightOffset = 0.5 * (liangHeight + offset);
let liangInfo = [
    //L0
    {
        "width": liangWeight,
        "height": liangHeight,
        "x": xArray[0] + linagWeightOffset,
        "y": 0,
        "z": zArray[0] + linagHeightOffset,
        "name": "梁"
    },
    //L1
    {
        "width": liangWeight,
        "height": liangHeight,
        "x": xArray[2] - linagWeightOffset,
        "y": 0,
        "z": zArray[0] + linagHeightOffset,
        "name": "梁"
    },
    //L2
    {
        "width": liangWeight,
        "height": liangHeight,
        "x": xArray[2] - linagWeightOffset,
        "y": 0,
        "z": zArray[2] - linagHeightOffset,
        "name": "梁"
    },
    //L3
    {
        "width": liangWeight,
        "height": liangHeight,
        "x": xArray[1] + linagWeightOffset,
        "y": 0,
        "z": zArray[2] - linagHeightOffset,
        "name": "梁"
    },
    //L4
    {
        "width": liangWeight,
        "height": liangHeight,
        "x": xArray[0] + linagWeightOffset,
        "y": 0,
        "z": zArray[1] - linagHeightOffset,
        "name": "梁"
    },
    //L5
    {
        "width": liangWeight,
        "height": liangHeight,
        "x": gebanInfo[0].x - linagWeightOffset,
        "y": 0,
        "z": zArray[2] - linagHeightOffset,
        "name": "梁"
    },
    //L6
    {
        "width": liangWeight,
        "height": liangHeight,
        "x": gebanInfo[0].x - linagWeightOffset,
        "y": 0,
        "z": zArray[0] + linagHeightOffset,
        "name": "梁"
    },
    //L7
    {
        "width": liangWeight,
        "height": liangHeight,
        "x": gebanInfo[1].x + linagWeightOffset,
        "y": 0,
        "z": zArray[2] - linagHeightOffset,
        "name": "梁"
    },
    //L8
    {
        "width": liangWeight,
        "height": liangHeight,
        "x": gebanInfo[1].x + linagWeightOffset,
        "y": 0,
        "z": zArray[0] + linagHeightOffset,
        "name": "梁"
    },
    //L9
    {
        "width": liangWeight,
        "height": liangHeight,
        "x": 0.6 * xArray[0] + 0.3 * gebanInfo[0].x,
        "y": 0,
        "z": zArray[0] + linagHeightOffset,
        "name": "梁"
    },
    //L10
    // {
    //     "width": liangWeight,
    //     "height": liangHeight,
    //     "x": 0.3 * xArray[0] + 0.6 * gebanInfo[0].x,
    //     "y": 0,
    //     "z": zArray[0] + linagHeightOffset,
    //     "name": "梁"
    // },
//L11
    {
        "width": liangWeight,
        "height": liangHeight,
        "x": 0.6 * xArray[0] + 0.3 * gebanInfo[0].x,
        "y": 0,
        "z": zArray[1] - linagHeightOffset,
        "name": "梁"
    },
]
let liangMeshInfo = [];

function getPointVector3(p) {
    return new THREE.Vector3(xArray[pointIndex[p + "x"]], yArray[pointIndex[p + "y"]], zArray[pointIndex[p + "z"]]);
}

function getPointPianyi(p) {
    let pointVector3 = new THREE.Vector3(xArray[pointIndex[p + "x"]], yArray[pointIndex[p + "y"]], zArray[pointIndex[p + "z"]]);
    if (pointIndex[p + "x"] === 2) {
        pointVector3.x -= offset;
    } else {
        pointVector3.x += offset;
    }
    if (pointIndex[p + "z"] === 0) {
        pointVector3.z += offset;
    } else {
        pointVector3.z -= offset;
    }
    return pointVector3;
}

function getPointPianyi2(p) {
    let pointVector2 = new THREE.Vector3(xArray[pointIndex[p + "x"]], zArray[pointIndex[p + "z"]]);
    if (pointIndex[p + "x"] === 2) {
        pointVector2.x -= offset;
    } else {
        pointVector2.x += offset;
    }
    if (pointIndex[p + "z"] === 0) {
        pointVector2.y += offset;
    } else {
        pointVector2.y -= offset;
    }
    return pointVector2;
}

function getPointVector2(p) {
    return new THREE.Vector2(xArray[pointIndex[p + "x"]], zArray[pointIndex[p + "z"]]);
}

function getModelSize(mesh) {
    let box = new THREE.Box3().setFromObject(mesh);
    return box.size();
}

function getLiangMeshInfo(arr) {
    let array = [];
    for (let i = 0; i < arr.length; i++) {
        array.push({
            "width": arr[i].width,
            "height": height,
            "depth": arr[i].height,
            "angle": arr[i].angle ? arr[i].angle : 0,
            "material": matArrayB,
            "x": arr[i].x,
            "y": 0.5 * height,
            "z": arr[i].z,
            "name": "梁"
        });
    }
    return array;
}
