var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

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

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshStandardMaterial({ color: 0xffffff });

var cubes = [];

for(var i = 0; i < 28; i++){
	var cube = new THREE.Mesh(geometry, material);
	cube.position.set(10*(Math.random()-0.5), 10*(Math.random()-0.5), 100*(Math.random()-0.9));
	scene.add(cube);
	cubes.push(cube);
}

camera.position.z = 5;
var rotVec = new THREE.Vector3(0.01,-0.01,-0.01);

var animate = function () {
	requestAnimationFrame(animate);

	cubes.map((cube) => {
		cube.rotation.x += rotVec.x;
		cube.rotation.y += rotVec.y;
		cube.rotation.z += rotVec.z;
	});

	renderer.render(scene, camera);
};

animate();