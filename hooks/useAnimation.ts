import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

export function useFadeIn(duration = 600, delay = 0) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  }, [opacity, duration, delay]);

  return opacity;
}

export function useSlideInFromY(duration = 500, delay = 0, isBottom = false) {
  const translateY = useRef(new Animated.Value(isBottom ? 50 : -50)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [translateY, opacity, duration, delay, isBottom]);

  return { translateY, opacity };
}

export function useScaleIn(duration = 400, delay = 0) {
  const scale = useRef(new Animated.Value(0.8)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        delay,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scale, opacity, duration, delay]);

  return { scale, opacity };
}

// Shake Animation Hook (for errors)
export function useShake(trigger: any) {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (trigger) {
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [trigger, translateX]);

  return translateX;
}

// Button Press Animation Hook
export function useButtonPress() {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      friction: 3,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
    }).start();
  };

  return { scale, onPressIn, onPressOut };
}

// Loading Pulse Animation
export function useLoadingPulse(isLoading: boolean) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.5,
            duration: 800,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
        ])
      ).start();
    } else {
      opacity.setValue(1);
    }
  }, [isLoading, opacity]);

  return opacity;
}

// Slide Up with Fade In Animation Hook
export function useSlideUpFadeIn(duration = 600, delay = 0, distance = 50) {
  const translateY = useRef(new Animated.Value(distance)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [delay, duration, opacity, translateY]);

  return {
    translateY,
    opacity,
  };
}
