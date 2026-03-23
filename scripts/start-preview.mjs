import { spawn } from 'node:child_process';
const port = Number(process.env.PORT || 8080);
const command = `npx vite preview --host 0.0.0.0 --port ${port}`;

const child = spawn(command, {
  stdio: 'inherit',
  shell: true,
  env: process.env,
});

child.on('exit', (code) => {
  process.exit(code ?? 1);
});

child.on('error', (error) => {
  console.error('Failed to start preview server:', error);
  process.exit(1);
});
