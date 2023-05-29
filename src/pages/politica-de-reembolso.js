import React from 'react'
import Layout from '@/components/app/Layout'
import Head from 'next/head'

function PoliticasDeReembolso() {
  return (
    <Layout>
        <Head>
            <title>Wings - Políticas de Reembolso</title>
        </Head>
        <div className="container mb-5 mt-4" style={{paddingBottom: 40, paddingTop: 80}}>
          <h1 className='fw-bold text-secondary mb-3'>
            Políticas de Reembolso
          </h1>
          <p>
            En el caso de productos que sean  mercancías irrevocables no-tangibles como licencias, códigos, pines, seriales, servicios y/o cualquier otro, no realizamos reembolsos después de que se envíe el producto, usted tiene la responsabilidad de entender el articulo que está adquiriendo antes de comprarlo.  Le pedimos que lea cuidadosamente antes de comprarlo. Hacemos solamente excepciones con esta regla cuando la descripción no se ajusta al producto. Hay algunos productos que pudieran tener garantía y posibilidad de reembolso pero este será especificado al comprar el producto. En tales casos la garantía solo cubrirá fallas de fábrica y sólo se hará efectiva cuando el producto se haya usado correctamente. La garantía no cubre averías o daños ocasionados por uso indebido. Los términos de la garantía están asociados a fallas de fabricación y funcionamiento en condiciones normales de los productos y sólo se harán efectivos estos términos si el equipo ha sido usado correctamente.
          </p>
          <p>
            WNGSTORE tiene hasta 30 días continuos para realizar el envío de bienes tangibles y de 7 días continuos para el envío de vienes intangibles tales como licencias, códigos, seriales, pines, membresias, servidores, entre otros. El cliente solo podrá solicitar el reembolso total del producto transcurrido este tiempo en caso de que WNGSTORE no haya podido cumplir con el envío dentro de los plazos estipulados. En caso de ser una transacción sometida a investigación por sospecha de fraude los tiempos establecidos pasan a 30 días como tiempo en todos los casos, tal como se especifica en nuestro aviso legal referente a nuestros Términos y Condiciones de uso.
          </p>
          <p>
            WNGSTORE se reserva el derecho a no reembolsar una compra siempre que tenga la posibilidad de cumplir con la misma dentro de los tiempos establecidos, aún cuando el cliente ya no desee dicho producto. Es responsabilidad del cliente comprender estas políticas antes de realizar la compra. En caso de la insistencia por parte del cliente relacionada al reembolso WNGSTORE podría considerar realizar el mismo con una tasa de penalidad del 20% sobre el valor del articulo, la cual será débitada previamente antes de hacer dicho reembolso. WNGSTORE podrá tomar hasta 30 días continuos para realizar la solicitud de reembolso a la plataforma de pagos o entidad bancaria una vez recibida y aprobada la petición por parte del cliente. se exime de la responsabilidad y tiempos que pueda tomar el medio de pago en cuestión para realizar dicho reembolso, limitando su responsabilidad únicamente a realizar la solicitud del mismo sin garantizar ni estar implicado directamente en dicho proceso.
          </p>
          <p>
            WNGSTORE puede no cumplir con los tiempos de entregas habituales establecidos en el sitio web, canales sociales o soporte si presente fallas, inconvenientes y/o situaciones internas o externas que afecten el normal desarrollo de sus operaciones.
          </p>
          <p>
            Esto incluye:
          </p>
          <ol>
            <li>
              De acuerdo a las especificaciones técnicas indicadas para cada producto.
            </li>
            <li>
              En condiciones ambientales acorde con las especificaciones indicadas por el fabricante.
            </li>
            <li>
              En uso específico para la función con que fue diseñado de fábrica.
            </li>
            <li>
              En condiciones de operación eléctricas acorde con las especificaciones y tolerancias indicadas.
            </li>
          </ol>
        </div>
    </Layout>
  )
}

export default PoliticasDeReembolso