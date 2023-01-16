import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../FirebaseConfig";

export const sendPassReset = async (mail, navigate) => {
  const actionCodeSettings = {
    // パスワード再設定後のリダイレクト URL
    url: "http://localhost:3000/settingPass",
    handleCodeInApp: false,
  };

  await sendPasswordResetEmail(auth, mail, actionCodeSettings)
    .then((resp) => {
      // メール送信成功
      alert("パスワード再設定用のメールを送信しました");
      navigate("/");
    })
    .catch((error) => {
      // メール送信失敗
      console.log(error);
    });
};
