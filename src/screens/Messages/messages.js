import React, { useEffect, useState } from 'react';
import { StatusBar, View, FlatList } from 'react-native';
import NotificationItem from '../../components/NotificationItem/notificationItem';
import Spacer from '../../components/atom/Spacer/spacer';
import { styles } from './style';
import { notificationsRef } from '../../services/user';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ListEmpty from '../../components/atom/ListEmpty/listEmpty';

export default function Messages() {
  const [notifications, setNotifications] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    notificationsRef()
      .where('archived', '==', false)
      .onSnapshot(doc => {
        const orderDocs = doc.docs.sort(
          (a, b) => b.data().created_at - a.data().created_at,
        );
        setNotifications(orderDocs);
      });
  }, []);

  const renderItem = item => {
    const notification = item.data();
    return (
      <NotificationItem
        notificationData={{
          id: item.id,
          ...notification,
        }}
      />
    );
  };

  return (
    <View style={[styles.messagesContainer, { paddingBottom: insets.bottom }]}>
      <StatusBar barStyle={'light-content'} />
      <FlatList
        data={notifications}
        key={notification => notification.id}
        renderItem={({ item }) => renderItem(item)}
        ItemSeparatorComponent={<Spacer marginVertical={10} />}
        contentContainerStyle={styles.flatListContent}
        ListEmptyComponent={
          <ListEmpty text={"You don't have any messages yet"} />
        }
      />
    </View>
  );
}
