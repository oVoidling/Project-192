let currentCash = 0

var bearhit = 0
let gameOverr = false;
let a = "pistol";
let b = {
  ak47: [
    { interval: 100, automatic: true, magSize: 30, totalBullets: 120,rotationX:0,rotationY:-90,rotationZ:0,positionY:-0.3,gltf:"#Ak47",prize:450 }
  ],
  sniper: [
    { interval: 400, automatic: false, magSize: 6, totalBullets: 24,rotationX:0,rotationY:-90,rotationZ:0,positionY:-0.3,gltf:"#Sniper Rifle",prize:600 }
  ],
  MP5: [
    { interval: 85, automatic: true, magSize: 35, totalBullets: 140,rotationX:0,rotationY:90,rotationZ:0,positionY:-0.5,gltf:"#MP5",prize:300 }
  ],
  pistol: [
    { interval: 200, automatic: false, magSize: 12, totalBullets: 48,rotationX:0,rotationY:0,rotationZ:0,positionY:-0.3,gltf:"#pistol" }
  ]
};

let bullets = b[a][0]["magSize"];
let interval = b[a][0]["interval"];
let automatic = b[a][0]["automatic"];
let totalBullets = b[a][0]["totalBullets"];
let rotationX = b[a][0]["rotationX"]
let rotationY = b[a][0]["rotationY"]
let rotationZ = b[a][0]["rotationZ"]
let positionY = b[a][0]["positionY"]
let gltf = b[a][0]["gltf"]
let canPurchase = true;

let animals = {
  Bear :[
    {chance:"20",cash:20}
  ],
  Deer : [
    {chance:"15",cash:21}
  ],
  Elephant : [
    {chance:"7",cash:24}
  ],
  Llama : [
    {chance:"33",cash:16.5}
  ],
  Wolf:[
    {chance:"25",cash:19}
  ]
}
AFRAME.registerComponent("animals", {
  init: function () {
    this.spawnAnimals();
  },
  getRandomNumber: function () {
    return Math.random();
  },
  spawnAnimals: function () {
    const totalAnimalCount = 100;
    let hasSpawned = false;

    setInterval(() => {
      if (!hasSpawned) {
        for (const animal in animals) {
          if (animals.hasOwnProperty(animal)) {
            var data = animals[animal][0];
            var chancePercentage = parseFloat(data.chance);

            const numberOfAnimals = Math.round((chancePercentage / 100) * totalAnimalCount);

            for (let i = 0; i < numberOfAnimals; i++) {
              console.log(`Spawning ${animal} ${i}`);
              function getRandomDirection() {
                const angle = Math.random() * Math.PI * 2;
                const velocity = 1;

                const deltaX = velocity * Math.cos(angle);
                const deltaZ = velocity * Math.sin(angle);

                return { deltaX, deltaZ };
              }

              const animalEntity = document.createElement("a-entity");
              const x = Math.random() * 420 - 210;
              const z = Math.random() * 430 - 215;
              animalEntity.setAttribute("id", `${animal}-${i}`);
              animalEntity.setAttribute("gltf-model", `#${animal}`);
              animalEntity.setAttribute("scale", { x: 0.04, y: 0.04, z: 0.09 });
              animalEntity.setAttribute("position", `${x} 1.4 ${z}`);

              animalEntity.setAttribute("dynamic-body", { mass: 0, shape: "box" });
              const scene = document.querySelector("#scene");
              scene.appendChild(animalEntity);            
              setAnimalVelocity();
              function setAnimalVelocity() {
                const { deltaX, deltaZ } = getRandomDirection();
                animalEntity.setAttribute("velocity", `${deltaX} 0 ${deltaZ}`);
              }
              const cameraRig = document.querySelector("#camera-rig")
              const camPos = cameraRig.getAttribute("position")

              const aniPos = animalEntity.getAttribute("position")

              this.camPosX = camPos.x
              this.camPosZ = camPos.z

              this.aniPosX = aniPos.x
              this.aniPosZ = aniPos.z

              console.log(this.camPosX,this.camPosZ)
              console.log(this.aniPosX,this.aniPosZ)          
            }
          }
        }
        hasSpawned = true;
      }
    }, 1000);
  }
});

