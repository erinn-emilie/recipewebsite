import '../Styles/PromptBox.css'


const PromptBox = (props) => {

    return (
        <div className="prompt--container rounded container-fluid">
            <div onClick={() => props.close()} role="button" className="x--btn container-fluid">X</div>
            <div className="prompt--message container-fluid">{props.message}</div>
        </div>
    )
}

export default PromptBox