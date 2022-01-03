import React from 'react';
import { Page, Text, View, Document, StyleSheet,Image} from '@react-pdf/renderer';
import {Table, TableCell, TableRow,TebleCell} from 'react-table-pdf'

const  InvoiceItemTable = ({invoice}) =>  {
   
  const  columns = ['#']
   
   
   
    return (
        <View>
            <Table>
                <TableRow>
                     <TableCell>This is table cell1</TableCell>    
                     <TableCell>This is table cell2</TableCell>    
                     <TableCell>This is table cell3</TableCell>    
                     <TableCell>This is table cell4</TableCell>    
                     <TableCell>This is table cell5</TableCell>    
                </TableRow>
                
            </Table>
            
        </View>
    );
}

export default InvoiceItemTable;