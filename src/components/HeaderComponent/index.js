import React from 'react';
import {useSelector} from 'react-redux'
import {Menu, ExitToApp} from '@material-ui/icons'
import { HeaderContainer } from './styles';
import LogoImage from '../../assets/image/logobrancotransparent.png'

export default function HeaderComponent({ onClick }) {
  const userData = useSelector(store => store.user.userdata)
  console.log(userData)
  return (
    <HeaderContainer>
      <span>
        <button onClick={onClick} type="button" >
          <Menu/>
        </button>
        <h3>Olá, {userData.full_name}</h3>
      </span>
      <img src={LogoImage} alt="logo" style={{
        maxWidth: '5%',
        height: 'auto',
        marginLeft: '-7%'
      }}/>
      <button onClick={onClick} type="button" >
        <ExitToApp/>
      </button>
    </HeaderContainer>
  );
}
