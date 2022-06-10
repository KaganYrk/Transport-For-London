import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  renderItemContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    elevation: 3,
    backgroundColor: '#2d3039',
    marginBottom: 5,
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
  },
  renderItemNameText: { fontSize: 30, flex: 1, color: '#FFFFFF' },
  icon: { marginLeft: 20, alignSelf: 'flex-start' },
  modeText: { color: '#FFFFFF', fontSize: 12, alignSelf: 'flex-start', textTransform: 'capitalize', marginLeft: 20 },
  multipleSelectContainer: { flex: 1, marginRight: 10 },
  multipleSelectButtonStyle: { backgroundColor: '#2d3039' },
  multipleSelectButtonTextStyle: { textAlign: 'center', color: '#FFFFFF', textTransform: 'capitalize' },
  multipleSelectRowTextStyle: { marginLeft: 10, color: '#FFFFFF', textTransform: 'capitalize' },
  multipleSelectRowStyle: { borderBottomWidth: StyleSheet.hairlineWidth, borderColor: 'white' },
  multipleSelectLineContainer: { backgroundColor: '#2d3039', borderBottomRightRadius: 10, borderBottomLeftRadius: 10 },
  dropdownContainer: { flex: 0.5 },
  dropdownButtonStyle: { backgroundColor: '#2d3039' },
  dropwdownButtonTextStyle: { textAlign: 'center', color: '#FFFFFF', textTransform: 'capitalize' },
  dropdownRowTextStyle: { marginLeft: 10, color: '#FFFFFF', textTransform: 'capitalize' },
  dropdowRow: { borderBottomWidth: StyleSheet.hairlineWidth, borderColor: 'white' },
  dropdownListContainer: { backgroundColor: '#2d3039', borderBottomRightRadius: 10, borderBottomLeftRadius: 10 },
});
