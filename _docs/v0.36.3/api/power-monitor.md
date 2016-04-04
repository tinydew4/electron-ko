---
version: v0.36.3
category: API
title: 'Power Monitor'
source_url: 'https://github.com/electron/electron/blob/master/docs/api/power-monitor.md'
---

# powerMonitor

The `power-monitor` module is used to monitor power state changes. You can
only use it in the main process. You should not use this module until the `ready`
event of the `app` module is emitted.

For example:

```javascript
app.on('ready', function() {
  require('electron').powerMonitor.on('suspend', function() {
    console.log('The system is going to sleep');
  });
});
```

## Events

The `power-monitor` module emits the following events:

### Event: 'suspend'

Emitted when the system is suspending.

### Event: 'resume'

Emitted when system is resuming.

### Event: 'on-ac'

Emitted when the system changes to AC power.

### Event: 'on-battery'

Emitted when system changes to battery power.
