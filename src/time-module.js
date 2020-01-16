/**
 * @classdesc The core TimeInjectModule already included in ContentInject: Displays the current time
 * @class
 * @augments ContentInjectModule
*/
class TimeContentInjectModule extends ContentInjectModule {
    constructor() {
        // initialize with the name of `"Time Info"`, the id of `"time"`, 
        // and have default of show_seconds to `true`, and military_time
        // set to `false`. No config types need to be defined, as ContentInject 
        // takes care of that
        super("Time Info", "time", {"show_seconds": true, "military_time": false});
    }
    
    /**
     * Util for generated time with the 0 appended to it at the beginning.
     * @private
     * @param {Number} time The time number to convert
     * @returns {String}
    */
    _utilConvertTime(time) {
        if (time < 10) return "0" + time;
        else return time.toString();
    }

    // override onRequestContent so it displays the info in the main display
    onRequestContent(enabled, config) {
        // check to make sure the module is enabled. If it is, run standard logic, else return ""
        if (enabled) {
            // get the current date, and info about it
            let d = new Date();
            let hours = d.getHours();
            let minutes = d.getMinutes();
            // auto-assume the prefix with AM. Add a space so it can be completely removed with config military time
            let prefix = " AM";

            // if the user wants military time, don't show the prefix
            if (config.military_time) {
                prefix = "";
            }
            else {
                // properly format for PM
                if (hours > 12) {
                    hours -= 12;
                    prefix = " PM";
                }

                // format the hours so it displays `12` instead of `0`
                if (hours === 0) hours = 12;
            }

            // set the return string to include the hour, and the util of converting the minutes
            let returnString = `${hours}:${this._utilConvertTime(minutes)}`;

            // if show_seconds is enabled, then add the seconds info to the return string
            if (config.show_seconds) {
                let seconds = d.getSeconds();
                returnString += `:${this._utilConvertTime(seconds)}`;
            }
            // add the prefix onto the return string
            returnString += prefix;

            // return the returnString
            return returnString;
        }
        else return "";
    }
}
