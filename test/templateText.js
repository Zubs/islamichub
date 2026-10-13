const TAG = /<!--[\s\S]*?-->|<\/?[A-Za-z](?:"[^"]*"|'[^']*'|[^'">])*>/g
const WORD = /[A-Za-z]{2}/

// The text typed straight into a component's template: text nodes, listed attributes, and
// phrases in quotes inside expressions. Text read from a message or content file is not found.
export function hardCodedText(source) {
  const template = source.slice(
    source.indexOf('<template>') + 10,
    source.lastIndexOf('</template>'),
  )
  const found = []
  let position = 0
  let raw = false
  for (const match of template.matchAll(TAG)) {
    const text = template.slice(position, match.index)
    const outside = text.replace(/\{\{[\s\S]*?\}\}/g, '')
    if (!raw && WORD.test(outside)) {
      found.push(outside.trim().slice(0, 60))
    }

    for (const expression of text.matchAll(/\{\{([\s\S]*?)\}\}/g)) {
      const literals = expression[1].match(/'[^']*[A-Za-z]{3} [A-Za-z][^']*'/g) ?? []
      found.push(...literals.filter((literal) => !literal.includes('.')))
    }

    const tag = match[0]
    if (/^<(code|svg|style)\b/.test(tag)) {
      raw = true
    } else if (/^<\/(code|svg|style)>/.test(tag)) {
      raw = false
    }

    for (const attribute of tag.matchAll(/\s(placeholder|aria-label|title|alt)="([^"]*)"/g)) {
      if (WORD.test(attribute[2])) {
        found.push(`${attribute[1]}="${attribute[2]}"`)
      }
    }
    position = match.index + tag.length
  }

  return found
}
