import {StyleSheet} from '@react-pdf/renderer';


const  styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',      
    },
    tableHeaders:{
        flexDirection :'row',
        fontSize:12,
        fontWeight:'ultrabold',  
      
        borderBottom:'1px solid #000',    

        // border:'1px solid #000',
    },
    tableRow:{
        // width : '100%',
        flexDirection : 'row',
        fontSize : 12,
        fontWeight:400,        
        borderBottom:'1px solid #000',  
        minHeight :20,
        alignContent:'center'  
    },
   tableCell:{
      border:'1px solid #000',
      width : 'fit-content',
    //   padding : 2,
   },
   cell1:{
        padding : 2,
        textAlign:'center',       
        borderRight:'1px solid #000',       
        flexBasis:0,
        flexGrow:0.2,
   },
   cellOrderDate:{
      padding : 2,
      textAlign:'left',     
      borderRight:'1px solid #000',     
      flexBasis:0,
      flexGrow:0.8,
      fontSize:10,
   },
  
   cellPatient:{
      padding : 2,     
      borderRight:'1px solid #000',     
      flexBasis:0,
      flexGrow:1,
   },
   cellListRate:{     
      padding:2,         
      borderRight:'1px solid #000',      
      flexBasis:0,
      flexGrow:0.8,
   },
   cellOrderNo:{    
      padding : 2,     
      borderRight:'1px solid #000',     
      flexBasis:0,
      flexGrow:0.8,
   },
   cellProduct:{
      padding : 2,    
      borderRight:'1px solid #000',   
      flexBasis:0,
      flexGrow:2,
    },
  cellTeeth:{
        
      borderRight:'1px solid #000',
      textAlign:'center',    
      flexBasis:0,
      flexGrow:2,
     flexDirection : 'column',
     
  },
  cellUnits:{
    padding : 2,  
    borderRight:'1px solid #000',  
    flexBasis:0,
    flexGrow:0.5,
  },
  cellRateUnits : {
    padding : 2,      
    borderRight:'1px solid #000',   
    flexBasis:0,
    flexGrow:0.6,
  },
  cellDiscount: {
    padding : 2,   
    borderRight:'1px solid #000',
    flexBasis:0,
    flexGrow:0.6,
  },
  cellTotalAmount : {
    padding : 2,  
    flexBasis:0,
    flexGrow:1,
    textAlign:'right',
  },
  archLeft:{
    flexBasis:0,
    flexGrow:2,      
    textAlign : 'right',    
    borderRight:'1px solid black',
    fontSize:12
 },
 archRight:{
  flexBasis:0,
  flexGrow:2,
  textAlign:'left',
 fontSize:12

},
archUp:{
  flexDirection:'row',
  flexBasis:0,
  flexGrow:1,
  height:'50%',
  
},
 archDown : {
   flexDirection:'row',
  flexBasis:0,
  flexGrow:1,
  height:'50%',
  borderTop:'1px solid #000'
 } ,
 cell:{
   flexBasis:0,
   flexGrow :1,
   flexDirection:'row',

 },
});


export default styles