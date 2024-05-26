import NavigationBar from "../components/NavigationBar.tsx";

interface LoggedInPageProps {
  children: JSX.Element;
}

export default function LoggedInPage({ children }: LoggedInPageProps) {
  return (
    <>
      <NavigationBar isLoggedIn={true} />
      {children}
      {/* {alertBubble !== null ? alertBubble : ""} */}
      {/* // <Footer /> */}
    </>
  );
}
