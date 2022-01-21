// import { OrbitControls } from "//cdn.skypack.dev/three@0.134/examples/jsm/controls/OrbitControls?min";

var mesh;
const coreTexture = "./images/core.jpg";
const thirdSide = "./images/stars.jpeg";
const sun = "./images/star.png";
const mercuryTexture = "./images/merc.jpeg";
const venusTexture = "./images/venus.jpeg";
const earthTexture = "./images/earth.jpeg";
const marsTexture = "./images/mars.jpeg";
const jupiterTexture = "./images/jupiter.jpeg";
const textureLoader = new THREE.TextureLoader();
var renderer, scene, camera, x, y, z, model, mercury, venus, earth, mars, jupiter, mercuryClick
    , venusClick
    , earthClick
    , marsClick
    , jupiterClick
var spin = true;
let r = 90;

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


    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
    );
    if (check == false) {
        camera.position.set(-170, 50, 0);
        camera.lookAt(new THREE.Vector3());
    }
    else {
        camera.position.set(-280, 100, 0);
        camera.lookAt(new THREE.Vector3());
    }
    var isEscape = false;
    var back = document.getElementById('backButton');
    back.addEventListener('click', function (e) {
        meshDefault()
        setFalse()
        popUp.style.display = 'none';

        camera.position.set(-170, 50, 0);
        camera.lookAt(new THREE.Vector3());
        model.position.set(r * Math.cos(300 * 0.0174533), 0, r * Math.sin(300 * 0.0174533))
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

            camera.position.set(-170, 50, 0);
            camera.lookAt(new THREE.Vector3());
            model.position.set(r * Math.cos(300 * 0.0174533), 0, r * Math.sin(300 * 0.0174533))
            spin = true;
        }
    };
    setFalse()

    // scene.add(new THREE.AxesHelper(1000))

    const bgSpace = new THREE.TextureLoader().load(thirdSide);
    scene.background = bgSpace;
    // const light = new THREE.DirectionalLight(0x000000, 1, Infinity)
    // light.position.set(0, 0, 1)
    // camera.add(light)
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 100, 80);
    scene.add(pointLight);
    window.addEventListener('resize', onWindowResize, false);
    onWindowResize();


    mercury = createPlanete(15, mercuryTexture);
    venus = createPlanete(15, venusTexture);
    earth = createPlanete(15, earthTexture);
    mars = createPlanete(15, marsTexture);
    jupiter = createPlanete(15, jupiterTexture);
    var center = createPlanete(18, sun);

    meshDefault()

    loadModel();
}

function loadModel() {
    var loader = new THREE.GLTFLoader();
    loader.load(
        "./scene.gltf", function (gltf) {
            model = gltf.scene;
            model.position.y = 0;
            model.position.x = 90;
            model.position.set(r * Math.cos(300 * 0.0174533), 0, r * Math.sin(300 * 0.0174533))
            model.scale.set(0.2, 0.2, 0.2)
            scene.add(model);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        function (error) {
            console.log((error.message))
        }
    );

}
function meshDefault() {
    mercury.mesh.position.set(r * Math.cos(0), 20 * Math.cos(0 * 0.0174533), r * Math.sin(0))
    venus.mesh.position.set(r * Math.cos(60 * 0.0174533), 20 * Math.cos(60 * 0.0174533), r * Math.sin(60 * 0.0174533))
    earth.mesh.position.set(r * Math.cos(120 * 0.0174533), 20 * Math.cos(120 * 0.0174533), r * Math.sin(120 * 0.0174533))
    mars.mesh.position.set(r * Math.cos(180 * 0.0174533), 20 * Math.cos(180 * 0.0174533), r * Math.sin(180 * 0.0174533))
    jupiter.mesh.position.set(r * Math.cos(240 * 0.0174533), 20 * Math.cos(240 * 0.0174533), r * Math.sin(240 * 0.0174533))

}
function createPlanete(size, texture) {
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    });
    mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE.Object3D();
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
var plName = document.getElementById('plName')
var popUp = document.getElementById('popUp')
var para = document.getElementById('para')
var a = mars;
domEvents.addEventListener(a.mesh, 'click', event => {
    meshDefault()
    setFalse()

    popUp.style.display = 'block';
    plName.innerHTML = 'MARS'
    para.innerHTML = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autemLorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autem Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autemLorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autem Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autemLorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cupiditate unde modi consequuntur maiores. Soluta tenetur blanditiis magnam hic ipsum. Ipsum magni nihil quasi, dolorum aliquam distinctio nesciunt numquam autem'

    spin = false;
    marsClick = true;
    mars.mesh.position.set(150 * Math.cos(180 * 0.0174533), -30, 150 * Math.sin(180 * 0.0174533))
    mercury.mesh.position.y = 90
    venus.mesh.position.y = 45
    earth.mesh.position.y = -15
    jupiter.mesh.position.y = -15
    model.position.y = 45
}, false)


var b = mercury;

domEvents.addEventListener(b.mesh, 'click', event => {
    meshDefault()
    setFalse()
    spin = false;
    mercuryClick = true;
    b.mesh.position.set(150 * Math.cos(0 * 0.0174533), -30, 150 * Math.sin(0 * 0.0174533))
    a.mesh.position.y = 90
    venus.mesh.position.y = -15
    earth.mesh.position.y = 45
    jupiter.mesh.position.y = 45
    model.position.y = -15

}, false)

var c = venus;
domEvents.addEventListener(c.obj, 'click', event => {
    meshDefault()
    setFalse()
    spin = false;
    venusClick = true;
    c.mesh.position.set(150 * Math.cos(60 * 0.0174533), -30, 150 * Math.sin(60 * 0.0174533))
    b.mesh.position.y = -15
    a.mesh.position.y = 45
    earth.mesh.position.y = -15
    jupiter.mesh.position.y = 90
    model.position.y = 45
}, false)



function animate() {
    requestAnimationFrame(animate);
    if (spin == true) {
        renderer.setClearColor(0x000000, 0);
        renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);

    } else {
        if (marsClick == true) {
            var camera2 = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 1000);
            camera2.position.z = 250;
            camera2.focalLength = 1000;
            a.mesh.add(camera2)
            camera2.position.set(-30, 20, 0);
            camera2.lookAt(0, 0, 0)
            renderer.setClearColor(0x000000, 0);
            renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
            renderer.render(scene, camera2);
        }
        else if (mercuryClick == true) {
            var camera3 = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 1000);
            camera3.position.z = 250;
            camera3.focalLength = 1000;
            b.mesh.add(camera3)
            camera3.position.set(30, 20, 0);
            camera3.lookAt(0, 0, 0)
            renderer.setClearColor(0x000000, 0);
            renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
            renderer.render(scene, camera3);
        } else if (venusClick == true) {
            var camera4 = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 1000);
            camera4.position.z = 250;
            camera4.focalLength = 1000;
            c.mesh.add(camera4)
            camera4.position.set(15, 20, 30);
            camera4.lookAt(0, 0, 0)
            renderer.setClearColor(0x000000, 0);
            renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
            renderer.render(scene, camera4);
        }
    }
    scene.rotateY(0.0003)

}

function setFalse() {
    mercuryClick = false;
    venusClick = false;
    earthClick = false;
    marsClick = false;
    jupiterClick = false;
}