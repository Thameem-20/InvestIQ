import { View,Text,Pressable } from 'react-native'
import React from 'react'
interface ButtonOutlineProps{
  title:any,
  action?: () => void,
  children?: React.ReactNode;
}

const ButtonOutline:React.FC<ButtonOutlineProps> = ({
  title,
  action,
  children,
}:ButtonOutlineProps) => {
  return (
    <Pressable className='border-2 border-neutral-400 rounded-lg justify-center items-center py-3'
    onPress={action}
    >
      {children && <View>chidren</View>}
      <Text className='text-neutral-400 text-lg font-bold'>{title}</Text>
    </Pressable>
  )
}

export default ButtonOutline