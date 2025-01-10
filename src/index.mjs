#!/usr/bin/env node

import App from 'fewu';

async function navigation(){
    let executing_task = App;
    if(process.argv.includes('--new') || process.argv.includes('-n')){
        executing_task = (await import("./new.mjs")).default;
    } else if (process.argv.includes('--init')) {
        executing_task = (await import("./init.mjs")).default;
    } else if (process.argv.includes('--help') || process.argv.includes('-h')) {
        executing_task = (await import("./help.mjs")).default;
    }
    executing_task();
}

navigation();