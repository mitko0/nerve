const GlobalService = {
    groupBy: (list, condition, trueKeyGetter, falseKeyGetter) => {
        const map = new Map();
        list.forEach(item => {
            const key = condition(item)
                ? trueKeyGetter(item)
                : falseKeyGetter(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return map;
    },

    checkEqual: (obj1, obj2, compareBy) => {
        debugger
        let obj1Str = JSON.stringify(compareBy(obj1));
        let obj2Str = JSON.stringify(compareBy(obj2));
        return obj1Str === obj2Str;
    }
};

export default GlobalService;