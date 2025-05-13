import { existsSync } from "fs";
import { readFile } from "fs/promises";
import moment from "moment";
import { dirname, join } from "path";

export const value = _ => `---
title: Welcome to the Frendly Extensible Website Utility.
date: ${moment().format('YYYY-MM-DD HH:mm:ss')}
tags:
    - Fewu
    - Guide
category: Articles
---
Write something here as excerpt.
<!--more-->
We have \`about.md\` as your personal introduction.
`;

// guide content

const time_now = moment().format('YYYY-MM-DD HH:mm:ss');

let cn_guide_path = join(import.meta.dirname,'guide.zh-CN.md');

let en_guide_path = join(import.meta.dirname,'guide.en.md');

let cn_guide_content = (await readFile(cn_guide_path)).toString();

let en_guide_content = (await readFile(en_guide_path)).toString();

let cn_front_matter = `---\ntitle: 快速入门\ndate: ${time_now} \ntags:\n    - Fewu\n    - Guide\ncategory: Guides\nlanguage: zh-CN\n---`;

let en_front_matter = `---\ntitle: Quickstart\ndate: ${time_now} \ntags:\n    - Fewu\n    - Guide\ncategory: Guides\nlanguage: en\n---`;

export
    const guide_content = {
        cn: `${cn_front_matter}\n${cn_guide_content}`,
        en: `${en_front_matter}\n${en_guide_content}`
    }
