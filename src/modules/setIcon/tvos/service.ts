import { config } from './config';
import { addIosImageSetContents } from '../../../services/ios/service';
import {
  checkImageIsSquare,
  generateResizedAssetsWithoutAlpha,
} from '../../../services/image.processing';

export const addTvosIcon = async (iconSource: string, backgroundSource: string) => {
  try {
    const tvosIconFolder = addIosImageSetContents('AppIcon');
    await generateIosIcons(iconSource, iosIconFolder);
  } catch (err) {
    console.log(err);
  }
};

const generateIosIcons = (iconSource: string, iosIconFolder: string) =>
  Promise.all(
    config.iosIconSizes.map(size =>
      Promise.all(
        size.multipliers.map(multiplier =>
          generateResizedAssetsWithoutAlpha(
            iconSource,
            `${iosIconFolder}/icon-${size.size}@${multiplier}x.png`,
            size.size * multiplier
          )
        )
      )
    )
  );
