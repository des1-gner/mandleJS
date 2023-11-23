let minSlider, maxSlider;

function setup() {
  createCanvas(800, 800);
  pixelDensity(1);
  background(0);

  minSlider = document.getElementById('minSlider');
  maxSlider = document.getElementById('maxSlider');
  
  minSlider.addEventListener('input', drawMandelbrot);
  maxSlider.addEventListener('input', drawMandelbrot);

  drawMandelbrot();
}

function drawMandelbrot() {
  loadPixels();
  let minVal = parseFloat(minSlider.value);
  let maxVal = parseFloat(maxSlider.value);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let a = map(x, 0, width, minVal, maxVal);
      let b = map(y, 0, height, minVal, maxVal);

      let ca = a;
      let cb = b;

      let n = 0;
      let z = 0;

      while (n < 100) {
        let aa = a * a - b * b;
        let bb = 2 * a * b;

        a = aa + ca;
        b = bb + cb;

        if (abs(a + b) > 16) {
          break;
        }

        n++;
      }

      let brightness = map(n, 0, 100, 0, 1);
      brightness = map(sqrt(brightness), 0, 1, 0, 255);

      if (n === 100) {
        brightness = 0;
      }

      let pix = (x + y * width) * 4;
      pixels[pix + 0] = brightness;
      pixels[pix + 1] = brightness;
      pixels[pix + 2] = brightness;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();
}
