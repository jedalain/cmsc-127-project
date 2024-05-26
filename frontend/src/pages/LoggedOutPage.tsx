import NavigationBar from "../components/NavigationBar.tsx";

interface LoggedOutPageProps {
  children: JSX.Element;
}

export default function LoggedOutPage({ children }: LoggedOutPageProps) {
  return (
    <>
      <NavigationBar isLoggedIn={false} />
      {children}
      {/* {alertBubble !== null ? alertBubble : ""} */}
      {/* // <Footer /> */}
    </>
  );
}
