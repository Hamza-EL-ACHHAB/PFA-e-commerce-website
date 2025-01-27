
import React,{useContext, useEffect} from 'react'
import {  useNavigate,Link,useParams } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"
import {Table,Button} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import { getAllShopOrders,updateOrder,reset1} from '../features/order/orderSlice'
import Spinner from '../components/Spinner'
import context1 from '../context1'
import { getUserDetails } from '../features/user/userSlice'
import { toast } from 'react-toastify'




const ReceivedDemandesScreen = () => {
  const dispatch=useDispatch()
  const params=useParams()
    const {isEn}=useContext(context1);
  const order=useSelector(state=>state.order)
  const {AllShopOrders,SuccessgetAllShopReceivedOrders,LoadinggetAllShopReceivedOrders,ErrorgetAllShopReceivedOrders,messagegetAllShopOrdersReceive}=order.getAllShopOrdersReceivedInfo
  const {LoadingupdateOrder,ErrorupdateOrder,SuccessupdateOrder}=order.updateOrderInfo

  const user=useSelector(state=>state.user)
  const {userLogin}=user
  const {userDetails}=user.UserDetailsInfo
  
  useEffect(()=>{
    dispatch(getUserDetails(userLogin?.id))
dispatch(getAllShopOrders(params.id))
    if(SuccessupdateOrder){
        dispatch(getAllShopOrders(params.id))
        dispatch(reset1())
        toast.success("Order Updated")
    }
    if(ErrorupdateOrder){
        dispatch(reset1())
        toast.error("Error !!")
    }
    
   },[dispatch,userLogin?.id,params.id,SuccessupdateOrder,ErrorupdateOrder])

   const confirmerHndler=(orderId)=>{
    
alert("Vous etes sur de confirmer cette demande ?")
    dispatch(updateOrder({orderId,status1:  "Accepted"}))
   
   }
  
   const rejectHandler=(orderId)=>{
    alert("Vous etes sur de rejeter cette demande ?")
    dispatch(updateOrder({orderId,status1:"Refused"}))
  
   }


  return (
    <div> 
           <Link to={`/shop/admin/${userDetails.shopDTO?.id}`} className='btn btn-light my-3'>{isEn ? "Return":'Revenir'}</Link>
        {AllShopOrders.length === 0 ? <h1>{isEn ? "No Received Demands":"Vous N'avez Recus Aucune Demandes"}</h1> : (
            <>
  <h1 className='addLine mb-5 mt-3'>{isEn ? "Received Demands":'Demandes Recus'}</h1>
  {/*Errordelete && <Message variant='danger'>{messagedelete}</Message>*/}
  {LoadinggetAllShopReceivedOrders ? <Spinner/> : ErrorgetAllShopReceivedOrders ? <Message variant='danger'>{messagegetAllShopOrdersReceive}</Message> : (
      <Table striped bordered="true" hover responsive className='table-sm'>
          <thead>
              <tr>
              <th>{isEn ? "Product":'Produit'} </th>
                  <th>{isEn ? "Total Price":'Prix Totale'} </th>
                  <th>{isEn ? "Quantity":'Quantité'} </th>
                  <th>{isEn ? "Status":'Statut'} </th>
                  <th>{isEn ? "From":'De'} </th>
                 
               
                  <th></th>
      
             
              </tr>
          </thead>
          <tbody>
              {AllShopOrders?.map((order)=>(
                  <tr key={order?.id}>
                        <td>{order.productName}</td>
                        <td>{order.totalePrice}</td>
                        <td>{order.qty}</td>
                      <td>{order.status}</td>
                      <td>{order.ownerLastName}  {order.ownerFirstName}</td>
                  
                      <td>
                      <Button disabled={order.status==="Accepted" ||order.status==="Refused"} variant='success'  className='mx-2 mt-1 styleBtn' onClick={(e)=>confirmerHndler(order?.id)}>
                          <i className="fa-solid fa-check" style={{color:'green'}}></i>
                          </Button>
                     
                      <Button disabled={order.status==="Accepted" ||order.status==="Refused"} variant='danger'  className='styleBtn mx-2 mt-1' onClick={()=>rejectHandler(order?.id)}>
                        <i className="fa-solid fa-xmark" style={{color:'red'}}></i>
                          </Button>
                      </td>
                  </tr>
              ))}
          </tbody>
      </Table>
  )}
      </>  )} 
      
    </div>
  
  )
}

export default ReceivedDemandesScreen

