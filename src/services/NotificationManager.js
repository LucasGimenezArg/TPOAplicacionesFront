
export default class NotificationManager {
    static INSTANCE;

    constructor(stateHook) {
        this.notifications = [];
        this.stateHook = stateHook;
    }

    push(title, message, isError = false) {
        const notification = { title, message, isError, key: crypto.randomUUID() };
        this.notifications.unshift(notification);
        this.stateHook(this.notifications, notification.key);
    }

    dismiss(key) {
        const index = this.notifications.findIndex(n => n.key === key);
        if (index > -1) {
            this.notifications.splice(index, 1);
        }
        this.stateHook(this.notifications);
    }

    static init(stateHook) {
        if (!NotificationManager.INSTANCE) {
            NotificationManager.INSTANCE = new NotificationManager(stateHook);
        }
    }
}