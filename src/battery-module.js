/**
 * @classdesc The core BatteryInjectModule already included in ContentInject: Displays the battery information
 * @class
 * @augments ContentInjectModule
*/
class BatteryTimeContentInjectModule extends ContentInjectModule {
    constructor() {
        // initialize with the name of `"Battery Info"`, the id of `"battery"`, 
        // and have default of show_timeleft to `true` No config types need 
        // to be defined, as ContentInject takes care of that
        
        super("Battery Info", "battery", {"show_timeleft": true});
        
        // set the battery info to default with hours, minutes, and level
        this.batteryInfo = {"hours": "00", "minutes": "00", "level": "0%"};
    }

    /**
     * Util for generated time with the 0 appended to it at the beginning.
     * @private
     * @param {Number} time The time number to convert
     * @returns {String}
    */
    static _utilConvertTime(time) {
        if (time < 10) return "0" + time;
        else return time.toString();
    }

    // override onRequestContent so it displays the info in the main display
    onRequestContent(enabled, config) {
        // check to make sure the module is enabled. If it is, run standard logic, else return ""
        if (enabled) {
            // use navigator.getBattery(). Since it returns a promise, and ContentInject don't wait for no promises, the first couple of updates, it appears you have 0% and 00:00 time left
            navigator.getBattery().then(battery => {
                // get the battery time. If it's charging, use charging time. Otherwise use discharging time
                let battime = battery.charging ? battery.chargingTime : battery.dischargingTime;

                // format hours and minutes properly
                let mins = battime / 60;
                let hours = Math.floor(mins/ 60);
                mins = Math.round(mins - (hours * 60));
                
                // set the battery hours info to converting the hours
                this.batteryInfo.hours = BatteryTimeContentInjectModule._utilConvertTime(hours);

                // set the battery minutes info to converting the mins
                this.batteryInfo.minutes = BatteryTimeContentInjectModule._utilConvertTime(mins);

                // also set the battery level info to battery.level * 100 (battery.level is between 0 and 1), and Math.round it. Also add "%"
                this.batteryInfo.level = (Math.round(battery.level * 100)) + "%";
            });

            // return the batter level, and if user wants the time remaining, then add the battery hours and battery minutes.
            return this.batteryInfo.level + 
            (config.show_timeleft ? "; " + 
            this.batteryInfo.hours + ":" + 
            this.batteryInfo.minutes + " left": "");
        }
        else return "";
    }
}
