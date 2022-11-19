import React, { Component } from 'react'

export default function Row({row, index}) {
    return (
        <tr className='table-row'>
            <th scope="row">{index}</th>
            <td>{row.address}</td>
            <td>{row.city}</td>
            <td>{row.state}</td>
        </tr>
    )
}