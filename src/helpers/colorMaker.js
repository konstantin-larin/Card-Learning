// работает с переменными в vars.css
// нужен для изменения цветов
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

        // Рассчет яркости
        let brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        // Порог, определяющий более темный цвет
        let threshold = 0.5;

        // Сравнение яркости с порогом
        return brightness < threshold;

    },
    _darkColor: '#1c1a1a',
    _lightColor: "#e4dff1",
    setBgColor(color){
        this.currentBgColor = color;
        root.style.setProperty('--bg-color', color);


        if(this._isColorDarker(color)){
            this.setTxtColor(this._lightColor)
        } else this.setTxtColor(this._darkColor);
    },
    setTxtColor(color){
        this.currentTxtColor = color;
        root.style.setProperty('--txt-color', color);
    }
}

colorMaker.setBgColor(colorMaker._lightColor);

export default  colorMaker;
