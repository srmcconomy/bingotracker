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

games.mm = "Majora's Mask";

regexes.mm = [
  {
    regex: /(\d+).*(?:Magic Beans|bean plants)/,
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
    regex: /(\d+) masks$/,
    options: {
      counter: {
        denominator: matches => +matches[1],
        icon: 'keatonmask'
      }
    }
  },
  {
    regex: /(\d+).*(?:Notebook [Rr]ibbons|pictures in Notebook)/,
    options: {
      counter: {
        denominator: matches => +matches[1],
        icon: 'notebook'
      }
    }
  },
  {
    regex: /(\d+).*(?:Fairies|total stray fairies|fairies in GBT)/,
    options: {
      counter: {
        denominator: matches => +matches[1],
        icon: 'strayfairy'
      }
    }
  },
  {
    regex: /7 fairies in every temple/,
    options: {
      tokens: {
        rows: [
          ['woodfall', 'snowhead', 'greatbay', 'stt']
        ]
      }
    }
  },
  {
    regex: /(\d+).*Skulltula Tokens/,
    options: {
      counter: {
        denominator: matches => +matches[1],
        icon: 'skulltula'
      }
    }
  },
  {
    regex: /All top row songs/,
    options: {
      tokens: {
        rows: [
          ['time', 'zl', 'suns', 'eponas', 'storms']
        ]
      },
      counter: {
        denominator: 5,
        icon: 'song'
      }
    }
  },
  {
    regex: /(\d+).*bottom row songs/,
    options: {
      tokens: {
        rows: [
          ['minuet', 'bolero', 'serenade', 'requiem', 'nocturne']
        ]
      },
      counter: {
        denominator: matches => +matches[1],
        icon: 'song'
      }
    }
  },
  {
    regex: /(\d+) songs/,
    options: {
      tokens: {
        rows: [
          ['time', 'zl', 'suns', 'eponas', 'storms'],
          ['minuet', 'bolero', 'serenade', 'requiem', 'nocturne']
        ]
      },
      counter: {
        denominator: matches => +matches[1],
        icon: 'song'
      }
    }
  },
  {
    regex: /(\d+).*Boss Keys/,
    options: {
      tokens: {
        rows: [
          ['woodfall', 'snowhead', 'greatbay', 'stt']
        ]
      },
      counter: {
        denominator: matches => +matches[1],
        icon: 'bk'
      }
    }
  },
  {
    regex: /All temple maps/,
    options: {
      tokens: {
        rows: [
          ['woodfall', 'snowhead', 'greatbay', 'stt']
        ]
      },
      counter: {
        denominator: 4,
        icon: 'map'
      }
    }
  },
  {
    regex: /(\d+).*Compasses/,
    options: {
      tokens: {
        rows: [
          ['woodfall', 'snowhead', 'greatbay', 'stt']
        ]
      },
      counter: {
        denominator: matches => +matches[1],
        icon: 'compass'
      }
    }
  },
  {
    regex: /(\d+).*boss remains/,
    options: {
      tokens: {
        rows: [
          ['woodfall', 'snowhead', 'greatbay', 'stt']
        ]
      },
      counter: {
        denominator: matches => +matches[1],
        icon: 'woodfall'
      }
    }
  },
  {
    regex: /(\d+).*elemental arrows/,
    options: {
      tokens: {
        rows: [
          ['firearrows', 'icearrows', 'lightarrows']
        ]
      },
      counter: {
        denominator: matches => +matches[1],
        icon: 'firearrows'
      }
    }
  },
  {
    regex: /(\d+).*[Ss]mall [Kk]eys/,
    options: {
      counter: {
        denominator: matches => +matches[1],
        icon: 'key'
      }
    }
  },
  {
    regex: /(\d+).*bottles/,
    options: {
      counter: {
        denominator: matches => +matches[1],
        icon: 'bottle'
      }
    }
  },
  {
    regex: /(\d+).*unique bottle contents/,
    options: {
      tokens: {
        class: 'smalltokens',
        rows: [
          ['springwater', 'hotspringwater', 'halfmilk', 'milk', 'chateauromani', 'fairy', 'bugs', 'fish', 'golddust'],
          ['redpotion', 'greenpotion', 'bluepotion', 'poe', 'bigpoe', 'magicmushroom', 'zoraegg', 'seahorse', 'dekuprincess']
        ]
      },
      counter: {
        denominator: matches => +matches[1],
        icon: 'bottle'
      }
    }
  },
  {
    regex: /Red, Green, and Blue Potions/,
    options: {
      tokens: {
        rows: [
          ['redpotion', 'greenpotion', 'bluepotion']
        ]
      }
    }
  },
  {
    regex: /Map and Compass/,
    options: {
      tokens: {
        rows: [
          ['map', 'compass']
        ]
      }
    }
  },
  {
    regex: /All Area Maps from Tingle/,
    options: {
      counter: {
        denominator: 6,
        icon: 'map'
      }
    }
  },
  {
    regex: /Captain's Hat, Gibdo Mask, and Garo Mask/,
    options: {
      tokens: {
        rows: [
          ['captainshat', 'gibdomask', 'garomask']
        ]
      }
    }
  },
  {
    regex: /Column of 4 masks on pause/,
    options: {
      selecttokens: {
        rows: [
          ['postmanshat', 'keatonmask', 'romanimask', 'kamarosmask'],
          ['allnightmask', 'bremenmask', 'circusleadersmask', 'gibdomask'],
          ['blastmask', 'bunnyhood', 'kafeismask', 'garomask'],
          ['stonemask', 'dongerosmask', 'couplesmask', 'captainshat'],
          ['greatfairymask', 'maskofscents', 'maskoftruth', 'giantsmask'],
          ['dekumask', 'goron', 'zoramask', 'fiercedeitymask'],
        ]
      }
    }
  },
  {
    regex: /Row of 6 masks on pause/,
    options: {
      selecttokens: {
        rows: [
          ['postmanshat', 'allnightmask', 'blastmask', 'stonemask', 'greatfairymask', 'dekumask'],
          ['keatonmask', 'bremenmask', 'bunnyhood', 'dongerosmask', 'maskofscents', 'goron'],
          ['romanimask', 'circusleadersmask', 'kafeismask', 'couplesmask', 'maskoftruth', 'zoramask'],
          ['kamarosmask', 'gibdomask', 'garomask', 'captainshat', 'giantsmask', 'fiercedeitymask'],
        ]
      }
    }
  },
  {
    regex: /Diagonal of 4 slots in item inventory/,
    options: {
      selecttokens: {
        rows: [
          ['ocarina', 'bombchu', 'well', 'bottle'],
          ['bow', 'stick', 'mmhookshot', 'bottle'],
          ['firearrows', 'nut', 'greatfairysword', 'bottle'],
          ['bottle', 'pictograph', 'stick', 'icearrows'],
          ['bottle', 'well', 'nut', 'lightarrows'],
          ['bottle', 'mmhookshot', 'bean', 'roomkey'],
        ]
      }
    }
  }
]

