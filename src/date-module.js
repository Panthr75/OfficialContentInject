/**
 * @classdesc The core DateInjectModule already included in ContentInject: Displays the current date
 * @class
 * @augments ContentInjectModule
*/
class DateContentInjectModule extends ContentInjectModule {
    constructor() {
        // initialize with the name of `"Date Info"`, the id of `"date"`, 
        // and have default of abbrieviated to `true`, dayOfWeek to `true`
        // and `year` set to `true`. No config types need to be defined, 
        // as ContentInject takes care of that
        super("Date Info", "date", {"abbrieviated": true, "dayOfWeek": true, "year": true});
    }

    // util that returns the abbriviated months and days. Using get to prevent overriding
    get _abbr() {
        return {"month": ["JAN", "FEB", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUG", "SEP", "OCT", "NOV", "DEC"], "day": ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"]};
    }

    // util that returns the non-abbriviated months and days. Using get to prevent overriding
    get _noabbr() {
        return {"month": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], "day": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]};
    }

    // override onRequestContent so it displays the info in the main display
    onRequestContent(enabled, config) {
        // check to make sure the module is enabled. If it is, run standard logic, else return ""
        if (enabled) {
            // get the current date, and info about the date
            let d = new Date();

            let month = d.getMonth();
            let year = d.getFullYear();
            let day = d.getDate();
            let dayOfWeek = d.getDay();
            
            // default the return string to be empty
            let returnString = "";
            
            // check for abbriviation. If so, use abbrieviated logic, else use non-abbrieviated lofic
            if (config.abbrieviated) {
                // if user wants the day of week, add it
                if (config.dayOfWeek) returnString += this._abbr.day[dayOfWeek] + ", ";

                // add the month to the return string
                returnString += this._abbr.month[month];
            }
            else {
                // if user wants the day of week, add it
                if (config.dayOfWeek) returnString += this._noabbr.day[dayOfWeek] + ", ";

                // add the month to the return string
                returnString += this._noabbr.month[month];
            }
            
            // add the day to the return string
            returnString += " " + day;

            // if the user wants the year, add it
            if (config.year) returnString += ", " + year;

            return returnString;
        }
        else return "";
    }
}
