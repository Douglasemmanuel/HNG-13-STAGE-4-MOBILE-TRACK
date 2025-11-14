// import React, { useState } from 'react';
// import { TouchableOpacity, StyleSheet } from 'react-native';
// import BlurredButton from '../reuseable/Buttons'; 
// import { ThemedText } from '@/components/themed-text';
// import { useColorScheme } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { Colors } from '@/constants/theme';
// type TextButtonProps = {
//   text: string;
//   onPress?: () => void; 
//    active?: boolean;
// };

// export default function TextButton({ text, onPress }: TextButtonProps) {
//   const [clicked, setClicked] = useState(false);
//        const colorScheme = useColorScheme() || 'light';
//       const theme = Colors[colorScheme];
//   const handlePress = () => {
//     setClicked(true);
//     if (onPress) {
//       onPress(); // call the passed function
//     }
//   };

//   return (
//     <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
//       {clicked ? (
//         <BlurredButton
//           text={text}
//           onPress={onPress || (() => console.log(`${text} pressed`))}
//         />
//       ) : (
//         <ThemedText type="defaultSemiBold" style={[styles.textItem,{color:theme.text}]}>
//           {text}
//         </ThemedText>
//       )}
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   textItem: {
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     margin: 5,
//     borderRadius: 10,
//     textAlign: 'center',
//   },
// });



import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import BlurredButton from '../reuseable/Buttons';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';

type TextButtonProps = {
  text: string;
  onPress?: () => void;
  active?: boolean; // 👈 Add this
};

export default function TextButton({ text, onPress, active = false }: TextButtonProps) {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
    const handlePress: () => void = onPress ? onPress : () => console.log(`${text} pressed`);
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      {active ? (
        // 👇 Show the active visual state (BlurredButton)
        <BlurredButton
          text={text}
          onPress={handlePress}
        />
      ) : (
        <ThemedText
          type="defaultSemiBold"
          style={[styles.textItem, { color: theme.text }]}
        >
          {text}
        </ThemedText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  textItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
    borderRadius: 10,
    textAlign: 'center',
  },
});
