/**
 * ts-node hook script to register the correct tsconfig for ts-node/register when used with mocha
 */

require("ts-node").register({
    project: "shared/tsconfig/app/release/tsconfig.app.release.cjs.json",
});
