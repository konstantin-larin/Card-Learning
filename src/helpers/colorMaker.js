// нужен для изменения цветов
import "../vars.css"

const root = document.documentElement;
const colorMaker = {
    darkColor: '#1c1a1a',
    lightColor: "#FFF",

    _isColorDarker({r, g, b}) {
        r /= 255;
        g /= 255;
        b /= 255;

        // Расчет яркости
        const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        // Порог, определяющий более темный цвет
        const threshold = 0.5;

        // Сравнение яркости с порогом
        return brightness < threshold;

    },


    hexToRGB(hex) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },
// Функция для конвертации HEX в HSL
    hexToHSL(H) {
        // Убираем # если присутствует
        let r = 0, g = 0, b = 0;
        if (H.length == 4) {
            r = "0x" + H[1] + H[1];
            g = "0x" + H[2] + H[2];
            b = "0x" + H[3] + H[3];
        } else if (H.length == 7) {
            r = "0x" + H[1] + H[2];
            g = "0x" + H[3] + H[4];
            b = "0x" + H[5] + H[6];
        }
        r /= 255;
        g /= 255;
        b /= 255;
        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;

        if (delta == 0)
            h = 0;
        else if (cmax == r)
            h = ((g - b) / delta) % 6;
        else if (cmax == g)
            h = (b - r) / delta + 2;
        else
            h = (r - g) / delta + 4;

        h = Math.round(h * 60);

        if (h < 0)
            h += 360;

        l = (cmax + cmin) / 2;
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        return [h, s, l];
    },

// Функция для конвертации HSL в HEX
    hslToHex(h, s, l) {
        s /= 100;
        l /= 100;

        let c = (1 - Math.abs(2 * l - 1)) * s,
            x = c * (1 - Math.abs((h / 60) % 2 - 1)),
            m = l - c / 2,
            r = 0,
            g = 0,
            b = 0;

        if (0 <= h && h < 60) {
            r = c;
            g = x;
            b = 0;
        } else if (60 <= h && h < 120) {
            r = x;
            g = c;
            b = 0;
        } else if (120 <= h && h < 180) {
            r = 0;
            g = c;
            b = x;
        } else if (180 <= h && h < 240) {
            r = 0;
            g = x;
            b = c;
        } else if (240 <= h && h < 300) {
            r = x;
            g = 0;
            b = c;
        } else if (300 <= h && h < 360) {
            r = c;
            g = 0;
            b = x;
        }

        r = Math.round((r + m) * 255).toString(16);
        g = Math.round((g + m) * 255).toString(16);
        b = Math.round((b + m) * 255).toString(16);

        if (r.length == 1)
            r = "0" + r;
        if (g.length == 1)
            g = "0" + g;
        if (b.length == 1)
            b = "0" + b;

        return "#" + r + g + b;
    },

// Функция для нахождения третьего цвета
    findThirdColor(color1, color2) {
        let hsl1 = this.hexToHSL(color1);
        let hsl2 = this.hexToHSL(color2);

        // Среднее значение угла
        let h3 = (hsl1[0] + hsl2[0] + 240) % 360;
        let s3 = (hsl1[1] + hsl2[1]) / 2;
        let l3 = (hsl1[2] + hsl2[2]) / 2;

        return this.hslToHex(h3, s3, l3);
    },

    setBgColor(color) {
        this.currentBgColor = color;
        root.style.setProperty('--bg-color', color);

        const rgbColor = color.startsWith('#') ? this.hexToRGB(color) : color;
        // Инвертируем цвет текста относительно цвета фона
        if (this._isColorDarker(rgbColor)) {
            this.setTxtColor(this.lightColor)
        } else {
            this.setTxtColor(this.darkColor);
        }
    },

    setTxtColor(color) {
        this.currentTxtColor = color;
        root.style.setProperty('--txt-color', color);
        const thirdColor = this.findThirdColor(this.currentTxtColor, this.currentBgColor);
        this.setCardsColor(thirdColor);
    },

    setCardsColor(color) {
        this.currentCardsColor = color;
        root.style.setProperty('--cards-color', color);
    }
}

colorMaker.setBgColor(colorMaker.lightColor);

export default colorMaker;
