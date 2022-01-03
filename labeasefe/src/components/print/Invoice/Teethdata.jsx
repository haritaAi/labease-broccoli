import React, { Fragment } from 'react';
import { Page, Text, View, Document, StyleSheet,Image} from '@react-pdf/renderer';


const  Teethdata = ({toothRow}) =>  {
     
   const data = <Text >{toothRow}</Text>
          



    return (
        <Fragment>
           {data}
        </Fragment>
    );
}

export default Teethdata;