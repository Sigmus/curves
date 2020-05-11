import p5 from "p5";
import data from "./data.json";

let allkeys = [];
let allanos = [];
let allmax = 0;
let contaanos = 0;
let hueinit = 180;
let huestep = 90;
let transparency = 40;

console.table(data);

for (let turma in data) {
  allanos[contaanos] = turma;
  contaanos++;

  for (let ks in data[turma]) {
    allkeys[ks] = ks;

    if (data[turma][ks] > allmax) {
      allmax = data[turma][ks];
    }
  }
}

let sketch = function (p) {
  p.setup = function () {
    p.colorMode(p.HSB, 255, 100, 100, 100);
    p.createCanvas(
      document.getElementById("meugraph").clientWidth,
      document.getElementById("meugraph").clientHeight
    );
    p.background(255, 0, 100, 100);
    p.rR = hueinit;
  };

  p.draw = function () {
    p.background(255, 0, 100, 100);
    p.translate(0, p.height);
    //p.stroke(255);
    //p.strokeWeight(0.5);
    // p.line(0,0,p.width,0);
    p.fator = ((p.height - 40) / allmax) * -1;

    p.breaks = (p.width - 150) / (Object.keys(data).length - 1);

    p.noStroke();

    for (let kk in allkeys) {
      p.rR = p.rR + huestep;
      if (p.rR > 360) {
        let dif = p.rR - 360;
        p.rR = dif;
      }

      p.fill(p.rR, 100, 50, transparency);
      p.beginShape();
      p.vertex(Object.keys(data).length * p.breaks, 0);
      p.vertex(Object.keys(data).length * p.breaks, 0);
      p.vertex(Object.keys(data).length * p.breaks, 150);
      p.vertex(Object.keys(data).length * p.breaks, 150);
      p.vertex(0, 150);
      p.vertex(0, 150);

      p.vertex(0, data[allanos[0]][allkeys[kk]] * p.fator);

      p.curveVertex(0, data[allanos[0]][allkeys[kk]] * p.fator);

      for (let ano = 0; ano < Object.keys(data).length; ano++) {
        p.curveVertex(
          ano * p.breaks,
          data[allanos[ano]][allkeys[kk]] * p.fator
        );
      }

      p.curveVertex(
        Object.keys(data).length * p.breaks,
        data[allanos[Object.keys(data).length - 1]][allkeys[kk]] * p.fator
      );

      p.vertex(Object.keys(data).length * p.breaks, 150);
      p.endShape();
    }

    p.fill(255, 0, 100, 100);
    p.rect(
      document.getElementById("meugraph").clientWidth - 150,
      -p.height,
      150,
      document.getElementById("meugraph").clientHeight
    );

    p.lastk = 0;
    for (let k = 0; k < Object.keys(data).length; k++) {
      p.fill(255, 0, 70, 100);
      p.textSize(10);
      p.text(allanos[k], p.breaks * k + 15, -p.height + 20);
      p.fill(255, 0, 70, 100);
      p.stroke(255, 0, 70, 100);
      p.strokeWeight(0.5);
      p.line(p.breaks * k, -p.height, p.breaks * k, -p.height + 100);
      p.noStroke();

      p.lastk = k;
    }

    for (let cat in data[allanos[p.lastk]]) {
      p.fill(255, 0, 50, 100);
      p.textSize(14);

      console.log(cat + " " + data[allanos[p.lastk]][cat] * p.fator);

      if (data[allanos[p.lastk]][cat] * p.fator < -16) {
        p.text(
          cat,
          document.getElementById("meugraph").clientWidth - 135,
          7 + data[allanos[p.lastk]][cat] * p.fator
        );
      } else {
        p.text(cat, document.getElementById("meugraph").clientWidth - 135, -10);
      }

      p.noFill();
    }

    p.noLoop();
  };

  p.windowResized = function () {
    p.resizeCanvas(
      document.getElementById("meugraph").clientWidth,
      document.getElementById("meugraph").clientHeight
    );
  };
};

let z = new p5(sketch, "meugraph");
