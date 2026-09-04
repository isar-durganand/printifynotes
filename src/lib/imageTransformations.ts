import type { TransformationSettings } from '@/types/printify';
import { DEFAULT_TRANSFORMATIONS } from '@/types/printify';

// Convolution kernel for edge enhancement (sharpening)
function applyConvolution(
  imageData: ImageData,
  kernel: number[],
  strength: number
): void {
  const data = imageData.data;
  const width = imageData.width;
  const height = imageData.height;
  const output = new Uint8ClampedArray(data);
  
  const kernelSize = 3;
  const half = Math.floor(kernelSize / 2);

  for (let y = half; y < height - half; y++) {
    for (let x = half; x < width - half; x++) {
      let rSum = 0, gSum = 0, bSum = 0;
      
      for (let ky = 0; ky < kernelSize; ky++) {
        for (let kx = 0; kx < kernelSize; kx++) {
          const px = x + kx - half;
          const py = y + ky - half;
          const idx = (py * width + px) * 4;
          const kVal = kernel[ky * kernelSize + kx];
          
          rSum += data[idx] * kVal;
          gSum += data[idx + 1] * kVal;
          bSum += data[idx + 2] * kVal;
        }
      }
      
      const idx = (y * width + x) * 4;
      // Blend original with sharpened based on strength
      output[idx] = data[idx] + (rSum - data[idx]) * strength;
      output[idx + 1] = data[idx + 1] + (gSum - data[idx + 1]) * strength;
      output[idx + 2] = data[idx + 2] + (bSum - data[idx + 2]) * strength;
    }
  }
  
  // Fast copy output back to data
  data.set(output);
}

export async function applyTransformations(
  imageDataUrl: string,
  settings: TransformationSettings = DEFAULT_TRANSFORMATIONS
): Promise<string> {
  const s = settings || DEFAULT_TRANSFORMATIONS;

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

      const brightnessFactor = (s.brightness ?? 100) / 100;
      const contrastVal = s.contrast ?? 100;
      const contrastFactor = (contrastVal / 100 - 0.5) * 2;
      const intercept = 128 * (1 - (1 + contrastFactor));

      // Process each pixel
      for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];

        // Invert colors
        if (s.invertColors) {
          r = 255 - r;
          g = 255 - g;
          b = 255 - b;
        }

        // Calculate luminance
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

        // Force white background (convert dark areas to white)
        if (s.forceWhiteBackground) {
          if (luminance > 240) {
            r = 255;
            g = 255;
            b = 255;
          } else if (luminance < 30) {
            r = Math.min(r, 20);
            g = Math.min(g, 20);
            b = Math.min(b, 20);
          }
        }

        // Apply brightness
        r = r * brightnessFactor;
        g = g * brightnessFactor;
        b = b * brightnessFactor;

        // Apply contrast
        r = r * (1 + contrastFactor) + intercept;
        g = g * (1 + contrastFactor) + intercept;
        b = b * (1 + contrastFactor) + intercept;

        // Grayscale
        if (s.grayscale) {
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

      // Apply edge enhancement (sharpening) if enabled
      if (s.edgeEnhancement && s.edgeEnhancement > 0) {
        const sharpenKernel = [
          0, -1, 0,
          -1, 5, -1,
          0, -1, 0
        ];
        const strength = s.edgeEnhancement / 100;
        applyConvolution(imageData, sharpenKernel, strength);
      }

      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL('image/jpeg', 0.85));
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = imageDataUrl;
  });
}

export function getTransformationPreview(
  imageDataUrl: string,
  settings: TransformationSettings = DEFAULT_TRANSFORMATIONS,
  maxSize: number = 200
): Promise<string> {
  const s = settings || DEFAULT_TRANSFORMATIONS;

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      try {
        // Create a smaller preview canvas directly
        const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(imageDataUrl);
          return;
        }

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Directly process pixels on the scaled canvas without redundant encoding/re-decoding
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        const brightnessFactor = (s.brightness ?? 100) / 100;
        const contrastVal = s.contrast ?? 100;
        const contrastFactor = (contrastVal / 100 - 0.5) * 2;
        const intercept = 128 * (1 - (1 + contrastFactor));

        for (let i = 0; i < data.length; i += 4) {
          let r = data[i];
          let g = data[i + 1];
          let b = data[i + 2];

          if (s.invertColors) {
            r = 255 - r;
            g = 255 - g;
            b = 255 - b;
          }

          const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

          if (s.forceWhiteBackground) {
            if (luminance > 240) {
              r = 255;
              g = 255;
              b = 255;
            } else if (luminance < 30) {
              r = Math.min(r, 20);
              g = Math.min(g, 20);
              b = Math.min(b, 20);
            }
          }

          r = r * brightnessFactor;
          g = g * brightnessFactor;
          b = b * brightnessFactor;

          r = r * (1 + contrastFactor) + intercept;
          g = g * (1 + contrastFactor) + intercept;
          b = b * (1 + contrastFactor) + intercept;

          if (s.grayscale) {
            const gray = 0.299 * r + 0.587 * g + 0.114 * b;
            r = gray;
            g = gray;
            b = gray;
          }

          data[i] = Math.max(0, Math.min(255, r));
          data[i + 1] = Math.max(0, Math.min(255, g));
          data[i + 2] = Math.max(0, Math.min(255, b));
        }

        if (s.edgeEnhancement && s.edgeEnhancement > 0) {
          const sharpenKernel = [
            0, -1, 0,
            -1, 5, -1,
            0, -1, 0
          ];
          const strength = s.edgeEnhancement / 100;
          applyConvolution(imageData, sharpenKernel, strength);
        }

        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL('image/jpeg', 0.75));
      } catch (e) {
        resolve(imageDataUrl);
      }
    };
    img.onerror = () => resolve(imageDataUrl);
    img.src = imageDataUrl;
  });
}
