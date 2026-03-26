declare module "*.css" {}
declare module "mini-svg-data-uri" {
  function svgToDataUri(svg: string): string;
  export default svgToDataUri;
}
