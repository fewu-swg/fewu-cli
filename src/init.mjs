import { join } from 'path';
import { existsSync } from 'fs';
import { writeFile, mkdir, readFile } from 'fs/promises';
import { value as config } from './common/config.yaml.mjs';
import { guide_content, value as postTemplate } from './common/template.mjs';

const app = ({
    version: '2.1.1',
    name: 'io.fewu.initWorkspace'
});

async function safeWriteFile(path, data) {
    if (existsSync(path)) return;
    else await writeFile(path, data);
}

async function _package_json(){
    const dependencies = {
        "@fewu-swg/fewu-renderer-markdown": "^1.2.2",
        "@fewu-swg/fewu-theme-next": "^1.1.1",
        "@fewu-swg/fewu-basic-improvements": "^1.0.0"
    };
    const package_json_path = join(process.cwd(),"package.json");
    let target_package_json = {
        dependencies: {}
    };
    if(existsSync(package_json_path)){
        let current_package_json = JSON.parse((await readFile(package_json_path)).toString());
        target_package_json = current_package_json;
    }
    target_package_json.dependencies = {
        ...target_package_json.dependencies,
        ...dependencies
    };
    await writeFile(package_json_path,JSON.stringify(target_package_json,void 0,4));
}

async function _local() {
    const requiredDirectories = ['source/posts/guide', 'source/drafts', 'public', 'themes'];
    for (let directory of requiredDirectories) {
        await mkdir(directory, { recursive: true });
    }
    await Promise.all([
        safeWriteFile(join('source/posts', 'about.md'), postTemplate()),
        safeWriteFile(join('source/posts/guide', 'guide.zh-CN.md'), guide_content.cn),
        safeWriteFile(join('source/posts/guide', 'guide.en-US.md'), guide_content.en),
        safeWriteFile('./config.yaml', config()),
        // safeWriteFile('./package.json', packageJson()),
        _package_json()
    ]);
    console.log(`Local initialization complete. Check source, public, themes folder and config.yaml.`);
    console.log(`You can clone other themes into themes/, make sure the required dependencies are installed.`);
    console.log(`Run \`pnpm i\`(checkout package.json first) to ensure dependencies.`);
    console.log(`Run \`pnpm fewu --server\` after \`pnpm i\` to see the initial website.`);
}

export async function App() {
    console.info(`${app.name}, version ${app.version}`);
    await _local();
    // await _remote();
}

export default App;