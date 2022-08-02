    //boilerplate for three.js :)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(1000, 1000);
    //fetch html element
    const container = document.querySelector('#globe');
    //append three js dom 
    container.appendChild(renderer.domElement);
    //boiler plate over

    // create geometry
    const geometry = new THREE.SphereGeometry(1, 20, 20);
    SphereToQuads(geometry)
    const textureGeometry = new THREE.SphereGeometry(1.01, 20, 20);
    //create material
    const material = new THREE.LineBasicMaterial({ color: 0xffff00 });
    const loader = new THREE.TextureLoader();   
    const textureMaterial = new THREE.MeshBasicMaterial({
    map: loader.load('./globe.png'),
    transparent: true,
});

const quaternion = new THREE.Quaternion();
quaternion.setFromAxisAngle( new THREE.Vector3( 0, 0, 1).normalize(), -Math.PI / 6 );
//cube.applyQuaternion( quaternion );
    //create three js object from geometry and material
    const cube = new THREE.LineSegments(geometry, material);
    const globeMap = new THREE.Mesh(textureGeometry, textureMaterial);

    //add scene
    // cube.applyQuaternion( quaternion );
    // globeMap.applyQuaternion(quaternion);
    scene.add(cube);
    scene.add(globeMap)
    cube.rotation.x += 0.5;
    globeMap.rotation.x += 0.5;
    camera.position.z = 5;

    // animate happens every frame, tries to do it 60 fps
    function animate() {
        requestAnimationFrame(animate);
        // const quaternion = new THREE.Quaternion();
        // quaternion.setFromAxisAngle( new THREE.Vector3( 1, 1, 0 ).normalize(), Math.PI / 400 );
        
        
        //rotates cube
        // cube.applyQuaternion( quaternion );
        // globeMap.applyQuaternion( quaternion);
        cube.rotation.x += 0.0;
        cube.rotation.y += 0.01;
        globeMap.rotation.x += 0.0;
        globeMap.rotation.y += 0.01;

        //render
        renderer.render(scene, camera);
    }

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
