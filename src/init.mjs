import { join } from 'path';
import { existsSync } from 'fs';
import { writeFile, mkdir } from 'fs/promises';
import moment from 'moment';
import { value as config } from './common/config.yaml.mjs';
import { value as packageJson } from './common/package.json.mjs';
import download from 'download-git-repo';

const app = ({
    version: '2.1.0',
    name: 'io.fewu.initWorkspace'
});

const POST_TEMPLATE =
    `---
title: Welcome to the Frendly Extensible Website Unifier.
date: ${moment().format('YYYY-MM-DD HH:mm:ss')}
tags: Tag
category: Articles
---
Here is excerpt.
<!--more-->`;

async function safeWriteFile(path, data) {
    if (existsSync(path)) return;
    else writeFile(path, data);
}

async function _remote() {
    if (existsSync(`themes/Next`)) return;
    let url = `github:0xarch/next-theme`;
    console.log(`Downloading default theme: Next<${url}>`);
    return new Promise((resolve) => {
        download(url, 'themes/Next', undefined, (err) => {
            safeWriteFile('./package.json',packageJson())
            resolve();
            console.log(`Default theme setup complete. Run \`npm i\`(checkout package.json first) or \`npm i -S @fortawesome/free-brands-svg-icons @material-symbols/svg-400\` to download dependencies for default theme.`);
        });
    })
}

async function _local() {
    const requiredDirectories = ['source/posts', 'source/drafts', 'public', 'themes'];
    for (let directory of requiredDirectories) {
        await mkdir(directory, { recursive: true });
    }
    safeWriteFile(join('source/posts', 'about.md'), POST_TEMPLATE);
    safeWriteFile(join('source/posts', 'template.md'), POST_TEMPLATE);
    safeWriteFile('./config.yaml', config());
    console.log(`Local initialization complete. Check source, public, themes folder and config.yaml.`);
}

export async function App() {
    console.info(`${app.name}, version ${app.version}`);
    await _local();
    await _remote();
    console.log(``);
}

export default App;