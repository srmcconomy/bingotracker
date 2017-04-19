$('td').contextmenu(function() {
  $(this).find('div div div').show();
  return false;
})

var defaultHeight = 0;

function onClick (e) {
  if ($(e.target).css('-webkit-filter') === 'none') {
    $(e.target).css("-webkit-filter", "grayscale(100%)").css('opacity', 0.5)
  } else {
    $(e.target).css("-webkit-filter", "none").css('opacity', 1.0)
  }
  e.stopPropagation()
}

function rightClick() {
  $(this).hide();
  return false;
}

function buttons(rows) {
  var el = $('<div></div>');
  for (var r = 0; r < rows.length; r++) {
    var row = $('<div></div>');
    for (var i = 0; i < rows[r].length; i++) {
      var button = $(`<div class='item toggle' style="background-image: url('${chrome.extension.getURL(`images/${rows[r][i]}.ico`)}')">`);
      button.click(onClick);
      button.contextmenu(rightClick);
      row.append(button);
    }
    el.append(row);
  }
  return el;
}

function counterClick(denominator) {
  return function(e) {
    var val = +$(e.target).next().html() + 1;
    if (val > denominator) val = 0;
    $(e.target).next().html(val);
    e.stopPropagation();
  }
}

function counters(goal, denominator) {
  var el = $('<div></div>');
  var counter = $(`<div class='item counter' style="background-image: url('${chrome.extension.getURL(`images/${goal}.ico`)}')">`).click(counterClick(denominator));
  el.append(counter);
  el.append($('<span class="counter num">0</span>'))
  el.append($('<span> / </span>'))
  el.append($(`<span class="counter den">${denominator}</span>`))
  return el;
}

function apply(matches, options, element, mode) {
  if (options.removetext) {
    element = element.empty();
  }
  if (options.fontsize) {
    element = element.css('font-size', options.fontsize);
  }
  if (mode === 'tokens') applyTokens(matches, options, element);
  if (mode === 'counter') applyCounter(matches, options, element);
  if (mode === 'selecttokens') applySelectTokens(matches, options, element);
}

function applyTokens(matches, options, element) {
  var buts;
  if (typeof options.rows === 'function') {
    buts = options.rows(matches);
  } else {
    buts = options.rows;
  }
  element.append(buttons(buts));
  if (options.class) element.addClass(options.class);
  fsize = +/(\d+)px/.exec(element.css('font-size'))[1];
  while(element.height() > defaultHeight && fsize > 0) {
    fsize--;
    element.css('font-size', fsize + 'px');
  }
}

function applyCounter(matches, options, element) {
  var den;
  if (typeof options.denominator === 'function') {
    den = options.denominator(matches);
  } else {
    den = options.denominator;
  }
  element.append(counters(options.icon, den));
  fsize = +/(\d+)px/.exec(element.css('font-size'))[1];
  while(element.height() > defaultHeight && fsize > 0) {
    fsize--;
    element.css('font-size', fsize + 'px');
  }
}

function updateSelect(element, rows, index) {
  element.empty();
  element.append(buttons([rows[index]]));
}

function applySelectTokens(matches, options, element) {
  var buts;
  if (typeof options.rows === 'function') {
    buts = options.rows(matches);
  } else {
    buts = options.rows;
  }
  var container = $('<div class="select-container"></div>')
  var selectIndex = 0;
  var rowElement = $('<div></div>')
  updateSelect(rowElement, buts, 0);
  container.append($('<div>&lt;</div>').click(function(e) {
    selectIndex--;
    if (selectIndex < 0) selectIndex = buts.length - 1;
    updateSelect(rowElement, buts, selectIndex);
    e.stopPropagation();
  }))
  container.append(rowElement);
  container.append($('<div>&gt;</div>').click(function(e) {
    selectIndex++;
    if (selectIndex > buts.length - 1) selectIndex = 0;
    updateSelect(rowElement, buts, selectIndex);
    e.stopPropagation();
  }));
  element.append(container);

  fsize = +/(\d+)px/.exec(element.css('font-size'))[1];
  while(element.height() > defaultHeight && fsize > 0) {
    fsize--;
    element.css('font-size', fsize + 'px');
  }
}

loadSettings().then(settings => {
  defaultHeight = $('td').first().height();
  let game;
  $('td').each(function() {
    let oneGame = false;
    let gm;
    var goal = $(this).text();
    for (var g in games) {
      if (!settings[g]) {
        settings[g] = defaults[g][0].settings;
      }
      if (settings[g][goal]) {
        if (oneGame) {
          return true;
        }
        oneGame = true;
        gm = g;
      }
    }
    if (oneGame) {
      game = gm;
      return false;
    }
  })
  if (!game) game = 'oot';
  $('td').each(function() {
    var goal = $(this).text();
    if (!settings[game][goal] || settings[game][goal] === 'none') return;
    for (var i = 0; i < regexes[game].length; i++) {
      var matches = regexes[game][i].regex.exec(goal);
      if (matches) {
        apply(matches, regexes[game][i].options[settings[game][goal]], $(this), settings[game][goal]);
      }
    }
  });
});

bingoList = bingoList.normal;
let minus;
let plus;

s = '';
minus = '';
plus = '';
for (let i2 in bingoList2) {
  if (!bingoList2[i2].length) continue;
  for (let j2 = 0; j2 < bingoList2[i2].length; j2++) {
    let goal2 = bingoList2[i2][j2];
    let done = false;
    for (let i in bingoList) {
      if (!bingoList[i].length) continue;
      for (let j = 0; j < bingoList[i].length; j++) {
        let goal = bingoList[i][j];
        if (goal.id !== goal2.id) continue;
        done = true;
        let first = true;
        for (let k in goal) {
          goalks = JSON.stringify(goal[k]);
          goal2ks = JSON.stringify(goal2[k]);
          if (goalks !== goal2ks) {
            if (k === 'skill' || k === 'jp') continue;
            if (first) {
              first = false;
              s += goal.name + '\n';
            }
            s += '  ' + k + ': ' + goal2ks + ' => ' + goalks + '\n'
          }
        }
        if (!first) s += '\n========\n';
      }
    }
    if (!done) minus += '  - ' + goal2.name + '\n';
  }
}
for (let i in bingoList) {
  for (let j = 0; j < bingoList[i].length; j++) {
    let goal = bingoList[i][j];
    let done = false;
    for (let i2 in bingoList2) {
      for (let j2 = 0; j2 < bingoList2[i2].length; j2++) {
        let goal2 = bingoList2[i2][j2];
        if (goal.id === goal2.id) {
          done = true;
          continue;
        }
      }
      if (done) continue;
    }
    if (!done) plus += '  + ' + goal.name + '\n';
  }
}
console.log(s + minus + plus);
