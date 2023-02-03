// 第一次部署
import { execSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const dirPath = dirname(fileURLToPath(import.meta.url));

const name = 'Hello';

function outExecSync(command, options = {}) {
    return execSync(command, {
        stdio: [0, 1, 2],
        ...options
    });
}

outExecSync(`pm2 start ${resolve(dirPath, '../bin/index.js')} --name ${name}`);
outExecSync(`pm2 save`);
