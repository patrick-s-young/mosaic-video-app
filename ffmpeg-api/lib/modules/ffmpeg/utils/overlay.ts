////////////////////////
// OVERLAY
/////////////
const allOverlayFiltersObj = 
  {
    2: ['x=0:y=0', 'x=540:y=0'],
    3: ['x=0:y=0', 'x=360:y=0', 'x=720:y=0'],
    4: [
        'x=0:y=0',    'x=540:y=0', 
        'x=0:y=540',  'x=540:y=540'
        ],
    6: [
        'x=0:y=0',    'x=360:y=0',    'x=720:y=0', 
        'x=0:y=540',  'x=360:y=540',  'x=720:y=540'
       ],
    9: ['x=0:y=0',    'x=360:y=0', 'x=720:y=0',
        'x=0:y=360', 'x=360:y=360', 'x=720:y=360',
        'x=0:y=720', 'x=360:y=720', 'x=720:y=720']
  }

let overlayFilterStr = '[bg]';
let sequenceCounter = 0;

module.exports.createOverlayFilter = function (panelCount, sequenceCount) {
  const overlayFilterArr = allOverlayFiltersObj[panelCount];
  let panelCounter: number = 0;

  for (panelCounter = 0; panelCounter < panelCount; panelCounter++) {
    for (sequenceCounter = 0; sequenceCounter < sequenceCount; sequenceCounter++) {
      overlayFilterStr += `[input.${panelCounter}.${sequenceCounter}] overlay=${overlayFilterArr[panelCounter]}`;

      if (panelCounter === panelCount - 1 && sequenceCounter === sequenceCount - 1) {
        overlayFilterStr += ` [final]`
      } else {
        overlayFilterStr += ` [output.${panelCounter}.${sequenceCounter}];\n[output.${panelCounter}.${sequenceCounter}]`;
      }

    }
  }

  return overlayFilterStr;
}