import React from "react";
import {Link} from 'react-router-dom'

function LinksList({ links }) {
    if(!links.length) {
        return <p className="center">No links yet</p>
    }
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Original</th>
          <th>Minimized</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, index) => {
          return (
            <tr key={index}>
              <td>{index +1}</td>
              <td>{link.from}</td>
              <td>{link.to}</td>
              <td>
                <Link to={`/detail/${link._id}`}>Open</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default LinksList;
