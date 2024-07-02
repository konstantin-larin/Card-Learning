// нужен для изменения цветов
import "../vars.css"
const root = document.documentElement;
const colorMaker = {
    hexToRgb(hex) {
        // Удаляем символ #, если он присутствует
        hex = hex.replace(/^#/, '');

        // Если короткий формат (3 символа), преобразуем его в длинный формат (6 символов)
        if (hex.length === 3) {
            hex = hex.split('').map(char => char + char).join('');
        }

        // Получаем значения r, g и b
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        return {r, g, b};
    },
    _isColorDarker({r, g, b}){
        r /= 255;
        g /= 255;
        b /= 255;

        // Расчет яркости
        const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        console.log(brightness);
        // Порог, определяющий более темный цвет
        const threshold = 0.5;

        // Сравнение яркости с порогом
        return brightness < threshold;

    },
    darkColor: '#1c1a1a',
    lightColor: "#e4dff1",
    setBgColor(color){
        this.currentBgColor = color;
        root.style.setProperty('--bg-color', color);

        const rgbColor = color.startsWith('#') ? this.hexToRgb(color) : color;
        // Инвертируем цвет текста относительно цвета фона
        if(this._isColorDarker(rgbColor)){
            this.setTxtColor(this.lightColor)
        } else {
            this.setTxtColor(this.darkColor);
        }
    },
    setTxtColor(color){
        this.currentTxtColor = color;
        root.style.setProperty('--txt-color', color);
    }
}

colorMaker.setBgColor(colorMaker.lightColor);

export default  colorMaker;
