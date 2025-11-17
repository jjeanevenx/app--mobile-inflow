export type RootStackParamList = {
  // Auth Stack
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  Onboarding: undefined;
  
  // Main Stack
  Main: undefined;
  PathDetail: { pathId: string };
  CategoryContent: { category: string };
  Progress: undefined;
  ContinueWatching: undefined;
  UpcomingCourses: undefined;
  FeaturedContent: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Discover: undefined;
  Learn: undefined;
  Profile: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
