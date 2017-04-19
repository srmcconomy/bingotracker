function tokenCounter(icon) {
  return matches => {
    var n = +matches[1];
    var rows = [];
    if (n > 6) {
      rows[0] = [];
      for (var i = 0; i < (n + 1) / 2; i++) {
        rows[0].push(icon);
      }
      rows[1] = [];
      for (var i = 0; i < n / 2; i++) {
        rows[1].push(icon);
      }
    } else {
      rows[0] = [];
      for (var i = 0; i < n; i++) {
        rows[0].push(icon);
      }
    }
    return rows;
  }
}

games.oot = "Ocarina of Time";

regexes.oot = [
  {
    regex: /(\d+).*Skulltulas/,
    options: {
      tokens: {
        rows: tokenCounter('skulltula')
      },
      counter: {
        denominator: matches => +matches[1],
        icon: 'skulltula'
      }
    }
  },
  {
    regex: /Both.*Skulltulas/,
    options: {
      tokens: {
        mode: 'tokens',
        rows: [
          ['skulltula', 'skulltula']
        ]
      },
      counter: {
        denominator: 2,
        icon: 'skulltula'
      }
    }
  },
  {
    regex: /(\d+).*HPs/,
    options: {
      tokens: {
        rows: tokenCounter('heartpiece')
      },
      counter: {
        denominator: matches => +matches[1],
        icon: 'heartpiece'
      }
    }
  },
  {
    regex: /Both.*(heart pieces|HPs)/,
    options: {
      tokens: {
        rows: [
          ['heartpiece', 'heartpiece']
        ]
      },
      counter: {
        denominator: 2,
        icon: 'heartpiece'
      }
    }
  },
  {
    regex: /(\d+).*[Ss]ongs/,
    options: {
      tokens: {
        rows: [
          ['zl', 'eponas', 'sarias', 'suns', 'time', 'storms'],
          ['minuet', 'bolero', 'serenade', 'nocturne', 'requiem', 'prelude']
        ]
      },
      counter: {
        mode: 'counter',
        denominator: matches => matches[1],
        icon: 'song'
      }
    }
  },
  {
    regex: /(\d+).*Magic Beans/,
    options: {
      tokens: {
        rows: tokenCounter('bean')
      },
      counter: {
        denominator: matches => +matches[1],
        icon: 'bean'
      }
    }
  },
  {
    regex: /(\d+).*Compasses/,
    options: {
      tokens: {
        rows: [
          ['deku', 'dc', 'jabu', 'well', 'ice'],
          ['forest', 'fire', 'water', 'shadow', 'spirit']
        ]
      },
      counter: {
        denominator: matches => matches[1],
        icon: 'compass'
      }
    }
  },
  {
    regex: /(\d+).*Maps/,
    options: {
      tokens: {
        rows: [
          ['deku', 'dc', 'jabu', 'well', 'ice'],
          ['forest', 'fire', 'water', 'shadow', 'spirit']
        ]
      },
      counter: {
        mode: 'counter',
        denominator: matches => matches[1],
        icon: 'map'
      }
    }
  },
  {
    regex: /(\d+).*Boss Keys/,
    options: {
      tokens: {
        mode: 'tokens',
        rows: [
          ['deku', 'dc', 'jabu', 'ganon'],
          ['forest', 'fire', 'water', 'shadow', 'spirit']
        ]
      },
      counter: {
        mode: 'counter',
        denominator: matches => matches[1],
        icon: 'bk'
      }
    }
  },
  {
    regex: /(\d+).*(Small Key|[Uu]nused [Kk]eys)/,
    options: {
      tokens: {
        rows: tokenCounter('key')
      },
      counter: {
        denominator: matches => matches[1],
        icon: 'key'
      }
    }
  },
  {
    regex: /Map & Compass/,
    options: {
      tokens: {
        rows: [
          ['map', 'compass']
        ]
      }
    }
  },
  {
    regex: /3 Swords(?!,)/,
    options: {
      tokens: {
        rows: [
          ['kokirisword', 'mastersword', 'giantsknife']
        ]
      },
      counter: {
        denominator: 3,
        icon: 'mastersword'
      }
    }
  },
  {
    regex: /3 Shields/,
    options: {
      tokens: {
        rows: [
          ['dekushield', 'hylianshield', 'mirrorshield']
        ]
      },
      counter: {
        denominator: 3,
        icon: 'hylianshield'
      }
    }
  },
  {
    regex: /3 Tunics/,
    options: {
      tokens: {
        rows: [
          ['kokiritunic', 'gorontunic', 'zoratunic']
        ]
      },
      counter: {
        denominator: 3,
        icon: 'kokiritunic'
      }
    }
  },
  {
    regex: /3 Boots/,
    options: {
      tokens: {
        rows: [
          ['kokiriboots', 'ice', 'hoverboots']
        ]
      },
      counter: {
        denominator: 3,
        icon: 'kokiriboots'
      }
    }
  },
  {
    regex: /Adult Dungeon/,
    options: {
      tokens: {
        rows: [
          ['forest', 'fire', 'water', 'shadow', 'spirit']
        ],
      }
    }
  },
  {
    regex: /Giant's Wallet/,
    options: {
      counter: {
        denominator: 10,
        icon: 'skulltula'
      }
    }
  },
  {
    regex: /500 Rupees/,
    options: {
      counter: {
        denominator: 10,
        icon: 'skulltula'
      }
    }
  },
  {
    regex: /Stone of Agony/,
    options: {
      counter: {
        denominator: 20,
        icon: 'skulltula'
      }
    }
  },
  {
    regex: /1 Skulltula from each Child Dungeon/,
    options: {
      tokens: {
        rows: [
          ['deku', 'dc', 'jabu']
        ],
      }
    }
  },
  {
    regex: /Free all 9 gorons in Fire Temple/,
    options: {
      tokens: {
        rows: [
          ['goron', 'goron', 'goron', 'goron', 'goron'],
          ['goron', 'goron', 'goron', 'goron']
        ]
      },
      counter: {
        icon: 'goron',
        denominator: 9
      }
    }
  },
  {
    regex: /Defeat 4 Different Iron Knuckles/,
    options: {
      tokens: {
        rows: [
          ['knuckle', 'knuckle', 'knuckle', 'knuckle']
        ]
      },
      counter: {
        icon: 'knuckle',
        denominator: 4
      }
    }
  },
  {
    regex: /Two Fairy Spells/,
    options: {
      tokens: {
        rows: [
          ['dinsfire', 'faroreswind', 'nayruslove']
        ]
      },
      counter: {
        icon: 'dinsfire',
        denominator: 2
      }
    }
  },
  {
    regex: /3 Swords, Tunics, Boots, and Shields/,
    options: {
      tokens: {
        mode: 'tokens',
        rows: [
          ['kokirisword', 'mastersword', 'giantsknife', 'dekushield', 'hylianshield', 'mirrorshield'],
          ['kokiritunic', 'gorontunic', 'zoratunic', 'kokiriboots', 'ice', 'hoverboots']
        ],
        removetext: true
      }
    }
  },
  {
    regex: /All 3 Elemental Arrows/,
    options: {
      tokens: {
        mode: 'tokens',
        rows: [
          ['firearrows', 'icearrows', 'lightarrows']
        ]
      },
      counter: {
        mode: 'counter',
        icon: 'firearrows',
        denominator: 2
      }
    }
  }
];

