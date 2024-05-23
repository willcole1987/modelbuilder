const RadioButton = ({Name, categoryValue, isChecked, handleClick}) => 
{
    return( <div className="radio">
            <label>
                <input type="checkbox"
                       checked={isChecked}
                       value={categoryValue}
                    //    onClick={() => (handleClick(categoryValue))}
                       onChange={(e) => (handleClick(categoryValue))}
                />
                {Name}
            </label>
        </div>
        )
}   

export default RadioButton;