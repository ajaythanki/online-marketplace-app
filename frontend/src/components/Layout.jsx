import Nav from "./Nav";

const Layout = ({children}) => {
  
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-20">{children}</main>;
      <footer></footer>
    </div>
  );
}

export default Layout