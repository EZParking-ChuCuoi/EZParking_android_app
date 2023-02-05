export const navigateAuthorized = navigation => {
  navigation.reset({
    index: 0,
    routes: [{name: 'bottomTab'}],
  });
};