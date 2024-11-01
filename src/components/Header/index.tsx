import { HeadContainer } from "./styles";

import Logo from "../../assets/Logo.svg";
import { Scroll, Timer } from "phosphor-react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <HeadContainer>
      <span>
        <img src={Logo} alt="" />
      </span>
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="History">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeadContainer>
  );
}
