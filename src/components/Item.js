import React from 'react'
import { useDrag } from 'react-dnd'

const Item = ({ id,type,url }) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "text",
        item: { id: id,type:type },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))
    // const [{ isDragging1 }, drag1] = useDrag(() => ({
    //     type: "text",
    //     item: { id: id,type:type },
    //     collect: (monitor) => ({
    //         isDragging1: !!monitor.isDragging(),
    //     }),
    // }))
    // const [{ isDragging2 }, drag2] = useDrag(() => ({
    //     type: "text",
    //     item: { id: id,category:type, type: },
    //     collect: (monitor) => ({
    //         isDragging2: !!monitor.isDragging(),
    //     }),
    // }))

    const itemTypes = {
        'input':'Input',
        'button':'Button',
        'container':'Container',
        'navbar':'NavBar'
    }

    



    return (
        <div>

            {

                <div className="accordion-item">
                    <h2 className="accordion-header" id={id}>
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${id}`} aria-expanded="true" aria-controls="collapseOne">
                            {itemTypes[`${type}`]} {id}
                        </button>
                    </h2>
                    <div id={`collapse${id}`} className="accordion-collapse collapse " aria-labelledby={id} data-bs-parent="#accordionExample">
                        <div className="accordion-body" ref={drag}>
                            {url}
                        </div>
                    </div>
                </div>

            }
        </div>
    )
}

export default Item