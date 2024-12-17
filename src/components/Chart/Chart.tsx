import React, {useMemo} from 'react';
import {Dimensions} from 'react-native';

import {PieChart} from 'react-native-chart-kit';

import {useAppTheme} from '@hooks';

const screenWidth = Dimensions.get('window').width;

interface BaseChartProps {
  id: number;
  createdAt: string;
  userId: string;
  label: string;
  servSize: number;
  servUnit: string;
}

interface MacrosData {
  protein: number;
  carbs: number;
  fat: number;
}

interface ChartCommonProps extends BaseChartProps {
  //Foods
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;

  //Recipes
  totalCalories?: number;
  totalProtein?: number;
  totalCarbs?: number;
  totalFat?: number;

  categoryId?: number | null;
}

interface MacrosPieChartProps<T extends ChartCommonProps> {
  item: T;
  quantity?: number;
}

export function Chart<T extends ChartCommonProps>({
  item,
  quantity = 1,
}: MacrosPieChartProps<T>) {
  const {colors} = useAppTheme();
  const chartConfig = {
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  const macros = useMemo(() => {
    const isRecipe = 'totalProtein' in item;

    const macrosData: MacrosData = {
      protein: isRecipe
        ? (item.totalProtein || 0) * quantity
        : (item.protein || 0) * quantity,
      carbs: isRecipe
        ? (item.totalCarbs || 0) * quantity
        : (item.carbs || 0) * quantity,
      fat: isRecipe
        ? (item.totalFat || 0) * quantity
        : (item.fat || 0) * quantity,
    };

    return macrosData;
  }, [item, quantity]);

  const chartData = useMemo(() => {
    return [
      {
        name: 'Protein',
        value: macros.protein,
        color: colors.red,
        legendFontColor: colors.gray,
        legendFontSize: 12,
      },
      {
        name: 'Carbs',
        value: macros.carbs,
        color: colors.orangePrimary,
        legendFontColor: colors.gray,
        legendFontSize: 12,
      },
      {
        name: 'Fat',
        value: macros.fat,
        color: colors.bluePrimary,
        legendFontColor: colors.gray,
        legendFontSize: 12,
      },
    ];
  }, [
    colors.bluePrimary,
    colors.gray,
    colors.orangePrimary,
    colors.red,
    macros.carbs,
    macros.fat,
    macros.protein,
  ]);

  // Calculate total macros for percentage display
  const totalMacros = macros.protein + macros.carbs + macros.fat;

  // Add percentage to the legend
  const dataWithPercentages = chartData.map(val => ({
    ...val,
    name: `${val.name} (${((val.value / totalMacros) * 100).toFixed(1)}%)`,
  }));

  return (
    <PieChart
      data={dataWithPercentages}
      width={screenWidth - 40}
      height={220}
      chartConfig={chartConfig}
      accessor="value"
      backgroundColor="transparent"
      paddingLeft="5"
      center={[10, 0]}
      hasLegend
      absolute
    />
  );
}
