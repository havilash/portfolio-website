const BAR_WIDTH = 10;

export class Bar {
  constructor(h) {
    this.h = h;
  }

  draw(ctx, canvas, i) {
    ctx.fillRect(i * BAR_WIDTH, canvas.height - this.h, BAR_WIDTH, this.h);
  }

  valueOf() {
    return this.h;
  }
}

export function generateBars(canvas, isRandom) {
  var genBars = [];
  var barHeights = [];
  var barAmt = canvas.width / BAR_WIDTH;
  var dh = canvas.height / barAmt; // height difference
  for (let i = 1; i < barAmt + 1; i++) {
    barHeights.push(i * dh);
  }
  for (let i = 0; i < barHeights.length; i++) {
    genBars.push(new Bar(barHeights[i]));
  }

  if (isRandom) genBars = genBars.sort(() => Math.random() - 0.5);

  return genBars;
}

export function readForm(form) {
  var elements = form.elements;
  var obj = {};
  for (var i = 0; i < elements.length; i++) {
    var item = elements.item(i);
    if (item.type != "submit" && item.name != "") obj[item.name] = item.value;
  }

  return obj;
}

export const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export function toUint8Array(binaryString) {
  const byteArray = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }
  return byteArray;
}

export function base64toObjectUrl(file) {
  console.log(file);
  const binaryData = atob(file); // to binary
  const byteArray = toUint8Array(binaryData);
  const blob = new Blob([byteArray], { type: "application/pdf" });
  return URL.createObjectURL(blob);
}
