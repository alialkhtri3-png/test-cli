#!/usr/bin/env node

const { execSync } = require("child_process");

function run(cmd) {
  try {
    execSync(cmd, { stdio: "inherit" });
  } catch (e) {
    process.exit(1);
  }
}

console.log("🚀 Smart Git AI CLI Running...");

// التحقق من git repo
run("git rev-parse --is-inside-work-tree");

// إضافة الملفات
run("git add -A");

// التحقق من وجود تغييرات
try {
  execSync("git diff --cached --quiet");
  console.log("⚠️ لا يوجد تغييرات");
  process.exit(0);
} catch (_) {
  // يوجد تغييرات
}

// commit message بسيط ذكي
const msg = `auto: update ${new Date().toISOString()}`;

run(`git commit -m "${msg}"`);
run("git push");

console.log("✅ Done!");
