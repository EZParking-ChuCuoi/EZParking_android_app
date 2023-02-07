export const navigateAuthorized = navigation => {
  navigation.reset({
    index: 0,
    routes: [{name: 'bottomTab'}],
  });
};

export const validateEmail = email => {
  if (
    email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
  ) {
    return true;
  } else {
    return false;
  }
};
