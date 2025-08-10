let particles = [];
let lastSpawnTime = 0;
const spawnInterval = 200; // 200毫秒生成一个星星
let colorToggle = false; // 颜色交替开关

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("particles-container");
  noStroke();
  clear();
}

function draw() {
  clear();

  if (millis() - lastSpawnTime > spawnInterval) {
    colorToggle = !colorToggle; // 每次生成新星星，切换颜色
    particles.push(new Particle(mouseX, mouseY, colorToggle));
    lastSpawnTime = millis();
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isFinished()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor(x, y, isPink) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-0.3, 0.3), random(-0.3, 0.3));
    this.lifespan = 255;
    this.size = random(10, 25);
    this.isPink = isPink; // 粒子颜色由创建时决定
  }

  update() {
    this.pos.add(this.vel);
    this.lifespan -= 3;
  }

  display() {
    if (this.isPink) {
      fill(255, 100, 140, this.lifespan);
    } else {
      fill(255, 255, 255, this.lifespan);
    }

    push();
    translate(this.pos.x, this.pos.y);
    rotate(frameCount / 100.0);
    this.drawStar(0, 0, this.size / 2, this.size, 5);
    pop();
  }

  isFinished() {
    return this.lifespan < 0;
  }

  drawStar(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius2;
      let sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
}
