module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var azure = require('azure-storage');
    process.env.AZURE_STORAGE_ACCOUNT = context.bindingData.account;
    process.env.AZURE_STORAGE_ACCESS_KEY = context.bindingData.accesskey;
    var blobService = azure.createBlobService();

    var containerBaseName = 'barcontainer';
    for(var i=0; i<context.bindingData.numOfNodes; i++){
        var containerName = containerBaseName+i;
        blobService.createContainerIfNotExists(containerName, function(err, result, response) {
            if (err) {
                context.log("Couldn't create containers. Error Messasge: %s.", err.message);
            } else {
                context.log('Container created.');
            }
        });
    }

    context.res = {
        body: "Containers have been created!"
        
    };

    context.done();
};