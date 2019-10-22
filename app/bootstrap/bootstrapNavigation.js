import { NavigationActions } from "react-navigation";

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigateInbox(routeName, params) {
  navigator.dispatch(
    NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          type: "Navigation/NAVIGATE",
          routeName,
          params,
        }),
      ],
    })
  );
}

function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function fabNavigate(navigateAction) {
  navigator.dispatch(NavigationActions.navigate(navigateAction));
}

export default {
  navigate,
  navigateInbox,
  setTopLevelNavigator,
  fabNavigate,
};