goallist.oot = [
  "4 Maps",
  "5 Maps",
  "6 Maps",
  "7 Maps",
  "4 Compasses",
  "5 Compasses",
  "6 Compasses",
  "7 Compasses",
  "2 Boss Keys",
  "3 Boss Keys",
  "Map & Compass in Deku Tree",
  "Map & Compass in Jabu-Jabu",
  "Map & Compass in Dodongo's Cavern",
  "Map & Compass in Forest Temple",
  "Map & Compass in Fire Temple",
  "Map & Compass in Water Temple",
  "Map & Compass in Shadow Temple",
  "Map & Compass in Spirit Temple",
  "Map & Compass in Bottom of the Well",
  "Map & Compass in Ice Cavern",
  "3 Swords",
  "3 Shields",
  "3 Tunics",
  "3 Boots",
  "3 Swords & 3 Shields",
  "3 Swords & 3 Tunics",
  "3 Swords & 3 Boots",
  "3 Shields & 3 Tunics",
  "3 Shields & 3 Boots",
  "3 Tunics & 3 Boots",
  "3 Swords, Tunics, Boots, and Shields",
  "Two Fairy Spells",
  "All 3 Elemental Arrows",
  "3 songs",
  "4 Songs",
  "6 Songs",
  "7 Songs",
  "8 Songs",
  "9 Songs",
  "10 Songs",
  "5 Magic Beans",
  "7 Magic Beans",
  "9 Magic Beans",
  "All 3 Kokiri Forest area Skulltulas",
  "All 4 Lost Woods area Skulltulas",
  "Both Hyrule Field area Skulltulas",
  "All 4 Market area Skulltulas",
  "All 4 Lon-Lon Ranch area Skulltulas",
  "All 8 Kakariko area Skulltulas",
  "All 8 Death Mountain area Skulltulas",
  "All 8 Zora's Domain area Skulltulas",
  "3 Lake Hylia Skulltulas",
  "All 5 Lake Hylia Skulltulas",
  "All 4 Gerudo Valley area Skulltulas",
  "Both Gerudo's Fortress area Skulltulas",
  "All 4 Wasteland/ Colossus area Skulltulas",
  "All 4 Skulltulas in Deku Tree",
  "All 5 Skulltulas in Dodongo's Cavern",
  "All 4 Skulltulas in Jabu-Jabu",
  "All 5 Skulltulas in Forest Temple",
  "All 5 Skulltulas in Fire Temple",
  "All 5 Skulltulas in Water Temple",
  "3 Skulltulas in Water Temple",
  "All 5 Skulltulas in Shadow Temple",
  "4 Skulltulas in Shadow Temple",
  "All 5 Skulltulas in Spirit Temple",
  "All 3 Skulltulas in Ice Cavern",
  "All 3 Skulltulas in Bottom of the Well",
  "15 Different Skulltulas",
  "Giant's Knife",
  "500 Rupees",
  "Stone of Agony",
  "1 Skulltula from each Child Dungeon",
  "1 Skulltula from each Adult Dungeon",
  "1 unused small key in each Adult Dungeon",
  "4 Unused Keys in Forest Temple",
  "3 unused keys in Gerudo Training Grounds",
  "4 unused keys in Gerudo Training Grounds",
  "5 unused keys in Gerudo Training Grounds",
  "6 unused keys in Gerudo Training Grounds",
  "7 different unused keys in Gerudo Training Grounds",
  "8 different unused keys in Gerudo Training Grounds",
  "9 different unused keys in Gerudo Training Grounds",
  "Obtain all 5 Small Keys in Forest Temple",
  "Open all 8 Small Key chests in Fire Temple",
  "Obtain all 5 Small Keys in Shadow Temple",
  "Both heart pieces in Lost Woods",
  "Both heart pieces in Death Mountain Crater",
  "5 Zora Area HPs",
  "Both Gerudo Valley HPs",
  "Defeat 4 Different Iron Knuckles",
  "Free all 9 gorons in Fire Temple"
]

