import React, { useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  PanResponder,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export enum positionType {
  top = 'top',
  bottom = 'bottom',
}

const Toast = React.forwardRef((_, ref) => {
  const [toastConfig, setToastConfig] = useState<{
    message: string;
    type: string;
    position: positionType;
    backgroundColor: string;
    textColor: string;
    duration: number;
  }>({
    message: '',
    type: '',
    position: 'top' as positionType,
    backgroundColor: 'blue',  // default background color
    textColor: 'white', // default text color
    duration: 3000,
  });
  const [visible, setVisible] = useState(false);

  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Helper function to get default colors based on toast type
  const getDefaultColor = (type: string) => {
    switch (type) {
      case 'success':
        return { backgroundColor: 'green', textColor: 'white' };
      case 'error':
        return { backgroundColor: 'red', textColor: 'white' };
      case 'info':
        return { backgroundColor: 'blue', textColor: 'white' };
      default:
        return { backgroundColor: 'gray', textColor: 'white' };
    }
  };

  React.useImperativeHandle(ref, () => ({
    show: ({
      message = '',
      type = 'info',
      position = 'top' as positionType,
      duration = 3000,
      backgroundColor = '',  // custom background color (optional)
      textColor = '',  // custom text color (optional)
    }) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // Use provided backgroundColor and textColor, or fallback to defaults based on type
      const { backgroundColor: finalBackgroundColor, textColor: finalTextColor } =
        backgroundColor || textColor
          ? { backgroundColor: backgroundColor || getDefaultColor(type).backgroundColor, 
              textColor: textColor || getDefaultColor(type).textColor }
          : getDefaultColor(type);

      setToastConfig({
        message,
        type,
        position,
        backgroundColor: finalBackgroundColor,
        textColor: finalTextColor,
        duration,
      });
      setVisible(true);

      translateY.setValue(position === 'top' ? -100 : height);
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();

      timeoutRef.current = setTimeout(() => hide(position), duration);
    },
    hide: () => hide(toastConfig.position),
  }));

  const hide = (position: positionType) => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: position === 'top' ? -100 : height,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setVisible(false);
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = null;
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const { dx, dy } = gestureState;
        return Math.abs(dx) > 10 || Math.abs(dy) > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        const { dy } = gestureState;
        translateY.setValue(dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        const { dy } = gestureState;
        if (Math.abs(dy) > 50) {
          hide(toastConfig.position);
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  if (!visible) return null;

  return (
    <TouchableWithoutFeedback onPress={() => hide(toastConfig.position)} style={{ zIndex: 999999999999999999 }}>
      <View style={[styles.container, toastConfig.position === 'bottom' ? styles.bottom : styles.top]}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.toast,
            { backgroundColor: toastConfig.backgroundColor },
            {
              opacity,
              transform: [{ translateY }],
            },
          ]}
        >
          <Text style={[styles.message, { color: toastConfig.textColor }]}>
            {toastConfig.message}
          </Text>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
});

const styles: { [key: string]: any } = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 999999999999999999,
  },
  top: {
    top: 50,
  },
  bottom: {
    bottom: 50,
  },
  toast: {
    minWidth: 200,
    maxWidth: width * 0.9,
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  message: {
    textAlign: 'center',
  },
});

export default Toast;
