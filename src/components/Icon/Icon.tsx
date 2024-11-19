import React, {ComponentProps} from 'react';
import {Pressable} from 'react-native';

import {
  ArrowLeftIcon,
  AvatarIcon,
  AvatarFillIcon,
  DashboardFillIcon,
  DashboardIcon,
  FoodFillIcon,
  FoodIcon,
  RecipeFillIcon,
  RecipeIcon,
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
  dashboard: DashboardIcon,
  dashboardFill: DashboardFillIcon,
  food: FoodIcon,
  foodFill: FoodFillIcon,
  recipe: RecipeIcon,
  recipeFill: RecipeFillIcon,
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
