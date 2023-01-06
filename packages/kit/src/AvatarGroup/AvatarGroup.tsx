import { Avatar } from '@rneui/base/dist/Avatar';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

export interface AvatarGroupProps {
  size?: number;
  rounded?: boolean;
  children: any;
  max: any;
}

const AvatarGroup = ({
  size = 32,
  rounded = true,
  children,
  max,
}: AvatarGroupProps) => {
  const childCount = React.Children.count(children);
  return (
    <View style={styles.container}>
      {[
        ...React.Children.toArray(children),
        childCount > max ? (
          <Avatar
            rounded
            size={size}
            containerStyle={{ backgroundColor: '#e2e2e2' }}
            title={`+${childCount - max}`}
          />
        ) : undefined,
      ]
        .slice(max)
        .map((child, index) => {
          if (!child) {
            return null;
          }
          return (
            <View
              style={{
                padding: 2,
                backgroundColor: 'white',
                borderRadius: 100,
                left: index * -10,
                zIndex: childCount - index + 1,
                elevation: childCount - index + 1,
              }}
            >
              {React.cloneElement(child as any, {
                size,
                rounded,
              })}
            </View>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default React.forwardRef(AvatarGroup);
