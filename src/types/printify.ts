export interface PageData {
  id: string;
  pageNumber: number;
  originalImage: string; // Base64 data URL
  transformedImage?: string; // Base64 data URL after transformations
  isSelected: boolean;
  width: number;
  height: number;
}

export interface TransformationSettings {
  invertColors: boolean;
  forceWhiteBackground: boolean;
  brightness: number; // 0-200, 100 is default
  contrast: number; // 0-200, 100 is default
  grayscale: boolean;
}

export interface CombineSettings {
  pagesPerSheet: 1 | 2 | 3 | 4;
  orientation: 'portrait' | 'landscape';
  marginSize: 'small' | 'medium' | 'large';
  spacing: 'none' | 'small' | 'medium';
}

export interface AppState {
  step: 'upload' | 'select' | 'transform' | 'export';
  pages: PageData[];
  transformations: TransformationSettings;
  combineSettings: CombineSettings;
  isProcessing: boolean;
  processingProgress: number;
  processingMessage: string;
}

export const DEFAULT_TRANSFORMATIONS: TransformationSettings = {
  invertColors: true,
  forceWhiteBackground: true,
  brightness: 100,
  contrast: 110,
  grayscale: false,
};

export const DEFAULT_COMBINE_SETTINGS: CombineSettings = {
  pagesPerSheet: 1,
  orientation: 'portrait',
  marginSize: 'medium',
  spacing: 'small',
};
