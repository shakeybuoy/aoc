// import { OrbitControls } from "//cdn.skypack.dev/three@0.134/examples/jsm/controls/OrbitControls?min";

var mesh;
const mercuryTexture = "./images/mercury.png";
const venusTexture = "./images/venus.jpeg";
const earthTexture = "./images/earth.png";
const marsTexture = "./images/mars.jpeg";
const jupiterTexture = "./images/jupiter.png";
const textureLoader = new THREE.TextureLoader();
var renderer, scene, camera, x, y, z, model, mercury, venus, earth, mars, jupiter, sprite, mercuryClick, olympiaClick
    , venusClick
    , earthClick
    , marsClick
    , jupiterClick,
    modelClick, geoStar, starMesh, star
var spin = true;
let r = 70;
var raycaster, mouse;
var plName = document.getElementById('plName')
var popUp = document.getElementById('popUp')
var para = document.getElementById('para')
let video = document.getElementById('video');
let videoOnClick = document.getElementById('videoOnClick');
let videoOnDestroyed = document.getElementById('videoOnDestroyed');
video.play()
videoOnClick.play()
videoOnDestroyed.play()
let vidClickText = new THREE.VideoTexture(videoOnClick);
let vidText = new THREE.VideoTexture(video);
let videoOnDestroyedClick = new THREE.VideoTexture(videoOnDestroyed);
init();
animate();

function init() {
    let check = false;
    if (window.innerWidth <= 1280) {
        check = true;
    }

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2()

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 1.0);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        35,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
    );

    var map = new THREE.TextureLoader().load("./images/olm.png");
    var material = new THREE.SpriteMaterial({ map: map, color: 0xffffff });
    sprite = new THREE.Sprite(material);
    const objNew = new THREE.Object3D();
    objNew.add(sprite);
    objNew.uuid = "Olympia"
    scene.add(objNew);
    sprite.scale.set(110, 80, 1);
    sprite.position.set(0, -15, 180);

    if (check == false) {
        camera.position.set(100, 50, 400);
        camera.lookAt(new THREE.Vector3(-400, -50, -120));
    }
    else {
        // const controls = new OrbitControls(camera, renderer.domElement);
        // controls.update();
        camera.position.set(100, 50, 400);
        camera.lookAt(new THREE.Vector3(-400, -50, -120));
    }
    var isEscape = false;
    var back = document.getElementById('backButton');
    back.addEventListener('click', function (e) {
        meshDefault()
        setFalse()
        popUp.style.display = 'none';

        camera.position.set(100, 50, 400);
        camera.lookAt(new THREE.Vector3(-400, -50, -120));

        sprite.scale.set(110, 80, 1);
        sprite.position.set(0, -15, 180);

        model.position.set(-120, 0, 220)
        model.scale.set(0.22, 0.22, 0.22)

        spin = true;
    })

    document.onkeydown = function (evt) {
        evt = evt || window.event;

        if ("key" in evt) {
            isEscape = (evt.key === "Escape" || evt.key === "Esc");
        } else {
            isEscape = (evt.keyCode === 27);
        }
        if (isEscape) {
            meshDefault()
            setFalse()
            popUp.style.display = 'none';

            camera.position.set(100, 50, 400);
            camera.lookAt(new THREE.Vector3(-400, -50, -120));

            sprite.scale.set(110, 80, 1);
            sprite.position.set(0, -15, 180);

            model.position.set(-120, 0, 220)
            model.scale.set(0.22, 0.22, 0.22)

            spin = true;
        }
    };
    setFalse()

    // scene.add(new THREE.AxesHelper(1000))

    // const bgSpace = new THREE.TextureLoader().load('./images/Untitled_design_16.png');
    // scene.background = bgSpace;

    // addStars()
    // function addStars() {
    //     geoStar = new THREE.Geometry();
    //     for (let i = 0; i < 10000; i++) {
    //         star = new THREE.Vector3(
    //             Math.random() * 1000 - 600,
    //             Math.random() * 800 - 600,
    //             Math.random() * 800 - 600
    //         );
    //         star.velocity = 0;
    //         star.acceleration = 0.0002;
    //         geoStar.vertices.push(star);
    //     }

    //     let sprite = new THREE.TextureLoader().load('./images/particle-sprite.png');
    //     let starMesh = new THREE.PointsMaterial({
    //         color: 0xffffff,
    //         size: 0.3,
    //         // map: sprite
    //     });

    //     star = new THREE.Points(geoStar, starMesh);
    //     scene.add(star);
    // }


    // Lights
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 100, 80);
    scene.add(pointLight);


    window.addEventListener('resize', onWindowResize, false);
    onWindowResize();
    mercury = createPlanete(7.3, mercuryTexture, 0, 'mercury');
    venus = createPlanete(19.59, venusTexture, 0, 'venus');
    earth = createPlanete(24, earthTexture, 0, 'earth');
    mars = createPlanete(25.8, marsTexture, 0, 'mars');
    jupiter = createPlanete(100.7, jupiterTexture, 0, 'jupiter');
    meshDefault()

    loadModel();
    renderer.domElement.addEventListener('click', onClick, false);
}


