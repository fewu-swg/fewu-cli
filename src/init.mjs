import { join } from 'path';
import { existsSync } from 'fs';
import { writeFile, mkdir } from 'fs/promises';
import { value as config } from './common/config.yaml.mjs';
import { value as packageJson } from './common/package.json.mjs';
import { value as postTemplate } from './common/template.mjs';

const app = ({
    version: '2.1.1',
    name: 'io.fewu.initWorkspace'
});

async function safeWriteFile(path, data) {
    if (existsSync(path)) return;
    else writeFile(path, data);
}

async function _local() {
    const requiredDirectories = ['source/posts', 'source/drafts', 'public', 'themes'];
    for (let directory of requiredDirectories) {
        await mkdir(directory, { recursive: true });
    }
    await safeWriteFile(join('source/posts', 'about.md'), postTemplate());
    await safeWriteFile(join('source/posts', 'template.md'), postTemplate());
    await safeWriteFile('./config.yaml', config());
    await safeWriteFile('./package.json', packageJson());
    console.log(`Local initialization complete. Check source, public, themes folder and config.yaml.`);
    console.log(`You can clone other themes into themes/, make sure the required dependencies are installed.`);
    console.log(`Run \`npm i\`(checkout package.json first) to ensure dependencies.`);
    console.log(`Run \`npx fewu --server\` after \`npm i\` to see the initial website.`);
}

export async function App() {
    console.info(`${app.name}, version ${app.version}`);
    await _local();
    // await _remote();
}

export default App;