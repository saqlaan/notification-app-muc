import React from 'react';
import { StatusBar, View } from 'react-native';
import NotificationItem from '../../components/NotificationItem/notificationItem';
import Spacer from '../../components/atom/Spacer/spacer';
import { styles } from './style';

export default function Messages() {
  return (
    <View style={styles.messagesContainer}>
      <StatusBar barStyle={'light-content'} />
      <NotificationItem
        imgSrc={
          'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80'
        }
        title={'New Inquiry'}
        description={'New Inquiry From Dhwani Parikh For Alton Place4'}
        time={'1m ago'}
        isSeen={'false'}
      />
      <Spacer marginVertical={10} />
      <NotificationItem
        imgSrc={
          'https://www.foodiesfeed.com/wp-content/uploads/2022/07/pizza-with-pineapple-and-thin-crust.jpg'
        }
        title={'New Inquiry'}
        description={'New Inquiry From Dhwani Parikh For Alton Place4'}
        time={'1m ago'}
        isSeen={'false'}
      />
    </View>
  );
}
