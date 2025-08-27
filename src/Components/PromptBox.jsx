import '../Styles/PromptBox.css'
import { useNavigate } from 'react-router-dom'


const PromptBox = (props) => {

    const navigate = useNavigate()

    return (
        <div className="prompt--container rounded container-fluid">
            <div onClick={() => props.close()} role="button" className="x--btn container-fluid">X</div>
            <div className="prompt--message container-fluid">{props.message}</div>
            {
                props.redirect && (
                    <div role="button" onClick={() => navigate('/portal')} className="rounded navigate--btn container-fluid">Log in or Sign up here!</div>
                )
            }
        </div>
    )
}

export default PromptBox