import '../Styles/PromptBox.css'

const PromptBox = (props) => {

    return (
        <div className="prompt--container rounded">
            <div onClick={() => props.close()} role="button" className="x--btn">X</div>
            <div className="prompt--message">{props.message}</div>
            {
                props.redirect && (
                    <div>Log in or Sign up here!</div>
                )
            }
        </div>
    )
}

export default PromptBox