function loadModel() {
    var loader = new THREE.GLTFLoader();
    loader.load(
        "./Earth/PlanetGLB2.glb", function (gltf) {
            model = gltf.scene;
            // model.position.y = 0;
            model.position.set(-120, 0, 220)
            model.scale.set(0.22, 0.22, 0.22)
            scene.add(model);

        },
        function (xhr) {
            // console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        function (error) {
            // console.log((error.message))
        }
    );

}
function onClick(event) {

    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        var objectDet = intersects[0].object.parent;
        if (objectDet.uuid == 'mercury') {
            plMercury()
        } else if (objectDet.uuid == 'venus') {
            plVenus()
        } else if (objectDet.uuid == 'earth') {
            plEarth()

        } else if (objectDet.uuid == 'mars') {
            plMars()

        } else if (objectDet.uuid == 'jupiter') {
            plJupiter()

        } else if (objectDet.uuid == 'Olympia') {
            plOlympia()
        }
        var name = intersects[0].object.parent.name;

        if (name == 'COMBINE_LP') {
            // console.log(name)
            animateModel()
        }
    }

}

function meshDefault() {
    mercury.mesh.scale.set(2.5, 2.5, 2.5)
    venus.mesh.scale.set(1.4, 1.4, 1.4)
    earth.mesh.scale.set(1.8, 1.8, 1.8)
    mars.mesh.scale.set(1, 1, 1)
    jupiter.mesh.scale.set(0.24, 0.24, 0.24)

    mercury.mesh.position.set(-140, 40, 20)
    venus.mesh.position.set(-60, 60, -10)
    earth.mesh.position.set(-480, 100, 100)
    mars.mesh.position.set(-300, 100, 0)
    jupiter.mesh.position.set(-170, -20, 300)
}
function createPlanete(size, texture, position, name) {
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    });
    mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE.Object3D();
    mesh.position.x = position;
    obj.uuid = name
    obj.add(mesh);
    scene.add(obj);
    return { mesh, obj };

}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
}

scene.updateMatrixWorld(true);

var domEvents = new THREEx.DomEvents(camera, renderer.domElement)


