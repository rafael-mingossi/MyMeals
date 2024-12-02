import React, {useState} from 'react';
import {ScrollView} from 'react-native';

import {FoodCategory, useGetFoodCategories} from '@domain';

import {
  ActivityIndicator,
  Box,
  BoxProps,
  Icon,
  IconProps,
  Text,
  TouchableOpacityBox,
} from '@components';

interface CategoryDropdownProps {
  value?: string;
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
    cat => cat.id === (value ? parseInt(value, 10) : undefined),
  );

  return (
    <Box>
      <Text mb="s4">Food category</Text>
      <TouchableOpacityBox onPress={toggleDropdown}>
        <Box flexDirection="row" columnGap="s10" alignItems="center">
          <Box
            borderColor={error ? 'error' : 'bluePrimary'}
            {...$dropdownWrapperClosed}>
            {selectedCategory ? (
              <Icon
                name={selectedCategory.description as IconProps['name']}
                size={24}
              />
            ) : null}
          </Box>
          <Box flex={1}>
            <Text>{selectedCategory?.name ?? 'Select category'}</Text>
          </Box>
          <Box style={{transform: [{rotate: isOpen ? '90deg' : '270deg'}]}}>
            <Icon name="chevronleft" />
          </Box>
        </Box>
      </TouchableOpacityBox>

      {isOpen && (
        <Box {...$dropdownWrapperOpen}>
          <ScrollView
            // Add these props for Android
            nestedScrollEnabled
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{
              flexGrow: 1,
            }}>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              foodCategories.map(category => (
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
                    <Icon
                      name={
                        (selectedCategory?.description as IconProps['name']) ||
                        'beans'
                      }
                      size={24}
                    />
                  </Box>
                  <Text>{category.name}</Text>
                </TouchableOpacityBox>
              ))
            )}
          </ScrollView>
        </Box>
      )}
      {error && (
        <Text color="error" fontSize={12} mt="s4">
          {error}
        </Text>
      )}
    </Box>
  );
}

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
  maxHeight: 300,
  backgroundColor: 'background',
  borderRadius: 's8',
  borderWidth: 1,
  borderColor: 'bluePrimary',
  elevation: 5,
  zIndex: 2,
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
