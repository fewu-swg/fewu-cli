#!/usr/bin/env node

async function App() {
    let executing_task;
    const operationArg = process.argv[2];
    if (operationArg === 'new') {
        executing_task = (await import("./new.mjs")).App;
    } else if (operationArg === 'init') {
        executing_task = (await import("./init.mjs")).App;
    } else if (process.argv.includes('--help')) {
        executing_task = (await import("./help.mjs")).App;
    } else {
        executing_task = (await import("fewu")).App;
    }
    await executing_task();
}

App();