defaults.oot = [
  {
    name: "Non-atomic only",
    settings: {
      "4 Maps": 'tokens',
      "5 Maps": 'tokens',
      "6 Maps": 'tokens',
      "7 Maps": 'tokens',
      "4 Compasses": 'tokens',
      "5 Compasses": 'tokens',
      "6 Compasses": 'tokens',
      "7 Compasses": 'tokens',
      "2 Boss Keys": 'tokens',
      "3 Boss Keys": 'tokens',
      "Map & Compass in Deku Tree": 'none',
      "Map & Compass in Jabu-Jabu": 'none',
      "Map & Compass in Dodongo's Cavern": 'none',
      "Map & Compass in Forest Temple": 'none',
      "Map & Compass in Fire Temple": 'none',
      "Map & Compass in Water Temple": 'none',
      "Map & Compass in Shadow Temple": 'none',
      "Map & Compass in Spirit Temple": 'none',
      "Map & Compass in Bottom of the Well": 'none',
      "Map & Compass in Ice Cavern": 'none',
      "3 Swords": 'tokens',
      "3 Shields": 'tokens',
      "3 Tunics": 'tokens',
      "3 Boots": 'tokens',
      "3 Swords & 3 Shields": 'tokens',
      "3 Swords & 3 Tunics": 'tokens',
      "3 Swords & 3 Boots": 'tokens',
      "3 Shields & 3 Tunics": 'tokens',
      "3 Shields & 3 Boots": 'tokens',
      "3 Tunics & 3 Boots": 'tokens',
      "3 Swords, Tunics, Boots, and Shields": 'tokens',
      "Two Fairy Spells": 'tokens',
      "All 3 Elemental Arrows": 'tokens',
      "3 songs": 'tokens',
      "4 Songs": 'tokens',
      "6 Songs": 'tokens',
      "7 Songs": 'tokens',
      "8 Songs": 'tokens',
      "9 Songs": 'tokens',
      "10 Songs": 'tokens',
      "5 Magic Beans": 'counter',
      "7 Magic Beans": 'counter',
      "9 Magic Beans": 'counter',
      "All 3 Kokiri Forest area Skulltulas": 'counter',
      "All 4 Lost Woods area Skulltulas": 'counter',
      "Both Hyrule Field area Skulltulas": 'counter',
      "All 4 Market area Skulltulas": 'counter',
      "All 4 Lon-Lon Ranch area Skulltulas": 'none',
      "All 8 Kakariko area Skulltulas": 'counter',
      "All 8 Death Mountain area Skulltulas": 'counter',
      "All 8 Zora's Domain area Skulltulas": 'counter',
      "3 Lake Hylia Skulltulas": 'none',
      "All 5 Lake Hylia Skulltulas": 'counter',
      "All 4 Gerudo Valley area Skulltulas": 'counter',
      "Both Gerudo's Fortress area Skulltulas": 'none',
      "All 4 Wasteland/ Colossus area Skulltulas": 'counter',
      "All 4 Skulltulas in Deku Tree": 'none',
      "All 5 Skulltulas in Dodongo's Cavern": 'none',
      "All 4 Skulltulas in Jabu-Jabu": 'none',
      "All 5 Skulltulas in Forest Temple": 'none',
      "All 5 Skulltulas in Fire Temple": 'none',
      "All 5 Skulltulas in Water Temple": 'none',
      "3 Skulltulas in Water Temple": 'none',
      "All 5 Skulltulas in Shadow Temple": 'none',
      "4 Skulltulas in Shadow Temple": 'none',
      "All 5 Skulltulas in Spirit Temple": 'none',
      "All 3 Skulltulas in Ice Cavern": 'none',
      "All 3 Skulltulas in Bottom of the Well": 'none',
      "15 Different Skulltulas": 'counter',
      "Stone of Agony": 'counter',
      "1 Skulltula from each Child Dungeon": 'tokens',
      "1 Skulltula from each Adult Dungeon": 'tokens',
      "1 unused small key in each Adult Dungeon": 'tokens',
      "4 Unused Keys in Forest Temple": 'none',
      "3 unused keys in Gerudo Training Grounds": 'none',
      "4 unused keys in Gerudo Training Grounds": 'none',
      "5 unused keys in Gerudo Training Grounds": 'none',
      "6 unused keys in Gerudo Training Grounds": 'none',
      "7 different unused keys in Gerudo Training Grounds": 'none',
      "8 different unused keys in Gerudo Training Grounds": 'none',
      "9 different unused keys in Gerudo Training Grounds": 'none',
      "Obtain all 5 Small Keys in Forest Temple": 'none',
      "Open all 8 Small Key chests in Fire Temple": 'none',
      "Obtain all 5 Small Keys in Shadow Temple": 'none',
      "Both heart pieces in Lost Woods": 'counter',
      "Both heart pieces in Death Mountain Crater": 'none',
      "5 Zora Area HPs": 'counter',
      "Both Gerudo Valley HPs": 'none',
      "Defeat 4 Different Iron Knuckles": 'counter',
      "Free all 9 gorons in Fire Temple": 'none'
    }
  },
  {
    name: "Everything",
    settings: {
      "4 Maps": 'tokens',
      "5 Maps": 'tokens',
      "6 Maps": 'tokens',
      "7 Maps": 'tokens',
      "4 Compasses": 'tokens',
      "5 Compasses": 'tokens',
      "6 Compasses": 'tokens',
      "7 Compasses": 'tokens',
      "2 Boss Keys": 'tokens',
      "3 Boss Keys": 'tokens',
      "Map & Compass in Deku Tree": 'tokens',
      "Map & Compass in Jabu-Jabu": 'tokens',
      "Map & Compass in Dodongo's Cavern": 'tokens',
      "Map & Compass in Forest Temple": 'tokens',
      "Map & Compass in Fire Temple": 'tokens',
      "Map & Compass in Water Temple": 'tokens',
      "Map & Compass in Shadow Temple": 'tokens',
      "Map & Compass in Spirit Temple": 'tokens',
      "Map & Compass in Bottom of the Well": 'tokens',
      "Map & Compass in Ice Cavern": 'tokens',
      "3 Swords": 'tokens',
      "3 Shields": 'tokens',
      "3 Tunics": 'tokens',
      "3 Boots": 'tokens',
      "3 Swords & 3 Shields": 'tokens',
      "3 Swords & 3 Tunics": 'tokens',
      "3 Swords & 3 Boots": 'tokens',
      "3 Shields & 3 Tunics": 'tokens',
      "3 Shields & 3 Boots": 'tokens',
      "3 Tunics & 3 Boots": 'tokens',
      "3 Swords, Tunics, Boots, and Shields": 'tokens',
      "Two Fairy Spells": 'tokens',
      "All 3 Elemental Arrows": 'tokens',
      "3 songs": 'tokens',
      "4 Songs": 'tokens',
      "6 Songs": 'tokens',
      "7 Songs": 'tokens',
      "8 Songs": 'tokens',
      "9 Songs": 'tokens',
      "10 Songs": 'tokens',
      "5 Magic Beans": 'counter',
      "7 Magic Beans": 'counter',
      "9 Magic Beans": 'counter',
      "All 3 Kokiri Forest area Skulltulas": 'counter',
      "All 4 Lost Woods area Skulltulas": 'counter',
      "Both Hyrule Field area Skulltulas": 'counter',
      "All 4 Market area Skulltulas": 'counter',
      "All 4 Lon-Lon Ranch area Skulltulas": 'counter',
      "All 8 Kakariko area Skulltulas": 'counter',
      "All 8 Death Mountain area Skulltulas": 'counter',
      "All 8 Zora's Domain area Skulltulas": 'counter',
      "3 Lake Hylia Skulltulas": 'counter',
      "All 5 Lake Hylia Skulltulas": 'counter',
      "All 4 Gerudo Valley area Skulltulas": 'counter',
      "Both Gerudo's Fortress area Skulltulas": 'counter',
      "All 4 Wasteland/ Colossus area Skulltulas": 'counter',
      "All 4 Lon-Lon Ranch area Skulltulas": 'counter',
      "All 4 Skulltulas in Deku Tree": 'counter',
      "All 5 Skulltulas in Dodongo's Cavern": 'counter',
      "All 4 Skulltulas in Jabu-Jabu": 'counter',
      "All 5 Skulltulas in Forest Temple": 'counter',
      "All 5 Skulltulas in Fire Temple": 'counter',
      "All 5 Skulltulas in Water Temple": 'counter',
      "3 Skulltulas in Water Temple": 'counter',
      "All 5 Skulltulas in Shadow Temple": 'counter',
      "4 Skulltulas in Shadow Temple": 'counter',
      "All 5 Skulltulas in Spirit Temple": 'counter',
      "All 3 Skulltulas in Ice Cavern": 'counter',
      "All 3 Skulltulas in Bottom of the Well": 'counter',
      "15 Different Skulltulas": 'counter',
      "Stone of Agony": 'counter',
      "1 Skulltula from each Child Dungeon": 'tokens',
      "1 Skulltula from each Adult Dungeon": 'tokens',
      "1 unused small key in each Adult Dungeon": 'tokens',
      "4 Unused Keys in Forest Temple": 'counter',
      "3 unused keys in Gerudo Training Grounds": 'counter',
      "4 unused keys in Gerudo Training Grounds": 'counter',
      "5 unused keys in Gerudo Training Grounds": 'counter',
      "6 unused keys in Gerudo Training Grounds": 'counter',
      "7 different unused keys in Gerudo Training Grounds": 'counter',
      "8 different unused keys in Gerudo Training Grounds": 'counter',
      "9 different unused keys in Gerudo Training Grounds": 'counter',
      "Obtain all 5 Small Keys in Forest Temple": 'counter',
      "Open all 8 Small Key chests in Fire Temple": 'counter',
      "Obtain all 5 Small Keys in Shadow Temple": 'counter',
      "Both heart pieces in Lost Woods": 'counter',
      "Both heart pieces in Death Mountain Crater": 'counter',
      "5 Zora Area HPs": 'counter',
      "Both Gerudo Valley HPs": 'counter',
      "Defeat 4 Different Iron Knuckles": 'counter',
      "Free all 9 gorons in Fire Temple": 'counter'
    }
  },
  {
    name: "All the tokens",
    settings: {
      "4 Maps": 'tokens',
      "5 Maps": 'tokens',
      "6 Maps": 'tokens',
      "7 Maps": 'tokens',
      "4 Compasses": 'tokens',
      "5 Compasses": 'tokens',
      "6 Compasses": 'tokens',
      "7 Compasses": 'tokens',
      "2 Boss Keys": 'tokens',
      "3 Boss Keys": 'tokens',
      "Map & Compass in Deku Tree": 'tokens',
      "Map & Compass in Jabu-Jabu": 'tokens',
      "Map & Compass in Dodongo's Cavern": 'tokens',
      "Map & Compass in Forest Temple": 'tokens',
      "Map & Compass in Fire Temple": 'tokens',
      "Map & Compass in Water Temple": 'tokens',
      "Map & Compass in Shadow Temple": 'tokens',
      "Map & Compass in Spirit Temple": 'tokens',
      "Map & Compass in Bottom of the Well": 'tokens',
      "Map & Compass in Ice Cavern": 'tokens',
      "3 Swords": 'tokens',
      "3 Shields": 'tokens',
      "3 Tunics": 'tokens',
      "3 Boots": 'tokens',
      "3 Swords & 3 Shields": 'tokens',
      "3 Swords & 3 Tunics": 'tokens',
      "3 Swords & 3 Boots": 'tokens',
      "3 Shields & 3 Tunics": 'tokens',
      "3 Shields & 3 Boots": 'tokens',
      "3 Tunics & 3 Boots": 'tokens',
      "3 Swords, Tunics, Boots, and Shields": 'tokens',
      "Two Fairy Spells": 'tokens',
      "All 3 Elemental Arrows": 'tokens',
      "3 songs": 'tokens',
      "4 Songs": 'tokens',
      "6 Songs": 'tokens',
      "7 Songs": 'tokens',
      "8 Songs": 'tokens',
      "9 Songs": 'tokens',
      "10 Songs": 'tokens',
      "5 Magic Beans": 'tokens',
      "7 Magic Beans": 'tokens',
      "9 Magic Beans": 'tokens',
      "All 3 Kokiri Forest area Skulltulas": 'tokens',
      "All 4 Lost Woods area Skulltulas": 'tokens',
      "Both Hyrule Field area Skulltulas": 'tokens',
      "All 4 Market area Skulltulas": 'tokens',
      "All 4 Lon-Lon Ranch area Skulltulas": 'tokens',
      "All 8 Kakariko area Skulltulas": 'tokens',
      "All 8 Death Mountain area Skulltulas": 'tokens',
      "All 8 Zora's Domain area Skulltulas": 'tokens',
      "3 Lake Hylia Skulltulas": 'tokens',
      "All 5 Lake Hylia Skulltulas": 'tokens',
      "All 4 Gerudo Valley area Skulltulas": 'tokens',
      "Both Gerudo's Fortress area Skulltulas": 'tokens',
      "All 4 Wasteland/ Colossus area Skulltulas": 'tokens',
      "All 4 Lon-Lon Ranch area Skulltulas": 'tokens',
      "All 4 Skulltulas in Deku Tree": 'tokens',
      "All 5 Skulltulas in Dodongo's Cavern": 'tokens',
      "All 4 Skulltulas in Jabu-Jabu": 'tokens',
      "All 5 Skulltulas in Forest Temple": 'tokens',
      "All 5 Skulltulas in Fire Temple": 'tokens',
      "All 5 Skulltulas in Water Temple": 'tokens',
      "3 Skulltulas in Water Temple": 'tokens',
      "All 5 Skulltulas in Shadow Temple": 'tokens',
      "4 Skulltulas in Shadow Temple": 'tokens',
      "All 5 Skulltulas in Spirit Temple": 'tokens',
      "All 3 Skulltulas in Ice Cavern": 'tokens',
      "All 3 Skulltulas in Bottom of the Well": 'tokens',
      "15 Different Skulltulas": 'tokens',
      "Stone of Agony": 'none',
      "1 Skulltula from each Child Dungeon": 'tokens',
      "1 Skulltula from each Adult Dungeon": 'tokens',
      "1 unused small key in each Adult Dungeon": 'tokens',
      "4 Unused Keys in Forest Temple": 'tokens',
      "3 unused keys in Gerudo Training Grounds": 'tokens',
      "4 unused keys in Gerudo Training Grounds": 'tokens',
      "5 unused keys in Gerudo Training Grounds": 'tokens',
      "6 unused keys in Gerudo Training Grounds": 'tokens',
      "7 different unused keys in Gerudo Training Grounds": 'tokens',
      "8 different unused keys in Gerudo Training Grounds": 'tokens',
      "9 different unused keys in Gerudo Training Grounds": 'tokens',
      "Obtain all 5 Small Keys in Forest Temple": 'tokens',
      "Open all 8 Small Key chests in Fire Temple": 'tokens',
      "Obtain all 5 Small Keys in Shadow Temple": 'tokens',
      "Both heart pieces in Lost Woods": 'tokens',
      "Both heart pieces in Death Mountain Crater": 'tokens',
      "5 Zora Area HPs": 'tokens',
      "Both Gerudo Valley HPs": 'tokens',
      "Defeat 4 Different Iron Knuckles": 'tokens',
      "Free all 9 gorons in Fire Temple": 'tokens'
    }
  }
]
