import React, {ComponentProps} from 'react';
import {Pressable} from 'react-native';

import {
  ArrowLeftIcon,
  AvatarIcon,
  AvatarFillIcon,
  BagIcon,
  CalendarIcon,
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
  PlusIcon,
  PoultryIcon,
  SpicesIcon,
  StocksIcon,
  SweetsIcon,
  VegCannedIcon,
  VegRawIcon,
  CheckRoundIcon,
  ErrorRoundIcon,
  MoreIcon,
  RecipesIcon,
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
} from '@assets';

import {useAppTheme} from '@hooks';
import {ThemeColours} from '@theme';

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
  bag: BagIcon,
  calendar: CalendarIcon,
  check: CheckIcon,
  checkRound: CheckRoundIcon,
  chevronleft: ChevronLeftIcon,
  chevronright: ChevronRightIcon,
  dashboard: DashboardIcon,
  dashboardFill: DashboardFillIcon,
  envelope: EnvelopeIcon,
  errorRound: ErrorRoundIcon,
  eyeOn: EyeOnIcon,
  eyeOff: EyeOffIcon,
  food: FoodIcon,
  foodFill: FoodFillIcon,
  more: MoreIcon,
  padlock: PadlockIcon,
  plus: PlusIcon,
  recipe: RecipeIcon,
  recipes: RecipesIcon,
  recipeFill: RecipeFillIcon,
  search: SearchIcon,

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
