
const ScrollBox = ({optionsList, selectModel}) =>
{
    const boxStyle = { border:"1px solid black",
                        height:"200px",
                        overflow:"scroll",
                        overflowY:"scroll",
                        overflowX:"hidden",
                        cursor: 'pointer'
                    };

    return(
        <div style={boxStyle}>
            <ul className="scrollable-ul" style={{ listStyleType: "none" }}>
                {optionsList.map((i, idx) => 
                        (<li key={idx} 
                             id={i["ModelId"]}
                             onClick={() => selectModel(i.ModelId, i.Category)}>
                                { i["Name"] }
                         </li>)
                    )
                }
            </ul>
        </div>
    );
}

export default ScrollBox;