import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, View, ActivityIndicator, Pressable } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

interface Props {
  size: number,
  url: string | null,
  onUpload: (filePath: string) => void,
  showUpload?: boolean
}

const Avatar = ({ url, size = 150, onUpload, showUpload }: Props) => {
  const [uploading, setUploading] = useState(false)
  const avatarSize = { height: size, width: size }

  return (
    <View>
      {url ? (
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: url }}
            accessibilityLabel='Avatar'
            style={[avatarSize, styles.avatar]}
          />
        </View>
      ) : (
        <View style={[avatarSize, styles.avatar, styles.placeholder]}>
          <ActivityIndicator color="white" />
        </View>
      )}
      {showUpload && (
        <View style={styles.uploadIcon}>
          {!uploading ? (
            <Pressable onPress={() => { /* Implement upload functionality */ }}>
              <MaterialIcons name='cloud-upload' size={30} color='black' />
            </Pressable>
          ) : (
            <ActivityIndicator color="white" />
          )}
        </View>
      )}
    </View>
  )
}

export default Avatar

const styles = StyleSheet.create({
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    borderRadius: 20, 
    overflow: 'hidden',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  uploadIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
})
