import React, { useEffect, useState } from 'react';
import { StatusBar, View, FlatList } from 'react-native';
import NotificationItem from '../../components/NotificationItem/notificationItem';
import Spacer from '../../components/atom/Spacer/spacer';
import { styles } from './style';
import { notificationsRef } from '../../services/user';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ListEmpty from '../../components/atom/ListEmpty/listEmpty';

export default function Welcome() {
  const [notifications, setNotifications] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    notificationsRef()
      .where('archived', '==', true)
      .onSnapshot(doc => {
        setNotifications(doc.docs);
      });
  }, []);

  const renderItem = item => {
    const notification = item.data();
    return (
      <NotificationItem
        notificationData={{
          id: item.id,
          ...notification,
          imgSrc:
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
        }}
      />
    );
  };

  return (
    <View style={[styles.archiveContainer, { paddingBottom: insets.bottom }]}>
      <StatusBar barStyle={'light-content'} />
      <FlatList
        data={notifications}
        key={notification => notification.data().id}
        renderItem={({ item }) => renderItem(item)}
        ItemSeparatorComponent={<Spacer marginVertical={10} />}
        contentContainerStyle={styles.flatListContent}
        ListEmptyComponent={<ListEmpty text={'No messages in archived list'} />}
      />
    </View>
  );
}
