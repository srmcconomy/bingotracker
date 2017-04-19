let loadSettings = () => new Promise((res, rej) => {
  chrome.storage.sync.get('bingoTracker', function(bt) {
    let settings = {};
    if (bt.hasOwnProperty('bingoTracker')) settings = bt.bingoTracker;
    else settings = bt;
    if (!settings.oot) {
      temp = settings;
      settings = {};
      settings.oot = temp;
    }
    for (let game in games) {
      if (!settings.hasOwnProperty(game)) {
        settings[game] = defaults[game][0].settings;
        continue;
      }
      for (let goal of goallist[game]) {
        if (!settings[game].hasOwnProperty(goal)) {
          settings[game][goal] = defaults[game][0].settings[goal];
        }
      }
    }
    chrome.storage.sync.set({ 'bingoTracker': settings })
    res(settings);
  });
});
