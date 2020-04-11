import moment from "moment";

const DateFormatter = {
    formatIso: (date) => {
        return moment.utc(date).format('YYYY-MM-DD HH:mm:ss.SSSSSS');
    }
};

export default DateFormatter;