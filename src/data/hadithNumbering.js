// The site cites hadiths by their Arabic-edition numbers. Where the library (hadithapi.com)
// numbers a hadith differently, record it here as: book slug → cited number → library number.
//
// Sahih Muslim is cited by the Muhammad Fu'ad 'Abd al-Baqi numbering, while the library counts
// its 7,563 narrations one after another. The entries below were found by matching each cited
// hadith's text in the open fawazahmed0/hadith-api dataset, which counts the same way. They are
// provisional until each has been opened in the library and confirmed to be the hadith quoted.
export const HADITH_NUMBER_MAP = {
  'sahih-muslim': {
    8: 93,
    16: 111,
    26: 136,
    384: 849,
    385: 850,
    403: 902,
    482: 1083,
    580: 1309,
    582: 1315,
    588: 1324,
    591: 1334,
    594: 1343,
    596: 1349,
    684: 1566,
    772: 1814,
    809: 1883,
    854: 1976,
    1134: 2666,
    1151: 2704,
    1162: 2747,
    2135: 5598,
    2379: 6162,
    2653: 6749,
    2691: 6842,
    2695: 6847,
    2704: 6862,
    2723: 6907,
  },
}
