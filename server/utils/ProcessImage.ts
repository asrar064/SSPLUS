const sharp = require("sharp");
const fs = require("fs");

const ProcessImage = async (name:string, base64Image:string) => {
  const buffer = Buffer.from(base64Image, "base64");

  const resizeImage = await sharp(buffer)
    .resize({ fit: "inside", width: 800, height: 800 })
    .png({ quality: 90 })
    .toBuffer();

  const png_format = `${`${name.replace(" ", "_")}` + Date.now() + ".png"}`;
  fs.writeFileSync(`./static/${png_format}`, resizeImage);
  return png_format;
};

export default ProcessImage;
