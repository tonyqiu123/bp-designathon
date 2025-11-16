import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';

interface AnimatedNumberProps {
  value: number;
  className?: string;
}

const AnimatedDigit: React.FC<{ digit: string; index: number }> = ({ digit, index }) => {
  const animValue = useSharedValue(0);

  useEffect(() => {
    animValue.value = 0;
    animValue.value = withSpring(1, {
      damping: 15,
      stiffness: 100,
    });
  }, [digit]);

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      animValue.value,
      [0, 1],
      [-20, 0]
    );

    const opacity = interpolate(
      animValue.value,
      [0, 1],
      [0, 1]
    );

    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  return (
    <Animated.Text style={[styles.digit, animatedStyle]}>
      {digit}
    </Animated.Text>
  );
};

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, className }) => {
  const formattedValue = useMemo(() => {
    return value.toLocaleString();
  }, [value]);

  const digits = useMemo(() => {
    return formattedValue.split('');
  }, [formattedValue]);

  return (
    <View style={styles.container}>
      {digits.map((digit, index) => (
        <AnimatedDigit key={`${index}-${digit}`} digit={digit} index={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  digit: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default AnimatedNumber;
