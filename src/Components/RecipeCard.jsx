import '../Styles/UniversalStyles.css'

const RecipeCard = (props) => {


    if (props.data.ingredients === undefined) {
        return (
            <div className="rounded recipe--card container-fluid d-flex flex-row justify-content-center">
                <p className="text-center">Enter a url and your recipe will appear here! In the future this will have a sample recipe to show you what the output looks like. </p>
            </div>
        )
    }

    return (
        <div className="rounded recipe--card container-fluid d-flex flex-row">
            <div className="p-2 d-flex flex-column container-fluid ingredients--column">
                {
                    props.data.ingredients?.map((ingredient) => (
                        <div className="p-2 d-flex">{ingredient}</div>
                    ))
                }
            </div>
            <div className="p-2 d-flex flex-column container-fluid ingredients--column">
                {
                    props.data.instructions?.map((step) => (
                        <div className="p-2 d-flex">{step}</div>
                    ))
                }
            </div>
        </div>
    )
}

export default RecipeCard