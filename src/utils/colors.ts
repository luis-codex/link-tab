// Función para convertir un color HEX a RGB
function hexToRgb(hex: string): [ number, number, number ] {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return [ r, g, b ];
}

// Función para convertir un color RGB a HEX
function rgbToHex(r: number, g: number, b: number): string {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Función para convertir un color RGB a pastel
function rgbToPastel(r: number, g: number, b: number): [ number, number, number ] {
    return [
        Math.round((r + 255) / 2),
        Math.round((g + 255) / 2),
        Math.round((b + 255) / 2)
    ];
}

// Colores originales en HEX
const colors: { [ key: string ]: string } = {
    blue: '#0000ff',
    cyan: '#00ffff',
    green: '#00ff00',
    grey: '#808080',
    orange: '#ffa500',
    pink: '#ffc0cb',
    purple: '#800080',
    red: '#ff0000',
    yellow: '#ffff00'
};

/**
 * Converts a color to its pastel version.
 * 
 * @param colorName - The name of the color to convert.
 * @returns The pastel version of the color.
 */
export function convertToPastel(colorName: string): string {
    if (!colors[ colorName ]) {
        return colorName;
    }

    const hex = colors[ colorName ];
    const [ r, g, b ] = hexToRgb(hex);
    const [ pr, pg, pb ] = rgbToPastel(r, g, b);

    return rgbToHex(pr, pg, pb);
}

// // Ejemplo de uso
// const colorNames = [ 'blue', 'cyan', 'green', 'grey', 'orange', 'pink', 'purple', 'red', 'yellow', 'unknown' ];
// const pastelColors: { [ key: string ]: string } = {};

// for (const colorName of colorNames) {
//     pastelColors[ colorName ] = convertToPastel(colorName);
// }

// console.log(pastelColors);
