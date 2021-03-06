import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private saveKey = 'client-settings';

  loadClientSettings() {
    const data = JSON.parse(localStorage.getItem(this.saveKey)) || {};
    if (!data.default_backup_path) data.default_backup_path = window['defaultBackupPath'];
    return data;
  }

  saveClientSettings(data) {
    localStorage.setItem(this.saveKey, JSON.stringify(data));
  }

  sendToIpc(event:string, args:any = null) {
    if (typeof window['ipc'] !== 'undefined') {
      window['ipc'].send(event, args);
    }
  }

  handleIpcEvents(events:any[]) {
    if (typeof window['ipc'] !== 'undefined') {
      events.forEach(event => {
        window['ipc'].on(event[0], event[1]);
      });
    }
  }

  handleIpcEvent(event:string, callback:Function) {
    if (typeof window['ipc'] !== 'undefined') {
      window['ipc'].on(event, callback);
    }
  }

}
