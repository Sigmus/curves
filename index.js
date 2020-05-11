import p5 from "p5";
import range from "lodash/range";

import data from "./data.json";

const hueinit = 180;
const huestep = 90;
const transparency = 40;

const allanos = Object.keys(data);

const totalanos = allanos.length;

const allmax = allanos.reduce(
  (acc, ano) => acc || Math.max(...Object.values(data[ano])),
  0
);

const allkeys = allanos.reduce((acc, ano) => {
  Object.keys(data[ano]).forEach((i) => {
    acc[i] = i;
  });
  return acc;
}, {});

const el = document.getElementById("meugraph");

const sketch = (p) => {
  p.setup = () => {
    p.colorMode(p.HSB, 255, 100, 100, 100);
    p.createCanvas(el.clientWidth, el.clientHeight);
    p.background(255, 0, 100, 100);
    p.rR = hueinit;
  };

  p.windowResized = () => {
    p.resizeCanvas(el.clientWidth, el.clientHeight);
  };

  p.draw = () => {
    p.background(255, 0, 100, 100);
    p.translate(0, p.height);
    p.fator = ((p.height - 40) / allmax) * -1;

    p.breaks = (p.width - 150) / (totalanos - 1);

    p.noStroke();

    Object.keys(allkeys).forEach((kk) => {
      p.rR = p.rR + huestep;
      if (p.rR > 360) {
        let dif = p.rR - 360;
        p.rR = dif;
      }

      p.fill(p.rR, 100, 50, transparency);
      p.beginShape();
      p.vertex(totalanos * p.breaks, 0);
      p.vertex(totalanos * p.breaks, 0);
      p.vertex(totalanos * p.breaks, 150);
      p.vertex(totalanos * p.breaks, 150);
      p.vertex(0, 150);
      p.vertex(0, 150);

      p.vertex(0, data[allanos[0]][allkeys[kk]] * p.fator);

      p.curveVertex(0, data[allanos[0]][allkeys[kk]] * p.fator);

      range(0, totalanos).map((ano) =>
        p.curveVertex(ano * p.breaks, data[allanos[ano]][allkeys[kk]] * p.fator)
      );

      p.curveVertex(
        totalanos * p.breaks,
        data[allanos[totalanos - 1]][allkeys[kk]] * p.fator
      );

      p.vertex(totalanos * p.breaks, 150);
      p.endShape();
    });

    p.fill(255, 0, 100, 100);
    p.rect(el.clientWidth - 150, -p.height, 150, el.clientHeight);

    p.lastk = 0;

    range(0, totalanos).forEach((k) => {
      p.fill(255, 0, 70, 100);
      p.textSize(10);
      p.text(allanos[k], p.breaks * k + 15, -p.height + 20);
      p.fill(255, 0, 70, 100);
      p.stroke(255, 0, 70, 100);
      p.strokeWeight(0.5);
      p.line(p.breaks * k, -p.height, p.breaks * k, -p.height + 100);
      p.noStroke();

      p.lastk = k;
    });

    Object.keys(data[allanos[p.lastk]]).forEach((cat) => {
      p.fill(255, 0, 50, 100);
      p.textSize(14);

      if (data[allanos[p.lastk]][cat] * p.fator < -16) {
        p.text(
          cat,
          el.clientWidth - 135,
          7 + data[allanos[p.lastk]][cat] * p.fator
        );
      } else {
        p.text(cat, el.clientWidth - 135, -10);
      }

      p.noFill();
    });

    p.noLoop();
  };
};

new p5(sketch, "meugraph");