function plView() {
    //pos
    sprite.position.set(0, 1000, 0);
    mercury.mesh.position.set(0, -1000, 0)
    venus.mesh.position.set(0, 1110, 0)
    earth.mesh.position.set(110, 1000, 0)
    mars.mesh.position.set(1120, 1000, 0)
    jupiter.mesh.position.set(1060, 1000, 0)


    // scale
    sprite.scale.set(140, 110, 1);
    jupiter.mesh.scale.set(0.3, 0.3, 0.3)
    venus.mesh.scale.set(1, 1, 1)
    earth.mesh.scale.set(1, 1, 1)
    mars.mesh.scale.set(0.7, 0.7, 0.7)
    model.scale.set(0.22, 0.22, 0.22)

}
function animateModel() {
    // meshDefault()
    setFalse()
    plView()
    spin = false;
    modelClick = true;
    model.scale.set(0.5, 0.5, 0.5)
    // position
    model.position.set(0, 0, 0)
    // body
    popUp.style.display = 'block';
    plName.innerHTML = 'Destroyed'
    para.innerHTML = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autemLorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autem Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autemLorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autem Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autemLorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autem'

}
function plMercury() {
    // meshDefault()
    setFalse()
    plView()
    spin = false;
    mercuryClick = true;
    mercury.mesh.scale.set(7, 7, 7)
    // position
    mercury.mesh.position.set(0, 0, 0)
    // body

    popUp.style.display = 'block';
    plName.innerHTML = 'Mercury'
    para.innerHTML = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autemLorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autem Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autemLorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autem Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autemLorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autem'

}
function plVenus() {
    // meshDefault()
    setFalse()
    plView()
    spin = false;
    venusClick = true;
    venus.mesh.scale.set(2.6, 2.6, 2.6)

    // position

    venus.mesh.position.set(0, 0, 0)

    // body

    popUp.style.display = 'block';
    plName.innerHTML = 'Venus'
    para.innerHTML = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autemLorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autem Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autemLorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autem Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autemLorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autem'

}
function plEarth() {
    // meshDefault()
    setFalse()
    plView()
    spin = false;
    earthClick = true;
    earth.mesh.scale.set(2, 2, 2)

    // position
    earth.mesh.position.set(0, 0, 0)
    // body

    popUp.style.display = 'block';
    plName.innerHTML = 'Earth'
    para.innerHTML = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autemLorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autem Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autemLorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autem Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autemLorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autem'

}

function plMars() {
    // meshDefault()
    setFalse()
    plView()
    spin = false;
    marsClick = true;
    mars.mesh.scale.set(2, 2, 2)

    // position

    mars.mesh.position.set(0, 0, 0)
    // body

    popUp.style.display = 'block';
    plName.innerHTML = 'Mars'
    para.innerHTML = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autemLorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autem Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autemLorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autem Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autemLorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autem'

}
function plJupiter() {
    // meshDefault()
    setFalse()
    plView()
    spin = false;
    jupiterClick = true;
    jupiter.mesh.scale.set(0.5, 0.5, 0.5)

    // position
    jupiter.mesh.position.set(0, 0, 0)

    // body

    popUp.style.display = 'block';
    plName.innerHTML = 'Jupiter'
    para.innerHTML = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autemLorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autem Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autemLorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autem Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autemLorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autem'

}
function plOlympia() {
    // meshDefault()
    setFalse()
    plView()
    spin = false;
    olympiaClick = true;

    // position
    sprite.scale.set(200, 170, 1);

    sprite.position.set(0, 0, 0);
    // body

    popUp.style.display = 'block';
    plName.innerHTML = 'Olympia'
    para.innerHTML = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autemLorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autem Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autemLorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autem Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autemLorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autem'

}

