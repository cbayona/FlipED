import React from "react"
import c from "classnames"
import {connect} from "react-redux"
import {Link} from "react-router"
import withStyles from "isomorphic-style-loader/lib/withStyles"

// import Tooltip from "react-tooltip"

import Icon from "../Icon"
import Role from "../Role"

import {LOGO} from "../../constants/visual"
import {roleMap, Path, Locale, Icons} from "../../constants/routes"

import s from "./Sidebar.scss"

const Tooltip = () => <div />

const SideLink = withStyles(s)(({route, onClick, href, isActive}) => (
  <a href={href} onClick={onClick} className={s.sideLink}>
    <div
      className={c(s.sidebarItem, isActive && s.active)}
      data-tip={`ไปยังส่วน${Locale[route]}`}
    >
      <Icon i={Icons[route]} />
      <div>{Locale[route] || route}</div>
    </div>
  </a>
))

const Sidebar = props => (
  <div className={c(s.sidebar, props.show && s.sidebarMobile)}>
    <Link to="/">
      <div className={s.logo}>
        <img src={LOGO} alt="Logo" />
      </div>
    </Link>
    <Tooltip place="top" type="dark" effect="float" />
    {Object.keys(roleMap).map((route, i) => (
      <Role {...roleMap[route]} key={i}>
        <Link activeOnlyWhenExact to={Path[route] || "#!"}>
          {params => <SideLink route={route} {...params} />}
        </Link>
      </Role>
    ))}
  </div>
)

const mapStateToProps = state => ({
  show: state.app.ui.mobileMenu || false
})

export default connect(mapStateToProps)(withStyles(s)(Sidebar))