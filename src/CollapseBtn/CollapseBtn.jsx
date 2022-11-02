import s from "./CollapseBtn.module.scss";

function CollapsBtn({func}) {
    
    return (
        <button type="button" className={s.button} onClick={() => func()}>Collapse lines</button>
    )
};

export default CollapsBtn;