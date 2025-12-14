const { spawn } = require('child_process');
const path = require('path');

function runCommand(command, args, cwd = process.cwd(), env = process.env) {
    return new Promise((resolve, reject) => {
        console.log(`Running: ${command} ${args.join(' ')} in ${cwd}`);
        const proc = spawn(command, args, {
            cwd,
            stdio: 'inherit',
            env,
            shell: true
        });

        proc.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Command failed with code ${code}`));
            }
        });
    });
}

async function build() {
    try {
        const rootDir = path.resolve(__dirname, '..');
        const frontendDir = path.join(rootDir, 'frontend');
        const backendDir = path.join(rootDir, 'backend');

        // Increase memory limit for all Node processes spawned
        const buildEnv = {
            ...process.env,
            NODE_OPTIONS: '--max-old-space-size=4096'
        };

        console.log('--- Installing Frontend Dependencies ---');
        await runCommand('npm', ['install', '--production=false', '--legacy-peer-deps'], frontendDir, buildEnv);

        console.log('--- Building Frontend ---');
        await runCommand('npm', ['run', 'build'], frontendDir, buildEnv);

        console.log('--- Installing Backend Dependencies ---');
        await runCommand('npm', ['install', '--legacy-peer-deps'], backendDir, buildEnv);

        console.log('--- Build Complete ---');
    } catch (error) {
        console.error('Build Failed:', error);
        process.exit(1);
    }
}

build();
