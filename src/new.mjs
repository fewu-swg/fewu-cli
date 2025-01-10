import { writeFile, existsSync, statSync } from "fs";
import Argv from "./lib/argv.mjs";
import moment from "moment";

const app = ({
    version: '2.0.1',
    name: 'io.fewu.createNew'
});

export async function App() {
    console.info(`${app.name}, version ${app.version}`);

    const title = (Argv['--new']).reverse()[0];
    const file_location = (Argv['--new']).reverse()[1];
    const tags = Array.from < string > (Argv['-t'] ?? []).concat(...Array.from < string > (Argv['--tag'] ?? []));
    const categories = Array.from < string > (Argv['-c'] ?? []).concat(...Array.from < string > (Argv['--category'] ?? []));

    const date = new Date();
    const _moment = moment();

    const y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate();

    const m_p = m.toString().padStart(2, '0'),
        d_p = d.toString().padStart(2, '0');

    let given_is_dir = false;
    if (existsSync(file_location)) {
        given_is_dir = statSync(file_location).isDirectory();
    }

    let path = 'posts/';
    if (!given_is_dir) path += file_location ?? `${title.toLowerCase().replace(/ /g, '-')}.${m_p}-${d_p}`;
    else path += file_location + '/' + `${title.toLowerCase().replace(/ /g, '-')}.${m_p}-${d_p}`;

    if (existsSync(path)) {
        let path_exist_jump = 0;
        while (existsSync(path + path_exist_jump + '.md')) {
            path_exist_jump += 1;
        }
        path = path.replace(/([\s\S]*)\.(.*?)$/, `$1_${path_exist_jump}.md`);
    }

    console.log(path);

    const text = `---
title: ${title}
date: ${_moment.format('YYYY-MM-DD HH:mm:ss')}
tags: ${tags}
category: ${categories}
---
¯\\_(ツ)_/¯
Write some FOREWORDS here.
After the "more" tag is the content.
<!--more-->`;

    writeFile(path, text, {}, () => { });
}

export default App;