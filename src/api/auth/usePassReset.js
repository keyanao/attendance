import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";


export const usePassReset = (email) => {
  const navigate = useNavigate();

  sendPasswordResetEmail(email)
    .then(() => {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
