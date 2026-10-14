import adamSections from '@/data/adamSections.js'
import adam from '@/data/content/adam/en.js'
import idrisSections from '@/data/idrisSections.js'
import idris from '@/data/content/idris/en.js'
import nuhSections from '@/data/nuhSections.js'
import nuh from '@/data/content/nuh/en.js'
import hudSections from '@/data/hudSections.js'
import hud from '@/data/content/hud/en.js'
import salihSections from '@/data/salihSections.js'
import salih from '@/data/content/salih/en.js'
import ibrahimSections from '@/data/ibrahimSections.js'
import ibrahimJourney from '@/data/ibrahimJourney.js'
import ibrahim from '@/data/content/ibrahim/en.js'
import lutSections from '@/data/lutSections.js'
import lut from '@/data/content/lut/en.js'
import ismailSections from '@/data/ismailSections.js'
import ismail from '@/data/content/ismail/en.js'
import ishaqSections from '@/data/ishaqSections.js'
import ishaq from '@/data/content/ishaq/en.js'
import yaqubSections from '@/data/yaqubSections.js'
import yaqub from '@/data/content/yaqub/en.js'
import yusufSections from '@/data/yusufSections.js'
import yusuf from '@/data/content/yusuf/en.js'
import ayyubSections from '@/data/ayyubSections.js'
import ayyub from '@/data/content/ayyub/en.js'
import shuaybSections from '@/data/shuaybSections.js'
import shuayb from '@/data/content/shuayb/en.js'

// The written stories, by prophet slug: the shared structure, the English words and, where one
// has been drawn, the stops of the prophet's journey.
export const PROPHET_STORIES = {
  adam: { sections: adamSections, content: adam },
  idris: { sections: idrisSections, content: idris },
  nuh: { sections: nuhSections, content: nuh },
  hud: { sections: hudSections, content: hud },
  salih: { sections: salihSections, content: salih },
  ibrahim: { sections: ibrahimSections, content: ibrahim, journey: ibrahimJourney },
  lut: { sections: lutSections, content: lut },
  ismail: { sections: ismailSections, content: ismail },
  ishaq: { sections: ishaqSections, content: ishaq },
  yaqub: { sections: yaqubSections, content: yaqub },
  yusuf: { sections: yusufSections, content: yusuf },
  ayyub: { sections: ayyubSections, content: ayyub },
  shuayb: { sections: shuaybSections, content: shuayb },
}
