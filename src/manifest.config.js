const fs = require('fs');
const path = require('path');

const targetManifest = process.env.BROWSER_MODE || 'chrome';

const sourceManifestPath = `../public/manifests/manifest-${targetManifest}.json`;
const targetManifestPath = '../public/manifest.json';

try {
    const sourceManifestContent = fs.readFileSync(path.join(__dirname, sourceManifestPath), 'utf-8');

    fs.writeFileSync(path.join(__dirname, targetManifestPath), sourceManifestContent);

    console.log(`Manifest file '${sourceManifestPath}' copied to '${targetManifestPath}' successfully.`);
} catch (error) {
    console.error('Error copying manifest file:', error);
    process.exit(1);
}