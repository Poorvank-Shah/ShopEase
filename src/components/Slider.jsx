import styled from "styled-components"
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { sliderItems } from "../data";
import { useState } from "react";
import {mobile} from '../responsive'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden; 
  ${mobile({ display: "none" })}
`
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #b8b5b5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position :absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left : ${props => props.direction === "left" && "10px"};
  right : ${props => props.direction === "right" && "10px"};
  opacity: 0.5;
  cursor: pointer;    
  z-index: 2;
`
const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transform: translateX(${props => props.slideIndex * -100}vw);
    transition: all 1.5s ease;
`
const Slide = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex: 1;
    justify-content: space-around;
    align-items: center;
    background-color: #${props => props.bg};
`
const ImageContainer = styled.div`
    flex: 2;
    height: 100%;
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;
`
const Image = styled.img`
  height: 80%;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 70px;
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;



const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const handleClick = (direction) => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
        }
        else {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
        }
    };
    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <ArrowLeftOutlinedIcon />
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                {sliderItems.map((item) => (
                    <Slide bg={item.bg}>
                        <ImageContainer>
                            <Image src={item.img} />
                        </ImageContainer>
                        <InfoContainer>
                            <Title>{item.title}</Title>
                            <Desc>{item.desc}</Desc>
                            <Button>SHOW NOW</Button>
                        </InfoContainer>
                    </Slide>
                ))}
            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick("right")}>
                <ArrowRightOutlinedIcon />
            </Arrow>
        </Container>
    )
}

export default Slider
