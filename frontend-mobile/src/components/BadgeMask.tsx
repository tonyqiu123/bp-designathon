import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type BadgeMaskProps = {
  variant: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  children: React.ReactNode;
};

const TopLeftMask = ({ color }: { color: string }) => (
  <Svg width="8" height="8" viewBox="0 0 64 64" fill="none">
    <Path d="M64 0C28.6538 1.70751e-06 2.86696e-06 28.6538 0 64L0 0L64 0Z" fill={color} />
  </Svg>
);

const TopRightMask = ({ color }: { color: string }) => (
  <Svg width="8" height="8" viewBox="0 0 64 64" fill="none">
    <Path d="M64 64C64 28.6538 35.3462 2.86696e-06 0 0H64V64Z" fill={color} />
  </Svg>
);

const BottomLeftMask = ({ color }: { color: string }) => (
  <Svg width="8" height="8" viewBox="0 0 64 64" fill="none">
    <Path d="M0 0C1.70751e-06 35.3462 28.6538 64 64 64H0V0Z" fill={color} />
  </Svg>
);

const BottomRightMask = ({ color }: { color: string }) => (
  <Svg width="8" height="8" viewBox="0 0 64 64" fill="none">
    <Path d="M64 0C63.9997 35.346 35.346 64 0 64H64V0Z" fill={color} />
  </Svg>
);

const BadgeMask: React.FC<BadgeMaskProps> = ({ variant, children }) => {
  const maskColor = '#ffffff';

  switch (variant) {
    case 'top-left':
      return (
        <View style={{ position: 'absolute', top: 0, left: 0, flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ paddingBottom: 4, paddingRight: 4, backgroundColor: maskColor, borderBottomRightRadius: 12 }}>
              {children}
            </View>
            <TopLeftMask color={maskColor} />
          </View>
          <TopLeftMask color={maskColor} />
        </View>
      );
    case 'top-right':
      return (
        <View style={{ position: 'absolute', top: 0, right: 0, flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>
            <TopRightMask color={maskColor} />
            <View style={{ paddingBottom: 4, paddingLeft: 4, backgroundColor: maskColor, borderBottomLeftRadius: 12 }}>
              {children}
            </View>
          </View>
          <View style={{ marginLeft: 'auto' }}>
            <TopRightMask color={maskColor} />
          </View>
        </View>
      );
    case 'bottom-left':
      return (
        <View style={{ position: 'absolute', bottom: 0, left: 0, flexDirection: 'column' }}>
          <BottomLeftMask color={maskColor} />
          <View style={{ flexDirection: 'row' }}>
            <View style={{ paddingTop: 4, paddingRight: 4, backgroundColor: maskColor, borderTopRightRadius: 12 }}>
              {children}
            </View>
            <View style={{ marginTop: 'auto' }}>
              <BottomLeftMask color={maskColor} />
            </View>
          </View>
        </View>
      );
    case 'bottom-right':
      return (
        <View style={{ position: 'absolute', bottom: 0, right: 0, flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>
            <BottomRightMask color={maskColor} />
            <View style={{ paddingBottom: 4, paddingRight: 4, backgroundColor: maskColor, borderBottomRightRadius: 12 }}>
              {children}
            </View>
          </View>
          <View style={{ marginLeft: 'auto' }}>
            <BottomRightMask color={maskColor} />
          </View>
        </View>
      );
    default:
      return null;
  }
};

export default BadgeMask;
