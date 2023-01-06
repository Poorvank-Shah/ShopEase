import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { publicRequest } from "../requestMethods";
import { mobile } from "../responsive";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase"

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

const ImgInput = styled.input`
  margin-left: 10px;
  align-self: center;
  flex:1
`
const Image = styled.img`
  max-width: 25%;
  max-height: 25%;
  object-fit: contain;
  ${mobile({ maxWidth: "40%", maxHeight: "40%" })}
`
const ProfileText = styled.div`
  text-align: center;
  align-items: center;
  width: 100%;
  color: black;
  font-size:15px;
  font-weight: 600;
  text-align: left;
  margin-left: 10px;
  margin-top: 10px;
  ${mobile({ marginTop: "10px", marginLeft: "0" })}
`
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
const Wait = styled.div`
  color: black;
  font-size: 15px;
  margin-top: 5px;
`
const Register = () => {

  const [uname, setUname] = useState("");
  const [pwd, setPwd] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [prog, setProg] = useState(0);
  const [url, setUrl] = useState("https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif")
  const [wait, setWait] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate()
  const handleClick = async (e) => {
    setWait(true);
    console.log(url);
    e.preventDefault();
    try {
      const res = await publicRequest.post("/auth/register", {
        username: uname,
        email: email,
        password: pwd,
        img: url,
      });
      console.log(res.data)
      setWait(false);
      setSuccess(true);
      setTimeout(() => {
        navigate("/login")
      }, 4000)
    } catch (err) {
      console.log(err);
      setWait(false);
      setError(true);
      console.log(error)
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }

  useEffect(() => {
    if (file) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          setProg((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log(downloadURL);
            setUrl(downloadURL);
          });
        }
      );
    }
  }, [file])

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Image src= {url} />
          <ImgInput type="file" onChange={(e) => setFile(e.target.files[0])} />
          {prog!=0 && prog!=100 && <Text> Uploading is {Math.trunc(prog)}% done</Text>}
          <ProfileText> Profile Picture </ProfileText>
          <Input placeholder="name" />
          <Input placeholder="last name" />
          <Input placeholder="username" required onChange={(e) => setUname(e.target.value)} />
          <Input placeholder="email" type="email" required onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="password" type="password" required />
          <Input placeholder="confirm password" required onChange={(e) => setPwd(e.target.value)} />
          <Agreement>
            <Checkbox type={"checkbox"} defaultChecked required />
            <AgreementText>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </AgreementText>
          </Agreement>
          <Button onClick={handleClick}>CREATE</Button>
          {wait && <Wait>Processing .... <br />Thank you for your Patience..</Wait>}
          {error && <Error>Something went wrong... <br />Try again with different
            username or email</Error>}
          {success && <Success>Registration Successful... <br />Redirecting to Login Page in 4 sec.....</Success>}
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Register
