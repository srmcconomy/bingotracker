var settings = {};

function click(game, goal) {
  return function() {
    settings[game][goal] = this.value;
  }
}

function save() {
  chrome.storage.sync.set({bingoTracker: settings});
}

$('.save').click(save);

loadSettings().then(s => {
  settings = s;
  let first = true;
  for (var game in games) {
    let klass = game;
    if (first) {
      klass += ' active';
      first = false;
    }
    $('.tabs').append($(`<div class="${klass}">${games[game]}</div>`).click(
      (game => {
        return () => {
          $('.tabs>div').removeClass('active');
          $(`.tabs>.${game}`).addClass('active');
          $('.scroll>div').hide();
          $(`.scroll>.${game}`).show();
        }
      })(game)
    ));
    let gameEl = $(`<div class=${game}></div>`);
    for (var goal of goallist[game]) {
      var el = $(`<div><div class="goal">${goal}</div></div>`);
      var checked = !settings[game][goal] || settings[game][goal] === 'none' ? ' checked' : '';
      var input = $(`<input type="radio" name="${game}${goal}" value="none"${checked}>`).change(click(game, goal));
      el.append($(`<span class="mode">none</span>`).prepend(input))
      for (var i = 0; i < regexes[game].length; i++) {
        var exec = regexes[game][i].regex.exec(goal);
        if (exec) {
          for (var mode in regexes[game][i].options) {
            var checked = '';
            if (settings[game][goal] === mode) checked = ' checked';
            input = $(`<input type="radio" name="${game}${goal}" value="${mode}"${checked}>`).change(click(game, goal));
            el.append($(`<span class="mode">${mode}</span>`).prepend(input))
          }
          break;
        }
      }
      gameEl.append(el)
    }
    $('.scroll').append(gameEl);
  }
});
