function Blog(props) {
    return (
        <div
            style={{
                border: '1px solid black',
            }}
        >
            <h4>{props.title}</h4>
            <h4>{props.description}</h4>
        </div>
    )
}

export default Blog
