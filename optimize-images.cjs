const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = [
  'IMG_0201.jpeg',
  'IMG_0202.jpeg',
  'IMG_0206.jpeg',
  'IMG_0254.jpeg',
  'IMG_0255.jpeg',
  'IMG_0256.jpeg',
  'IMG_0257.jpeg',
  'outside.jpg',
  'LOGOIS.png'
];

async function optimizeImages() {
  for (const img of images) {
    const inputPath = path.join(__dirname, img);
    const outputPath = path.join(__dirname, img.split('.')[0] + '.webp');
    
    if (fs.existsSync(inputPath)) {
      console.log(`Optimizing ${img}...`);
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      console.log(`Saved to ${outputPath}`);
    } else {
      console.log(`File not found: ${img}`);
    }
  }
}

optimizeImages().catch(console.error);
