import React, { useEffect, useRef, useMemo } from 'react';
import { StyleSheet, View, Animated } from 'react-native';

interface AnimatedNumberProps {
  value: number;
  className?: string;
}

const AnimatedDigit: React.FC<{ digit: string; index: number }> = ({ digit, index }) => {
  const translateY = useRef(new Animated.Value(-20)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Reset animation values
    translateY.setValue(-20);
    opacity.setValue(0);

    // Stagger the animation slightly for each digit
    const delay = index * 30;

    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        delay,
        tension: 80,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        delay,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [digit]);

  return (
    <Animated.Text
      style={[
        styles.digit,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
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
