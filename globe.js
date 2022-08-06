//boilerplate for three.js :)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
const renderSize = 375
renderer.setSize(renderSize, renderSize);
renderer.setClearColor(0x000000, 0);
//fetch html element
const container = document.querySelector('#globe');
//append three js dom 
container.appendChild(renderer.domElement);
//boiler plate over

// create geometry
const geometry = new THREE.SphereGeometry(2.5, 20, 20);
SphereToQuads(geometry)
const textureGeometry = new THREE.SphereGeometry(2.51, 20, 20);
//create material
const material = new THREE.LineBasicMaterial({ color: 0xffff00 });
const loader = new THREE.TextureLoader();
const textureMaterial = new THREE.MeshBasicMaterial({
    map: loader.load('./globe2.png'),
    transparent: true,
});


// const geometry2 = new THREE.BoxGeometry(3, 3, 1);
// const material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube2 = new THREE.Mesh(geometry2, material2);
// scene.add(cube2);

//cube.applyQuaternion( quaternion );
//create three js object from geometry and material
const cube = new THREE.LineSegments(geometry, material);
const globeMap = new THREE.Mesh(textureGeometry, textureMaterial);

//add scene
// cube.applyQuaternion( quaternion );
// globeMap.applyQuaternion(quaternion);
scene.add(cube);
scene.add(globeMap)
//cube.rotation.x += 0.5;
//globeMap.rotation.x += 0.5;
camera.position.z = 5;
const quaternionTilt = new THREE.Quaternion();
quaternionTilt.setFromAxisAngle(new THREE.Vector3(.5, 0, .3).normalize(), Math.PI / 6)

// animate happens every frame, tries to do it 60 fps
let angle = 0; let isOverSphere=false
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
function onPointerMove(event) {

    const target = container;
    const rect = target.getBoundingClientRect();

    //mouse position

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // calculate pointer position in normalized device coordinates
    // (-1 to +1) for both components
    // console.log(x + ',' + y);
    pointer.x = (x / renderSize) * 2 - 1;
    pointer.y = - (y / renderSize) * 2 + 1;

}

function onPointerDown(event) {
if (isOverSphere) {
    window.open("https://calmmunism.github.io/earthrunner/")
}

}

window.addEventListener('pointermove', onPointerMove);
window.addEventListener('pointerdown', onPointerDown);
function animate() {
    requestAnimationFrame(animate);
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObject(globeMap);
    if (intersects.length > 0) {
        angle += .005;
        isOverSphere = true
    }
    else {
        //rotates cube
        angle += .01
        isOverSphere = false
    }
    




    cube.rotation.x = 0;
    cube.rotation.y = 0;
    cube.rotation.z = 0;
    globeMap.rotation.x = 0;
    globeMap.rotation.y = 0;
    globeMap.rotation.z = 0;

    const quaternionRotate = new THREE.Quaternion();
    quaternionRotate.setFromAxisAngle(new THREE.Vector3(0, 1, 0).normalize(), angle);


    cube.applyQuaternion(quaternionRotate);
    cube.applyQuaternion(quaternionTilt);
    globeMap.applyQuaternion(quaternionRotate);
    globeMap.applyQuaternion(quaternionTilt);

    // broken function
    // spinWorld(cube);
    // spinWorld(globeMap);


    //render
    renderer.render(scene, camera);
}

// Broken function
// function spinWorld(geometry) {
//     geometry.rotation.x = 0;
//     geometry.rotation.y = 0;
//     geometry.rotation.z = 0;
//     geometry.applyQaternion(quaternionRotate);
//     geometry.applyQuaternion(quaternionTilt);
// }

function SphereToQuads(g) {
    let p = g.parameters;
    let segmentsX = p.widthSegments;
    let segmentsY = p.heightSegments - 2;
    let mainShift = segmentsX + 1;
    let indices = [];
    for (let i = 0; i < segmentsY + 1; i++) {
        let index11 = 0;
        let index12 = 0;
        for (let j = 0; j < segmentsX; j++) {
            index11 = (segmentsX + 1) * i + j;
            index12 = index11 + 1;
            let index21 = index11;
            let index22 = index11 + (segmentsX + 1);
            indices.push(index11 + mainShift, index12 + mainShift);
            if (index22 < ((segmentsX + 1) * (segmentsY + 1) - 1)) {
                indices.push(index21 + mainShift, index22 + mainShift);
            }
        }
        if ((index12 + segmentsX + 1) <= ((segmentsX + 1) * (segmentsY + 1) - 1)) {
            indices.push(index12 + mainShift, index12 + segmentsX + 1 + mainShift);
        }
    }

    let lastIdx = indices[indices.length - 1] + 2;

    // poles
    for (let i = 0; i < segmentsX; i++) {
        //top
        indices.push(i, i + mainShift, i, i + mainShift + 1);

        // bottom
        let idx = lastIdx + i;
        let backShift = mainShift + 1;
        indices.push(idx, idx - backShift, idx, idx - backShift + 1);
    }

    g.setIndex(indices);
}

// another boilerplate line, starts the game loop
animate();
