export interface LabelaryPreviewConfig {
  dpmm: number;
  widthInches: number;
  heightInches: number;
  index: number;
}

export function buildLabelaryPreviewUrl(zpl: string, config: LabelaryPreviewConfig): string {
  const { dpmm, widthInches, heightInches, index } = config;
  const encodedZpl = encodeURIComponent(zpl);

  return `http://api.labelary.com/v1/printers/${dpmm}dpmm/labels/${widthInches}x${heightInches}/${index}/${encodedZpl}`;
}