function animate() {
    requestAnimationFrame(animate);
    if (spin == true) {
        renderer.setClearColor(0x000000, 0);
        renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
        scene.background = vidText


    } else {
        if (modelClick == true) {
            scene.background = videoOnDestroyedClick

            mercury.mesh.rotateY(0.004);
            venus.mesh.rotateY(0.002);
            earth.mesh.rotateY(0.002);
            mars.mesh.rotateY(0.0018);
            jupiter.mesh.rotateY(0.004);
            // model.rotateY(0)

            var camera1 = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 1000);
            camera1.position.z = 250;
            camera1.focalLength = 1000;
            jupiter.obj.add(camera1)
            camera1.position.set(0, 0, 170);
            camera1.lookAt(0, 0, 0)
            renderer.setClearColor(0x000000, 0);
            renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
            renderer.render(scene, camera1);
        } else if (mercuryClick == true) {
            scene.background = vidClickText

            mercury.mesh.rotateY(0);
            venus.mesh.rotateY(0.002);
            earth.mesh.rotateY(0.002);
            mars.mesh.rotateY(0.0018);
            jupiter.mesh.rotateY(0.004);
            model.rotateY(0.002)
            var camera2 = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 1000);
            camera2.position.z = 250;
            camera2.focalLength = 1000;
            mercury.obj.add(camera2)
            camera2.position.set(0, 0, 170);
            camera2.lookAt(0, 0, 0)
            renderer.setClearColor(0x000000, 0);
            renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
            renderer.render(scene, camera2);
        } else if (venusClick == true) {
            scene.background = vidClickText

            mercury.mesh.rotateY(0.004);
            venus.mesh.rotateY(0);
            earth.mesh.rotateY(0.002);
            mars.mesh.rotateY(0.0018);
            jupiter.mesh.rotateY(0.004);
            model.rotateY(0.002)

            var camera3 = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 1000);
            camera3.position.z = 250;
            camera3.focalLength = 1000;
            venus.obj.add(camera3)
            camera3.position.set(0, 0, 170);
            camera3.lookAt(0, 0, 0)
            renderer.setClearColor(0x000000, 0);
            renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
            renderer.render(scene, camera3);
        }
        else if (earthClick == true) {
            scene.background = vidClickText

            mercury.mesh.rotateY(0.004);
            venus.mesh.rotateY(0.002);
            earth.mesh.rotateY(0);
            mars.mesh.rotateY(0.0018);
            jupiter.mesh.rotateY(0.004);
            model.rotateY(0.002)

            var camera4 = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 1000);
            camera4.position.z = 250;
            camera4.focalLength = 1000;
            earth.obj.add(camera4)
            camera4.position.set(0, 0, 170);
            camera4.lookAt(0, 0, 0)
            renderer.setClearColor(0x000000, 0);
            renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
            renderer.render(scene, camera4);
        } else if (marsClick == true) {
            scene.background = vidClickText

            mercury.mesh.rotateY(0.004);
            venus.mesh.rotateY(0.002);
            earth.mesh.rotateY(0.002);
            mars.mesh.rotateY(0);
            jupiter.mesh.rotateY(0.004);
            model.rotateY(0.002)

            var camera5 = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 1000);
            camera5.position.z = 250;
            camera5.focalLength = 1000;
            mars.obj.add(camera5)
            camera5.position.set(0, 0, 170);
            camera5.lookAt(0, 0, 0)
            renderer.setClearColor(0x000000, 0);
            renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
            renderer.render(scene, camera5);
        }
        else if (jupiterClick == true) {
            scene.background = vidClickText

            mercury.mesh.rotateY(0.004);
            venus.mesh.rotateY(0.002);
            earth.mesh.rotateY(0.002);
            mars.mesh.rotateY(0.0018);
            jupiter.mesh.rotateY(0);
            model.rotateY(0.002)

            var camera6 = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 1000);
            camera6.position.z = 250;
            camera6.focalLength = 1000;
            jupiter.obj.add(camera6)
            camera6.position.set(0, 0, 170);
            camera6.lookAt(0, 0, 0)
            renderer.setClearColor(0x000000, 0);
            renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
            renderer.render(scene, camera6);
        } else if (olympiaClick == true) {
            scene.background = vidClickText

            mercury.mesh.rotateY(0.004);
            venus.mesh.rotateY(0.002);
            earth.mesh.rotateY(0.002);
            mars.mesh.rotateY(0.0018);
            jupiter.mesh.rotateY(0.004);
            model.rotateY(0.002)
            var camera7 = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 1000);
            camera7.position.z = 250;
            camera7.focalLength = 1000;
            camera7.position.set(0, 0, 170);
            camera7.lookAt(0, 0, 0)
            renderer.setClearColor(0x000000, 0);
            renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
            renderer.render(scene, camera7);
        }
    }

    try {
        mercury.mesh.rotateY(0.0004);
        venus.mesh.rotateY(0.0002);
        earth.mesh.rotateY(0.0002);
        mars.mesh.rotateY(0.0018);
        jupiter.mesh.rotateY(0.00047);
        model.rotateY(0.002)

    } catch (e) {
        // console.log(e)
    }

}

function setFalse() {
    olympiaClick = false;
    mercuryClick = false;
    venusClick = false;
    earthClick = false;
    marsClick = false;
    jupiterClick = false;
    modelClick = false;
}