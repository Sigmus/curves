import p5 from "p5";
import range from "lodash/range";

export default ({
  data,
  el,
  hueinit = 180,
  huestep = 90,
  transparency = 40,
}) => {
  const cols = Object.keys(data);

  const allProps = Object.keys(Object.values(data)[0]);

  const maxPropVal = cols.reduce(
    (acc, ano) => acc || Math.max(...Object.values(data[ano])),
    0
  );

  const sketch = (p) => {
    p.setup = () => {
      p.colorMode(p.HSB, 255, 100, 100, 100);
      p.createCanvas(el.clientWidth, el.clientHeight);
      p.background(255, 0, 100, 100);
    };

    p.windowResized = () => {
      p.resizeCanvas(el.clientWidth, el.clientHeight);
    };

    p.draw = () => {
      let rP = hueinit;
      const fator = ((p.height - 40) / maxPropVal) * -1;
      const breaks = (p.width - 150) / (cols.length - 1);

      p.background(255, 0, 100, 100);
      p.translate(0, p.height);
      p.noStroke();

      allProps.forEach((props) => {
        rP = rP + huestep;
        if (rP > 360) {
          rP = rP - 360;
        }

        p.fill(rP, 100, 50, transparency);
        p.beginShape();
        p.vertex(cols.length * breaks, 0);
        p.vertex(cols.length * breaks, 0);
        p.vertex(cols.length * breaks, 150);
        p.vertex(cols.length * breaks, 150);
        p.vertex(0, 150);
        p.vertex(0, 150);

        p.vertex(0, data[cols[0]][props] * fator);
        p.curveVertex(0, data[cols[0]][props] * fator);

        range(0, cols.length).forEach((colIndex) =>
          p.curveVertex(colIndex * breaks, data[cols[colIndex]][props] * fator)
        );

        p.curveVertex(
          cols.length * breaks,
          data[cols[cols.length - 1]][props] * fator
        );

        p.vertex(cols.length * breaks, 150);
        p.endShape();
      });

      p.fill(255, 0, 100, 100);
      p.rect(el.clientWidth - 150, -p.height, 150, el.clientHeight);

      range(0, cols.length).forEach((colIndex) => {
        p.fill(255, 0, 70, 100);
        p.textSize(10);
        p.text(cols[colIndex], breaks * colIndex + 15, -p.height + 20);
        p.fill(255, 0, 70, 100);
        p.stroke(255, 0, 70, 100);
        p.strokeWeight(0.5);
        p.line(
          breaks * colIndex,
          -p.height,
          breaks * colIndex,
          -p.height + 100
        );
        p.noStroke();
      });

      allProps.forEach((prop) => {
        p.fill(255, 0, 50, 100);
        p.textSize(14);

        const val = data[cols[cols.length - 1]][prop];
        val * fator < -16
          ? p.text(prop, el.clientWidth - 135, 7 + val * fator)
          : p.text(prop, el.clientWidth - 135, -10);

        p.noFill();
      });

      p.noLoop();
    };
  };

  new p5(sketch, el);
};
