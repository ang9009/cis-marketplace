import React from "react";
import NavbarUserWidget from "../widgets/NavbarUserWidget";
import { GrCart } from "react-icons/gr";
import useRedirectWhenLoggedOut from "../../hooks/useRedirectWhenLoggedOut";
import { useRouter } from "next/router";
import Searchbar from "../widgets/Searchbar";

const Navbar: React.FC = () => {
  useRedirectWhenLoggedOut();
  const router = useRouter();

  return (
    <>
      <nav>
        <div className="nav-left">
          <img src={"/cislogo.png"} alt="CIS Logo" onClick={async () => router.push("/home")} />
        </div>
        <Searchbar />
        <div className="nav-right">
          <GrCart
            size={"25px"}
            style={{ marginRight: "30px", cursor: "pointer" }}
            onClick={async () => router.push("/home/my-cart")}
          />
          <NavbarUserWidget size={"35px"} />
        </div>
      </nav>

      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100vw;
          background: var(--primaryBackgroundColor);
          padding: 20px 45px;
          box-shadow: 0px 8px 8px rgba(227, 227, 227, 0.25);
          height: var(--navbarHeight);
        }

        .nav-left {
          display: flex;
          align-items: center;
          width: fit-content;
        }

        .nav-right {
          display: flex;
          align-items: center;
        }

        img {
          height: 35px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Navbar;
