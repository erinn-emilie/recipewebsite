import '../Styles/RecipeCard.css'
import HeartButton from './HeartButton'



const MiniRecipeCard = (props) => {

    return (
        <div role="button" onClick={()=>props.opencard(props.data)} className="minirecipe--card container-fluid rounded">
            <div className="d-flex flex-row justify-content-center align-items-center mt-2">
                <HeartButton data={props.data} openprompt={props.openprompt}></HeartButton>
                <div className="mini--header">{props.data?.name}</div>
            </div>
            <div className="d-flex flex-column justify-content-center mb-2">
                <div className="d-flex flex-row justify-content-center text-center">Website: {props.data.site_name}</div>
                <div className="d-flex flex-row justify-content-center text-center">Author: {props.data.author}</div>
                <div title="Score is equal to the total number of reviews multipled by the rating (1.0-5.0)" className="d-flex flex-row justify-content-center text-center">Score: {props.data?.weighted_rating}</div>
                <div className="d-flex flex-column">
                    {
                        props.data.ingredients.map((ingredient, num) => (
                            <>
                                {
                                    num < 5 && (
                                        <div className="me-1 d-flex flex-row">*{ingredient}</div>
                                    )
                                }
                            </>
                        ))
                    }
                    <div className="me-1 d-flex flex-row fw-bold">Click to see more ingredients!</div>
                </div>
            </div>
   
        </div>
    )
}

export default MiniRecipeCard