const Notification = ({ message, type }) => {
    if (message === null) {
        return null
    }

    var style  = {
        color: type == 0 ? "red": "green",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
    }

    return (
        <div style={style}>
            {message}
        </div>
    )
}

export default Notification