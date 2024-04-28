import { Logger, FunctionListener } from "@pnp/logging";
// class CustomListener implements ILogListener {
//     log(entry: ILogEntry): void {
//       if (entry.level == LogLevel.Error)
//         console.log('Message from Custom Listener%c' + entry.message, "color:red;");
//       else if (entry.level == LogLevel.Warning)
//         console.log('Message from Custom Listener%c' + entry.message, "color:orange;");
//       else if (entry.level == LogLevel.Info)
//         console.log('Message from Custom Listener%c' + entry.message, "color:green;");
//       else
//         console.log('Message from Custom Listener%c' + entry.message, "color:blue;");
//     }
// }
var SPPNPLogger = /** @class */ (function () {
    function SPPNPLogger() {
        this._functionlistener = new FunctionListener(function (entry) {
            if (entry.level == 3 /* Error */)
                console.error('Message from Logger ' + entry.message);
            else if (entry.level == 2 /* Warning */)
                console.warn('Message from Logger: ' + entry.message);
            else if (entry.level == 1 /* Info */)
                console.info('Message from Logger: ' + entry.message);
            //console.info('Message from Logger %c' + entry.message, "color:green;");
            else
                console.log('Message from Logger ' + entry.message);
        });
        //Logger.activeLogLevel = LogLevel.Info;  //uncomment this to enable logs
        //Logger.subscribe(new ConsoleListener());
        Logger.subscribe(this._functionlistener);
        //Logger.subscribe(new CustomListener());
    }
    SPPNPLogger.prototype.warning = function (text) {
        Logger.write(text, 2 /* Warning */);
    };
    SPPNPLogger.prototype.info = function (text) {
        //Logger.writeJSON({ FirstName: "Ravichandran", LastName: "Krishnasamy" }, LogLevel.Info);
        Logger.write(text, 1 /* Info */);
    };
    SPPNPLogger.prototype.error = function (text) {
        Logger.write(text, 3 /* Error */);
    };
    return SPPNPLogger;
}());
export default SPPNPLogger;
//# sourceMappingURL=SPPNPLogger.js.map