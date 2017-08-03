"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var azure = require("azure-storage");
function run(context, req) {
    context.log("TypeScript HTTP trigger function processed a request.");
    process.env.AZURE_STORAGE_ACCOUNT = context.bindingData.account;
    process.env.AZURE_STORAGE_ACCESS_KEY = context.bindingData.accesskey;
    var blobService = azure.createBlobService();
    var containerBaseName = 'barcontainer';
    for (var i = 0; i < context.bindingData.numOfNodes; i++) {
        var containerName = containerBaseName + i;
        blobService.createContainerIfNotExists(containerName, function (err, result, response) {
            if (err) {
                context.log("Couldn't create containers. Error Messasge: %s.", err.message);
            }
            else {
                context.log('Container created.');
            }
        });
    }
    context.res = {
        body: {
            message: "Containers have been created!"
        }
    };
    context.done();
}
exports.run = run;
;
//# sourceMappingURL=index.js.map