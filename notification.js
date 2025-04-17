export class NotificationManager {
    constructor(userId) {
        this.__userId = userId;
        this.__message = "Hello Babar, it's time to study."
        this.__timeStamp = Date.now();
        this.__read = false;
    }

    async notify() {
        console.log('Trying to show notification...'); 

        if (!("Notification" in window)) {
            console.error("Этот браузер не поддерживает уведомления");
            alert("Этот браузер не поддерживает уведомления");
            return;
        }

        console.log('Requesting permission...'); 
        const permission = await window.Notification.requestPermission();
        console.log('Permission:', permission); 
        
        if (permission === "granted") {
            const notification = new window.Notification("Напоминание", {
                body: this.__message,
                timestamp: this.__timeStamp,
                
            });

            notification.onclick = () => {
                this.__read = true;
                window.focus();
            };
        }
    }
}