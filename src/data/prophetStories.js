import adamSections from '@/data/adamSections.js'
import adam from '@/data/content/adam/en.js'
import idrisSections from '@/data/idrisSections.js'
import idris from '@/data/content/idris/en.js'
import nuhSections from '@/data/nuhSections.js'
import nuh from '@/data/content/nuh/en.js'
import ibrahimSections from '@/data/ibrahimSections.js'
import ibrahimJourney from '@/data/ibrahimJourney.js'
import ibrahim from '@/data/content/ibrahim/en.js'

// The written stories, by prophet slug: the shared structure, the English words and, where one
// has been drawn, the stops of the prophet's journey.
export const PROPHET_STORIES = {
  adam: { sections: adamSections, content: adam },
  idris: { sections: idrisSections, content: idris },
  nuh: { sections: nuhSections, content: nuh },
  ibrahim: { sections: ibrahimSections, content: ibrahim, journey: ibrahimJourney },
}
