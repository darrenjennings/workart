export function randomHexColor(): string {
  return "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
}

export function rgbToHex(r: string, g: string, b: string): string {
  const hex = (i: string) => {
    const hex = parseInt(i).toString(16);
    return hex.length == 1 ? `0${hex}` : hex;
  };
  return "#" + hex(r) + hex(g) + hex(b);
}
