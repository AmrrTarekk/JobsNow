export function selectLanguage(language: string) {
  try {
    document.getElementsByTagName("html")[0].setAttribute("lang", language);
  } catch (error) {
    console.error(error);
  }
}

export const checkTextLang = (text: string) => {
  const ARABIC_PATTERN = /^[\u0600-\u06FF\s]+$/;
  // const ENGLISH_PATTERN = /^[a-zA-Z]+$/;

  if (ARABIC_PATTERN.test(text[0])) {
    return "rtl";
  } else {
    return "ltr";
  }
};
