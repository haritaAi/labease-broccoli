import React,{useState,useRef} from 'react'
import { useEffect } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import FontSelector from '../FontSelector';
import { typography } from '@mui/system';
import ComponentToPrint from '../../../print/ComponentToPrint'



const PrintSettingsInvoice = () => {


    const [logoimage,setLogo] = useState(null)
    const [preview,setPrieview] = useState(null)
    const fileInputRef = useRef(null);
    const [expand,setExpand] = useState({
        margin : false,
        spacing: false,
        font :false,
        options :false,
        footer:false,
        

    })

    const [values,setValues] = useState({
        pageSize :'A4',
        orientation :'Portrait',
        logo:'',
        logoWidth:0.4,
        logoPosition:0,
        pageHeader:'',
        subLeftPageHeader:'',
        subRightPageHeader:'',
        rHeaderTax:'',
        rHeaderNTax:'',
        footer:'',
        footerSubLeft:'',
        footerSubRight:'',
        margin :{left:0.5,right:0.25,top:0.25,bottom:1},
        span:{phrh:1.7,rhch:0,chsh:0,shcontent:0,contentRF:1,pFDfb:0.3},
        typography : {},
        options:{op1:true,op2:false,op3:false,op4:false,op5:false,op6:true,op7:true,
                 op8:false,op9:false,op10:false,op11:true,op12:true,op13:true,op14:false,op15:false,
                op16:false,op17:false,op18:false,op19:false,op20:false,op21:false,op22:false}
    })
const { pageSize,orientation,logo,logoWidth,pageHeader,subLeftPageHeader,
        subRightPageHeader,rHeaderTax,rHeaderNTax,footer,footerSubLeft,
        footerSubRight} = values

useEffect(()=>{
    if(logoimage){
        const reader = new FileReader()
        reader.onload = () =>{
            setPrieview(reader.result)
        }
        reader.readAsDataURL(logoimage)
    }
    else{
        setPrieview(null)
    }
},[logoimage])


const handleChange = name => event => {
    let val = name === 'logo' ? event.target.files[0]: event.target.value
             
    if(name === 'logo'){
         let file = event.target.files[0]
         
         if(file.type.substr(0,5) === 'image'){
            setLogo(file)    
            setValues({...values,logo: event.target.files[0]})
        }else {
            window.alert("file not supported")
        }
    }
    else 
        setValues({...values,[name]:val})

    
}
const handleTypography = section => {
    setValues({...values,typography:{...typography,section}})
}
   
    return ( 
    <div className = 'container '>
         <h2>Invoice Report Settings</h2>
        <div className='row'>
         <div className='col-6'>
              <div className="row my-2">
                  <div className="col-1 ">
                   <div className='fs-4'>Page Size</div>   
                  <select className='fs-4'
                          onChange={handleChange('pageSize')}
                          >
                  <option value = 'A3'>A3</option>
                  <option value = 'A4' selected>A4</option>
                  <option value = 'A5'>A5</option>
                  <option value = 'B5'>B5</option>
                  <option value = 'Legal'>Legal</option>
                  <option value = 'Ledger'>Ledger</option>
                  <option value = 'Letter'>Letter</option>
                  <option value = 'Custom'>Custom</option>
                  
              </select>
                  </div>
                  <div className="col fs-4 mx-5">
                     <div>Orientation</div>
                     <div className='d-flex flex-row py-1 align-items-center'>
                         <input type="radio" name = 'pageOrientation' className='mx-2' 
                                value = 'Portrait'       onChange={handleChange('orientation')}/>
                         <label>Portrait</label>
                         <input type="radio" name = 'pageOrientation' className='mx-2'
                                 value = 'Landscape'     onChange={handleChange('orientation')} />
                         <label>Landscape</label>
                     </div>
                  </div>
              </div>
              <div className='border border-dark fs-4' 
                    style={{minHeight : '200px'}} 
                     >
                    <div className="row">
                         <div className="col">
                            <div>Logo</div>
                                <div  className='btn btn-info fs-4' 
                                        onClick={(event)=>{
                                            console.log("File clicked")
                                            event.preventDefault()
                                            fileInputRef.current.click()
                                    
                                }}>Select Logo </div>
                            <input type = 'file'
                                    ref = {fileInputRef}
                                    id = 'logofile'    
                                    style = {{display:'none'}}
                                    onChange={handleChange('logo')}
                                    filename = 'logo'
                                    accept = 'image/*'                         
                                    />
                                    <div>
                            {preview && <img  style = {{width:'100px'}} src = {preview} alt = ''/>}   
                            </div>
                         </div>
                     <div className="col">
                         <div className='row'>
                            <div className='col'>
                                    <div>Logo Placement</div>
                                    <select  onChange = {handleChange('logoPosition')}>
                                        <option value = '0' selected>Left of Header</option>
                                        <option value = '1'>Above of Header</option>
                                        <option value = '2'>Right of Header</option>
                                        <option value = '3'>Below Header</option>
                                    </select>
                            </div>
                         <div className="col">
                              <div>Logo Width</div>
                              <div className=''>
                                <input  type = 'number'
                                        min = '0.4'
                                        max = '2'
                                        value={logoWidth}
                                        onChange={handleChange('logoWidth')} 
                                        />
                                        <span>inches</span>
                                </div>
                         </div>
                     </div>
                         </div>

                     </div>
                      
                    

              </div>
              <div className=' fs-4 border border-dark'>
                  <div className='fw-bold'>Headers </div>
                <div>
                    <div className='fw-bold'>Page Header</div>
                    <input type = 'text'
                           value = {pageHeader}
                           style = {{width : '100%'}}
                           onChange={handleChange('pageHeader')}
                           />
                </div>
                <div className="row">
                    <div className="col">
                        <div className='fw-bold'>Sub Left</div>
                        <textarea  type = 'text'
                                   rows = '5'                                                                 
                                   cols = '35'
                                   value = {subLeftPageHeader}
                                   spellCheck = 'true'
                                   onChange={handleChange('subLeftPageHeader')}
                                   > 
                                  {subLeftPageHeader} 
                        </textarea>
                    </div>
                    <div className="col">
                    <div className='fw-bold'>Sub Right</div>
                    <textarea  type = 'text'
                                   rows = '5' 
                                   cols = '35' 
                                   value = {subRightPageHeader} 
                                   onChange = {handleChange('subRightPageHeader')}
                                   spellCheck = 'true'
                                   >
                                {subRightPageHeader} 
                        </textarea>
                    </div>
                </div>
                <div className='border border-dark'>
                    <div >
                        <div className='fw-bold'>Report Header(with Tax)</div>
                        <input type = 'text' 
                               value = {rHeaderTax}
                               onChange={handleChange('rHeaderTax')}
                             />
                    </div>
                    <div>
                        <div className='fw-bold'>Report Header(No Tax)</div>
                        <input type = 'text'
                               value = {rHeaderNTax}
                               onChange = {handleChange('rHeaderNTax')}
                              />
                    </div>
                   
                    <hr style = {{color :'#000'}}/>
                    <div className='d-flex justify-content-between'> 
                    <div className='fw-bold'>Footer</div>
                    <div className='btn btn-outline-info  ' 
                            onClick = {() => {
                                setExpand({...expand, footer : !expand.footer})
                            }}>{expand.footer?<RemoveIcon/>:<AddIcon/>}</div>
                    </div>
            { expand.footer &&  <div>
                    <div>Report Footer</div>
                    <textarea type = 'text'
                              rows='5'
                              style = {{width :'100%'}}
                              spellCheck = 'true'
                              value = {footer}
                              onChange = {handleChange('footer')}
                            >

                    </textarea>
                    <div className="row">
                        <div className="col">
                            <div>Sub Left</div>
                            <textarea  type = 'text'
                                        rows = '5' 
                                        cols = '35'
                                        value = {footerSubLeft}
                                        spellCheck = 'true'
                                        onChange={handleChange('footerSubLeft')}
                                   ></textarea>
                        </div>
                        <div className="col">
                            <div>Sub Right</div>
                            <textarea  type = 'text'
                                      rows = '5' 
                                      cols = '35'   
                                      value = {footerSubRight}
                                      onChange={handleChange('footerSubRight')}
                                      spellCheck = 'true'
                                     ></textarea>
                        </div>
                    </div>
                    </div>}
                </div>
                
                <div className='border border-dark fs-4'>
                    <div className='d-flex justify-content-between'>
                        <div className = 'fw-bold'>Margins<span className='fw-normal'>(inches)</span></div>
                        <div className='btn btn-outline-info  ' 
                            onClick = {() => {
                                setExpand({...expand, margin : !expand.margin})
                            }}
                            >{expand.margin?<RemoveIcon/>:<AddIcon/>}</div>
                        </div>
                    <hr/>
                  {expand.margin === true &&   <div className="d-flex flex-row w-100">
                        <div className="w-25">
                            <div>Left</div>
                            <input type = 'number' 
                                    className="w-100"
                                   value = {values.margin.left}  
                                   onChange={handleChange('m.left')}
                                  />
                        </div>
                        <div className="w-25">
                           <div>Right</div>
                            <input type = 'number'
                                   className='w-100'
                                   value = {values.margin.right}  
                                   onChange={handleChange('m.right')}                                   
                                  />
                        </div>
                        <div className="w-25 ">
                           <div>Top</div>
                            <input type = 'number' 
                                   className='w-100'
                                   value = {values.margin.top}  
                                   onChange={handleChange('m.top')}                                   
                                   />
                        </div>
                        <div className="w-25 ">
                           <div>Bottom</div>
                            <input type = 'number' 
                                   className='w-100'
                                   value = {values.margin.bottom}  
                                   onChange={handleChange('m.bottom')}                                 
                                 />
                        </div>
                    </div>}
                 </div>  
                <div className='fs-4 border border-dark'>
                <div className='d-flex justify-content-between'>
                   <div className='fw-bold'>Spacing<span className='fw-normal'>(inches)</span></div>
                   <div className='btn  btn-outline-info' 
                            onClick = {() => {
                                setExpand({...expand, spacing : !expand.spacing})
                            }}
                            >{expand.spacing?<RemoveIcon/>:<AddIcon/>}</div>
                   </div>
                   <hr/>

            {expand.spacing &&    <div>
                   <div className='d-flex justify-content-between'>
                       <div>Page Header and Report Header</div>
                       <input type = 'number'
                              value = {values.span.phrh}
                              className='col-1 mx-2'
                              onChange = {handleChange('span.phrh')}
                                    />
                   </div>
                   <hr className='border border-secondary'/>
                   
                   <div className='d-flex justify-content-between'>
                       <div>Report Header and Client Header</div>
                       <input type = 'number'
                              className='col-1 mx-2'
                              value = {values.span.rhch}                              
                              onChange = {handleChange('span.rhch')}
                                    />
                   </div>
                   <hr className='border border-secondary'/>
                
                <div className='d-flex justify-content-between'>
                       <div>Client Header and Secondary Header</div>
                       <input type = 'number'
                              className='col-1 mx-2'
                              value = {values.span.chsh}                              
                              onChange = {handleChange('span.chsh')}
                                    />
                   </div>
                   <hr className='border border-secondary'/>
                   <div className='d-flex justify-content-between'>
                       <div>Secondary Header and Content</div>
                       <input type = 'number'
                              className='col-1 mx-2'
                              value = {values.span.shcontent}  
                              onChange = {handleChange('span.shcontent')}
                                    />
                   </div>
                   <hr className='border border-secondary'/>
                   <div className='d-flex justify-content-between'>
                       <div>Content and Report Footer</div>
                       <input type = 'number'
                              className='col-1 mx-2'
                              value = {values.span.contentRF}
                              onChange = {handleChange('span.contentRF')}
                                    />
                   </div>
                   <hr className='border border-secondary'/>
                   <div className='d-flex justify-content-between'>
                       <div>Page Footer Distance From Bottom</div>
                       <input type = 'number'
                              className='col-1 mx-2'
                              value = {values.span.pFDfb}
                              onChange = {handleChange('span.pFDfb')}
                                    />
                   </div>
                   </div>}
                   </div>
                    <div className='border border-dark fs-4'>
                    <div className='d-flex justify-content-between'>
                        <div className = 'fw-bold'>Font</div>
                        <div className='btn btn-outline-info  ' 
                            onClick = {() => {
                                setExpand({...expand, font : !expand.font})
                            }}
                            >{expand.font?<RemoveIcon/>:<AddIcon/>}</div>
                        </div>
                    <hr/>
                       {expand.font &&  <div>
                        <div className='d-flex flex-row w-100 my-1'>
                            <div className="w-25 bg-info">Section</div>
                            <div className="w-50 bg-info">Fonts</div>
                            <div className="w-25 bg-info">Size</div>
                        </div>
                        <FontSelector title = 'Lab Name' onSelect = {handleTypography}/>
                        <hr/>
                        <FontSelector title = 'Page Header' onSelect = {handleTypography}/>
                        <hr/>                        
                        <FontSelector title = 'Report Header' onSelect = {handleTypography}/>
                        <hr/>
                        <FontSelector title = 'Detail Header' onSelect = {handleTypography}/>
                        <hr/>
                        <FontSelector title = 'Content' onSelect = {handleTypography}/>
                        <hr/>
                        <FontSelector title = 'Summary' onSelect = {handleTypography}/>
                        <hr/>
                        <FontSelector title = 'Report Footer' onSelect = {handleTypography}/>
                        <hr/>
                        <FontSelector title = 'Page Footer' onSelect = {handleTypography}/>
                    </div>}
                    </div>
                   <div className='border border-dark fs-4'>
                   <div className='d-flex justify-content-between'>
                        <div className = 'fw-bold'>Options</div>
                        <div className='btn btn-outline-info  ' 
                            onClick = {() => {
                                setExpand({...expand, options : !expand.options})
                            }}
                            >{expand.options?<RemoveIcon/>:<AddIcon/>}</div>
                        </div>
                    <hr/>
                   {expand.options &&  <div>
                        <div >
                          <div className='d-flex flex-row fs-4 align-items-center border border-secondary'> 
                                  <input type = 'checkbox' className='mx-1' checked = {values.options.op1}
                                         onChange={() => 
                                         setValues({...values,options:{...values.options,op1 : !values.options.op1}})  }
                                               />
                                  <span>Show page number</span>
                                 </div>  
                          <div className='d-flex flex-row fs-4 align-items-center border border-secondary'>
                                   <input type = 'checkbox' className='mx-1' checked = {values.options.op2}
                                         onChange={() => 
                                        setValues({...values,options:{...values.options,op2 : !values.options.op2}})  }
                                        />
                                   <span>Center align Lab name</span>  
                                   </div>
                          <div className='d-flex flex-row fs-4 align-items-center border border-secondary'>
                                <input type = 'checkbox' className='mx-1'  checked = {values.options.op3}  
                                         onChange={() => 
                                         setValues({...values,options:{...values.options,op3 : !values.options.op3}})  }
                                         />
                                <span>Center align footer contents</span>
                                  </div>
                          <div className='d-flex flex-row fs-4 align-items-center border border-secondary'>
                                <input type = 'checkbox' className='mx-1' checked = {values.options.op4}
                                      onChange={() => 
                                            setValues({...values,options:{...values.options,op4 : !values.options.op4}})  }
                                       />
                                 <span>Page headers on all pages</span> 
                                  </div>
                          <div className='d-flex flex-row fs-4 align-items-center border border-secondary'> 
                                   <input type = 'checkbox' className='mx-1' checked = {values.options.op5}
                                            onChange={() => 
                                                setValues({...values,options:{...values.options,op5 : !values.options.op5}})  }
                                         />
                                   <span>Bounding Box</span>
                                     </div>
                          <div className='d-flex flex-row fs-4 align-items-center border border-secondary'> 
                                  <input type = 'checkbox' className='mx-1'   checked = {values.options.op6}
                                             onChange={() => 
                                                setValues({...values,options:{...values.options,op6 : !values.options.op6}})  }
                                          />
                                  <span>Use Palmer Notation</span>
                                   </div> 
                          <div className='d-flex flex-row fs-4 align-items-center border border-secondary'>
                                 <input type = 'checkbox'className='mx-1' checked = {values.options.op7}
                                           onChange={() => 
                                            setValues({...values,options:{...values.options,op7 : !values.options.op7}})  }
                                        />
                                 <span>Shaded grid headers</span>
                                   </div>
                          <div className='d-flex flex-row fs-4 align-items-center border border-secondary'>
                                 <input type = 'checkbox' className='mx-1' checked = {values.options.op8}
                                        onChange={() => 
                                        setValues({...values,options:{...values.options,op8 : !values.options.op8}})  }
                                          />
                                 <span>Hide teeth selection</span> 
                                  </div>
                          <div className='d-flex flex-row fs-4 align-items-center border border-secondary'>  
                                 <input type = 'checkbox' className='mx-1' checked = {values.options.op9}
                                        onChange={() => 
                                        setValues({...values,options:{...values.options,op9 : !values.options.op9}})  }
                                        />
                                 <span>Vertical gap between line item rows</span> 
                                  </div>
                          <div className='d-flex flex-row fs-4 align-items-center border border-secondary'> 
                                  <input type = 'checkbox' className='mx-1' checked = {values.options.op10}
                                          onChange={() => 
                                            setValues({...values,options:{...values.options,op10 : !values.options.op10}})  }
                                  />
                                  <span>Do not group by requesting Client/ Sub Doctor</span>
                                  </div>  
                          <div className='d-flex flex-row fs-4 align-items-center border border-secondary'> 
                                 <input type = 'checkbox' className='mx-1' checked = {values.options.op11}
                                         onChange={() => 
                                            setValues({...values,options:{...values.options,op11 : !values.options.op11}})  }
                                      />
                                 <span>Show Previous Balance in bill header</span>
                                   </div>
                          <div className='d-flex flex-row fs-4 align-items-center border border-secondary'> 
                                 <input type = 'checkbox' className='mx-1' checked = {values.options.op12}
                                          onChange={() => 
                                            setValues({...values,options:{...values.options,op12 : !values.options.op12}})  }
                                       />
                                 <span>Hide Previous Balance For Invoice with Tax</span>
                                   </div>
                          <div className='d-flex flex-row fs-4 align-items-center border border-secondary'> 
                                <input type = 'checkbox' className='mx-1' checked = {values.options.op13}
                                           onChange={() => 
                                            setValues({...values,options:{...values.options,op13 : !values.options.op13}})  }
                                        />
                                <span>Hide Previous Balance For Invoices without Tax</span>  
                                </div>
                          <div className='d-flex flex-row fs-4 align-items-center border border-secondary'>
                                <input type = 'checkbox' className='mx-1' checked = {values.options.op14}
                                        onChange={() => 
                                            setValues({...values,options:{...values.options,op14 : !values.options.op14}})  }
                                             />
                                <span>Hide Paid amount against Invoice</span> 
                                 </div>
                          <div className='d-flex flex-row fs-4 align-items-center border border-secondary'> 
                                 <input type = 'checkbox' className='mx-1'  checked = {values.options.op15}
                                         onChange={() => 
                                            setValues({...values,options:{...values.options,op15 : !values.options.op15}})  }
                                 />
                                 <span>Hide Credit Adjustments against Invoice</span>
                                 </div>  
                          <div className='d-flex flex-row fs-4 align-items-center border border-secondary'>
                                <input type = 'checkbox' className='mx-1' checked = {values.options.op16}
                                        onChange={() => 
                                            setValues({...values,options:{...values.options,op16 : !values.options.op16}})  }
                                         />
                                <span>Hide Due Date</span> 
                                 </div>
                          <div className='d-flex flex-row fs-4 align-items-center border border-secondary'>
                                 <input type = 'checkbox' className='mx-1'  checked = {values.options.op17}
                                    onChange={() => 
                                        setValues({...values,options:{...values.options,op17 : !values.options.op17}})  }/>
                                 <span>Print Contact Person</span>
                                  </div> 
                          <div className='d-flex flex-row fs-4 align-items-center border border-secondary'> 
                                <input type = 'checkbox' className='mx-1' checked = {values.options.op18}
                                   onChange={() => 
                                    setValues({...values,options:{...values.options,op18 : !values.options.op18}})  }
                                    />
                                <span>Show patient name with product description</span>
                                </div>  
                          <div className='d-flex flex-row fs-4 align-items-center border border-secondary'> 
                               <input type = 'checkbox' className='mx-1' checked = {values.options.op19}
                                     onChange={() => 
                                     setValues({...values,options:{...values.options,op19 : !values.options.op19}})  }
                                         />
                               <span>Hide Unit Rate</span>
                                 </div>
                          <div className='d-flex flex-row fs-4 align-items-center border border-secondary'>
                                <input type = 'checkbox' className='mx-1' checked = {values.options.op20}
                                   onChange={() => 
                                    setValues({...values,options:{...values.options,op20 : !values.options.op20}})  }
                                    />
                                <span>Show Discount</span>
                                  </div>
                          <div className='d-flex flex-row fs-4 align-items-center border border-secondary'> 
                                <input type = 'checkbox' className='mx-1' checked = {values.options.op21}
                                         onChange={() => 
                                            setValues({...values,options:{...values.options,op21 : !values.options.op21}})  }
                                      />
                                <span>Show Report Title In Page Header</span>
                                </div>  
                          <div className='d-flex flex-row fs-4 align-items-center border border-secondary'> 
                                <input type = 'checkbox' className='mx-1' checked = {values.options.op22}
                                         onChange={() => 
                                            setValues({...values,options:{...values.options,op22 : !values.options.op22}})  }
                                      />
                                <span>Show UPI Pay QR Code</span>
                                  </div>
                           
                        </div>
                    </div>}

                   
                   </div>
                  
              </div>
              <div className="d-flex ">
                        <div className="btn btn-info fs-4" onClick={()=> {
                            console.log("Values Selected :",values)
                        }}>Save</div>
                        <div className="btn btn-info mx-2 fs-4">Reset</div>
                    </div>
         </div>
        <div className='bg-info col-6'>
           
               <ComponentToPrint />
            
        </div>
         </div>
           </div>
   );
}

export default PrintSettingsInvoice