#!/usr/bin/env node

async function App() {
    let executing_task;
    if (process.argv.some(v => v === 'new')) {
        executing_task = (await import("./new.mjs")).App;
    } else if (process.argv.includes("init") || process.argv.includes("--init")) {
        executing_task = (await import("./init.mjs")).App;
    } else if (process.argv.includes("help") || process.argv.includes("--help")) {
        executing_task = (await import("./help.mjs")).App;
    } else {
        executing_task = (await import("@fewu-swg/fewu")).App;
    }
    await executing_task();
}

App();