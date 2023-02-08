import { Text } from '@react-native-material/core';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import fonts from '../../theme/fonts';

export default function NotificationTab({
  state,
  descriptors,
  navigation,
  position,
}) {
  return (
    <View style={styles.tab}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}>
              {label === 'Messages' && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.badge}>2</Text>
                </View>
              )}
              <Text style={styles.label} variant="body1">
                {label}
              </Text>
            </TouchableOpacity>
            {isFocused && <View style={styles.border} />}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tab: {
    flexDirection: 'row',
    backgroundColor: '#EDF2F2',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingBottom: 0,
  },
  label: {
    color: '#000',
    fontFamily: fonts.REGULAR,
  },
  buttonWrapper: {
    flex: 1,
  },
  tabButton: {
    flexDirection: 'row',
    paddingBottom: 15,
  },
  notificationBadge: {
    backgroundColor: '#F8A435',
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderRadius: 2,
  },
  badge: {
    color: '#fff',
    fontSize: 13,
  },
  border: {
    width: 110,
    height: 1,
    backgroundColor: '#104A51',
    borderRadius: 3,
    position: 'absolute',
    bottom: 0,
  },
});
