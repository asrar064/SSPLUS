const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ProcessImage = async (name: string, base64Image: string) => {
  try {
    const buffer = Buffer.from(base64Image, "base64");

    const resizeImage = await sharp(buffer)
      .resize({ fit: "inside", width: 800, height: 800 })
      .png({ quality: 90 })
      .toBuffer();

    const png_format = `${name.replace(" ", "_")}_${Date.now()}.png`;

    // Get the root directory of the project
    const staticDir = path.join(process.cwd(), "static");

    // Ensure the 'static' directory exists at the root of the project
    if (!fs.existsSync(staticDir)) {
      fs.mkdirSync(staticDir, { recursive: true });
    }

    // Save the resized image to the 'static' directory at the root
    const filePath = path.join(staticDir, png_format);
    fs.writeFileSync(filePath, resizeImage);

    return png_format;
  } catch (error) {
    console.error("Error processing image:", error);
    throw error; // Handle the error appropriately
  }
};

export default ProcessImage;
