import React, {ComponentProps} from 'react';
import {Pressable} from 'react-native';

import {
  ArrowLeftIcon,
  AvatarIcon,
  AvatarFillIcon,
  DashboardFillIcon,
  DashboardIcon,
  EnvelopeIcon,
  EyeOnIcon,
  EyeOffIcon,
  FoodFillIcon,
  FoodIcon,
  PadlockIcon,
  RecipeFillIcon,
  RecipeIcon,
  BeansIcon,
  BeveragesIcon,
  BreadsIcon,
  CheeseIcon,
  CondimentsIcon,
  DairyIcon,
  FatsIcon,
  FishIcon,
  FruitCannedIcon,
  FruitRawIcon,
  GrainsIcon,
  MeatsIcon,
  NutsIcon,
  PoultryIcon,
  SpicesIcon,
  StocksIcon,
  SweetsIcon,
  VegCannedIcon,
  VegRawIcon,
} from '@assets';

import {useAppTheme} from '@hooks';
import {ThemeColours} from '@theme';

import {CalendarIcon} from '../../assets/icons/CalendarIcon.tsx';
import {ChevronLeftIcon} from '../../assets/icons/ChevronLeftIcon.tsx';
import {ChevronRightIcon} from '../../assets/icons/ChevronRightIcon.tsx';

export interface IconBase {
  size?: number;
  color?: string;
  fillColor?: string;
}

export interface IconProps {
  name: IconName;
  color?: ThemeColours;
  fillColor?: ThemeColours;
  size?: number;
  onPress?: () => void;
}

type IconName = keyof typeof iconRegistry;

const iconRegistry = {
  arrowLeft: ArrowLeftIcon,
  avatar: AvatarIcon,
  avatarFill: AvatarFillIcon,
  calendar: CalendarIcon,
  chevronleft: ChevronLeftIcon,
  chevronright: ChevronRightIcon,
  dashboard: DashboardIcon,
  dashboardFill: DashboardFillIcon,
  envelope: EnvelopeIcon,
  eyeOn: EyeOnIcon,
  eyeOff: EyeOffIcon,
  food: FoodIcon,
  foodFill: FoodFillIcon,
  padlock: PadlockIcon,
  recipe: RecipeIcon,
  recipeFill: RecipeFillIcon,

  // FOOD CATEGORY ICONS
  beans: BeansIcon,
  beverages: BeveragesIcon,
  breads: BreadsIcon,
  cheese: CheeseIcon,
  condiments: CondimentsIcon,
  dairy: DairyIcon,
  fats: FatsIcon,
  fish: FishIcon,
  fruitCanned: FruitCannedIcon,
  fruitRaw: FruitRawIcon,
  grains: GrainsIcon,
  meats: MeatsIcon,
  nuts: NutsIcon,
  poultry: PoultryIcon,
  spices: SpicesIcon,
  stocks: StocksIcon,
  sweets: SweetsIcon,
  vegCanned: VegCannedIcon,
  vegRaw: VegRawIcon,
};

export function Icon({
  name,
  onPress,
  color = 'backgroundContrast',
  fillColor = 'background',
  size,
}: IconProps) {
  const {colors} = useAppTheme();
  const SVGIcon = iconRegistry[name];

  const iconProps: ComponentProps<typeof SVGIcon> = {
    size,
    fillColor: colors[fillColor],
    color: colors[color],
  };

  if (onPress) {
    return (
      <Pressable testID={name} onPress={onPress} hitSlop={10}>
        <SVGIcon {...iconProps} />
      </Pressable>
    );
  }

  return <SVGIcon {...iconProps} />;
}
