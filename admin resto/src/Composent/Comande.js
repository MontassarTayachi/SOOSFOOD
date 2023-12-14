import React from 'react';
import Tablecom from '../viwes/table';
import Navbar from './Navbar';
function Comande({namer,idr}) {


return(
<div>
    <Navbar Navbarname="List comande"name={namer} id={idr}></Navbar>
    <Tablecom name={namer} id={idr}></Tablecom>

</div>
)};
export default Comande;