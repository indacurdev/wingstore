import moment from 'moment/moment';
import React, { useState } from 'react'
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import axios from 'axios';
import { API_URL } from '@/config/config';

import PaypalBtn from './PaypalBtn';
import StripeForm, { ContentStripeForm } from './StripeForm';
import { useRouter } from 'next/router';

function Pay({cancel, product, data, method, plan, accounts, email, discount, comission}) {
  
  // console.log('metodo', method);
  // console.log('plan', plan);
  console.log('Comission', comission);

  const router                = useRouter();
  const session               = useSelector((state) => state.session, shallowEqual);
  const app                   = useSelector((state) => state.app, shallowEqual);
  const [date, setDate]       = useState(new Date());

  const [sending, setsending] = useState(false);
  const [errors, seterrors]   = useState({});

  const auth    = session.auth;
  const user    = session.user;
  const country = app.selectedCountry;
  const tasa    = country.valor_tasa;

  const [count, setcount] = useState(0);
  const [success, setsuccess] = useState(false);

  const getTotal = () => {
    let totalData = {};

    if(plan.precio_local){
      totalData.type    = 'local';
      totalData.moneda  = country.moneda_local;
      totalData.value   = plan.precio_local;

      totalData.subtotalusd = plan.precio_plan;
      totalData.string  = 'USD $'+totalData.subtotalusd+' / '+totalData.value +' '+country.moneda_local;
    } else if(method.tipo_pasarela === 'manual'){
      totalData.type    = 'manual';
      totalData.moneda  = country.moneda_local;

      totalData.subtotalusd = plan.precio_plan;
      totalData.value   = Number(plan.precio_plan * tasa);
      totalData.string  = 'USD $'+totalData.subtotalusd+' / '+totalData.value +' '+country.moneda_local;
    } else {
      totalData.type    = 'usd';
      totalData.moneda  = 'USD $';

      totalData.subtotalusd = plan.precio_plan;
      totalData.value   = plan.precio_plan;
      totalData.string  = 'USD $'+totalData.value ;
    }

    return totalData;
  }

  const dataTotal       = getTotal();
  const total           = dataTotal.value;

  const [payData, setpayData] = useState({
    nombre:     auth ? user.nombre_cliente : "",
    email:      auth ? user.correo_cliente : ((email) ? email : ""),
    pagoMovil:  "",
    ref:        "",
    note:       "",
    amount:     total
  });

  const handleInputChange = (e) => {

    const {name, value} = e.target;
    setpayData({
      ...payData,
      [name]: value
    });

  }

  const handleChangeInputTemplate = (val, name) => {
    if(val !== ""){
        if(errors[name]){
            let newErrors = errors;
            delete newErrors[name];

            console.log('ERRORS', formProduct);
            seterrors(newErrors);
            setcount(count + 5);
        }
    }
}

  const sendOrder = (e) => {
    e.preventDefault();

    if(method.tipo_pasarela === 'manual'){
      //MANUAL
      
      let errorsCount = 0;
      let errorsData = {};
      
      seterrors({});

      const {nombre, email, pagoMovil, ref, amount} = payData;
      console.log(nombre);

      if(!nombre || (nombre && (nombre === "" || nombre.trim().length === 0))){
        errorsCount++;
        errorsData['nombre'] = "Debe ingresar el nombre de comprador";
      }

      if(email === "" || email.trim().length === 0){
        errorsCount++;
        errorsData['email'] = "Debe ingresar su correo electrónico";
      }

      //pago movil
      /*
        if(country.nombre.toLowerCase() === 'venezuela'){
          if(pagoMovil === "" || pagoMovil.trim().length === 0){
            errorsCount++;
            errorsData['pagoMovil'] = "Ingrese nro de teléfono";
          }
        }    
      */

      if(amount === "" || amount.trim().length === 0 || amount <= 0){
        errorsCount++;
        errorsData['amount'] = "Debe ingresar un monto valido";
      }

      if(!date){
        errorsCount++;
        errorsData['date'] = "Ingrese una fecha valida";
      }

      if(ref === "" || ref.trim().length === 0){
        errorsCount++;
        errorsData['ref'] = "Debe ingresar el número de referencia";
      }

      if(errorsCount > 0){
          seterrors(errorsData);
          toast.error('Complete su información de pago');
          window.scroll(0, (document.getElementById("dataProduct").offsetTop - 70));
      }else{
        let dataToSend = {
          order: {
            type:                 method.tipo_pasarela,
            payment_method_id:    method.id_mtp,
            payment_method_name:  method.nombre_mtp,
            plan:                 plan,
            total:                total          
          },
          gameinfo: {
            ...data
          },
          pay: {
            ...payData,
            date: moment(date).format('YYYY-MM-DD')
          },
          country,
          email
        }

        //print data
        console.log('PAY', dataToSend);
        setsending(true);
        
        const url = `${API_URL}/save_sale`;

        axios({
          method: "post",
          url,
          data: dataToSend
        }).then((res) => {

          let result = res.data;
          console.log(res.data);

          if(result.sucess){
            toast.success(result.message);
            setsuccess(true);
            window.scroll(0, (document.getElementById("paymentContainer").offsetTop - 70));
            
            if(auth){
              router.push('/cuenta/historial-de-compras');
            }else{
              router.push('/payment-success');
            }
          }
          
          setsending(false);

        }).catch((err) => {

          let res = err.response;
          if(res.data){
            let res = err.response.data;
            console.error(res);
            toast.error('Ha ocurrido un error al hacer la compra');
            setsending(false);
          }
    
        });
        
        
      }
    }
  }

  const sendAutomaticOrder = () => {
    console.log('Enviando pago automatico');
    if(method.tipo_pasarela === 'automatico'){
      let dataToSend = {
        order: {
          type:                 method.tipo_pasarela,
          payment_method_id:    method.id_mtp,
          payment_method_name:  method.nombre_mtp,
          plan:                 plan,
          total:                total          
        },
        gameinfo: {
          ...data
        },
        pay: {
          ...payData, 
          date: moment(date).format('YYYY-MM-DD')
        },
        country,
        email
      }

      //print data
      console.log('PAY', dataToSend);

      setsending(true);
      const url = `${API_URL}/save_sale`;

      axios({
        method: "post",
        url,
        data: dataToSend
      }).then((res) => {

        let result = res.data;
        console.log(res.data);

        if(result.sucess){
          toast.success(result.message);
          setsuccess(true);
          window.scroll(0, (document.getElementById("paymentContainer").offsetTop - 70));
          if(auth){
            router.push('/cuenta/historial-de-compras');
          }else{
            router.push('/payment-success');
          }
        }
        
        setsending(false);

      }).catch((err) => {

        let res = err.response;
        if(res.data){
          let res = err.response.data;
          console.error(res);
          toast.error('Ha ocurrido un error al hacer la compra');
          setsending(false);
        }
  
      });
    }
  }
  
  return (
    <div id='paymentContainer'>
      {!success ?
        <div className="row">
          {method.tipo_pasarela ?
            <div className="col-lg-12">
                <div className="row">
                    

                    {/* ORDEN */}
                    <div className='col-lg-5 py-2'>

                      <div className="card">
                        <div className="card-header py-3 bg-primary border-primary">
                          <h3 className='h2 text-secondary fb mb-0'>
                            <i className="fa-solid fa-file-invoice me-2 d-none"></i>Tu orden
                          </h3>
                        </div>
                        <div className="card-body">
                          <h2 className='mb-3 h1'>
                            <span className='fb fw-bold'>
                              {product.nombre}
                            </span>
                          </h2>
                          {/* 
                            <h5>
                              <span className='fw-boldd'>Plan seleccionado:</span> 
                              <span className='ms-2 text-primary'>
                                {plan.puntos_plan}
                              </span>
                            </h5>
                          */}
                          <hr />
                          <h5 className='h6'>
                            <span className='fw-boldd'>
                              Plan seleccionado:
                            </span> 
                            <span className='ms-2 text-secondary'>
                              <span className='fw-bold text-primary'>{plan.puntos_plan}</span>
                            </span>
                          </h5>

                          <h5 className='h6'>
                            <span className='fw-boldd'>
                              Bonificación en <span className='fw-bold'>wpoints</span>:
                            </span> 
                            <span className='ms-2'>
                              +
                              {plan.wpoints_plan}
                            </span>
                          </h5>
                   
                          <h5 className='h6'>
                            <span className='fw-boldd'>
                              Método de pago:
                            </span> 
                            <span className='ms-2 text-secondary'>
                              {method.nombre_mtp}
                            </span>
                          </h5>
                          {/* 
                            <h5>
                              <span className='fw-boldd'>
                                Cantidad: 1
                              </span> 
                            </h5>
                          */}
                   
                          <h5 className='h6'>
                            <span className='fw-boldd'>
                              Subtotal:
                            </span> 
                            <span className='ms-2 text-secondary'>
                              {dataTotal.string}
                            </span>
                          </h5>

                          {discount &&
                            <h5 className='h6'>
                              <span className='fw-boldd'>
                                Código descuento:
                              </span> 
                              <span className='ms-2 text-secondary'>
                                {discount.tipo_descuento === 'dolares' 
                                    ? 
                                        <span>USD ${discount.monto_valor}</span> 
                                    :   <span>{discount.monto_valor}%</span>
                                }
                              </span>
                            </h5>
                          }

                          <hr />

                          <h5 className='h5 fw-bold'>
                            <span className='fw-bold'>
                              Total:
                            </span> 
                            <span className='ms-2 text-primary'>
                              {dataTotal.string}
                            </span>
                          </h5>
                          {/* 
                          <h5 className='fw-bold'>
                            <span className='fw-bold'>
                              Total {`(${country.codigo_iso})`}:
                            </span> 
                            <span className='ms-2 text-primary'>
                              {plan.precio_local ? `${plan.precio_local} ${plan.moneda_local ? plan.moneda_local : ''}` : Number(total * tasa)}
                            </span>
                          </h5>
                          */}
                        </div>
                      </div>

                      {accounts && Array.isArray(accounts) && accounts.length > 0 &&
                        <div className="card my-3">
                          <div className="card-header py-3 bg-primary border-primary">
                            <h3 className='h2 text-secondary fb mb-0'>
                              Cuentas
                            </h3>
                          </div>
                          <div className="card-body">
                            {Array.isArray(accounts) && accounts.length > 0 &&
                              <div>
                                {accounts.map((item, key) => {
                                  return (
                                    <div key={key}>
                                      
                                      <div className="alert" style={{borderColor: '#ced4da'}}>
                                        {item.pago_movil === 'si'
                                          ?
                                            <div>
                                                <div>
                                                  <i className="fa-solid fa-building-columns me-2"></i> 
                                                  <span className="fw-bold">{item.numero_cuenta}</span>
                                                  <i className="fa-solid fa-phone me-2 ms-2"></i> {item.telefono}
                                                </div>
                                             </div>
                                          :
                                            <div>
                                              <i className="fa-solid fa-building-columns me-2"></i> {item.tipo_cuenta} <span className="fw-bold">{item.numero_cuenta}</span>
                                            </div>
                                        }
                                        <div>
                                          <i className="fa-regular fa-user me-2"></i> {item.nombre_titular} - {item.cedula_identidad}
                                        </div>
                                      </div>
                                      
                                    </div>
                                  )
                                })}
                              </div>
                            }
                          </div>
                        </div>
                      }

                    </div>

                    {/* MANUAL ----------------------- */}
                    {method.tipo_pasarela === 'manual' &&
                      <div className='col-lg-7 py-2'>
                          <div className="card">
                            <div className="card-header py-3 bg-primary">
                              <h3 className='h2 text-secondary fb mb-0'>
                                <i className="fa-solid fa-credit-card me-2 d-none"></i>
                                Información de pago
                              </h3>
                            </div>
                            <div className="card-body">
                              <form onSubmit={(e) => sendOrder(e)} action="">
                                <div className="row">

                                  <div  className={((errors['nombre']) ? "has-error" : "") + ` col-lg-6 mb-3`}>
                                    <label htmlFor="pay-user-name" className="mb-2 h6">
                                      Nombre <span className='text-danger ms-1'>*</span>
                                    </label>
                                    <div>
                                      {!auth || (auth && (!user.nombre_cliente || user.nombre_cliente === ""))
                                      ?
                                        <input 
                                          type="text" 
                                          className="form-control" 
                                          placeholder='Ingrese su nombre'
                                          id='pay-user-name'
                                          name='nombre'
                                          defaultValue={payData.nombre}
                                          onChange={(e) => handleInputChange(e)}
                                        />
                                      :
                                        <input 
                                          type="text" 
                                          className="form-control" 
                                          placeholder='Ingrese su nombre'
                                          value={user.nombre_cliente}
                                          readOnly
                                        />
                                      }
                                    </div>
                                    {errors['nombre'] &&
                                        <div className='text-danger fw-bold small py-2 small'>
                                            {errors['nombre']}
                                        </div>
                                    }
                                  </div>

                                  <div  className={((errors['email']) ? "has-error" : "") + ` col-lg-6 mb-3`}>
                                    <label htmlFor="pay-user-email" className="mb-2 h6">
                                      Correo eléctronico <span className='text-danger ms-1'>*</span>
                                    </label>
                                    <div>
                                      {!auth 
                                      ?
                                        <input 
                                          type="text" 
                                          className="form-control" 
                                          placeholder='Correo eléctronico'
                                          id='pay-user-email'
                                          name='email'
                                          defaultValue={payData.email}
                                          onChange={(e) => handleInputChange(e)}
                                        />
                                      :
                                        <input 
                                          type="text" 
                                          className="form-control" 
                                          placeholder='Ingrese su nombre'
                                          value={user.correo_cliente}
                                          readOnly
                                        />
                                      }
                                    </div>
                                    {errors['email'] &&
                                        <div className='text-danger fw-bold small py-2 small'>
                                            {errors['email']}
                                        </div>
                                    }
                                  </div>

                                  <div className={((errors['amount']) ? "has-error" : "") + ` col-lg-12 mb-3`}>
                                    <label htmlFor="pay-amount" className="mb-2 h6">
                                      Pago <span className='text-danger ms-1'>*</span>
                                    </label>
                                    <div>
                                      <input 
                                        type="number" 
                                        min={0}
                                        className="form-control" 
                                        placeholder='Referencia de pago'
                                        id='pay-amount'
                                        name='amount'
                                        value={payData.amount}
                                        onChange={(e) => handleInputChange(e)}
                                      />
                                    </div>
                                    {errors['amount'] &&
                                        <div className='text-danger fw-bold small py-2 small'>
                                            {errors['amount']}
                                        </div>
                                    }
                                  </div>

                                  {country.nombre.toLowerCase() === 'venezuela' &&
                                    <div className="col-lg-12 mb-3">
                                        <label htmlFor="pay-user-phone" className="mb-2 h6">
                                          Teléfono emisor del pago (Pago móvil)
                                        </label>
                                      <div className="input-group">
                                        <div className="input-group-prepend">
                                          <span className="input-group-text fw-bold text-secondary" id="basic-addon1">
                                            +58
                                          </span>
                                        </div>
                                        <input 
                                          type="text" 
                                          className="form-control" 
                                          placeholder='Ingrese el teléfono'
                                          id='pay-user-phone'
                                          name='pagoMovil'
                                          onChange={(e) => handleInputChange(e)}
                                        />
                                      </div>
                                    </div>
                                  }
                                  
                                  <div className={((errors['date']) ? "has-error" : "") + ` col-lg-4 mb-3`}>
                                    <label htmlFor="pay-date" className="mb-2 h6">
                                      Fecha <span className='text-danger ms-1'>*</span>
                                    </label>
                                    <div>
                                      <DatePicker 
                                        onChange={setDate} 
                                        value={date} 
                                        maxDate={new Date()}
                                      />
                                    </div>
                                    {errors['date'] &&
                                        <div className='text-danger fw-bold small py-2 small'>
                                            {errors['date']}
                                        </div>
                                    }
                                  </div>

                                  <div className={((errors['ref']) ? "has-error" : "") + ` col-lg-8 mb-3`}>
                                    <label htmlFor="pay-ref" className="mb-2 h6">
                                      Referencia <span className='text-danger ms-1'>*</span>
                                    </label>
                                    <div>
                                      <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder='Referencia de pago'
                                        id='pay-ref'
                                        name='ref'
                                        onChange={(e) => handleInputChange(e)}
                                      />
                                    </div>
                                    {errors['ref'] &&
                                        <div className='text-danger fw-bold small py-2 small'>
                                            {errors['ref']}
                                        </div>
                                    }
                                  </div>

                                  <div className="col-lg-12 mb-3">
                                    <label htmlFor="pay-nota" className="mb-2 h6">
                                      Nota
                                    </label>
                                    <textarea
                                      placeholder='Nota adicional' 
                                      name="note" 
                                      id="pay-nota" 
                                      cols="30" 
                                      rows="3"
                                      className='form-control'
                                      onChange={(e) => handleInputChange(e)}
                                    ></textarea>
                                  </div>

                                  <div className="col-lg-12 text-end pt-3">
                                    <button 
                                      disabled={sending}
                                      type='button' 
                                      onClick={() => cancel()} 
                                      className='btn btn-light me-2 border-secondary btn-lg fw-bold'
                                    >
                                      Cancelar
                                    </button>
                                    <button 
                                      disabled={sending}
                                      type='submit' 
                                      className='btn btn-primary btn-lg fw-bold'
                                    >
                                      {!sending ? <span>Completar orden</span> : <i className="fa-solid fa-spin fa-spinner"></i>}
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                      </div>
                    }

                    {method.tipo_pasarela === 'automatico' &&
                      <div className='col-lg-7 py-2'>
                        <div className="card">
                          <div className="card-header py-3 bg-primary">
                            <h3 className='h2 text-secondary fb mb-0'>
                              <i className="fa-solid fa-credit-card me-2 d-none"></i>
                              Completar pago
                            </h3>
                          </div>
                          <div className="card-body">

                            {method.nombre_mtp.toLowerCase() === 'wcoins' &&
                              <div className='content-wcoins'>
                                <div className="text-end pt-3">
                                  <div className="alert alert-info text-start">
                                    <p className='mb-0'>
                                      Usted posee <span className='fw-bold'>{Number(user.wingscoins).toFixed(2)} Wcoins</span>
                                    </p>
                                    <p className='mb-0'>
                                      Al realizar la compra, su saldo en <span className='fw-bold'>Wcoins</span> será: <span className='fw-bold'>{Number(user.wingscoins - total).toFixed(2)}</span>
                                    </p>
                                  </div>
                                  <button 
                                    disabled={sending}
                                    type='button' 
                                    onClick={() => sendAutomaticOrder()} 
                                    className='btn btn-primary me-2 btn-lg fw-bold'
                                  >
                                    {!sending ? <span className='px-2'>Pagar con wcoins</span> : <i className="fa-solid fa-spin fa-spinner"></i>}
                                  </button>
                                  <button 
                                    disabled={sending}
                                    type='button' 
                                    onClick={() => cancel()} 
                                    className='btn btn-light me-2 border-secondary btn-lg fw-bold'
                                  >
                                    Cancelar
                                  </button>
                                </div>
                              </div>
                            }

                            {method.nombre_mtp.toLowerCase() === 'paypal' &&
                              <div className='content-paypal-btn'>
                                <PaypalBtn 
                                  amount={Number(total)} 
                                  onComplete={() => sendAutomaticOrder()} 
                                />
                                <div className="text-end pt-3">
                                  <button 
                                    disabled={sending}
                                    type='button' 
                                    onClick={() => cancel()} 
                                    className='btn btn-light me-2 border-secondary btn-lg fw-bold'
                                  >
                                    Cancelar
                                  </button>
                                </div>
                              </div>
                            }

                            {method.nombre_mtp.toLowerCase() === 'stripe tdc' &&
                              <div>
                                <ContentStripeForm>
                                  <StripeForm 
                                    amount={Number(total)} 
                                    cancel={() => cancel()}  
                                    onComplete={() => sendAutomaticOrder()}
                                  />
                                </ContentStripeForm>
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                    }

                  </div>
                </div>
               
            : 
            ''
          }
        </div>
      :
        <div className="row">
          <div className="col-lg-12">
            <div className="card border-0 w-100 shadow mb-4">
              <div className="card-body">
                <div className="text-center">

                  <div className='mb-4 text-success'>
                    <i className="fa-regular fa-6x fa-circle-check"></i>
                  </div>
                  <h3 className='h2 fw-bold'>
                    ¡Compra realizada exitosamente!
                  </h3>
                  {auth ?
                    <p>Redirigiendo al historial de compras...</p>
                  :
                    <p>Redirigiendo...</p>
                  }
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div> 
  )
}

export default Pay