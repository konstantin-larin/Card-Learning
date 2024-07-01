import EditorJS from "@editorjs/editorjs";
import Image from "@editorjs/image";
import {ipcRenderer} from "electron";

const editor = new EditorJS({
    holder: "editor-container",
    tools: {
        image: {
            class: Image,
            config: {
                uploader: {
                    uploadByFile(file) {
                        return new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.onload = async (event) => {
                                const base64Data = event.target.result.split(',')[1]; // Извлекаем base64 данные
                                const fileName = `${Date.now()}-${file.name}`; // Уникальное имя файла

                                try {
                                    const filePath = await ipcRenderer.invoke('save-image', base64Data, fileName);
                                    resolve({
                                        success: 1,
                                        file: {
                                            url: filePath
                                        }
                                    });
                                } catch (error) {
                                    reject(new Error('Ошибка загрузки изображения'));
                                }
                            };
                            reader.readAsDataURL(file);
                        });
                    }
                }
            }
        }
    },
})