AFRAME.registerComponent("gun",{
  init:function(){
    const a1 = a
    const gun1 = document.querySelector(`#${a1}`)
    gun1.setAttribute("visible",false)
    const gun = document.querySelector(`#${a}`)
    gun.setAttribute("visible",true)
    this.store()
    
  },
  store:function(){
    document.addEventListener("keypress",(e)=>{
      if(e.key==="K" || e.key==="k"){
        const storeText = document.querySelector("#store")
        storeText.setAttribute("visible",true)
        canPurchase=true
        document.addEventListener("keydown",(f)=>{
          if(f.key==="1" && currentCash >= 300 && canPurchase == true){
            const a1 = a
            const gun1 = document.querySelector(`#${a1}`)
            gun1.setAttribute("visible",false)
            console.log("Attempting to purchase MP5...");
            console.log("Current cash:", currentCash);
            a = "MP5";
            currentCash -= 300;
            const cashText = document.querySelector("#cash")
            cashText.setAttribute("text",{value:`${currentCash} $`})
            console.log("Updated current gun:", a);
            console.log("Remaining cash:", currentCash);
            storeText.setAttribute("visible", false);
            const gun = document.querySelector(`#MP5`)
            gun.setAttribute("visible",true)     
            bullets = b[a][0]["magSize"];
            interval = b[a][0]["interval"];
            automatic = b[a][0]["automatic"];
            totalBullets = b[a][0]["totalBullets"];       
            const magSizeText = document.querySelector("#magSizeText")
            const totalBulletsText = document.querySelector("#totalBulletsText")
            magSizeText.setAttribute("text",{value:`${bullets}`})
            totalBulletsText.setAttribute("text",{value:`${totalBullets}`})
            canPurchase=false
          }
          else if(f.key==="2" && currentCash >= 450 && canPurchase == true){
            const a1 = a
            const gun1 = document.querySelector(`#${a1}`)
            gun1.setAttribute("visible",false)
            console.log("Attempting to purchase ak47...");
            console.log("Current cash:", currentCash);
            a = "ak47";
            currentCash -= 450;
            const cashText = document.querySelector("#cash")
            cashText.setAttribute("text",{value:`${currentCash} $`})
            console.log("Updated current gun:", currentGun);
            console.log("Remaining cash:", currentCash);
            storeText.setAttribute("visible", false);
            const gun = document.querySelector(`#ak47`)
            gun.setAttribute("visible",true)
            bullets = b[a][0]["magSize"];
            interval = b[a][0]["interval"];
            automatic = b[a][0]["automatic"];
            totalBullets = b[a][0]["totalBullets"];  
            const magSizeText = document.querySelector("#magSizeText")
            const totalBulletsText = document.querySelector("#totalBulletsText")
            magSizeText.setAttribute("text",{value:`${bullets}`})
            totalBulletsText.setAttribute("text",{value:`${totalBullets}`})
            canPurchase=false
          }
          else if (f.key === "3" && currentCash >= 600 && canPurchase == true) {
            const a1 = a
            const gun1 = document.querySelector(`#${a1}`)
            gun1.setAttribute("visible",false)
            console.log("Attempting to purchase sniper rifle...");
            console.log("Current cash:", currentCash);
            a = "sniper";
            currentCash -= 600;
            const cashText = document.querySelector("#cash")
            cashText.setAttribute("text",{value:`${currentCash} $`})
            console.log("Updated current gun:", currentGun);
            console.log("Remaining cash:", currentCash);
            storeText.setAttribute("visible", false);
            const gun = document.querySelector(`#sniper`)
            gun.setAttribute("visible",true)
            bullets = b[a][0]["magSize"];
            interval = b[a][0]["interval"];
            automatic = b[a][0]["automatic"];
            totalBullets = b[a][0]["totalBullets"];  
            const magSizeText = document.querySelector("#magSizeText")
            const totalBulletsText = document.querySelector("#totalBulletsText")
            magSizeText.setAttribute("text",{value:`${bullets}`})
            totalBulletsText.setAttribute("text",{value:`${totalBullets}`})
            canPurchase=false
          }
        })
      }
    })
  }
})
AFRAME.registerComponent("shoot", {
  init: function () {
      console.log("loaded")
      this.playerEntity = document.querySelector("#camera-rig");
      const player = document.querySelector("#camera")
      // Issue is here, the proble is that when the bear collides in line number 243 the gameOverr is set true but the collision is not detected so it doesn't work
      // but at the same time when i manually set it to true in console, the if condition doesn't work
      player.addEventListener("collide",this.deathRow)
      const magSizeText = document.querySelector("#magSizeText")
      const totalBulletsText = document.querySelector("#totalBulletsText")
      magSizeText.setAttribute("text",{value:`${bullets}`})
      totalBulletsText.setAttribute("text",{value:`${totalBullets}`})
      this.shoot();
  },
  tick:function(){
    const player = document.querySelector("#hitbox")
    player.addEventListener("collide",this.deathRow)
    if(gameOverr){
      console.log("hit")
      currentCash = 0;
      a = "pistol";
      const gameOver = document.querySelector("#death");
      gameOver.setAttribute("visible", true);
      setTimeout(() => {
        gameOver.setAttribute("visible", false);
      }, 3000);
      gameOverr=false
    }
    const magSizeText = document.querySelector("#magSizeText")
    const totalBulletsText = document.querySelector("#totalBulletsText")
    magSizeText.setAttribute("text",{value:`${bullets}`})
    totalBulletsText.setAttribute("text",{value:`${totalBullets}`})
    const cashText = document.querySelector("#cash")
    cashText.setAttribute("text",{value:`${currentCash} $`})
  },
  deathRow: function (e) {
    const elementHit = e.detail.body.el
    console.log(elementHit)
    if (elementHit.id.includes("Bear")) {
      gameOverr = true
    }
  },
  
  shoot: function () {
    const clickHandler = () => {
      if (bullets > 0) {
        this.fireBullet();
        const magSizeText = document.querySelector("#magSizeText")
        const totalBulletsText = document.querySelector("#totalBulletsText")
        magSizeText.setAttribute("text",{value:`${bullets}`})
        totalBulletsText.setAttribute("text",{value:`${totalBullets}`})
        window.removeEventListener("click", clickHandler);
        setTimeout(() => {
          window.addEventListener("click", clickHandler);
        }, interval);
      } else {
        this.showReloadText();
      }
    };

    window.addEventListener("click", clickHandler);

    window.addEventListener("keydown", (e) => {
      if (e.key === "r" || e.key === "R") {
        this.reload();
        const magSizeText = document.querySelector("#magSizeText")
        const totalBulletsText = document.querySelector("#totalBulletsText")
        magSizeText.setAttribute("text",{value:`${bullets}`})
        totalBulletsText.setAttribute("text",{value:`${totalBullets}`})
      }
    });
  },
  fireBullet: function () {
    const bullet = document.createElement("a-entity");
    bullet.setAttribute("geometry", { primitive: "sphere", radius: 0.1 });
    bullet.setAttribute("material", "color", "black");

    const camera = document.querySelector("#camera").object3D;
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);

    const playerPosition = this.playerEntity.getAttribute("position");
    bullet.setAttribute("position", {
      x: playerPosition.x + -0.1 + direction.x * 1.5,
      y: playerPosition.y + 1.25 + direction.y * 1.5,
      z: playerPosition.z + direction.z * 1.5
    });

    bullet.setAttribute("velocity", direction.clone().multiplyScalar(-20));

    const scene = document.querySelector("#scene");
    bullet.setAttribute("dynamic-body", { mass: 0, shape: "sphere" });
    scene.appendChild(bullet);
    bullet.addEventListener("collide",this.collision)

    this.playSound();
    bullets -= 1;
    setTimeout(() => {
      this.shooting = false;
    }, interval);
  },
  collision:function(e){
    const scene = document.querySelector("#scene")
    const element = e.detail.target.el
    const elementHit = e.detail.body.el
    console.log("e")
    if(elementHit.id.includes("Bear")){
      bearhit+=1
      if(bearhit==1){
      const camera = document.querySelector("#camera").object3D;
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      speed = direction.multiplyScalar(20)
      elementHit.setAttribute("velocity",speed);
      setInterval(() => {
        const pos = elementHit.getAttribute("position")
        elementHit.setAttribute("position",{x:pos.x,y:1.3,z:pos.z})
      },1);
      console.log("1 hit!")
    }else if(bearhit==2){
      const camera = document.querySelector("#camera").object3D;
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      speed = direction.multiplyScalar(30)
      elementHit.setAttribute("velocity",speed);
      setInterval(() => {
        const pos = elementHit.getAttribute("position")
        elementHit.setAttribute("position",{x:pos.x,y:1.3,z:pos.z})
      },1);
      console.log("2 hit!")
    }else if(bearhit==3){
      currentCash += 20
      const cashText = document.querySelector("#cash")
      cashText.setAttribute("text",{value:`${currentCash} $`})
      scene.removeChild(element)
      scene.removeChild(elementHit)
      console.log("3 hit!")
      bearhit=0
    }
    }
    if(elementHit.id.includes("Llama")){
      currentCash += 16.5
      const cashText = document.querySelector("#cash")
      cashText.setAttribute("text",{value:`${currentCash} $`})
      element.removeEventListener("collide",this.collision)
      scene.removeChild(element)
      scene.removeChild(elementHit)
    }
    if(elementHit.id.includes("Elephant")){
      currentCash += 24
      const cashText = document.querySelector("#cash")
      cashText.setAttribute("text",{value:`${currentCash} $`})
      element.removeEventListener("collide",this.collision)
      scene.removeChild(element)
      scene.removeChild(elementHit)
    }
    if(elementHit.id.includes("Deer")){
      currentCash += 21
      const cashText = document.querySelector("#cash")
      cashText.setAttribute("text",{value:`${currentCash} $`})
      element.removeEventListener("collide",this.collision)
      scene.removeChild(element)
      scene.removeChild(elementHit)
    }
    if(elementHit.id.includes("Wolf")){
      currentCash += 19
      const cashText = document.querySelector("#cash")
      cashText.setAttribute("text",{value:`${currentCash} $`})
      element.removeEventListener("collide",this.collision)
      scene.removeChild(element)
      scene.removeChild(elementHit)
    }
  },
  playSound: function () {
    var entity = document.getElementById("sound1");
    if (entity && entity.components && entity.components.sound) {
      entity.components.sound.playSound();
    } else {
      console.error("Sound entity or sound component not found.");
    }
  },
  showReloadText: function () {
    this.reloadText = document.querySelector("#reloadText");
    this.reloadText.setAttribute("visible",true)
  },
  reload: function () {
    if (totalBullets > 0) {
      console.log("Reloading");
      const bullets2 = b[a][0]["magSize"] - bullets
      totalBullets -= bullets2;
      bullets = b[a][0]["magSize"];
      if(this.reloadText.getAttribute("visible",true)){
      this.reloadText.setAttribute("visible",false)
      }
    } else {
      console.log("You've lost, we reset your guns and money and filled your ammo and started over again");
      currentCash = 0;
      currentGun = "pistol";
      totalBullets = b[a][0]["totalBullets"];
      bullets = b[a][0]["magSize"];
      const magSizeText = document.querySelector("#magSizeText")
      const totalBulletsText = document.querySelector("#totalBulletsText")
      magSizeText.setAttribute("text",{value:`${bullets}`})
      totalBulletsText.setAttribute("text",{value:`${totalBullets}`})
    }
  },
});
