const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'src/assets/Images';
const outputDir = 'src/assets/Images/optimized';

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Image optimization settings
const optimizationSettings = {
  // For hero images (large display)
  hero: {
    width: 1920,
    height: 1080,
    quality: 85,
    format: 'webp'
  },
  // For carousel images
  carousel: {
    width: 1200,
    height: 800,
    quality: 80,
    format: 'webp'
  },
  // For gallery images
  gallery: {
    width: 800,
    height: 600,
    quality: 75,
    format: 'webp'
  },
  // For thumbnails
  thumbnail: {
    width: 300,
    height: 200,
    quality: 70,
    format: 'webp'
  }
};

async function optimizeImage(inputPath, outputPath, settings) {
  try {
    await sharp(inputPath)
      .resize(settings.width, settings.height, {
        fit: 'cover',
        position: 'center'
      })
      .toFormat(settings.format, { quality: settings.quality })
      .toFile(outputPath);
    
    const originalSize = fs.statSync(inputPath).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)} → ${path.basename(outputPath)} (${savings}% smaller)`);
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
  }
}

async function optimizeAllImages() {
  const files = fs.readdirSync(inputDir);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png|webp)$/i.test(file) && 
    !file.includes('optimized') &&
    !file.includes('logo') // Keep logo as is
  );

  console.log(`🚀 Optimizing ${imageFiles.length} images...\n`);

  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    const baseName = path.parse(file).name;
    
    // Determine optimization settings based on filename
    let settings;
    if (file.includes('hero') || file.includes('wedding1') || file.includes('wedding2')) {
      settings = optimizationSettings.hero;
    } else if (file.includes('wedding') || file.includes('corporate')) {
      settings = optimizationSettings.carousel;
    } else if (file.includes('interior')) {
      settings = optimizationSettings.gallery;
    } else {
      settings = optimizationSettings.thumbnail;
    }

    const outputPath = path.join(outputDir, `${baseName}.${settings.format}`);
    await optimizeImage(inputPath, outputPath, settings);
  }

  console.log('\n🎉 Image optimization complete!');
  console.log(`📁 Optimized images saved to: ${outputDir}`);
}

// Run optimization
optimizeAllImages().catch(console.error);
