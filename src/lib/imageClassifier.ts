// AI Image Classification Simulation
// Classifies images based on file characteristics since we can't do real AI analysis client-side

export interface ClassificationResult {
  category: string;
  riskLevel: "Safe" | "Moderate Risk" | "High Privacy Risk" | "Explicit Risk";
  flagStatus: "Flagged" | "Not Flagged";
}

export function classifyImage(file: File, imageUrl: string): Promise<ClassificationResult> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve({ category: "Normal Selfie", riskLevel: "Safe", flagStatus: "Not Flagged" });
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Analyze image characteristics
      const imageData = ctx.getImageData(0, 0, Math.min(canvas.width, 200), Math.min(canvas.height, 200));
      const pixels = imageData.data;

      let skinTonePixels = 0;
      let totalPixels = pixels.length / 4;
      let avgBrightness = 0;
      let redDominance = 0;
      let hasHighContrast = false;
      let edgeCount = 0;

      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const brightness = (r + g + b) / 3;
        avgBrightness += brightness;

        // Skin tone detection (simplified)
        if (r > 95 && g > 40 && b > 20 && r > g && r > b && Math.abs(r - g) > 15 && r - b > 15) {
          skinTonePixels++;
        }

        if (r > g + 30 && r > b + 30) redDominance++;
      }

      avgBrightness /= totalPixels;
      const skinRatio = skinTonePixels / totalPixels;
      const redRatio = redDominance / totalPixels;

      // Check for diagram/educational content characteristics
      const fileName = file.name.toLowerCase();
      const isDiagram = fileName.includes("diagram") || fileName.includes("chart") ||
        fileName.includes("cyber") || fileName.includes("kill") || fileName.includes("edu") ||
        fileName.includes("flow") || fileName.includes("arch") || fileName.includes("network");

      // Check for blurred content
      let blurScore = 0;
      for (let y = 1; y < Math.min(canvas.height, 200) - 1; y++) {
        for (let x = 1; x < Math.min(canvas.width, 200) - 1; x++) {
          const idx = (y * Math.min(canvas.width, 200) + x) * 4;
          const idxRight = (y * Math.min(canvas.width, 200) + x + 1) * 4;
          const diff = Math.abs(pixels[idx] - pixels[idxRight]);
          if (diff > 30) edgeCount++;
        }
      }
      const edgeRatio = edgeCount / totalPixels;
      const isBlurry = edgeRatio < 0.05;

      // Classification logic based on the rules table
      const hasFace = skinRatio > 0.15; // Approximate face detection via skin tone ratio
      const hasExplicitIndicators = skinRatio > 0.45 && redRatio > 0.1;
      const hasSuggestiveIndicators = skinRatio > 0.35 && isBlurry;

      let result: ClassificationResult;

      if (isDiagram || (skinRatio < 0.05 && !hasExplicitIndicators)) {
        // No face + Safe content = Diagram / Educational
        result = { category: "Diagram / Educational", riskLevel: "Safe", flagStatus: "Not Flagged" };
      } else if (hasFace && hasExplicitIndicators) {
        // Face detected + Explicit content = Face + Explicit Content
        result = { category: "Face + Explicit Content", riskLevel: "High Privacy Risk", flagStatus: "Flagged" };
      } else if (hasFace && hasSuggestiveIndicators) {
        // Face detected + Suggestive content = Blurred / Censored Explicit
        result = { category: "Blurred / Censored Explicit", riskLevel: "Moderate Risk", flagStatus: "Flagged" };
      } else if (!hasFace && hasExplicitIndicators) {
        // No face + Explicit content = Explicit without Face
        result = { category: "Explicit without Face", riskLevel: "Explicit Risk", flagStatus: "Flagged" };
      } else if (hasFace) {
        // Face detected + Safe content = Normal Selfie
        result = { category: "Normal Selfie", riskLevel: "Safe", flagStatus: "Not Flagged" };
      } else {
        // Default safe
        result = { category: "Diagram / Educational", riskLevel: "Safe", flagStatus: "Not Flagged" };
      }

      resolve(result);
    };
    img.onerror = () => {
      resolve({ category: "Normal Selfie", riskLevel: "Safe", flagStatus: "Not Flagged" });
    };
    img.src = imageUrl;
  });
}

// Simulate reverse image search
export interface MisuseResult {
  detected: boolean;
  url?: string;
  dateDetected?: string;
  severity?: string;
}

export function simulateReverseImageSearch(): Promise<MisuseResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 20% chance of detecting misuse for demo
      const detected = Math.random() < 0.2;
      if (detected) {
        const sites = [
          "https://suspicious-site.example.com/gallery/stolen-image",
          "https://fake-dating.example.com/profiles/fake123",
          "https://scam-social.example.com/user/impersonator",
        ];
        resolve({
          detected: true,
          url: sites[Math.floor(Math.random() * sites.length)],
          dateDetected: new Date().toISOString(),
          severity: Math.random() > 0.5 ? "High" : "Medium",
        });
      } else {
        resolve({ detected: false });
      }
    }, 2000);
  });
}
