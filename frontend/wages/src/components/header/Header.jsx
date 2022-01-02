import Menu from "../menu/Menu";

const Header = () => {
    return (
        <div className="top-block">
            <div className="top-menu">
                <Menu />
            </div>
            <div className="top-title">
                KPI WAGES SYS
            </div>
        </div>
    );
};

export default Header;