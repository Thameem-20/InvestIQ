// types
type AuthNavigationType = {
    Welcome: undefined,
    Splash: undefined,
    Login: undefined,
    Register: undefined,
  
}
type TabNavigationType ={
    Home : undefined,
}

export type HomeStackParamList = {
    homeS: undefined;
    coinDetail: { CoinUuid: string };
  };

  export type SearchNavigationType ={
    SearchS : undefined
  }