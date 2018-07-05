#!/usr/bin/env ts-node
// tslint:disable:no-console

import { spawn, SpawnOptions } from "child_process";
import * as fs from "fs";
import * as path from "path";

import * as ncp from "ncp";

const packageTemplatePath = path.join(__dirname, "resources", "package-template");
const packageRoot = path.join(__dirname, "..", "..");

function ncpPromise(src: string, dest: string, options?: ncp.Options): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        typeof options === "undefined"
            ? ncp.ncp(src, dest, (err) => err ? reject(err) : resolve())
            : ncp.ncp(src, dest, options, (err) => err ? reject(err) : resolve());
    });
}

function spawnPromise(
    command: string,
    args?: ReadonlyArray<string>,
    options?: SpawnOptions,
    printToConsole: boolean = false,
    ): Promise<{stdout: string; stderr: string; code: number; signal: string; }> {
        return new Promise((resolve, reject) => {
            let stdout = "";
            let stderr = "";

            const p = typeof options !== "undefined"
                ? spawn(command, args, options)
                : typeof args !== "undefined"
                ? spawn(command, args)
                : spawn(command);
            p.stdout.on("data", (data) => {
                stdout += data.toString();
                if (printToConsole) {
                    console.log(data.toString());
                }
            });
            p.stderr.on("data", (data) => {
                stderr += data.toString();
                if (printToConsole) {
                    console.error(data.toString());
                }
            });
            p.on("close", (code, signal) => {
                resolve({ stdout, stderr, code, signal });
            });
        });
}

async function bootstrapPackage(name: string) {
    console.info(`Bootstrapping package @service/${name}`);
    const destinationPath = path.join(packageRoot, "packages", name);
    if (fs.existsSync(destinationPath)) {
        throw new Error(`Destination path packages/${name} already exists. Not creating.`);
    }

    // Copy files
    await ncpPromise(packageTemplatePath, destinationPath);

    // Replace placeholder strings in files
    await Promise.all([
        "src/index.ts",
        "tests/index.ts",
        "README.md",
        "package.json",
    ].map((filename) => replaceOccurences(path.join(destinationPath, filename), {
        "%NAME%": name,
    })));

    const r = await spawnPromise(
        `${path.join(__dirname, "finalise-bootstrap.sh")}`,
        [],
        { cwd: destinationPath },
        true,
    );

    console.info(`Package @service/${name} successfully bootstrapped and published.`);
}

async function replaceOccurences(
    filename: string,
    keyValueDictionary: { [key: string]: string } = {}) {
    let content = fs.readFileSync(filename).toString();
    for (const key of Object.keys(keyValueDictionary)) {
        const value = keyValueDictionary[key];
        content = content.replace(new RegExp(key, "g"), value);
    }
    fs.writeFileSync(filename, content);
}

async function main() {
    try {
        const args = process.argv;
        if (args.length < 3) {
            throw new Error("Specify at least one package to be created");
        }
        const packageNames = args.slice(2);

        for (const name of packageNames) {
            try {
                await bootstrapPackage(name);
            } catch (e) {
                console.error(e.message || e);
            }
        }

    } catch (e) {
        console.error(e.message || e);
    }
}

main();