goallist.mm = [
  "20 Magic Beans",
  "Woodfall Map and Compass",
  "7 masks",
  "6 Notebook Ribbons",
  "All 5 Termina Grotto HPs",
  "10 Woodfall Fairies",
  "15 Oceanside Skulltula Tokens",
  "Kill 2 Iron Knuckles",
  "All Area Maps from Tingle",
  "4 Business Scrub HPs",
  "10 Notebook ribbons",
  "All top row songs",
  "10 masks",
  "3 real bottles (no dupe)",
  "Column of 4 masks on pause",
  "Grow 8 bean plants",
  "45 Skulltula Tokens",
  "Captain's Hat, Gibdo Mask, and Garo Mask",
  "Row of 6 masks on pause",
  "Red, Green, and Blue Potions",
  "12 masks",
  "3 bottom row songs",
  "All 3 Photo Hut Area HPs",
  "Diagonal of 4 slots in item inventory",
  "Snowhead Map and Compass",
  "5 HPs in East Clock Town",
  "3 unused small keys in Snowhead",
  "4 Total Unused Small Keys",
  "4 real bottles (no dupe)",
  "2 Boss Keys",
  "Hit all 10 owls",
  "5 STT Fairies",
  "20 pictures in Notebook",
  "7 songs",
  "10 unique bottle contents",
  "14 masks",
  "STT Map and Compass",
  "GBT Map and Compass",
  "2 boss remains",
  "10 Snowhead Fairies",
  "20 total stray fairies",
  "10 STT Fairies",
  "10 fairies in GBT",
  "2 elemental arrows",
  "2 unused small keys in Stone Tower",
  "3 Temple Compasses",
  "15 Notebook ribbons",
  "All temple maps",
  "30 total stray fairies",
  "7 fairies in every temple"
]

defaults.mm = [
  {
    name: "Non-atomic only",
    settings: {
      "20 Magic Beans": 'counter',
      "Woodfall Map and Compass": 'none',
      "7 masks": 'counter',
      "6 Notebook Ribbons": 'counter',
      "All 5 Termina Grotto HPs": 'counter',
      "10 Woodfall Fairies": 'none',
      "15 Oceanside Skulltula Tokens": 'none',
      "Kill 2 Iron Knuckles": 'none',
      "All Area Maps from Tingle": 'counter',
      "4 Business Scrub HPs": 'counter',
      "10 Notebook ribbons": 'counter',
      "All top row songs": 'tokens',
      "10 masks": 'counter',
      "3 real bottles (no dupe)": 'counter',
      "Column of 4 masks on pause": 'selecttokens',
      "Grow 8 bean plants": 'counter',
      "45 Skulltula Tokens": 'counter',
      "Captain's Hat, Gibdo Mask, and Garo Mask": 'tokens',
      "Row of 6 masks on pause": 'selecttokens',
      "Red, Green, and Blue Potions": 'tokens',
      "12 masks": 'counter',
      "3 bottom row songs": 'tokens',
      "All 3 Photo Hut Area HPs": 'counter',
      "Diagonal of 4 slots in item inventory": 'selecttokens',
      "Snowhead Map and Compass": 'none',
      "5 HPs in East Clock Town": 'counter',
      "3 unused small keys in Snowhead": 'none',
      "4 Total Unused Small Keys": 'counter',
      "4 real bottles (no dupe)": 'counter',
      "2 Boss Keys": 'tokens',
      "Hit all 10 owls": 'none',
      "5 STT Fairies": 'none',
      "20 pictures in Notebook": 'counter',
      "7 songs": 'tokens',
      "10 unique bottle contents": 'tokens',
      "14 masks": 'counter',
      "STT Map and Compass": 'none',
      "GBT Map and Compass": 'none',
      "2 boss remains": 'tokens',
      "10 Snowhead Fairies": 'none',
      "20 total stray fairies": 'counter',
      "10 STT Fairies": 'none',
      "10 fairies in GBT": 'none',
      "2 elemental arrows": 'tokens',
      "2 unused small keys in Stone Tower": 'none',
      "3 Temple Compasses": 'tokens',
      "15 Notebook ribbons": 'counter',
      "All temple maps": 'tokens',
      "30 total stray fairies": 'counter',
      "7 fairies in every temple": 'tokens'
    }
  }
]
