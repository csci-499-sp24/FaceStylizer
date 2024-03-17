import React from "react";
import "tailwindcss/tailwind.css";

import { Table } from "reactstrap";

const Gallery = () => {
  return (
    <div className="flex justify-center items-start min-h-screen">
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Filtered Image</th>
            <th>Uploaded Image</th>
            <th>Stylized Image</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Gallery;
