import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { theme } from '../theme';

interface AnimatedButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'danger' | 'success';
  disabled?: boolean;
}

// Botón con Gesture.Tap: escala a 0.93 al tocar y vuelve a 1 con spring.
// Parámetros de withSpring en Reanimated 4: damping ~ friction, stiffness ~ tension (w09).
export function AnimatedButton({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
}: AnimatedButtonProps): React.JSX.Element {
  const scale = useSharedValue(1);

  const tap = Gesture.Tap()
    .enabled(!disabled)
    .onBegin(() => {
      scale.value = withSpring(0.93, { damping: 15, stiffness: 400 });
    })
    .onFinalize((_, success) => {
      scale.value = withSpring(1, { damping: 12, stiffness: 200 });
      // success = true: el toque se completó sin cancelarse.
      // onPress vive en el hilo JS, por eso se invoca con runOnJS.
      if (success) runOnJS(onPress)();
    });

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: disabled ? 0.5 : 1,
  }));

  return (
    <GestureDetector gesture={tap}>
      <Animated.View
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        style={[styles.button, styles[variant], animStyle]}
      >
        <Text style={styles.label}>{label}</Text>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.radius.md,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  danger: {
    backgroundColor: theme.colors.danger,
  },
  success: {
    backgroundColor: theme.colors.success,
  },
  label: {
    color: '#ffffff',
    fontSize: theme.fontSize.md,
    fontWeight: '600',
  },
});
