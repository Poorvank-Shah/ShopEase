import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { publicRequest } from "../requestMethods";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.div`
  font-size: 12px;
  margin: 20px 0px;
  display: flex;
  align-items: center;
`;
//NNNEWWW  BY MEEE
const Checkbox = styled.input`
    flex: 1;
`
const AgreementText = styled.p`
    flex: 10;
`
const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const Error = styled.div`
  color: red;
  font-size: 15px;
  margin-top: 5px;
`
const Success = styled.div`
  color: green;
  font-size: 15px;
  margin-top: 5px;
`
const Register = () => {

  const [uname, setUname] = useState("");
  const [pwd, setPwd] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate()
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await publicRequest.post("/auth/register", {
        username: uname,
        email: email,
        password: pwd,
      });
      console.log(res.data)
      setSuccess(true);
      setTimeout(()=>{
        navigate("/login")
      },4000)
    } catch (err) {
      console.log(err);
      setError(true);
      console.log(error)
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="name" />
          <Input placeholder="last name" />
          <Input placeholder="username" onChange={(e) => setUname(e.target.value)} />
          <Input placeholder="email" type="email" onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="password" type="password" />
          <Input placeholder="confirm password" onChange={(e) => setPwd(e.target.value)} />
          <Agreement>
            <Checkbox type={"checkbox"} defaultChecked/>
            <AgreementText>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </AgreementText>
          </Agreement>
          <Button onClick={handleClick}>CREATE</Button>
          {error && <Error>Something went wrong... <br />Try again with different 
          username or email</Error>}
          {success && <Success>Registration Successful... <br />Redirecting to Login Page in 4 sec.....</Success>}
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Register