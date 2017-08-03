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



//Automatically answer remote interactive prompts.
//exec('printf "dbc\n${DSUDBCPassword}\n" | dsc config_systems -f /home/azureuser/scripts/Config_System.xml', settings).pipe(process.stdout);

//Other exmaples:
//exec('printf ".QUIT\n" | bteq .logon 10.0.0.4/dbc,abcd1234', settings).pipe(process.stdout);
//exec('su -;printf "y\n" | tpareset -x shuttingdown;pdestate', settings).pipe(process.stdout);
//exec('sh /home/azureuser/scripts/Setup_Verify_BAR_Configuration.sh', settings).pipe(process.stdout);
