import React,{useState,useEffect} from 'react';
import { Page, Text, View, Document, StyleSheet,Image } from '@react-pdf/renderer';
import logo from  '../../../images/logo-print.jpg'






const styles = StyleSheet.create({
    container:{
        height:150,
        flexDirection:'row',          
        maxHeight:'120px',   
        fontWeight:'light',
        fontSize:12,
        margin: '10 2',
        justifyContent:'space-between'    
    },
    leftSection:{
       
       width:'70%',
       flexDirection:'row',
       justifyContent:'flex-start'  ,
       overflow:'wrap',
    
    },
    rigthSection:{
        width:'30%',
        justifyContent:'flex-start',
        textAlign :'right',
        fontSize:14,
        paddingTop:10,
    },
    imageContainer:{
        width:'10%'   

    },
    image : {
    height:'60%'   
        
    },
    title:{
     paddingTop:5,
     fontSize :20,
     fontWeigth:900,
    },
    textStyle : {
     fontSize:14,     
     paddingRight:100,
     fontWeight:300,
    },

});


function InvoiceHeader({client}) {

    
    let title = ''
    let address = ''
    let email = ''
    let phone = ''
    

   if(client.company===1){
          title = 'Evoq Digital Dental Solutions'
          address = '804,Venus Atlantis Corporate Park, 100Ft. Rd, Nr. Shell Petrol Pump, Prahaladnagar Ahmedabad-380054'
          email ='evoqdds@gmail.com'
          phone = '079-48910770'   
   }
   else if(client.company === 2){
          title = 'Evoq Digital Dental Solutions2'
          address = '804,Venus Atlantis Corporate Park, 100Ft. Rd, Nr. Shell Petrol Pump, Prahaladnagar Ahmedabad-380054'
          email ='evoqdds@gmail.com2'
          phone = '079-48910770'   
   }
   else if(client.company === 3){
          title = 'Evoq Digital Dental Solutions3'
          address = '804,Venus Atlantis Corporate Park, 100Ft. Rd, Nr. Shell Petrol Pump, Prahaladnagar Ahmedabad-380054'
          email ='evoqdds@gmail.com3'
          phone = '079-48910770'   
   }
   else {
        title = 'Evoq Digital Dental Solutions'
        address = '804,Venus Atlantis Corporate Park, 100Ft. Rd, Nr. Shell Petrol Pump, Prahaladnagar Ahmedabad-380054'
        email ='evoqdds@gmail.com'
        phone = '079-48910770'  
   }





    return (     
                <View  style = {styles.container}>
                    <View style = {styles.leftSection}>
                              <Image style = {styles.image} src = {logo} />   
                            <View style={{paddingLeft : 10}}>                
                            <Text style = {styles.title}>{title}</Text>
                            <Text style = {styles.textStyle}  >{address}</Text>
                            </View>
                       
                     </View>
                     <View style={styles.rigthSection}>
                         <Text>contact :  (O){phone}</Text>
                         <Text>{email}</Text>
                     </View> 
                 </View>          
    
    );
}

export default InvoiceHeader;