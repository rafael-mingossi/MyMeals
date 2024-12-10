import React, {useState} from 'react';
import {Pressable, ScrollView} from 'react-native';

import {FoodCategory, useGetFoodCategories} from '@domain';
import {ViewStyle} from 'react-native/types';

import {
  ActivityIndicator,
  Box,
  BoxProps,
  Icon,
  Text,
  TouchableOpacityBox,
} from '@components';

interface CategoryDropdownProps {
  value?: number;
  onChange: (category: FoodCategory) => void;
  error?: string;
}

export function CategoryDropdown({
  value,
  onChange,
  error,
}: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {foodCategories, isLoading} = useGetFoodCategories();

  function toggleDropdown() {
    setIsOpen(prev => !prev);
  }

  function handleSelect(category: FoodCategory) {
    onChange(category);
    setIsOpen(false);
  }

  const selectedCategory = foodCategories.find(
    cat => cat.id === (value ? value : undefined),
  );

  return (
    <Box>
      {isOpen && (
        <Pressable style={$overlay} onPress={() => setIsOpen(false)} />
      )}
      <Text mb="s4">Food category</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <TouchableOpacityBox onPress={toggleDropdown}>
          <Box flexDirection="row" columnGap="s10" alignItems="center">
            <Box
              borderColor={error ? 'error' : 'bluePrimary'}
              {...$dropdownWrapperClosed}>
              {selectedCategory ? (
                <Icon name={selectedCategory.description} size={30} />
              ) : null}
            </Box>
            <Box flex={1}>
              <Text>{selectedCategory?.name}</Text>
            </Box>
            <Box style={{transform: [{rotate: isOpen ? '90deg' : '270deg'}]}}>
              <Icon name="chevronleft" />
            </Box>
          </Box>
        </TouchableOpacityBox>
      )}

      {isOpen && (
        <Box {...$dropdownWrapperOpen}>
          <ScrollView
            // props to fix scroll on Android
            nestedScrollEnabled
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{
              flexGrow: 1,
            }}>
            {foodCategories.map(category => (
              <TouchableOpacityBox
                key={category.id}
                padding="s12"
                flexDirection="row"
                alignItems="center"
                columnGap="s10"
                onPress={() => handleSelect(category)}
                style={{
                  backgroundColor:
                    selectedCategory?.id === category.id
                      ? 'backgroundSelected'
                      : 'transparent',
                }}>
                <Box {...$boxClosed}>
                  <Icon name={category?.description || 'beans'} size={25} />
                </Box>
                <Text>{category.name}</Text>
              </TouchableOpacityBox>
            ))}
          </ScrollView>
        </Box>
      )}
      {error && (
        <Text preset="paragraphSmall" font="bold" color="error" mt="s4">
          {error}
        </Text>
      )}
    </Box>
  );
}

const $overlay: ViewStyle = {
  position: 'absolute',
  top: -60,
  left: -20,
  right: -20,
  bottom: -700,
  backgroundColor: 'transparent',
  zIndex: 1,
};

const $dropdownWrapperClosed: BoxProps = {
  borderWidth: 1,
  borderRadius: 's8',
  width: 40,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
};

const $dropdownWrapperOpen: BoxProps = {
  position: 'absolute',
  top: 70,
  left: 0,
  right: 0,
  maxHeight: 310,
  backgroundColor: 'background',
  borderRadius: 's8',
  borderWidth: 1,
  borderColor: 'bluePrimary',
  elevation: 5,
  zIndex: 3,
};

const $boxClosed: BoxProps = {
  width: 40,
  height: 40,
  borderWidth: 1,
  borderColor: 'bluePrimary',
  borderRadius: 's8',
  justifyContent: 'center',
  alignItems: 'center',
};
