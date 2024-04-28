var eventGuid = 0;
var todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
export var INITIAL_EVENTS = [
    {
        id: createEventId(),
        title: 'All-day event',
        start: todayStr
    },
    {
        id: createEventId(),
        title: 'Timed event',
        start: todayStr + 'T12:00:00'
    }
];
export function createEventId() {
    return String(eventGuid++);
}
//# sourceMappingURL=event-utils.js.map