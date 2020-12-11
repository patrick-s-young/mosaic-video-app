import type { ButtonConfig } from 'components/button.config';
import { numTilesAllPossibleValues } from 'features/mosaicVideo/mosaicSlice';

interface GetMosaicSelectorConfig {
  (): Array<ButtonConfig>
}

// instead of function store value in const
export const getMosaicSelectorConfig: GetMosaicSelectorConfig = () => {

  return numTilesAllPossibleValues.map(numTiles => {
    return {
      stateValue: numTiles,
      imagePath: `images/0${numTiles}_mosaic_selector_64x64_on.png`,
      className: {
        default: 'mosaicSelector-button-default',
        hilite: 'mosaicSelector-button-hilite' 
      },
      altText: `Click for ${numTiles}-tile video mosaic`
    }
  });
}
