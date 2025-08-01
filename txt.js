const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'txt'); // Zmień jeśli inny folder
const outputFile = path.join(__dirname, 'merged.txt');    // Opcjonalny plik wyjściowy

fs.readdir(folderPath, (err, files) => {
    if (err) return console.error('Błąd odczytu katalogu:', err);

    const txtFiles = files.filter(file => file.endsWith('.txt'));
    const merged = [];

    txtFiles.forEach((file, index) => {
        const fullPath = path.join(folderPath, file);
        const content = fs.readFileSync(fullPath, 'utf8');
        merged.push(content.trim());

        if (index < txtFiles.length - 1) {
            merged.push('\n---\n');
        }
    });

    const finalOutput = merged.join('');

    // Zapis do pliku (opcjonalnie)
    fs.writeFileSync(outputFile, finalOutput, 'utf8');
    console.log('Zawartość połączona i zapisana do:', outputFile);
});
