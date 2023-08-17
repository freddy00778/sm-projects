import Settings from "../assets/images/settings.svg";

export interface OtherDataProps {
  id: string;
  title: string;
  image: string;
  route: string;
}

export const OtherData: OtherDataProps[] = [
  {
    id: "1",
    title: "Settings",
    image: Settings,
    route: "/",
  },
  // {
  //   id: "2",
  //   title: "Logout",
  //   image: Logout,
  //   route: "/",
  // },
];
