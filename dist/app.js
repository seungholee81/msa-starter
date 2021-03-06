#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BuildCommand_1 = require("./BuildCommand");
var PublishCommand_1 = require("./PublishCommand");
var CleanCommand_1 = require("./CleanCommand");
var core_1 = require("@caporal/core");
core_1.program
    .name('msa-starter')
    .description('spring-boot msa project starter')
    .command('build', 'build a spring-boot base microservice')
    .option('-y, --use-default <value>', 'Use default values', {
    default: false
})
    .action(function (_a) {
    var logger = _a.logger, options = _a.options;
    logger.info("Cleaning the build dir...");
    new CleanCommand_1.CleanCommand('build').clean();
    var buildInfo = new BuildCommand_1.BuildCommand('templates', 'build', options.useDefault).build();
    logger.info("A spring-boot application has been created in ./build/%s. " +
        "You can publish the build result with \"publish\" command.", buildInfo.projectName);
}).default()
    .command('publish', 'publish build artifact to another folder')
    .action(function (_a) {
    var logger = _a.logger;
    var publishInfo = new PublishCommand_1.PublishCommand().publish();
    logger.info("Done! Read %s/README.md to learn how to start.", publishInfo.publishDir);
})
    .command('clean', 'clean build output')
    .action(function (_a) {
    var logger = _a.logger;
    new CleanCommand_1.CleanCommand('build').clean();
    logger.info("Done!");
});
core_1.program.run();
