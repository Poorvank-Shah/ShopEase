import React from 'react'
import styled from 'styled-components'
import { Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { mobile } from '../responsive'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/userRedux';

const Container = styled.div`
  height : 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding : 10px 20px;
  display : flex;
  justify-content : space-between;
  align-items : center;
  ${mobile({ padding: "10px 0px" })}

`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}

`;
const Left = styled.div`
  // width : 33%;        //IMMPP
  flex : 1;
  display : flex;
  align-items : center;
  ${mobile({ display:"none" })}

`

const SearchContainer = styled.div`
  border : 0.5px solid lightgray;
  display : flex;
  align-items : center;
  margin-left: 15px;
  padding: 5px;
`
const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`
const Center = styled.div`
  flex : 1;
  text-align: center;
    ${mobile({ marginLeft: "20px", textAlign: "left" ,flex :2})};
`
const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
  text-decoration: none;
  color: black;
`
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
  color: black;
  text-decoration: none !important;
`
const Right = styled.div`
  flex : 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 1, justifyContent: "center" })}

`

const Navbar = () => {
  const quantity = useSelector(state => state.cart.quantity)
  // console.log(quantity);
  const user = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();
  const handlelogout = (e)=>{
    e.preventDefault();
    dispatch(logout());
  }
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder='Search' />
            <SearchIcon style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/" style={{ textDecoration: 'none' }}><Logo>Poorvank</Logo></Link>
        </Center>
        {user ?
          <Right>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <MenuItem  onClick={handlelogout}>SIGNOUT</MenuItem>
            </Link>
            <Link to="/cart">
              <MenuItem>
                <Badge badgeContent={quantity} color="primary">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </MenuItem>
            </Link>
          </Right>
          :
          <Right>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <MenuItem>REGISTER</MenuItem>
            </Link>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <MenuItem>SIGNIN</MenuItem>
            </Link>
            <Link to="/cart">
              <MenuItem>
                <Badge badgeContent={quantity} color="primary">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </MenuItem>
            </Link>
          </Right>
        }
      </Wrapper>
    </Container>
  )
}


export default Navbar;
