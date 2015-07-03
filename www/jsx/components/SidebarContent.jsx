import React from "react/addons";
import {Link} from "react-router";
import {Menus} from "../../datas/menu.js";

const update = React.addons.update;

const styles = {
    sidebar: {
        width: 256
    },
    sidebarLink: {
        display: 'block',
        padding: '16px 0px',
        color: '#757575',
        textDecoration: 'none'
    },
    divider: {
        margin: '8px 0',
        height: 1,
        backgroundColor: '#757575'
    }
};
var SidebarContent = React.createClass({
    render() {
        let style = styles.sidebar;

        if (this.props.style) {
            style = update(style, {$merge: this.props.style});
        }
        let links = [],
            entries = Menus.entries;
        for(let i = 0, l = entries.length; i < l; i++) {
            links.push(
                <Link className={entries[i].className} to={entries[i].href} dangerouslySetInnerHTML={{__html:entries[i].title}} onClick={() => this.props.onMenuClick(entries[i])}></Link>
            )
        }

        return (
            <div title="Menu" style={style}>
                <a href='#' style={styles.sidebarLink}>MEDIC 2.0</a>
                <div style={styles.divider} />
                {links}
            </div>);
    }
});

export default SidebarContent;