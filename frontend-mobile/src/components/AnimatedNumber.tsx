import React, { useEffect, useRef } from 'react';
import { Animated, Text } from 'react-native';

interface AnimatedNumberProps {
  value: number;
  className?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, className }) => {
  const animatedValue = useRef(new Animated.Value(value)).current;
  const displayValue = useRef(value);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value,
      duration: 500,
      useNativeDriver: false,
    }).start();

    const listenerId = animatedValue.addListener(({ value: newValue }) => {
      displayValue.current = Math.floor(newValue);
    });

    return () => {
      animatedValue.removeListener(listenerId);
    };
  }, [value]);

  return (
    <Animated.Text className={className}>
      {animatedValue.interpolate({
        inputRange: [0, value || 1],
        outputRange: [0, value || 1],
      }).__getValue().toFixed(0)}
    </Animated.Text>
  );
};

export default AnimatedNumber;
