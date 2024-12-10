import React, {useState} from 'react';
import {Modal, View, ViewStyle} from 'react-native';

import {Box, BoxProps, Icon, Text, TouchableOpacityBox} from '@components';

interface DropdownItem {
  label: string;
}

interface OptionsDropdownProps<TValue extends DropdownItem> {
  items: TValue[];
  onChange: (selected: TValue) => void;
}

export function OptionsDropdown<TValue extends DropdownItem>({
  items,
  onChange,
}: OptionsDropdownProps<TValue>) {
  const iconRef = React.useRef<View>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    right: 0,
  });

  function toggleDropdown() {
    if (!isOpen) {
      // Measure the position of the "more" icon before opening
      iconRef.current?.measure((x, y, width, height, pageX, pageY) => {
        setDropdownPosition({
          top: pageY + height,
          right: pageX,
        });
        setIsOpen(true);
      });
    } else {
      setIsOpen(false);
    }
  }

  function handleSelect(selected: TValue) {
    onChange(selected);
    setIsOpen(false);
  }

  return (
    <>
      <TouchableOpacityBox ref={iconRef} hitSlop={10} onPress={toggleDropdown}>
        <Icon name={'more'} size={18} />
      </TouchableOpacityBox>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        statusBarTranslucent={true}
        onRequestClose={() => setIsOpen(false)}>
        <TouchableOpacityBox
          style={$modalOverlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}>
          <Box
            {...$dropdownWrapper}
            style={{
              top: dropdownPosition.top,
              right: 20, // Adjust this value based on your layout
            }}>
            {items.map(item => (
              <TouchableOpacityBox
                key={item.label}
                onPress={() => handleSelect(item)}
                paddingVertical={'s8'}
                paddingHorizontal={'s12'}>
                <Text preset={'paragraphSmall'}>{item.label}</Text>
              </TouchableOpacityBox>
            ))}
          </Box>
        </TouchableOpacityBox>
      </Modal>
    </>
  );
}

const $modalOverlay: ViewStyle = {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
};

const $dropdownWrapper: BoxProps = {
  position: 'absolute',
  backgroundColor: 'backgroundInner',
  borderRadius: 's8',
  elevation: 5,
  padding: 's8',
  shadowColor: 'black',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
};
