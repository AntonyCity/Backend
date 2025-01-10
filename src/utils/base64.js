import fs from 'fs';

async function ToBase64(path) {
    try {
        // Read the file as binary data
        const file = fs.readFileSync(path);
        // Convert the binary data to a base64 string
        const base64 = file.toString('base64');
        return base64;
    } catch (error) {
        console.error("Error converting image to base64:", error);
        return null;
    }
}

export { ToBase64 };