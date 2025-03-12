import * as Yup from "yup";

export const validationSchema = Yup.object({
  email: Yup.string()
    .email("Geçerli bir email adresi giriniz.")
    .required("Email zorunludur."),
  password: Yup.string()
    .required("Parola zorunludur.")
    .min(6, "Parola en az 6 karakter olmalıdır."),
});

export const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Geçersiz email adresi.";
    case "auth/email-already-in-use":
      return "Bu email adresi zaten kullanımda";
    case "auth/invalid-credential":
      return "Yanlış parola veya kayıtlı olmayan email.";
    default:
      return "Bir hata oluştu. Lütfen tekrar deneyiniz.";
  }
};
