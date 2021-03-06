export default class GlueJob {
    constructor(name, script) {
        this.name = name;
        this.script = script;
    }

    setS3ScriptLocation(s3url) {
        this.s3ScriptLocation = s3url;
    }

    setCommandName(commandName) {
        switch(commandName){
            case 'spark' : this.commandName = 'glueetl'
            break;
            case 'pythonshell':this.commandName = 'pythonshell'
            break;
        }
    }

    setGlueVersion(glueVersion) {
        let parts = glueVersion.split('-')
        let pythonVersion = parts[0].match(new RegExp(`([0-9])`))[0];
        let language = parts[0].match(new RegExp(`([a-z])*`))[0];

        this.pythonVersion = pythonVersion;
        this.glueVersion = parts[1];
        this.language = language;
    }

    setRole(role) {
        this.role = role
    }

    setType(type){
        this.type = type;
    }

    setMaxConcurrentRuns(maxConcurrentRuns){
        this.maxConcurrentRuns = maxConcurrentRuns;
    }

    setWorkerType(workerType){
        this.WorkerType = workerType;
    }

    setNumberOfWorkers(numberOfWorkers){
        this.NumberOfWorkers = numberOfWorkers
    }

    setTempDir(tmpDir){
        this.tmpDir = tmpDir;
    }


    getCFGlueJob() {
        return {
            Type: "AWS::Glue::Job",
            Properties: {
                Command: {
                    "Name": this.commandName,
                    "PythonVersion": this.pythonVersion,
                    "ScriptLocation": this.s3ScriptLocation
                },
                "GlueVersion": this.glueVersion,
                "Name": this.name,
                "Role": this.role,
                "ExecutionProperty": {
                    "MaxConcurrentRuns": this.maxConcurrentRuns || 1
                },
                "WorkerType": this.WorkerType || "Standar",
                "NumberOfWorkers": this.NumberOfWorkers || "",
                "DefaultArguments": {
                    "--job-language": this.language,
                    "--TempDir": this.tmpDir || ""
                },
                
                // AllocatedCapacity: Double,
                // "Connections": ConnectionsList,
                //"Description": String,
                // "LogUri": String,
                // "MaxCapacity": Double,
                // "MaxRetries": Double,
                // "NotificationProperty": NotificationProperty,
                // "SecurityConfiguration": String,
                // "Tags": Json,
                // "Timeout": Integer,
            }
        }
    }



}