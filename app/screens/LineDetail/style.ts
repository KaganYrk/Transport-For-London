import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  renderItemContainer: { flexDirection: 'row', marginBottom: 10, alignItems: 'center' },
  renderItemLeft: { backgroundColor: '#cc3333', height: 50, width: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 10 },
  renderItemLeftIcon: { zIndex: 2, color: 'white' },
  renderItemLeftStrip: { position: 'absolute', height: '200%', borderRightWidth: 6, alignSelf: 'center', zIndex: 1, borderColor: '#cc3333' },
  renderItemTouchable: { flexDirection: 'row' },
  renderItemTouchableText: { alignSelf: 'center', marginLeft: 10, flex: 1 },
  renderItemRightIcon: { marginRight: 50 },
  layout: { paddingHorizontal: 20 },
  directionButtonInContainer: { marginHorizontal: 35 },
  directionButtonContainer: { zIndex: 20, position: 'absolute', right: 20 },
  directionButtonStyle: { height: 80, backgroundColor: '#195b92', borderRadius: 30 },
  headerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  backIcon: { marginRight: 20 },
  nameText: { fontSize: 60, marginRight: 10, textAlign: 'right' },
  descriptionContainer: { flexDirection: 'column', flex: 1 },
  descriptionText: { fontSize: 14 },
});
