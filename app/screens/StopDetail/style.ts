import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  blurContainer: { flex: 1, justifyContent: 'center' },
  modalContainer: { padding: 20, marginHorizontal: 20, height: '80%', backgroundColor: 'white', borderRadius: 10 },
  header: { textAlign: 'center', fontSize: 20, marginBottom: 20 },
  dropdownContainer: { marginBottom: 20, zIndex: 10 },
  dropdownButton: { backgroundColor: '#2d3039' },
  dropdownButtonText: { textAlign: 'center', color: '#FFFFFF' },
  dropdownListContainer: { backgroundColor: '#2d3039', borderBottomRightRadius: 10, borderBottomLeftRadius: 10 },
  dropdownRow: { borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#FFFFFF', paddingLeft: 10 },
  dropdownRowText: { color: '#FFFFFF' },
  itemContainer: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#cc3333' },
  itemText: { alignSelf: 'center', lineHeight: 22 },
});
