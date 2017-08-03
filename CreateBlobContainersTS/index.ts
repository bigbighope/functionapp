import * as azure from 'azure-storage';

export function run(context: any, req: any): void {
    
    context.log("TypeScript HTTP trigger function processed a request.");

    process.env.AZURE_STORAGE_ACCOUNT = context.bindingData.account;
    process.env.AZURE_STORAGE_ACCESS_KEY = context.bindingData.accesskey;

    let blobService = azure.createBlobService();
    let containerBaseName = 'barcontainer';

    for(let i = 0; i < context.bindingData.numOfNodes; i++){
        let containerName = containerBaseName + i;
        blobService.createContainerIfNotExists(containerName, function(err, result, response) {
            if (err) {
                context.log("Couldn't create containers. Error Messasge: %s.", err.message);
            } else {
                context.log('Container created.');
            }
        });
    }

    context.res = {
        body: {
            message: `Containers have been created!`
        }
    };

    context.done();
};