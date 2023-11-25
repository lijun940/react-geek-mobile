const initialValues = {
  token: "",
  refresh_token: "",
};
export default function reducer(state = initialValues, action) {
  const { type, payload } = action;
  switch (type) {
    case "login/token":
      return payload;
    default:
      return state;
  }
}
