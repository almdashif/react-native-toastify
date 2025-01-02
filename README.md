### React Native Toastify  ![npm](https://img.shields.io/npm/v/react-native-toastify-pro) ![LICENSE MIT](https://img.shields.io/badge/license-MIT-brightgreen.svg)

A customizable toast notification component for React Native, designed to work seamlessly on both Android and iOS platforms and  allows you to add notifications to your react-native app (ios, android) with ease. No more nonsense! :fire: 🎉 

![toast](https://github.com/user-attachments/assets/415d0d61-473a-40ce-816d-9a22fedaec9e)





---



### Installation

```bash
npm install react-native-toastify-pro
cd ios && pod install
cd android && ./gradlew clean
```
or

```bash
yarn add react-native-toastify-pro
cd ios && pod install
cd android && ./gradlew clean
```

---

## Toast Component with Context Provider

This repository includes a `Toast` component for displaying notifications in a React Native app, along with a `ToastProvider` context for easy integration throughout your application.



### Installation

Follow the same installation process described earlier.

---

### Toast Context Integration

To use the `Toast` component globally, wrap your app with the `ToastProvider` and access it via the `useToast` hook.

---

### 1. Modify App.js
Wrap your app's main component (e.g., navigation or root-level component) with the ToastProvider:

```js
import React from 'react';
import { ToastProvider } from "react-native-toastify-pro";

export default function App() {
    return (
        <ToastProvider>
                {/* Your other app components */}
        </ToastProvider>
    );
}

```

### 2. Using useToast
To show toasts, use the useToast hook in any component. Here's an example:

```js
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useToast } from "react-native-toastify-pro";

const ExampleModule = () => {
    const { showToast } = useToast();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <TouchableOpacity onPress={() => {
        showToast({ message: 'success toast', type: 'success', position: 'top', duration: 3000 });
      }} style={[styles.btnWrapper, { backgroundColor: 'green' }]}>
        <Text style={styles.textStyle}>SUCCESS</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
        showToast({ message: 'error toast', type: 'error', position: 'bottom', duration: 4000 });
      }} style={[styles.btnWrapper, { backgroundColor: 'red' }]}>
        <Text style={styles.textStyle}>ERROR</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
        showToast({ message: 'info toast', type: 'info', position: 'top', duration: 5000 });
      }} style={[styles.btnWrapper, { backgroundColor: 'blue' }]}>
        <Text style={styles.textStyle}>INFO</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
        showToast({ message: 'custom toast', type: 'info', position: 'top', duration: 5000, backgroundColor: 'black', textColor: 'white', positionValue: 100 });
      }} style={[styles.btnWrapper, { backgroundColor: 'black' }]}>
        <Text style={styles.textStyle}>CUSTOM</Text>
      </TouchableOpacity>
    </View>
    );
};

export default ExampleModule;
const styles = StyleSheet.create({
  btnWrapper: {
    width: 250,  
    height: 50, 
    marginTop: 20,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  textStyle: { color: '#fff', fontSize: 16, fontWeight: '500' }
});



```
---

### Props

| Prop             | Type              | Default       | Description                                         |
|------------------|-------------------|---------------|-----------------------------------------------------|
| `message`        | `string`          | `''`          | The text to display in the toast.                  |
| `type`           | `string`          | `'info'`      | The type of toast (e.g., `info`, `success`, `error`).|
| `position`       | `positionType`    | `'top'`       | The position of the toast (`top` or `bottom`).      |
| `positionValue`  | `number`          | `60`          | Custom vertical offset for the toast.              |
| `backgroundColor`| `string`          | Depends on type or you can specify a custom `background color`| Background color of the toast.                    |
| `textColor`      | `string`          | `'#fff'`      | Text color of the toast message.                   |
| `duration`       | `number`          | `3000`        | How long the toast remains visible (in ms).         |

---

### Methods

| Method     | Description                                            |
|------------|--------------------------------------------------------|
| `show`     | Displays the toast with the specified configuration.    |
| `hide`     | Hides the currently visible toast.                     |

---


### TypeScript Support
This library is `TypeScript` friendly. Below are the available types:

`ToastOptions`: Configuration for toast messages.
`ToastContextType`: Type definition for the toast context.

---
### Gestures

The toast supports gestures for dismissal. Tap on the toast to dismiss.

---

### Features

- **Customizable:** Modify toast `colors`, `positioning`, and `duration`.
- **Interactive:** Dismiss by `tapping`.
- **Lightweight:** No external dependencies for fast integration.
- **Cross-Platform:** Compatible with both `Android` and `iOS`.
- **Context API Support:** Use `ToastProvider` for global toast management.

---


### Contributing

Contributions are always welcome! If you’d like to contribute, feel free to fork the repository and submit a pull request with your improvements.

For bug reports, feature requests, or any issues, please open an issue on the GitHub repository or contact me directly at ashifalmohammed@gmail.com.

Thank you for your interest in contributing!



## Author
[almdashif](https://github.com/almdashif)

## License
[MIT Licensed](https://github.com/almdashif/react-native-toastify-pro/blob/main/LICENSE) react-native-toastify-pro is under BSD license. © Mohammed Ashif  2024 - present

