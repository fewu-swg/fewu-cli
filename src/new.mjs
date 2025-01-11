import { writeFile, existsSync, statSync } from "fs";
import Argv from "./lib/argv.mjs";
import moment from "moment";


const app = ({
    version: '2.1.0',
    name: 'io.fewu.createNew'
});

export async function App() {
    console.info(`${app.name}, version ${app.version}`);

    let title, filePath, tags = [], categories = [];

    title = (Argv['main']).reverse()[1] ?? 'Untitled';
    filePath = (Argv['main']).reverse()[2];
    tags = Array.from  (Argv['-t'] ?? []).concat(...Array.from  (Argv['--tag'] ?? []));
    categories = Array.from  (Argv['-c'] ?? []).concat(...Array.from  (Argv['--category'] ?? []));

    const _moment = moment();

    const m_p = _moment.format('MM'),
        d_p = _moment.format('DD');

    let given_is_dir = false;
    if (existsSync(filePath)) {
        given_is_dir = statSync(filePath).isDirectory();
    }

    let path = 'source/posts/';
    if (!given_is_dir) path += filePath ?? `${title.toLowerCase().replace(/ /g, '-')}.${m_p}-${d_p}`;
    else path += filePath + '/' + `${title.toLowerCase().replace(/ /g, '-')}.${m_p}-${d_p}`;

    if (existsSync(path + '.md')) {
        let path_exist_jump = 1;
        while (existsSync(path + `(${path_exist_jump}).md`)) {
            path_exist_jump += 1;
        }
        path += `(${path_exist_jump}).md`;
    } else {
        path += '.md';
    }

    console.log(`A markdown file will be created at ${path}`);

    const text = `---
title: ${title}
date: ${_moment.format('YYYY-MM-DD HH:mm:ss')}
tags: ${tags}
category: ${categories}
---
¯\\_(ツ)_/¯
Write some excerpt here.
After the "more" tag is the content.
<!--more-->`;

    await writeFile(path, text, {}, () => { });
}

export default App;