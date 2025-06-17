import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 18,
    textAlign: 'center'
  },
  input: {
    height: 48,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#F9FAFB'
  },
  button: {
    backgroundColor: '#2563EB',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  },
  createAccountButton: {
    width: '100%',
    backgroundColor: '#E0E7FF',
    marginBottom: 36
  },
  createAccountText: {
    color: '#2563EB',
    fontWeight: '600'
  },
  footer: {
    alignItems: 'center'
  },
});