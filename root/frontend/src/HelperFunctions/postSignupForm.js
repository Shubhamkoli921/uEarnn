import axios from "axios";

export default function postSignupForm(formData, redirect, setFormError) {
  const postUrl = `/api/signup/${
    new URLSearchParams(document.location.search).get("referrer")
      ? `?referrer=${new URLSearchParams(document.location.search).get(
          "referrer"
        )}`
      : ""
  }`;

  axios
    .post(postUrl, formData, {
      headers: { "Content-Type": "application/json" },
    })
    .then((responseData) => {
      redirect();
    })
    .catch((error) => {
      setFormError(error.response.data.error);
    });
}
