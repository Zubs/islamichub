import adamSections from '@/data/adamSections.js'
import adam from '@/data/content/adam/en.js'
import idrisSections from '@/data/idrisSections.js'
import idris from '@/data/content/idris/en.js'
import nuhSections from '@/data/nuhSections.js'
import nuh from '@/data/content/nuh/en.js'
import nuhPlaces from '@/data/nuhPlaces.js'
import hudSections from '@/data/hudSections.js'
import hud from '@/data/content/hud/en.js'
import hudPlaces from '@/data/hudPlaces.js'
import salihSections from '@/data/salihSections.js'
import salih from '@/data/content/salih/en.js'
import salihPlaces from '@/data/salihPlaces.js'
import ibrahimSections from '@/data/ibrahimSections.js'
import ibrahimPlaces, { journey as ibrahimJourney } from '@/data/ibrahimPlaces.js'
import ibrahim from '@/data/content/ibrahim/en.js'
import lutSections from '@/data/lutSections.js'
import lut from '@/data/content/lut/en.js'
import lutPlaces from '@/data/lutPlaces.js'
import ismailSections from '@/data/ismailSections.js'
import ismail from '@/data/content/ismail/en.js'
import ismailPlaces from '@/data/ismailPlaces.js'
import ishaqSections from '@/data/ishaqSections.js'
import ishaq from '@/data/content/ishaq/en.js'
import yaqubSections from '@/data/yaqubSections.js'
import yaqub from '@/data/content/yaqub/en.js'
import yaqubPlaces, { journey as yaqubJourney } from '@/data/yaqubPlaces.js'
import yusufSections from '@/data/yusufSections.js'
import yusuf from '@/data/content/yusuf/en.js'
import yusufPlaces, { journey as yusufJourney } from '@/data/yusufPlaces.js'
import ayyubSections from '@/data/ayyubSections.js'
import ayyub from '@/data/content/ayyub/en.js'
import shuaybSections from '@/data/shuaybSections.js'
import shuayb from '@/data/content/shuayb/en.js'
import shuaybPlaces from '@/data/shuaybPlaces.js'
import musaSections from '@/data/musaSections.js'
import musa from '@/data/content/musa/en.js'
import musaPlaces from '@/data/musaPlaces.js'
import harunSections from '@/data/harunSections.js'
import harun from '@/data/content/harun/en.js'
import harunPlaces from '@/data/harunPlaces.js'
import dhulKiflSections from '@/data/dhul-kiflSections.js'
import dhulKifl from '@/data/content/dhul-kifl/en.js'
import dawudSections from '@/data/dawudSections.js'
import dawud from '@/data/content/dawud/en.js'
import dawudPlaces from '@/data/dawudPlaces.js'
import sulaymanSections from '@/data/sulaymanSections.js'
import sulayman from '@/data/content/sulayman/en.js'
import sulaymanPlaces from '@/data/sulaymanPlaces.js'
import ilyasSections from '@/data/ilyasSections.js'
import ilyas from '@/data/content/ilyas/en.js'
import alYasaSections from '@/data/al-yasaSections.js'
import alYasa from '@/data/content/al-yasa/en.js'
import yunusSections from '@/data/yunusSections.js'
import yunus from '@/data/content/yunus/en.js'
import yunusPlaces from '@/data/yunusPlaces.js'
import zakariyyaSections from '@/data/zakariyyaSections.js'
import zakariyya from '@/data/content/zakariyya/en.js'
import zakariyyaPlaces from '@/data/zakariyyaPlaces.js'
import yahyaSections from '@/data/yahyaSections.js'
import yahya from '@/data/content/yahya/en.js'
import yahyaPlaces from '@/data/yahyaPlaces.js'
import isaSections from '@/data/isaSections.js'
import isa from '@/data/content/isa/en.js'
import isaPlaces from '@/data/isaPlaces.js'
import muhammadSections from '@/data/muhammadSections.js'
import muhammad from '@/data/content/muhammad/en.js'
import muhammadPlaces from '@/data/muhammadPlaces.js'

// The written stories, by prophet slug: the shared structure, the English words and, where known,
// the places of the prophet's life; `journey` is true when the places follow an order the sources give.
export const PROPHET_STORIES = {
  adam: { sections: adamSections, content: adam },
  idris: { sections: idrisSections, content: idris },
  nuh: { sections: nuhSections, content: nuh, places: nuhPlaces },
  hud: { sections: hudSections, content: hud, places: hudPlaces },
  salih: { sections: salihSections, content: salih, places: salihPlaces },
  ibrahim: {
    sections: ibrahimSections,
    content: ibrahim,
    places: ibrahimPlaces,
    journey: ibrahimJourney,
  },
  lut: { sections: lutSections, content: lut, places: lutPlaces },
  ismail: { sections: ismailSections, content: ismail, places: ismailPlaces },
  ishaq: { sections: ishaqSections, content: ishaq },
  yaqub: { sections: yaqubSections, content: yaqub, places: yaqubPlaces, journey: yaqubJourney },
  yusuf: { sections: yusufSections, content: yusuf, places: yusufPlaces, journey: yusufJourney },
  ayyub: { sections: ayyubSections, content: ayyub },
  shuayb: { sections: shuaybSections, content: shuayb, places: shuaybPlaces },
  musa: { sections: musaSections, content: musa, places: musaPlaces },
  harun: { sections: harunSections, content: harun, places: harunPlaces },
  'dhul-kifl': { sections: dhulKiflSections, content: dhulKifl },
  dawud: { sections: dawudSections, content: dawud, places: dawudPlaces },
  sulayman: { sections: sulaymanSections, content: sulayman, places: sulaymanPlaces },
  ilyas: { sections: ilyasSections, content: ilyas },
  'al-yasa': { sections: alYasaSections, content: alYasa },
  yunus: { sections: yunusSections, content: yunus, places: yunusPlaces },
  zakariyya: { sections: zakariyyaSections, content: zakariyya, places: zakariyyaPlaces },
  yahya: { sections: yahyaSections, content: yahya, places: yahyaPlaces },
  isa: { sections: isaSections, content: isa, places: isaPlaces },
  muhammad: { sections: muhammadSections, content: muhammad, places: muhammadPlaces },
}
