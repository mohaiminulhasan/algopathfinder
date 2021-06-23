export const Node = (props) => {
  const coordinate = [props.row_index, props.col_index]

  return (
    <div 
      className={`node ${props.status}`}
      onMouseDown={(e) => props.handleMouseDown(coordinate, e)}
      onMouseEnter={(e) => props.handleMouseEnter(coordinate, e)}
      onMouseUp={props.handleMouseUp}
    ></div>
  )
}