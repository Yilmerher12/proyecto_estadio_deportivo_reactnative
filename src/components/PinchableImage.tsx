import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { theme } from '../theme';

interface PinchableImageProps {
  uri: string;
  alt?: string;
}

const MIN_SCALE = 1;
const MAX_SCALE = 4;

// Imagen con zoom por pellizco (Gesture.Pinch) y patrón savedScale:
// event.scale es relativo al inicio de CADA gesto, así que se multiplica por la
// escala acumulada (savedScale) para que dos pellizcos sucesivos se sumen.
export function PinchableImage({ uri, alt }: PinchableImageProps): React.JSX.Element {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const pinch = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = savedScale.value * event.scale;
    })
    .onEnd(() => {
      // Se limita el zoom: la foto del producto no se encoge por debajo de su tamaño original.
      const clamped = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale.value));
      scale.value = withSpring(clamped);
      savedScale.value = clamped;
    });

  const imageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <GestureDetector gesture={pinch}>
          <Animated.Image
            source={{ uri }}
            style={[styles.image, imageStyle]}
            resizeMode="contain"
            accessibilityLabel={alt}
          />
        </GestureDetector>
      </View>
      <Text style={styles.hint}>🤏 Pellizca la foto para hacer zoom</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  frame: {
    width: '100%',
    height: 220,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surfaceAlt,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  hint: {
    color: theme.colors.textSubtle,
    fontSize: theme.fontSize.xs,
  },
});
