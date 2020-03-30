/**
 * ts-node hook script to register the correct tsconfig for ts-node/register when used with mocha
 */

require("ts-node").register({
    compiler: "ts-mjs",
    project: "shared/tsconfig/app/release/tsconfig.app.release.mjs.json",
    compilerOptions: {
        module: "commonjs",
    },
});
