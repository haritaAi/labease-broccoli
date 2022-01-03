import React from 'react';
import {Link} from 'react-router-dom'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import { usePDF ,PDFDownloadLink} from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

// Create Document Component
const MyDocument = () => (
  <Document title = 'New PDF generation' 
            onRender={()=>console.log("File generated")}>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

const PrintComponent = () => {
  
    const [instance,updateInstance] = usePDF({document : MyDocument})
    if(instance.loading) return <div>Loading...</div>

    if(instance.error) return <div>Something went wrong: {instance.error}</div>
    console.log("Instace of File ",instance.blob)
    console.log("URL:",instance.url)


    return(
      <a  href = {instance.url} dowload = 'test.pdf'>Print</a>
    )
}

export default PrintComponent