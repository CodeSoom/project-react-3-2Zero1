import styled from '@emotion/styled';

export const Button = styled.button({
  fontSize: '12px',
  margin: '10px',
  padding: '5px 8px',
  border: 'none',
  borderRadius: '15px',
});

export const Information = styled.p(() => ({
  margin: '15px 15px',
  fontSize: '10px',
  color: 'gray',
  textAlign: 'center',
}));

export const WarningInformation = styled.p(() => ({
  margin: '15px 15px',
  fontSize: '10px',
  color: 'red',
  textAlign: 'center',
}));

export const Error = styled.p(() => ({
  marginTop: '2px',
  fontSize: '8px',
  color: 'red',
  marginLeft: '20px',
}));

export const DefaultLayout = styled.div(() => ({
  position: 'relative',
  width: '100%',
  height: '100%',
}));

export const Text = styled.div(() => ({
  textAlign: 'center',
  marginTop: '10px',
}));

export const NextButton = styled.button(() => ({
  background: 'transparent',
  border: 'none',
  position: 'absolute',
  right: '10px',
  top: '10px',
  fontSize: '12px',
  fontWeight: 'bold',
  padding: '5px 8px',
}));

export const PreviousButton = styled.button(() => ({
  background: 'transparent',
  border: 'none',
  fontSize: '12px',
  fontWeight: 'bold',
  padding: '5px 8px',
  margin: '9px 0 0 9px',
}));
