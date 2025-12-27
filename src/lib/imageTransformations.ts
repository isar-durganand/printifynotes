import type { TransformationSettings } from '@/types/printify';

export async function applyTransformations(
  imageDataUrl: string,
  settings: TransformationSettings
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;

      // Draw original image
      ctx.drawImage(img, 0, 0);

      // Get image data for pixel manipulation
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Process each pixel
      for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];

        // Invert colors
        if (settings.invertColors) {
          r = 255 - r;
          g = 255 - g;
          b = 255 - b;
        }

        // Calculate luminance
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

        // Force white background (convert dark areas to white)
        if (settings.forceWhiteBackground) {
          // If the pixel is close to white after inversion (was dark before), make it pure white
          if (luminance > 240) {
            r = 255;
            g = 255;
            b = 255;
          }
          // If it's very dark after inversion (was very light before, like text), make it darker
          if (luminance < 30) {
            r = Math.min(r, 20);
            g = Math.min(g, 20);
            b = Math.min(b, 20);
          }
        }

        // Apply brightness
        const brightnessFactor = settings.brightness / 100;
        r = r * brightnessFactor;
        g = g * brightnessFactor;
        b = b * brightnessFactor;

        // Apply contrast
        const contrastFactor = (settings.contrast / 100 - 0.5) * 2;
        const intercept = 128 * (1 - (1 + contrastFactor));
        r = r * (1 + contrastFactor) + intercept;
        g = g * (1 + contrastFactor) + intercept;
        b = b * (1 + contrastFactor) + intercept;

        // Grayscale
        if (settings.grayscale) {
          const gray = 0.299 * r + 0.587 * g + 0.114 * b;
          r = gray;
          g = gray;
          b = gray;
        }

        // Clamp values
        data[i] = Math.max(0, Math.min(255, r));
        data[i + 1] = Math.max(0, Math.min(255, g));
        data[i + 2] = Math.max(0, Math.min(255, b));
      }

      ctx.putImageData(imageData, 0, 0);
      // Use JPEG with 85% quality for much smaller file size
      resolve(canvas.toDataURL('image/jpeg', 0.85));
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = imageDataUrl;
  });
}

export function getTransformationPreview(
  imageDataUrl: string,
  settings: TransformationSettings,
  maxSize: number = 200
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = async () => {
      // Create a smaller preview for performance
      const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
      const canvas = document.createElement('canvas');
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const previewDataUrl = canvas.toDataURL('image/jpeg', 0.7);
      
      try {
        const transformed = await applyTransformations(previewDataUrl, settings);
        resolve(transformed);
      } catch (error) {
        reject(error);
      }
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = imageDataUrl;
  });
}
