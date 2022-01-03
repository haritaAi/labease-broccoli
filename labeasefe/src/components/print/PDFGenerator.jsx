import React from 'react';
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas';



const PDFGenerator = (props) => {

const generatePDF = ()=> {

    let doc = new jsPDF('p','pt','a4');
    doc.html(document.getElementById('content'),{
        callback: function(pdf){
            let pageCount = doc.internal.getNumbeOfPages();
            pdf.deletePage(pageCount)
            pdf.save('invoicefile.pdf')

            
        }
    })
   


}

const  getDocument = () => {

    return(
        <div id = 'content'>
        <h1>This is Title of the document</h1>
        <div className="row">
            <div className="col">Left Hand subtext</div>
            <div className="col">Right Hand subtext</div>
        </div>
        <div className="row">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Dolorem, fuga exercitationem! Nam consectetur non sequi iusto,
             repudiandae eum reprehenderit voluptates aut quo magnam eaque
              pariatur nihil quidem qui veritatis repellendus doloribus maio
              res ratione! Nihil consectetur ipsum quibusdam fugiat, non,
               incidunt dicta voluptatem excepturi quos dolorem quam sequi 
               doloribus et expedita?
        </div>
        <hr/>
        <div className="row">
            This is document Footer
        </div>
    </div>
    )
}

    return (
        <div>
            <div style = {{display : 'none'}}>{getDocument()}</div>
            <div className="btn btn-warning"
                 onClick={generatePDF}
                 >PDF</div>
        </div>
    );
}

export default PDFGenerator;