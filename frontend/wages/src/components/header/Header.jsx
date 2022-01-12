import Menu from "../menu/Menu";

const Header = () => {
    return (
        <div className="top-block">
            <div className="top-menu">
                <Menu />
            </div>
            <div className="top-title">
                <span>KPI WAGES SYS</span>
            </div>
        </div>
    );
};

export default Header;