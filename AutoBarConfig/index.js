// 'ssh-exec' is an extension of ssh2 module to invoke remote execution of ssh script/command, and to pipe to and from it.
// Refer to https://github.com/mafintosh/ssh-exec and https://www.npmjs.com/package/npmtest-ssh-exec


module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var exec = require('ssh-exec');

    var settings = {
        host: context.bindingData.hostip,        // Public IP address assigned to DSC vm.   (52.173.201.150 assigned to Viewpoint)
        user: context.bindingData.user,            // Default user added during deployment.
        password: context.bindingData.password    // added during deployment.
    };

    //Execute shell command on remote machine.
    exec('ls -lh /home/azureuser/scripts/', settings).pipe(process.stdout);

    context.res = {
        body: "BAR configuration is done!"
        
    };

    context.done();
};




