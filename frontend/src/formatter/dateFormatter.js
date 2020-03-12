const DateFormatter = {
    formatIso: (date) => {
        const d = new Date(date);
        const iso = d.toISOString();
        return iso.replace(/[^0-9-:]/, ' ').substr(0, iso.length - 1);
    }
};

export default DateFormatter;