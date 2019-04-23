import React from 'react';
import { Link, withRouter } from "react-router-dom";

const MenusList = (props) => {
    const menus = props.menus;
    const menusIsPresent = menus !== null && menus !== undefined;

    if(menusIsPresent){
        return (
            <table className={"dishesTable"}>
            <thead>
            <tr>
                <th>Day</th>
                <th>Dish</th>
            </tr>
            </thead>
            <tbody>
            {menus.map(m => {
                return(
                <tr className={"menuListRow"} key={"k" + m.id+m.day}>
                    <td>
                        {m.dishes.day}
                    </td>
                    <td>
                        <ul>
                            {m.dishes.dishes.map(d => {
                                return <li key={d.id+"k"}>{d.name} {d.price},-</li>
                            })}
                        </ul>
                    </td>
                    {props.userId !==null ? (<td><Link className="btn" to={"/editMenu/" + m.id}>Edit</Link></td>) : null}
                </tr>
                )
            })}
            </tbody>
            </table>

        );
    }else{
        return <p>Menus is not present</p>
    }
};


export default withRouter(MenusList);