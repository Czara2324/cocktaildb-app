import { Avatar, Text, Icon } from '@rneui/themed'

export default function ListItem({ item, onPress }) {
    
  return (
    <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
      <Avatar
        source={{ uri: item.strDrinkThumb }}
        size="medium"
        rounded
        containerStyle={{ marginRight: 10 }}
      />
      <Text style={{ fontFamily: 'Quicksand_700Bold', fontSize: 18, color: '#4F000B' }}>
        {item.strDrink}
      </Text>
      <Icon name="chevron-right" type="font-awesome" color="#4F000B" />
    </TouchableOpacity>
  );
}