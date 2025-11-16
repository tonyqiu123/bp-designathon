import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text } from 'react-native';

interface AnimatedNumberProps {
  value: number;
  className?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, className }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [displayValue, setDisplayValue] = useState(0);
  const previousValue = useRef<number | null>(null);

  useEffect(() => {
    // Always reset to 0 and animate to new value (on mount or when value changes)
    animatedValue.setValue(0);
    setDisplayValue(0);
    
    Animated.timing(animatedValue, {
      toValue: value,
      duration: 800,
      useNativeDriver: false,
    }).start();

    const listenerId = animatedValue.addListener(({ value: newValue }) => {
      setDisplayValue(Math.floor(newValue));
    });

    previousValue.current = value;

    return () => {
      animatedValue.removeListener(listenerId);
    };
  }, [value, animatedValue]);

  return (
    <Text className={className}>
      {displayValue}
    </Text>
  );
};

export default AnimatedNumber;
