var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var directionalLights = [];
var directions = [
	new THREE.Vector3(0, 0, 1).normalize(),
	new THREE.Vector3(0, 1, 0).normalize(),
	new THREE.Vector3(1, 0, 0).normalize()
];
for(var i = 0; i < 3; i++){
	var currentDirectionalLight = new THREE.DirectionalLight( Math.pow(256, i) * 0x0000ff );
	currentDirectionalLight.position.copy(directions[i]);
	directionalLights.push(currentDirectionalLight);
	scene.add(currentDirectionalLight);
}

var geometries = [new THREE.BoxGeometry(), new THREE.SphereGeometry(0.5, 32, 32), new THREE.TetrahedronGeometry() ];
var material = new THREE.MeshStandardMaterial({ color: 0xffffff });

var cubes = [];
var rotSpeed = 0.01;

for(var i = 0; i < 28; i++){
	var cube = new THREE.Mesh(geometries[Math.floor(Math.random() * geometries.length)], material);
	cube.position.set(15*(Math.random()-0.5), 15*(Math.random()-0.5), 10*(Math.random()-0.8));
	scene.add(cube);

	var rotVec = new THREE.Vector3(
		(2*Math.round(Math.random()) - 1),
		(2*Math.round(Math.random()) - 1),
		(2*Math.round(Math.random()) - 1)
	);
	cubes.push([cube, rotVec]);
}

camera.position.z = 5;


var animate = function () {
	requestAnimationFrame(animate);

	cubes.map(([cube, rotVec]) => {
		cube.rotation.x += rotSpeed * rotVec.x;
		cube.rotation.y += rotSpeed * rotVec.y;
		cube.rotation.z += rotSpeed * rotVec.z;
	});

	renderer.render(scene, camera);
};

animate();