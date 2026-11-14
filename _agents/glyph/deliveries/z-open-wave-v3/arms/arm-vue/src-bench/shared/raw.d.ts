// Vite ?raw imports type declaration (identical bytes in both arms)
declare module '*?raw' {
  const content: string;
  export default content;
}
