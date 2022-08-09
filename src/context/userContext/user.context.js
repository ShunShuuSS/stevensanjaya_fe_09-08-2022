import React from "react";

const UserContext = React.createContext({
  UserToken: "",
  SetToken: "",
  RemoveToken: "",
  CompleteLoad: undefined,
  // last page
  LastPage: "",
  SetLastPage: "",
});

export default UserContext;
